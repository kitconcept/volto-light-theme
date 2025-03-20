from kitconcept.voltolighttheme import logger
from pathlib import Path
from plone import api
from plone.dexterity.interfaces import IDexterityFTI
from plone.exportimport import importers
from Products.GenericSetup.tool import SetupTool
from zope.component import queryUtility


EXAMPLE_CONTENT_FOLDER = Path(__file__).parent / "examplecontent"


def prepend_behavior(portal_type, behavior):
    fti = queryUtility(IDexterityFTI, name=portal_type)
    new = [
        currentbehavior
        for currentbehavior in fti.behaviors
        if currentbehavior != behavior
    ]
    new.insert(0, behavior)
    fti.behaviors = tuple(new)


def post_install(portal_setup: SetupTool):
    """Post install steps."""
    create_example_content(portal_setup)
    apply_site_customization_behaviors(portal_setup)


def create_example_content(portal_setup: SetupTool):
    """Import content available at the examplecontent folder."""
    portal = api.portal.get()
    importer = importers.get_importer(portal)
    for line in importer.import_site(EXAMPLE_CONTENT_FOLDER):
        logger.info(line)


def apply_site_customization_behaviors(portal_setup: SetupTool):
    prepend_behavior("Plone Site", "voltolighttheme.footer")
    prepend_behavior("Plone Site", "voltolighttheme.theme")
    prepend_behavior("Plone Site", "voltolighttheme.header")
