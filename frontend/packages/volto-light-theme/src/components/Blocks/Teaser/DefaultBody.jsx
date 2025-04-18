import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import MaybeWrap from '@plone/volto/components/manage/MaybeWrap/MaybeWrap';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import cx from 'classnames';
import config from '@plone/volto/registry';
import DefaultSummary from '@kitconcept/volto-light-theme/components/Summary/DefaultSummary';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const TeaserDefaultTemplate = (props) => {
  const { className, data, isEditMode, style } = props;
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];
  const url = data.preview_image?.[0]?.['@id'];

  const Image = config.getComponent('Image').component;
  const Summary =
    config.getComponent({
      name: 'Summary',
      dependencies: [data['@type']],
    }).component || DefaultSummary;
  const { openExternalLinkInNewTab } = config.settings;

  return (
    <div className={cx('block teaser', className)} style={style}>
      <>
        {!href && isEditMode && (
          <Message>
            <div className="teaser-item placeholder">
              <img src={imageBlockSVG} alt="" />
              <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
            </div>
          </Message>
        )}
        {href && (
          <MaybeWrap
            condition={!isEditMode}
            as={UniversalLink}
            href={href['@id']}
            target={
              data.openLinkInNewTab ||
              (openExternalLinkInNewTab && !isInternalURL(href['@id']))
                ? '_blank'
                : null
            }
          >
            <div className="teaser-item default">
              {url && !image?.image_field ? (
                <div className="image-wrapper">
                  <Image src={url} alt="" loading="lazy" responsive={true} />
                </div>
              ) : (
                (href.hasPreviewImage || href.image_field || image) && (
                  <div className="image-wrapper">
                    <Image
                      item={image || href}
                      imageField={image ? image.image_field : href.image_field}
                      alt=""
                      loading="lazy"
                      responsive={true}
                    />
                  </div>
                )
              )}
              <div className="content">
                <Summary item={data} HeadingTag="h2" />
              </div>
            </div>
          </MaybeWrap>
        )}
      </>
    </div>
  );
};

TeaserDefaultTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserDefaultTemplate;
