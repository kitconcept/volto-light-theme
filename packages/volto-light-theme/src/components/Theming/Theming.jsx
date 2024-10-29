import React from 'react';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import config from '@plone/volto/registry';

function buildStyleTag(content, colors) {
  if (Array.isArray(colors)) {
    return colors
      .filter((color) => content[color])
      .map((color) => {
        return `--${color.replace(/_/g, '-')}: ${content[color]};`;
      });
  }
}

const Theming = ({ content }) => {
  const theme = true; // Do we want a named theme?

  const COLORS = [
    'theme_color',
    'theme_high_contrast_color',
    'theme_font_color',
    'theme_low_contrast_font_color',
    'theme_color_secondary',
    'theme_high_contrast_color_secondary',
    'theme_font_color_secondary',
    'theme_low_contrast_font_color_secondary',
  ]; // Coming from config?

  return (
    <>
      {theme ? (
        <>
          <BodyClass className={theme ? `theme--${theme}` : null}></BodyClass>

          {theme && (
            <Helmet>
              <style>
                {`
:root {
  ${buildStyleTag(content, COLORS)}
}
                `}
              </style>
            </Helmet>
          )}
        </>
      ) : null}
    </>
  );
};

export default Theming;
