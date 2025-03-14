// SemanticUI-free pre-@plone/components
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import { useSelector, shallowEqual } from 'react-redux';

const Anontools = () => {
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const content = useSelector((state) => state.content.data, shallowEqual);

  const { settings } = config;

  return (
    !token && (
      <div className="anontools">
        {settings.showSelfRegistration && (
          <Link aria-label="register" to="/register">
            <FormattedMessage id="Register" defaultMessage="Register" />
          </Link>
        )}

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
      </div>
    )
  );
};

export default Anontools;

Anontools.propTypes = {
  token: PropTypes.string,
  content: PropTypes.shape({
    '@id': PropTypes.string,
  }),
};

Anontools.defaultProps = {
  token: null,
  content: {
    '@id': null,
  },
};
