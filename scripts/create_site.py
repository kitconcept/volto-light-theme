from AccessControl.SecurityManagement import newSecurityManager
from pathlib import Path
from plone.distribution.api import site as site_api
from Testing.makerequest import makerequest

import json
import logging
import os
import transaction


logging.basicConfig(format="%(message)s")

# Silence some loggers
for logger_name in [
    "GenericSetup.componentregistry",
    "Products.MimetypesRegistry.MimeTypesRegistry",
]:
    logging.getLogger(logger_name).setLevel(logging.ERROR)

logger = logging.getLogger("Plone Site Creation")
logger.setLevel(logging.DEBUG)

SCRIPT_DIR = Path().cwd() / "scripts"

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


app = makerequest(globals()["app"])

request = app.REQUEST

admin = app.acl_users.getUserById("admin")
admin = admin.__of__(app.acl_users)
newSecurityManager(None, admin)


def get_answers_file() -> Path:
    filename = f"{ANSWERS}.json"
    return SCRIPT_DIR / filename


def parse_answers(answers_file: Path, site_id: str = "") -> dict:
    answers = json.loads(answers_file.read_text())
    if site_id:
        answers["site_id"] = site_id
    return answers


# VARS
DISTRIBUTION = os.getenv("DISTRIBUTION", "voltolighttheme")
SITE_ID = os.getenv("SITE_ID")  # if set, this overrides the value in ANSWERS
ANSWERS = os.getenv("ANSWERS", "default")
DELETE_EXISTING = asbool(os.getenv("DELETE_EXISTING"))

# Load site creation parameters
answers_file = get_answers_file()
answers = parse_answers(answers_file, SITE_ID)
site_id = answers["site_id"]


logger.info(f"Creating a new Plone site  @ {site_id}")
logger.info(f" - Using the {DISTRIBUTION} distribution and answers from {answers_file}")


if site_id in app.objectIds() and DELETE_EXISTING:
    app.manage_delObjects([site_id])
    transaction.commit()
    app._p_jar.sync()
    logger.info(f" - Deleted existing site with id {site_id}")
else:
    logger.info(
        f" - Stopping site creation, as there is already a site with id {site_id} at the instance. "
        "Set DELETE_EXISTING=1 to delete the existing site before creating a new one."
    )

if site_id not in app.objectIds():
    site = site_api._create_site(
        context=app, distribution_name=DISTRIBUTION, answers=answers
    )
    transaction.commit()
    app._p_jar.sync()
    logger.info(" - Site created!")
