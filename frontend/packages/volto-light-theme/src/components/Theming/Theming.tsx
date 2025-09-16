import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import type { Content, GetTypeResponse } from '@plone/types';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import type { SiteThemeSettings } from '../../types';
import { useLocation } from 'react-router-dom';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers/Url/Url';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
  };
  schema: {
    schema: GetTypeResponse;
  };
};

function buildStyleTag(content: Partial<Content>, colors: SiteThemeSettings) {
  const colorKeys = Object.keys(colors);
  return colorKeys
    .filter((color) => content[color])
    .map((color) => {
      return `--${color.replace(/_/g, '-')}: ${content[color]}; `;
    })
    .join('');
}

const Theming = ({ content }: { content: Content }) => {
  const location = useLocation();
  const colorSettings =
    content?.['@components']?.inherit?.['voltolighttheme.theme']?.data;
  const formData = useSelector<FormState, Content>(
    (state) => state.form.global,
  );
  const schema = useSelector<FormState, GetTypeResponse>(
    (state) => state.schema.schema,
  );

  // Check if content has all the keys of the VLT theme behavior
  const hasVLTthemeBehavior = Object.keys(colorSettings || {}).every((key) =>
    Object.prototype.hasOwnProperty.call(schema?.properties || {}, key),
  );

  const isForm = !isEmpty(formData);
  const addingFromInherited =
    location.pathname.endsWith('/add') &&
    flattenToAppURL(
      content?.['@components']?.inherit?.['voltolighttheme.theme'].from['@id'],
    ) === getBaseUrl(location.pathname);

  let liveContent;
  if (hasVLTthemeBehavior && !addingFromInherited) {
    liveContent = colorSettings ? (isForm ? formData : colorSettings) : {};
  } else {
    liveContent = colorSettings;
  }

  return (
    <>
      <Helmet>
        <style>
          {colorSettings &&
            `
:root {
  ${buildStyleTag(liveContent, colorSettings)}
}
                `}
        </style>
      </Helmet>
    </>
  );
};

export default Theming;
