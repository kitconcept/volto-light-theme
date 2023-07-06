from AccessControl.SecurityManagement import newSecurityManager
from plone.distribution.api import site as site_api
from Testing.makerequest import makerequest

import os
import transaction


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


app = globals()["app"]
app = makerequest(app)

request = app.REQUEST

admin = app.acl_users.getUserById("admin")
admin = admin.__of__(app.acl_users)
newSecurityManager(None, admin)

# VARS
DISTRIBUTION_NAME = os.getenv("DISTRIBUTION_NAME", "voltolighttheme")
SITE_ID = os.getenv("SITE_ID", "Plone")
SETUP_CONTENT = asbool(os.getenv("SETUP_CONTENT", "1"))
DELETE_EXISTING = asbool(os.getenv("DELETE_EXISTING"))
LANGUAGE = os.getenv("LANGUAGE", "en")
TIMEZONE = os.getenv("TIMEZONE", "Europe/Berlin")


ANSWERS = {
    "site_id": SITE_ID,
    "title": "Plone",
    "description": "A new Plone site",
    "setup_content": SETUP_CONTENT,
    "default_language": LANGUAGE,
    "portal_timezone": TIMEZONE,
}

if SITE_ID in app.objectIds() and DELETE_EXISTING:
    app.manage_delObjects([SITE_ID])
    transaction.commit()
    app._p_jar.sync()

if SITE_ID not in app.objectIds():
    site = site_api.create(app, distribution_name=DISTRIBUTION_NAME, answers=ANSWERS)
    transaction.commit()
    app._p_jar.sync()
