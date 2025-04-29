from kitconcept.voltolighttheme import _
from plone.autoform import directives
from plone.autoform.interfaces import IFormFieldProvider
from plone.namedfile.field import NamedBlobImage
from plone.schema import JSONField
from plone.supermodel import model
from zope.interface import provider
from zope.schema import Bool
from zope.schema import TextLine

import json


messages = {
    "accent_color": {
        "default": "Fat Menu Background Color",
    },
    "accent_foreground_color": {
        "default": "Fat Menu / Breadcrumbs Text Color",
    },
    "primary_color": {
        "default": "Header background color (for dark themes)",
    },
    "primary_foreground_color": {
        "default": "Navigation Text Color",
    },
    "secondary_color": {
        "default": "Footer Background Color",
    },
    "secondary_foreground_color": {
        "default": "Footer Font Color",
    },
}

OBJECT_LIST_DEFAULT_VALUE = []

OBJECT_LIST = json.dumps({
    "type": "array",
    "items": {
        "type": "object",
    },
})


@provider(IFormFieldProvider)
class ISiteHeaderCustomizationSettings(model.Schema):
    """Site/Subsite Header properties behavior."""

    model.fieldset(
        "header",
        label=_("Header customizations"),
        fields=[
            "logo",
            "complementary_logo",
            "has_fat_menu",
            "has_intranet_header",
            "intranet_flag",
            "header_actions",
        ],
    )

    logo = NamedBlobImage(
        title=_("label_site_logo", default="Site Logo"),
        description=_(
            "help_site_logo",
            default="If the site or subsite has a logo, please upload it here.",
        ),
        required=False,
    )

    complementary_logo = NamedBlobImage(
        title=_("label_complementary_logo", default="Complementary Logo"),
        description=_(
            "help_complementary_logo",
            default="If your site has an intranet header,"
            " it will show in the right side of the header.",
        ),
        required=False,
    )

    has_fat_menu = Bool(
        title=_("label_enable_fat_menu", default="Enable Fat Menu"),
        description=_(
            "help_enable_fat_menu",
            default="If enabled, the fat menu will be shown.",
        ),
        required=False,
        default=True,
    )

    has_intranet_header = Bool(
        title=_("label_has_intranet_header", default="Enable Intranet Header"),
        description=_(
            "help_has_intranet_header",
            default="If enabled, the intranet header will be shown.",
        ),
        required=False,
        default=False,
    )

    intranet_flag = TextLine(
        title=_("label_intranet_flag", default="Site Flag"),
        description=_(
            "help_intranet_flag",
            default="The colored pill at the top left of the header.",
        ),
        required=False,
    )

    directives.widget(
        "header_actions",
        frontendOptions={
            "widget": "object_list",
            "widgetProps": {"schemaName": "headerActions"},
        },
    )
    header_actions = JSONField(
        title=_("Site Actions"),
        description=_(
            "help_header_actions",
            default="The site actions are the links that show in the top right side"
            " of the header.",
        ),
        schema=OBJECT_LIST,
        default=OBJECT_LIST_DEFAULT_VALUE,
        required=False,
        widget="",
    )


@provider(IFormFieldProvider)
class ISiteThemeCustomizationSettings(model.Schema):
    """Site/Subsite theme colors behavior."""

    model.fieldset(
        "theming",
        label=_("Theming"),
        fields=[
            "primary_foreground_color",
            "accent_foreground_color",
            "accent_color",
            # "primary_color", # Not used in PiK
            "secondary_foreground_color",
            "secondary_color",
        ],
    )

    directives.widget("accent_color", frontendOptions={"widget": "colorPicker"})
    accent_color = TextLine(
        title=_("label_accent_color", default=messages["accent_color"]["default"]),
        required=False,
    )

    directives.widget(
        "accent_foreground_color", frontendOptions={"widget": "colorPicker"}
    )
    accent_foreground_color = TextLine(
        title=_(
            "label_accent_foreground_color",
            default=messages["accent_foreground_color"]["default"],
        ),
        required=False,
    )

    directives.widget(
        "primary_foreground_color", frontendOptions={"widget": "colorPicker"}
    )
    primary_foreground_color = TextLine(
        title=_(
            "label_primary_foreground_color",
            default=messages["primary_foreground_color"]["default"],
        ),
        required=False,
    )

    directives.widget("secondary_color", frontendOptions={"widget": "colorPicker"})
    secondary_color = TextLine(
        title=_(
            "label_secondary_color", default=messages["secondary_color"]["default"]
        ),
        required=False,
    )

    directives.widget(
        "secondary_foreground_color",
        frontendOptions={"widget": "colorPicker"},
    )
    secondary_foreground_color = TextLine(
        title=_(
            "label_secondary_foreground_color",
            default=messages["secondary_foreground_color"]["default"],
        ),
        required=False,
    )


@provider(IFormFieldProvider)
class ISiteFooterCustomizationSettings(model.Schema):
    """Site/Subsite footer properties behavior."""

    model.fieldset(
        "footer",
        label=_("Footer customizations"),
        fields=[
            "footer_logos",
            "footer_logos_container_width",
            "footer_logos_size",
            "footer_links",
        ],
    )

    directives.widget(
        "footer_logos",
        frontendOptions={
            "widget": "object_list",
            "widgetProps": {"schemaName": "footerLogos"},
        },
    )
    footer_logos = JSONField(
        title=_("Footer logos"),
        schema=OBJECT_LIST,
        default=OBJECT_LIST_DEFAULT_VALUE,
        required=False,
        widget="",
    )

    directives.widget(
        "footer_logos_container_width",
        frontendOptions={
            "widget": "blockWidth",
            "widgetProps": {
                "filterActions": ["default", "layout"],
                "actions": [
                    {
                        "name": "default",
                        "label": "Default",
                    },
                    {
                        "name": "layout",
                        "label": "Layout",
                    },
                ],
            },
        },
    )
    footer_logos_container_width = TextLine(
        title=_("Footer logos container width"),
        default="default",
        required=False,
    )

    directives.widget(
        "footer_logos_size",
        frontendOptions={
            "widget": "size",
            "widgetProps": {"filterActions": ["s", "l"]},
        },
    )
    footer_logos_size = TextLine(
        title=_("Footer logos size"),
        default="s",
        required=False,
    )

    directives.widget(
        "footer_links",
        frontendOptions={
            "widget": "object_list",
            "widgetProps": {"schemaName": "footerLinks"},
        },
    )
    footer_links = JSONField(
        title=_("Footer links"),
        schema=OBJECT_LIST,
        default=OBJECT_LIST_DEFAULT_VALUE,
        required=False,
        widget="",
    )
