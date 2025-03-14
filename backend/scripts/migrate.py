from plone import api
from plone.restapi.blocks import visit_blocks
from zope.component.hooks import setSite
from zope.lifecycleevent import modified

import logging
import transaction


logger = logging.getLogger("migrate_to_4")
logger.setLevel(logging.INFO)

app = globals()["app"]

# If you updated or extended the colors mappings,
# you should update this with the new values
COLOR_MAP = {
    "grey": {
        "--background-color": "#ecebeb",
    },
    "transparent": {
        "--background-color": "transparent",
    },
}

WIDTH_MAP = {
    "narrow": {
        "--block-width": "var(--narrow-container-width)",
    },
    "wide": {
        "--block-width": "var(--default-container-width)",
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
        logger.info(f"Processing {obj.absolute_url()}")
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
                logger.info(
                    f'{obj.absolute_url()} - Updated "backgroundColor" to '
                    '"backgroundColor:noprefix"'
                )

        obj.blocks = blocks
        modified(obj)
        i += 1  # noQA: SIM113
        if not i % 100:
            logger.info(i)
            transaction.commit()
    transaction.commit()
    return output


def migrate_button_block_width(portal):
    i = 0
    output = ""
    for brain in portal.portal_catalog(
        object_provides="plone.restapi.behaviors.IBlocks"
    ):
        obj = brain.getObject()
        blocks = obj.blocks
        logger.info(f"Processing {obj.absolute_url()}")
        for block in visit_blocks(obj, blocks):
            if (
                block.get("@type", False)
                and block["@type"] == "__button"
                and block.get("styles", False)
                and block["styles"].get("buttonAlign", False)
                and block["styles"]["buttonAlign"] in ["narrow", "wide"]
            ):
                new_block = block.copy()
                new_block["styles"]["blockWidth:noprefix"] = WIDTH_MAP.get(
                    new_block["styles"]["buttonAlign"], ""
                )
                del new_block["styles"]["buttonAlign"]
                block.clear()
                block.update(new_block)
                logger.info(f'{obj.absolute_url()} - Updated "width"')

        obj.blocks = blocks
        modified(obj)
        i += 1  # noQA: SIM113
        if not i % 100:
            logger.info(i)
            transaction.commit()
    transaction.commit()
    return output


site = app.Plone
setSite(site)
with api.env.adopt_user("admin"):
    migrate_button_block_width(site)
    migrate_backgroundColor(site)
