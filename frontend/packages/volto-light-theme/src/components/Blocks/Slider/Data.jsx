import { useIntl, defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import { SliderSchema } from '@kitconcept/volto-slider-block/components/schema';
import { toast } from 'react-toastify';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { getContent } from '@plone/volto/actions/content/content';
import isEmpty from 'lodash/isEmpty';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { Button } from 'semantic-ui-react';
import reloadSVG from '@plone/volto/icons/reload.svg';
import { messages as defaultMessages } from '@plone/volto/helpers/MessageLabels/MessageLabels';
import cloneDeep from 'lodash/cloneDeep';

const messages = defineMessages({
  resetSlider: {
    id: 'Reset the block',
    defaultMessage: 'Reset the block',
  },
  refreshSlider: {
    id: 'Refresh source content',
    defaultMessage: 'Refresh source content',
  },
  invalidSlider: {
    id: 'Invalid Slider source',
    defaultMessage: 'Invalid Slider source',
  },
});

function getImageField(resp) {
  if (!resp) return null;

  if (resp.preview_image_link) return 'preview_image_link';
  if (resp.preview_image) return 'preview_image';
  if (resp.image) return 'image';

  return null;
}

const SliderData = (props) => {
  const {
    block,
    blocksConfig,
    data,
    onChangeBlock,
    navRoot,
    contentType,
    activeObject,
  } = props;
  const dispatch = useDispatch();
  const intl = useIntl();
  const schema = SliderSchema({ ...props, intl });

  const dataTransformer = (resp, data, activeObject) => {
    let hrefData = {
      '@id': flattenToAppURL(resp['@id']),
      '@type': resp?.['@type'],
      Description: resp?.description,
      Title: resp.title,
      hasPreviewImage: getImageField(resp) ? true : false,
      head_title: resp.head_title ?? null,
      image_field: getImageField(resp),
      image_scales: {
        preview_image: [resp?.preview_image],
        image: [resp?.image],
        preview_image_link: [
          {
            ...resp?.preview_image_link?.['image_scales']?.image?.[0],
            base_path: flattenToAppURL(resp?.preview_image_link?.['@id']),
          },
        ],
      },
      title: resp.title,
    };

    const updatedSlides = cloneDeep(data.slides);

    updatedSlides[activeObject] = {
      '@id': data.slides[activeObject]['@id'],
      description: resp?.description,
      title: resp?.title,
      flagAlign: data.slides[activeObject]?.flagAlign,
      href: [hrefData],
    };
    return {
      ...data,
      slides: updatedSlides,
    };
  };

  const refresh = () => {
    if (data.slides[activeObject]?.href?.[0]?.['@id']) {
      dispatch(
        getContent(
          flattenToAppURL(data.slides[activeObject].href[0]['@id']),
          null,
          `${block}-slider-${activeObject}`,
        ),
      )
        .then((resp) => {
          if (resp) {
            let blockData = dataTransformer(resp, data, activeObject);
            onChangeBlock(block, blockData);
          }
        })
        .catch((e) => {
          toast.error(
            <Toast
              error
              title={props.intl.formatMessage(defaultMessages.error)}
              content={props.intl.formatMessage(messages.invalidSlider)}
            />,
          );
        });
    }
  };

  const ActionButton = (
    <Button.Group className="refresh slider">
      <Button
        aria-label={intl.formatMessage(messages.refreshSlider)}
        type="button"
        basic
        onClick={() => refresh()}
        disabled={isEmpty(data.slides)}
      >
        {intl.formatMessage(messages.refreshSlider)}
        <Icon name={reloadSVG} size="20px" color="#00000099" />
      </Button>
    </Button.Group>
  );

  const dataAdapter = blocksConfig[data['@type']].dataAdapter;

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        dataAdapter({
          block,
          data,
          id,
          onChangeBlock,
          value,
        });
      }}
      onChangeBlock={onChangeBlock}
      formData={data}
      block={block}
      actionButton={ActionButton}
      navRoot={navRoot}
      contentType={contentType}
    />
  );
};

export default SliderData;
