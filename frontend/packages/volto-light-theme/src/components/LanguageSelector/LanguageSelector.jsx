import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import cx from 'classnames';
import find from 'lodash/find';
import map from 'lodash/map';

import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import langmap from '@plone/volto/helpers/LanguageMap/LanguageMap';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { toReactIntlLang } from '@plone/volto/helpers/Utils/Utils';

import { defineMessages, useIntl } from 'react-intl';

// Do not call defineMessages since this is a shadow,
// and we don't want to override the original translations
const messages = {
  switchLanguageTo: {
    id: 'Switch to',
    defaultMessage: 'Switch to',
  },
};

const LanguageSelector = (props) => {
  const intl = useIntl();
  const currentLang = useSelector((state) => state.intl.locale);
  const translations = useSelector(
    (state) => state.content.data?.['@components']?.translations?.items,
  );
  const isMultilingual = useSelector(
    (state) => state.site.data.features?.multilingual,
  );
  const availableLanguages = useSelector(
    (state) => state.site.data?.['plone.available_languages'],
  );

  return isMultilingual ? (
    <div className="language-selector">
      {availableLanguages?.map((lang) => {
        const translation = translations?.find((t) => t.language === lang);
        return (
          <Link
            aria-label={`${intl.formatMessage(
              messages.switchLanguageTo,
            )} ${langmap[lang].nativeName.toLowerCase()}`}
            className={cx({ selected: toReactIntlLang(lang) === currentLang })}
            to={translation ? flattenToAppURL(translation['@id']) : `/${lang}`}
            title={langmap[lang].nativeName}
            onClick={() => {
              props.onClickAction();
            }}
            key={`language-selector-${lang}`}
          >
            {langmap[lang].nativeName}
          </Link>
        );
      })}
    </div>
  ) : (
    <Helmet>
      <html lang={toReactIntlLang(currentLang)} />
    </Helmet>
  );
};

LanguageSelector.propTypes = {
  onClickAction: PropTypes.func,
};

LanguageSelector.defaultProps = {
  onClickAction: () => {},
};

export default LanguageSelector;
