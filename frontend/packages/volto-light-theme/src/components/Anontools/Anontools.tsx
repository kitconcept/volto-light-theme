// SemanticUI-free pre-@plone/components
import { Link } from 'react-router-dom';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { useSelector, shallowEqual } from 'react-redux';
import type { ActionsResponse, Content } from '@plone/types';

const messages = defineMessages({
  login: {
    id: 'Log in',
    defaultMessage: 'Log in',
  },
  register: {
    id: 'Register',
    defaultMessage: 'Register',
  },
  logout: {
    id: 'Log out',
    defaultMessage: 'Log out',
  },
});

type FormState = {
  content: {
    data: Content;
  };
  actions: {
    actions: ActionsResponse;
  };
};

const Anontools = () => {
  const intl = useIntl();
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
        <Link aria-label={intl.formatMessage(messages.register)} to="/register">
          <FormattedMessage {...messages.register} />
        </Link>
      )}
      {loginAction && (
        <Link
          aria-label={intl.formatMessage(messages.login)}
          to={`/login${
            content?.['@id']
              ? `?return_url=${flattenToAppURL(content['@id'])}`
              : ''
          }`}
        >
          <FormattedMessage {...messages.login} />
        </Link>
      )}
      {logoutAction && (
        <Link aria-label={intl.formatMessage(messages.logout)} to="/logout">
          <FormattedMessage {...messages.logout} />
        </Link>
      )}
    </>
  );
};

export default Anontools;
