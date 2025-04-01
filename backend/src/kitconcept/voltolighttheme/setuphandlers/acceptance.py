from plone.dexterity.interfaces import IDexterityFTI
from Products.GenericSetup.tool import SetupTool
from zope.component import queryUtility


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
    apply_site_customization_behaviors(portal_setup)


def apply_site_customization_behaviors(portal_setup: SetupTool):
    prepend_behavior("Plone Site", "voltolighttheme.footer")
    prepend_behavior("Plone Site", "voltolighttheme.theme")
    prepend_behavior("Plone Site", "voltolighttheme.header")
