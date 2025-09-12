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

const SliderData = (props) => {
  const { block, blocksConfig, data, onChangeBlock, navRoot, contentType } =
    props;
  const dispatch = useDispatch();
  const intl = useIntl();
  const schema = SliderSchema({ ...props, intl });

  const dataTransformer = (resp, currentData, targetIndex) => {
    const hrefData = {
      '@id': flattenToAppURL(resp['@id']),
      '@type': resp?.['@type'],
      Description: resp?.description,
      Title: resp.title,
      hasPreviewImage: resp?.preview_image ? true : false,
      head_title: resp.head_title ?? null,
      image_field: resp?.preview_image
        ? 'preview_image'
        : resp?.image
          ? 'image'
          : null,
      image_scales: {
        preview_image: [resp?.preview_image],
        image: [resp?.image],
      },
      title: resp.title,
    };

    const updatedSlides = [...currentData.slides];

    updatedSlides[targetIndex] = {
      '@id': currentData.slides[targetIndex]['@id'],
      description: resp?.description,
      title: resp?.title,
      flagAlign: currentData.slides[targetIndex]?.flagAlign,
      href: [hrefData],
    };

    return {
      ...currentData,
      slides: updatedSlides,
    };
  };

  const refresh = async () => {
    if (isEmpty(data.slides)) return;

    const refreshPromises = data.slides.map((slide, index) => {
      if (!slide?.href?.[0]?.['@id']) return null;

      return dispatch(
        getContent(
          flattenToAppURL(slide.href[0]['@id']),
          null,
          `${block}-slider`,
        ),
      )
        .then((resp) => {
          return { resp, index };
        })
        .catch((e) => {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(defaultMessages.error)}
              content={intl.formatMessage(messages.invalidSlider)}
            />,
          );
          return null;
        });
    });

    try {
      const results = await Promise.all(refreshPromises);
      let updatedData = { ...data };
      results.forEach((result) => {
        if (result && result.resp) {
          updatedData = dataTransformer(result.resp, updatedData, result.index);
        }
      });
      onChangeBlock(block, updatedData);
    } catch (e) {
      toast.error(
        <Toast
          error
          title={intl.formatMessage(defaultMessages.error)}
          content={intl.formatMessage(messages.invalidSlider)}
        />,
      );
    }
  };

  const ActionButton = (
    <Button.Group className="refresh teaser">
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
