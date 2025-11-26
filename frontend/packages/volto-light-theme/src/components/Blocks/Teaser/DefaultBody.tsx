import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import DefaultSummary from '@kitconcept/volto-light-theme/components/Summary/DefaultSummary';
import type { SummaryComponentType } from '@kitconcept/volto-light-theme/components/Summary/DefaultSummary';
import Card from '../../../primitives/Card/Card';
import config from '@plone/volto/registry';

const TeaserDefaultTemplate = (props) => {
  const { data, isEditMode } = props;
  const href = data.href?.[0] || {};
  const image = data.preview_image?.[0];
  const url = data.preview_image?.[0]?.['@id'];

  const Image = config.getComponent('Image').component;
  const Summary = (config.getComponent({
    name: 'Summary',
    dependencies: [href['@type']],
  }).component || DefaultSummary) as SummaryComponentType;
  const showLink = !Summary.hideLink && !isEditMode;
  const { openExternalLinkInNewTab } = config.settings;
  const openLinkInNewTab =
    data.openLinkInNewTab ||
    (openExternalLinkInNewTab && !isInternalURL(href['@id']));

  // Ensures that overridden fields are used when "overwrite" is true
  // and fallbacks to empty strings if they are not provided to ensure no undefined
  // values are passed
  const localOverrides = {
    title: data.title || '',
    description: data.description || '',
    head_title: data.head_title || '',
  };

  return (
    <Card item={showLink ? href : null} openLinkInNewTab={openLinkInNewTab}>
      <Card.Image
        src={url && !image?.image_field ? url : undefined}
        item={!data.overwrite ? href : { ...href, ...localOverrides }}
        image={data.overwrite ? image : undefined}
        imageComponent={Image}
      />
      <Card.Summary>
        <Summary
          item={!data.overwrite ? href : { ...href, ...localOverrides }}
          HeadingTag="h2"
          hide_description={props.data?.hide_description}
        />
      </Card.Summary>
    </Card>
  );
};

export default TeaserDefaultTemplate;
