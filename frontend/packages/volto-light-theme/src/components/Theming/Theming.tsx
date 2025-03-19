import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import type { Content } from '@plone/types';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import type { SiteThemeSettings } from '../../types';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
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
  const colorSettings =
    content?.['@components']?.inherit?.['voltolighttheme.theme']?.data;
  const formData = useSelector<FormState, Content>(
    (state) => state.form.global,
  );

  const liveContent = colorSettings
    ? !isEmpty(formData)
      ? formData
      : colorSettings
    : {};

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
