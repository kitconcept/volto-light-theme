import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import type { Content } from '@plone/types';

// TODO: Change when we have the final list of colors
// and if they are nested in the serialization under a key
function buildStyleTag(content: Content, colors) {
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

  const COLORNAMES = [
    'theme_color',
    'theme_high_contrast_color',
    'theme_foreground_color',
    'theme_low_contrast_foreground_color',
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
  ${buildStyleTag(content, COLORNAMES)}
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
