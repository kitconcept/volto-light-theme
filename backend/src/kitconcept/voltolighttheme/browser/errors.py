from AccessControl import getSecurityManager
from Acquisition import aq_inner
from kitconcept.voltolighttheme.interfaces import IBrowserLayer
from plone.rest.errors import ErrorHandling
from plone.rest.traverse import RESTWrapper
from plone.restapi.services.inherit.get import InheritedBehaviorExpander
from Products.CMFCore.interfaces import IDynamicType
from zope.component import adapter


@adapter(Exception, IBrowserLayer)
class VLTErrorHandling(ErrorHandling):
    """Add inherited site customization fields to error responses."""

    def render_exception(self, exception):
        result = super().render_exception(exception)

        # Find the closest visible context,
        # and add its data from the `inherit` expander
        if result is not None:
            try:
                closest_context = self._get_closest_visible_context()
                if closest_context is not None:
                    expander = InheritedBehaviorExpander(closest_context, self.request)
                    result["@components"] = expander(expand=True)
            except Exception:
                pass

        return result

    def _get_closest_visible_context(self):
        sm = getSecurityManager()
        obj = None
        for parent in self.request["PARENTS"]:
            if isinstance(parent, RESTWrapper):
                obj = parent.context
            elif IDynamicType.providedBy(parent):
                obj = parent
            if obj is not None:
                break
        if obj is None:
            return
        for context in aq_inner(obj).aq_chain:
            if sm.checkPermission("View", context):
                return context
