from kitconcept.voltolighttheme import _
from plone.autoform import directives
from plone.autoform.interfaces import IFormFieldProvider
from plone.namedfile.field import NamedBlobImage
from plone.schema import JSONField
from plone.supermodel import model
from zope.interface import provider
from zope.schema import Bool
from zope.schema import Text
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
            "has_enhanced_footer",
            "footer_logos",
            "footer_logos_container_width",
            "footer_logos_size",
            "footer_address",
            "footer_column_left_header",
            "footer_column_left",
            "footer_column_middle_header",
            "footer_column_middle",
            "footer_column_right_header",
            "footer_column_right",
            "footer_logo",
            "footer_logo_link",
            "footer_links",
        ],
    )

    has_enhanced_footer = Bool(
        title=_("label_enable_enhanced_footer", default="Enable Enhanced Footer"),
        description=_(
            "help_enable_enhanced_footer",
            default="If enabled, the enhanced footer will be shown.",
        ),
        required=False,
        default=False,
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

    footer_address = Text(
        title=_("Footer address"),
        description=_(
            "The footer address that appears below the footer logo in the"
            " first footer column."
        ),
        required=False,
    )

    footer_column_left_header = TextLine(
        title=_("Footer column left header"),
        description=_(
            "The header of the left-most column appearing after the address column."
        ),
        required=False,
    )

    directives.widget(
        "footer_column_left",
        frontendOptions={
            "widget": "object_list",
            "widgetProps": {"schemaName": "footerLinks"},
        },
    )
    footer_column_left = JSONField(
        title=_("Footer column left"),
        description=_(
            "The left-most column appearing after the address column. It can contain"
            " a list of links."
        ),
        schema=OBJECT_LIST,
        default=OBJECT_LIST_DEFAULT_VALUE,
        required=False,
        widget="",
    )

    footer_column_middle_header = TextLine(
        title=_("Footer column middle header"),
        description=_(
            "The header of the middle column appearing between the left and the right"
            " columns."
        ),
        required=False,
    )

    directives.widget(
        "footer_column_middle",
        frontendOptions={
            "widget": "object_list",
            "widgetProps": {"schemaName": "footerLinks"},
        },
    )
    footer_column_middle = JSONField(
        title=_("Footer column left"),
        description=_(
            "The middle column appearing between the left and the right columns. It can"
            " contain a list of links."
        ),
        schema=OBJECT_LIST,
        default=OBJECT_LIST_DEFAULT_VALUE,
        required=False,
        widget="",
    )

    footer_column_right_header = TextLine(
        title=_("Footer column right header"),
        description=_(
            "The header of the right-most column appearing after the middle column."
        ),
        required=False,
    )

    directives.widget(
        "footer_column_right",
        frontendOptions={
            "widget": "object_list",
            "widgetProps": {"schemaName": "footerLinks"},
        },
    )
    footer_column_right = JSONField(
        title=_("Footer column right"),
        description=_(
            "The right-most column appearing after the middle column. It can contain"
            " a list of links."
        ),
        schema=OBJECT_LIST,
        default=OBJECT_LIST_DEFAULT_VALUE,
        required=False,
        widget="",
    )

    footer_logo = NamedBlobImage(
        title=_("label_footer_logo", default="Footer Logo"),
        description=_(
            "help_footer_logo",
            default="The footer can have a prominent logo located in the lower"
            " right side. It is normally used for displaying the logo of the site"
            " sponsor.",
        ),
        required=False,
    )

    directives.widget(
        "footer_logo_link",
        frontendOptions={
            "widget": "url",
        },
    )
    footer_logo_link = TextLine(
        title=_("label_footer_logo_link", default="Footer Logo Link"),
        description=_(
            "help_footer_logo_link",
            default="The footer logo can be linked to a URL.",
        ),
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
