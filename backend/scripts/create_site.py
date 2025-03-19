from AccessControl.SecurityManagement import newSecurityManager
from pathlib import Path
from plone.distribution.api import site as site_api
from Products.GenericSetup.tool import SetupTool
from Testing.makerequest import makerequest

import json
import logging
import os
import transaction


logging.basicConfig(format="%(message)s")

truthy = frozenset(("t", "true", "y", "yes", "on", "1"))


def asbool(s):
    """Return the boolean value ``True`` if the case-lowered value of string
    input ``s`` is a :term:`truthy string`. If ``s`` is already one of the
    boolean values ``True`` or ``False``, return it."""
    if s is None:
        return False
    if isinstance(s, bool):
        return s
    s = str(s).strip()
    return s.lower() in truthy


def parse_answers(answers_file: Path, answers_env: dict) -> dict:
    answers = json.loads(answers_file.read_text())
    for key in answers:
        env_value = answers_env.get(key, "")
        if key == "setup_content" and env_value.strip():
            env_value = asbool(env_value)
        elif not env_value:
            continue
        # Override answers_file value
        answers[key] = env_value
    return answers


# Silence some loggers
for logger_name in [
    "GenericSetup.componentregistry",
    "Products.MimetypesRegistry.MimeTypesRegistry",
]:
    logging.getLogger(logger_name).setLevel(logging.ERROR)

logger = logging.getLogger("Plone Site Creation")
logger.setLevel(logging.DEBUG)

SCRIPT_DIR = Path().cwd() / "scripts"

app = makerequest(globals()["app"])

request = app.REQUEST

admin = app.acl_users.getUserById("admin")
admin = admin.__of__(app.acl_users)
newSecurityManager(None, admin)


def get_answers_file(filename: str) -> Path:
    return SCRIPT_DIR / filename


# VARS
DISTRIBUTION = "volto"
ANSWERS_FILE = os.getenv("ANSWERS", "default.json")
DELETE_EXISTING = asbool(os.getenv("DELETE_EXISTING"))
EXAMPLE_CONTENT = asbool(
    os.getenv("EXAMPLE_CONTENT", "1")
)  # Create example content by default
# ANSWERS OVERRIDE
ANSWERS = {
    "site_id": os.getenv("SITE_ID"),
    "title": os.getenv("SITE_TITLE"),
    "description": os.getenv("SITE_DESCRIPTION"),
    "default_language": os.getenv("SITE_DEFAULT_LANGUAGE"),
    "portal_timezone": os.getenv("SITE_PORTAL_TIMEZONE"),
    "setup_content": os.getenv("SITE_SETUP_CONTENT", "false"),
}


def main():
    # Load site creation parameters
    answers_file = get_answers_file(ANSWERS_FILE)
    answers = parse_answers(answers_file, ANSWERS)
    site_id = answers["site_id"]

    logger.info(f"Creating a new Plone site  @ {site_id}")
    logger.info(
        f" - Using the {DISTRIBUTION} distribution and answers from {answers_file}"
    )

    if site_id in app.objectIds():
        if DELETE_EXISTING:
            app.manage_delObjects([site_id])
            transaction.commit()
            app._p_jar.sync()
            logger.info(f" - Deleted existing site with id {site_id}")
        else:
            logger.info(
                " - Stopping site creation, as there is already a site with id "
                f"{site_id} at the instance. Set DELETE_EXISTING=1 to delete "
                "the existing site before creating a new one."
            )

    if site_id not in app.objectIds():
        site = site_api._create_site(
            context=app, distribution_name=DISTRIBUTION, answers=answers
        )
        transaction.commit()
        portal_setup: SetupTool = site.portal_setup
        portal_setup.runAllImportStepsFromProfile(
            "profile-kitconcept.voltolighttheme:default"
        )
        transaction.commit()

        if EXAMPLE_CONTENT:
            portal_setup.runAllImportStepsFromProfile(
                "profile-kitconcept.voltolighttheme:demo"
            )
            transaction.commit()
        app._p_jar.sync()
        logger.info(" - Site created!")


if __name__ == "__main__":
    main()
