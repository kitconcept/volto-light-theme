import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { getTeaserImageURL } from '@kitconcept/volto-slider-block/helpers/Image/Image';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Icon, MaybeWrap, UniversalLink } from '@plone/volto/components';
import { Input, Button, Message } from 'semantic-ui-react';
import cx from 'classnames';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import config from '@plone/volto/registry';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
  moreInfo: {
    id: 'moreInfo',
    defaultMessage: 'More info',
  },
  source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  ButtonText: {
    id: 'Continue reading',
    defaultMessage: 'Continue reading',
  },
});

const SliderBody = ({
  index,
  onChangeBlock,
  block,
  data,
  dataBlock,
  isEditMode,
  openObjectBrowser,
}) => {
  const intl = useIntl();
  // START CUSTOMIZATION
  const href = data.href?.[0];
  const imageOverride = data.preview_image?.[0];

  // default img expects string src
  const src = flattenToAppURL(
    getTeaserImageURL({ href, image: imageOverride }),
  );
  const renderedImage = <img src={src} alt="" loading="lazy" />;
  // END CUSTOMIZATION

  const handleClick = () => {
    openObjectBrowser({
      onSelectItem: (url, document) => {
        dataBlock.slides[index].title = document.Title;
        dataBlock.slides[index].description = document.Description;
        dataBlock.slides[index].href = [
          {
            '@id': document['@id'],
            Title: document.Title,
            Description: document.Description,
            title: document.Title,
            image_field: document.image_field,
            hasPreviewImage: document.hasPreviewImage,
          },
        ];
        onChangeBlock(block, dataBlock);
      },
      mode: 'link',
    });
  };

  return (
    <div
      className={cx('grid-teaser-item top', {
        'empty-slide': !href && isEditMode,
      })}
    >
      {!href && isEditMode && (
        <Message>
          <div className="grid-teaser-item default">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
            <div className="toolbar-inner">
              <Button.Group>
                <Button onClick={handleClick} icon basic>
                  <Icon name={navTreeSVG} size="24px" />
                </Button>
              </Button.Group>
              <Input
                placeholder={`${intl.formatMessage(messages.source)}...`}
                onClick={handleClick}
                onFocus={(e) => e.target.blur()}
              />
            </div>
          </div>
        </Message>
      )}
      {href && (
        <div className="teaser-item top">
          <MaybeWrap
            condition={!isEditMode}
            as={UniversalLink}
            href={href['@id']}
            target={data.openLinkInNewTab ? '_blank' : null}
            tabIndex="-1"
          >
            {/* START CUSTOMIZATION */}
            <div className="highlight-image-wrapper gradient">
              {renderedImage}
            </div>
            <div
              className={cx(
                'teaser-item-title fix-width-issue',
                `has--slider--flagAlign--${data.flagAlign}`,
              )}
            >
              {/* END CUSTOMIZATION */}
              <div className="title">
                {data?.head_title && (
                  <span className="supertitle">{data?.head_title}</span>
                )}
                <h2>{data?.nav_title || data?.title}</h2>
              </div>
              <p>{data?.description}</p>
              {/* START CUSTOMIZATION */}
              {!data.hideButton && (
                <Button tabIndex={'-1'}>
                  {data.buttonText || intl.formatMessage(messages.ButtonText)}
                </Button>
              )}
              {/* END CUSTOMIZATION */}
            </div>
          </MaybeWrap>
        </div>
      )}
    </div>
  );
};

export default SliderBody;
