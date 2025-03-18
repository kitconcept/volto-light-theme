from plone import api
from zope.component.hooks import site

import pytest


@pytest.fixture(scope="class")
def portal_class(integration_class):
    if hasattr(integration_class, "testSetUp"):
        integration_class.testSetUp()
    portal = integration_class["portal"]
    with site(portal):
        # Install demo content
        setup_tool = api.portal.get_tool("portal_setup")
        setup_tool.runAllImportStepsFromProfile(
            "profile-kitconcept.voltolighttheme:demo"
        )

        yield portal
    if hasattr(integration_class, "testTearDown"):
        integration_class.testTearDown()
