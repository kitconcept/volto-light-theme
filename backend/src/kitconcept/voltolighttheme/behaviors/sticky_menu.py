from kitconcept.voltolighttheme import _
from plone.autoform import directives
from plone.autoform.interfaces import IFormFieldProvider
from plone.schema import Bool
from plone.schema import JSONField
from plone.schema import TextLine
from plone.supermodel import model
from zope.interface import provider

import json


OBJECT_LIST_DEFAULT_VALUE = []

OBJECT_LIST = json.dumps({
    "type": "array",
    "items": {
        "type": "object",
    },
})


@provider(IFormFieldProvider)
class IStickyMenuSettings(model.Schema):
    """Sticky menu properties behavior."""

    model.fieldset(
        "sticky_menu",
        label=_("fieldset_sticky_menu", default="Sticky menu"),
        fields=[
            "enable_mobile_sticky_menu",
            "sticky_menu",
            "sticky_menu_color",
            "sticky_menu_foreground_color",
        ],
    )

    enable_mobile_sticky_menu = Bool(
        title=_(
            "label_mobile_sticky_menu_enabled",
            default="Enable Mobile sticky menu",
        ),
        description=_(
            "help_mobile_sticky_menu_enabled",
            default="If enabled, a sticky menu will be shown at the bottom of the screen.",
        ),
        required=False,
        default=False,
    )

    directives.widget("sticky_menu_color", frontendOptions={"widget": "colorPicker"})
    sticky_menu_color = TextLine(
        title=_("label_sticky_menu_color", default="Sticky menu background color"),
        required=False,
    )

    directives.widget(
        "sticky_menu_foreground_color",
        frontendOptions={"widget": "colorPicker"},
    )
    sticky_menu_foreground_color = TextLine(
        title=_(
            "label_sticky_menu_foreground_color",
            default="Sticky menu text color",
        ),
        required=False,
    )

    directives.widget(
        "sticky_menu",
        frontendOptions={
            "widget": "object_list",
            "widgetProps": {"schemaName": "iconLinkList"},
        },
    )
    sticky_menu = JSONField(
        title=_("label_sticky_menu", default="Sticky menu"),
        description=_(
            "help_sticky_menu",
            default="The sticky menu is composed by links with icons that show in a "
            " fixed position in the right side of the screen.",
        ),
        schema=OBJECT_LIST,
        default=OBJECT_LIST_DEFAULT_VALUE,
        required=False,
        widget="",
    )
