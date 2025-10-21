import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import cx from 'classnames';

import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import langmap from '@plone/volto/helpers/LanguageMap/LanguageMap';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { toReactIntlLang } from '@plone/volto/helpers/Utils/Utils';

import { useIntl, type IntlShape } from 'react-intl';
import type { Content, GetSiteResponse } from '@plone/types';

// Do not call defineMessages since this is a shadow,
// and we don't want to override the original translations
const messages = {
  switchLanguageTo: {
    id: 'Switch to',
    defaultMessage: 'Switch to',
  },
};

type FormState = {
  content: {
    data: Content;
  };
  intl: IntlShape;
  site: {
    data: GetSiteResponse;
  };
};

const LanguageSelector = ({
  onClickAction = () => {},
}: {
  onClickAction?: () => void;
}) => {
  const intl = useIntl();
  const currentLang = useSelector<FormState, IntlShape['locale']>(
    (state) => state.intl.locale,
  );
  const translations = useSelector<
    FormState,
    Content['@components']['translations']['items']
  >((state) => state.content.data?.['@components']?.translations?.items);
  const isMultilingual = useSelector<
    FormState,
    GetSiteResponse['features']['multilingual']
  >((state) => state.site.data.features?.multilingual);
  const availableLanguages = useSelector<
    FormState,
    GetSiteResponse['plone.available_languages']
  >((state) => state.site.data?.['plone.available_languages']);

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
              onClickAction();
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

export default LanguageSelector;
