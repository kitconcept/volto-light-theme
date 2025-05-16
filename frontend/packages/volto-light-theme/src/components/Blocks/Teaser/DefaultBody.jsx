import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import cx from 'classnames';
import config from '@plone/volto/registry';
import DefaultSummary from '@kitconcept/volto-light-theme/components/Summary/DefaultSummary';
import Card from '../../../primitives/Card/Card';
import isEmpty from 'lodash/isEmpty';

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
    (openExternalLinkInNewTab && !isInternalURL(href['@id']))
      ? '_blank'
      : null;
  const { '@id': id, ...filteredData } = data;

  return (
    <div className={cx('block teaser', className)} style={style}>
      <>
        {isEmpty(href) && isEditMode ? (
          <Message>
            <div className="teaser-item placeholder">
              <img src={imageBlockSVG} alt="" />
              <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
            </div>
          </Message>
        ) : (
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
