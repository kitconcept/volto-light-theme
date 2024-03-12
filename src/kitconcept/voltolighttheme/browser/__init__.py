from plone.protect.interfaces import IDisableCSRFProtection
from plone.restapi.blocks import visit_blocks
from Products.Five.browser import BrowserView
from zope.interface import alsoProvides

import logging
import transaction


logger = logging.getLogger("migrate_to_4")
logger.setLevel(logging.INFO)

# If you updated or extended the colors mappings, you should update this with the new values
COLOR_MAP = {
    "grey": {
        "--background-color": "#ecebeb",
    },
    "transparent": {
        "--background-color": "transparent",
    },
}


def migrate_backgroundColor(portal):
    i = 0
    output = ""
    for brain in portal.portal_catalog(
        object_provides="plone.restapi.behaviors.IBlocks"
    ):
        obj = brain.getObject()
        blocks = obj.blocks
        output += f"Processing {obj.absolute_url()}\n"
        for block in visit_blocks(obj, blocks):
            if block.get("styles", False) and block["styles"].get(
                "backgroundColor", False
            ):
                new_block = block.copy()
                color = block["styles"]["backgroundColor"]
                new_block["styles"]["backgroundColor:noprefix"] = COLOR_MAP[color]
                del new_block["styles"]["backgroundColor"]
                block.clear()
                block.update(new_block)
                output += f'{obj.absolute_url()} - Updated "backgroundColor" to "backgroundColor:noprefix"\n'

        i += 1
        if not i % 100:
            logger.info(i)
            transaction.commit()
    transaction.commit()
    return output


class MigrateToV3(BrowserView):
    def __call__(self):
        alsoProvides(self.request, IDisableCSRFProtection)
        return migrate_backgroundColor(self.context)
