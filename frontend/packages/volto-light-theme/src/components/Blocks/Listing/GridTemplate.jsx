import React from 'react';
import PropTypes from 'prop-types';
import ConditionalLink from '@plone/volto/components/manage/ConditionalLink/ConditionalLink';
import Card from '../../../primitives/Card/Card';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import DefaultSummary from '@kitconcept/volto-light-theme/components/Summary/DefaultSummary';
import cx from 'classnames';

const GridTemplate = ({ items, linkTitle, linkHref, isEditMode }) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';
  const PreviewImageComponent = config.getComponent('PreviewImage').component;

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }

  return (
    <>
      <div className="items">
        {items.map((item) => {
          const CustomItemBodyTemplate = config.getComponent({
            name: 'GridListingItemTemplate',
            dependencies: [item['@type']],
          }).component;
          const Summary =
            config.getComponent({
              name: 'Summary',
              dependencies: [item['@type']],
            }).component || DefaultSummary;
          const showLink = !Summary.hideLink && !isEditMode;

          const ItemBodyTemplate = (props) =>
            CustomItemBodyTemplate ? (
              <CustomItemBodyTemplate item={item} />
            ) : (
              <>
                {item.image_field !== '' && (
                  <Card.Image
                    className="item-image"
                    item={item}
                    imageComponent={PreviewImageComponent}
                  />
                )}
                <Card.Summary a11yLabelId={props.a11yLabelId}>
                  <Summary item={item} HeadingTag="h2" />
                </Card.Summary>
              </>
            );

          return (
            <div
              className={cx('listing-item', {
                [`${item['@type']?.toLowerCase()}-listing`]: item['@type'],
              })}
              key={item['@id']}
            >
              <Card item={showLink ? item : null}>
                <ItemBodyTemplate item={item} />
              </Card>
            </div>
          );
        })}
      </div>

      {link && <div className="footer">{link}</div>}
    </>
  );
};

GridTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default GridTemplate;
