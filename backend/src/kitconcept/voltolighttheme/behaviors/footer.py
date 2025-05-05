from kitconcept.voltolighttheme import _
from plone.autoform import directives
from plone.autoform.interfaces import IFormFieldProvider
from plone.namedfile.field import NamedBlobImage
from plone.schema import JSONField
from plone.supermodel import model
from zope.interface import provider
from zope.schema import Text
from zope.schema import TextLine

import json


OBJECT_LIST_DEFAULT_VALUE = []

OBJECT_LIST = json.dumps({
    "type": "array",
    "items": {
        "type": "object",
    },
})


@provider(IFormFieldProvider)
class IKitconceptVoltoFooterSettings(model.Schema):
    """Site/Subsite footer properties behavior."""

    model.fieldset(
        "footer",
        label=_("Footer customizations"),
        fields=[
            "footer_address",
            "footer_column_left_header",
            "footer_column_left",
            "footer_column_middle_header",
            "footer_column_middle",
            "footer_column_right_header",
            "footer_column_right",
            "footer_logo",
            "footer_logo_link",
        ],
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
        title=_("Footer column middle"),
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
