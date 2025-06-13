// SemanticUI-free pre-@plone/components
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { useSelector, shallowEqual } from 'react-redux';
import type { ActionsResponse, Content } from '@plone/types';

type FormState = {
  content: {
    data: Content;
  };
  actions: {
    actions: ActionsResponse;
  };
};

const Anontools = () => {
  const content = useSelector<FormState, Content>(
    (state) => state.content.data,
    shallowEqual,
  );
  const actions = useSelector<FormState, ActionsResponse>(
    (state) => state.actions.actions,
    shallowEqual,
  );

  const loginAction = actions.user?.find((o) => o.id === 'login');
  const registerAction = actions.user?.find((o) => o.id === 'join');
  const logoutAction = actions.user?.find((o) => o.id === 'logout');

  return (
    <>
      {registerAction && (
        <Link aria-label="register" to="/register">
          <FormattedMessage id="Register" defaultMessage="Register" />
        </Link>
      )}
      {loginAction && (
        <Link
          aria-label="login"
          to={`/login${
            content?.['@id']
              ? `?return_url=${flattenToAppURL(content['@id'])}`
              : ''
          }`}
        >
          <FormattedMessage id="Log in" defaultMessage="Log in" />
        </Link>
      )}
      {logoutAction && (
        <Link aria-label="logout" to="/logout">
          <FormattedMessage id="Log out" defaultMessage="Log out" />
        </Link>
      )}
    </>
  );
};

export default Anontools;
