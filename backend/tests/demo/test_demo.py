from plone import api

import pytest


class TestDemoContent:
    @pytest.fixture(autouse=True)
    def _setup(self, portal_class):
        self.portal = portal_class

    @pytest.mark.parametrize(
        "path,portal_type",
        [
            ("/", "Plone Site"),
            ("/block", "Document"),
            ("/block/block-accordion", "Document"),
            ("/block/button-block", "Document"),
            ("/block/grid-block", "Document"),
            ("/block/grid-block/image", "Document"),
            ("/block/grid-block/listing", "Document"),
            ("/block/grid-block/teaser", "Document"),
            ("/block/grid-block/text", "Document"),
            ("/block/heading-block", "Document"),
            ("/block/highlight-block", "Document"),
            ("/block/image-block", "Document"),
            ("/block/introduction-block", "Document"),
            ("/block/listing-block", "Document"),
            ("/block/maps-block", "Document"),
            ("/block/search-block", "Document"),
            ("/block/separator-block", "Document"),
            ("/block/slider", "Document"),
            ("/block/table-block", "Document"),
            ("/block/teaser-block", "Document"),
            ("/block/text-block", "Document"),
            ("/block/toc-block", "Document"),
            ("/block/video-block", "Document"),
            ("/content-types", "Document"),
            ("/content-types/page", "Document"),
            ("/typography", "Document"),
            ("/vertical-spacing", "Document"),
            ("/vertical-spacing/grid-and-button", "Document"),
            ("/vertical-spacing/grid-and-grids", "Document"),
            ("/vertical-spacing/grid-and-text", "Document"),
            ("/vertical-spacing/heading-and-introduction", "Document"),
            ("/vertical-spacing/highlight-and-grid", "Document"),
            ("/vertical-spacing/highlight-and-text", "Document"),
            ("/vertical-spacing/listing-and-listing", "Document"),
            ("/vertical-spacing/listing-and-text", "Document"),
            ("/vertical-spacing/teasers-and-text", "Document"),
            ("/vertical-spacing/text", "Document"),
        ],
    )
    def test_demo_content(self, path: str, portal_type: str):
        content = api.content.get(path=path)
        assert content.portal_type == portal_type
