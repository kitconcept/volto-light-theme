"""Init and utils."""

from zope.i18nmessageid import MessageFactory

import logging


__version__ = "7.0.0"

PACKAGE_NAME = "kitconcept.voltolighttheme"

_ = MessageFactory(PACKAGE_NAME)

logger = logging.getLogger(PACKAGE_NAME)
