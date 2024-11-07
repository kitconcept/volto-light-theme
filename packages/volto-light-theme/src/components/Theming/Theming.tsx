import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import type { Content } from '@plone/types';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import config from '@plone/registry';

type FormState = {
  content: {
    data: Content;
  };
  form: {
    global: Content;
  };
};

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
  const colorFields = config.settings.userDefinedControlPanelColors;

  const formData = useSelector<FormState, Content>(
    (state) => state.form.global,
  );

  const liveContent = !isEmpty(formData) ? formData : content;

  return (
    <>
      <Helmet>
        <style>
          {`
:root {
  ${buildStyleTag(liveContent, colorFields)}
}
                `}
        </style>
      </Helmet>
    </>
  );
};

export default Theming;
