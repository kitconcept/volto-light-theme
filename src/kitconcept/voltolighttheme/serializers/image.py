from kitconcept import api
from plone.app.uuid.utils import uuidToCatalogBrain
from plone.restapi.behaviors import IBlocks
from plone.restapi.interfaces import IBlockFieldSerializationTransformer
from plone.volto.transforms import NestedResolveUIDSerializerBase
from zope.component import adapter
from zope.interface import implementer
from zope.publisher.interfaces.browser import IBrowserRequest

import Missing
import re


# Hack: make sure plone.volto's nested block transforms
# run before the resolveuid transform of a top-level block (order=1).
# Otherwise the latter resolves uids too early.
NestedResolveUIDSerializerBase.order = 0


@adapter(IBlocks, IBrowserRequest)
@implementer(IBlockFieldSerializationTransformer)
class ImageBlockSerializer:
    """Annotate serialized blocks with image/video metadata

    Adds current value of credit and allow_image_download fields
    """

    order = 0  # must run before uid-to-path transform
    block_type = None

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def __call__(self, block: dict):
        block_type = block.get("@type")
        if block_type in ("image", "highlight", "video"):
            url: str = block.get("url") or ""
            brain = url_to_brain(url)
            if brain is not None:
                if brain.portal_type == "Image":
                    block["image_scales"] = brain.image_scales
                if block_type == "video":
                    block["image_scales"] = brain.image_scales
                    block["target_url"] = brain.getRemoteUrl
            elif not url.startswith("http"):
                # Source not found; clear out derived fields
                block["url"] = None
                for name in ("image_scales", "target_url"):
                    if name in block:
                        del block[name]

        # None is here because this gets called for slider slides
        # without a @type specified
        if block_type in ("teaser", None):
            for field in (
                "href",
                "preview_image",
            ):
                value = block.get(field, "")
                if value:
                    if isinstance(value, str):
                        url = value
                    else:
                        url = value[0].get("@id", "")
                    brain = url_to_brain(url)
                    if brain is not None:
                        if isinstance(value, str):
                            value = [{"@id": value}]
                        value[0]["image_field"] = brain.image_field
                        value[0]["image_scales"] = brain.image_scales
                        if brain.getRemoteUrl is not Missing.Value:
                            value[0]["getRemoteUrl"] = brain.getRemoteUrl
                        block[field] = value
                    elif not url.startswith("http"):
                        # Source not found; clear out derived fields
                        block[field] = []

        return block


def url_to_brain(url):
    if not url:
        return
    brain = None
    match = re.search("resolveuid/([^/]+)", url)
    if match:
        uid = match.group(1)
        brain = uuidToCatalogBrain(uid)
    else:
        # fallback in case the url wasn't converted to a UID
        catalog = api.portal.get_tool("portal_catalog")
        path = "/".join(api.portal.get().getPhysicalPath()) + url
        results = catalog.searchResults(path={"query": path, "depth": 0})
        if results:
            brain = results[0]
    return brain
