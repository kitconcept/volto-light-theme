import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';

type FormState = {
  userSession: {
    token: string | null;
  };
  toolbar: {
    expanded: boolean;
  };
  content: {
    get?: { error?: unknown };
  };
};

// Volto routes that never render a toolbar (see `@plone/volto/routes`).
const NO_TOOLBAR_ROUTES =
  /(^|\/)(login|logout|sitemap|register|personal-information|passwordreset(\/.*)?)\/?$/;

/**
 * Keeps the toolbar's space for authenticated users on every page that has a
 * toolbar, so the page doesn't shift while Volto unmounts and mounts the
 * toolbar between routes (e.g. going to or from the control panel).
 * Anonymous users, pages without a toolbar (sitemap, login, ...) and error
 * pages (unauthorized, not found, ...) are not affected.
 */
const ToolbarSpace = () => {
  const { pathname } = useLocation();
  const token = useSelector<FormState, string | null>(
    (state) => state.userSession.token,
  );
  const expanded = useSelector<FormState, boolean>(
    (state) => state.toolbar.expanded,
  );
  const hasError = useSelector<FormState, boolean>(
    (state) => !!state.content.get?.error,
  );

  if (!token || hasError || NO_TOOLBAR_ROUTES.test(pathname)) return null;

  return (
    <BodyClass
      className={expanded ? 'vlt-toolbar-expanded' : 'vlt-toolbar-collapsed'}
    />
  );
};

export default ToolbarSpace;
