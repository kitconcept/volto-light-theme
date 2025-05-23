import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import DefaultSummary from '@kitconcept/volto-light-theme/components/Summary/DefaultSummary';
import Card from '../../../primitives/Card/Card';
import config from '@plone/volto/registry';

const TeaserDefaultTemplate = (props) => {
  const { data, isEditMode } = props;
  const href = data.href?.[0] || {};
  const image = data.preview_image?.[0];
  const url = data.preview_image?.[0]?.['@id'];

  const Image = config.getComponent('Image').component;
  const Summary =
    config.getComponent({
      name: 'Summary',
      dependencies: [href['@type']],
    }).component || DefaultSummary;
  const { openExternalLinkInNewTab } = config.settings;
  const openLinkInNewTab =
    data.openLinkInNewTab ||
    (openExternalLinkInNewTab && !isInternalURL(href['@id']));
  const { '@id': id, ...filteredData } = data;

  return (
    <Card
      href={!isEditMode ? href['@id'] : null}
      openLinkInNewTab={openLinkInNewTab}
    >
      <Card.Image
        src={url && !image?.image_field ? url : undefined}
        item={!data.overwrite ? href : { ...href, ...filteredData }}
        image={data.overwrite ? image : undefined}
        imageComponent={Image}
      />
      <Card.Summary>
        <Summary
          item={!data.overwrite ? href : { ...href, ...filteredData }}
          HeadingTag="h2"
        />
      </Card.Summary>
    </Card>
  );
};

export default TeaserDefaultTemplate;
