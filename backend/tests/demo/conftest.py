from plone import api
from zope.component.hooks import setSite

import pytest


@pytest.fixture
def portal(integration):
    portal = integration["portal"]
    setSite(portal)
    # Install demo content
    setup_tool = api.portal.get_tool("portal_setup")
    setup_tool.runAllImportStepsFromProfile("profile-kitconcept.voltolighttheme:demo")
    return portal
