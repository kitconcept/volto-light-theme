from plone import api


OLD_FIELD = "primary_foreground_color"
NEW_FIELD = "header_foreground_color"


def migrate_primary_to_header_foreground(context):
    catalog = api.portal.get_tool("portal_catalog")
    brains = catalog(
        object_provides="kitconcept.voltolighttheme.behaviors.customizations.ISiteThemeCustomizationSettings"
    )
    for brain in brains:
        obj = brain.getObject()
        print(f"Processing {obj.absolute_url()}")
        primary_foreground_color = getattr(obj, OLD_FIELD, None)
        if primary_foreground_color is not None:
            setattr(obj, NEW_FIELD, primary_foreground_color)
            setattr(obj, OLD_FIELD, None)
            obj.reindexObject()
