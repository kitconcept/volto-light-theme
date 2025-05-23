import React, { createRef, useRef, useMemo } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import { Pagination, Dimmer, Loader } from 'semantic-ui-react';
import Slugger from 'github-slugger';
import { renderLinkElement } from '@plone/volto-slate/editor/render';
import config from '@plone/volto/registry';
import withQuerystringResults from '@plone/volto/components/manage/Blocks/Listing/withQuerystringResults';

const Headline = ({
  headlineTag,
  id,
  data = {},
  listingItems,
  isEditMode,
  style,
}) => {
  let attr = { id };
  const slug = Slugger.slug(data.headline);
  attr.id = slug || id;
  const LinkedHeadline = useMemo(
    () => renderLinkElement(headlineTag),
    [headlineTag],
  );
  return (
    <LinkedHeadline
      mode={!isEditMode && 'view'}
      children={data.headline}
      attributes={attr}
      className={cx('headline', {
        emptyListing: !listingItems?.length > 0,
      })}
      style={style}
    />
  );
};

export const ListingBody = (props) => {
  const {
    data = {},
    isEditMode,
    listingItems,
    totalPages,
    onPaginationChange,
    variation,
    currentPage,
    batch_size,
    prevBatch,
    nextBatch,
    isFolderContentsListing,
    hasLoaded,
    id,
    total,
    properties,
  } = props;

  let ListingBodyTemplate;
  // Legacy support if template is present
  const variations = config.blocks?.blocksConfig['listing']?.variations || [];
  const defaultVariation = variations.filter((item) => item.isDefault)?.[0];

  if (data.template && !data.variation) {
    const legacyTemplateConfig = variations.find(
      (item) => item.id === data.template,
    );
    ListingBodyTemplate = legacyTemplateConfig.template;
  } else {
    ListingBodyTemplate =
      variation?.template ?? defaultVariation?.template ?? null;
  }

  const galleryRef = useRef();

  const listingRef = createRef();
  const NoResults = variation?.noResultsComponent
    ? variation.noResultsComponent
    : config.blocks?.blocksConfig['listing'].noResultsComponent;

  const HeadlineTag = data.headlineTag || 'h2';
  return (
    <>
      {data.headline && (
        <Headline
          headlineTag={HeadlineTag}
          id={id}
          listingItems={listingItems}
          data={data}
          isEditMode={isEditMode}
        />
      )}
      {listingItems?.length > 0 ? (
        <div ref={listingRef}>
          <ListingBodyTemplate
            items={listingItems}
            isEditMode={isEditMode}
            ref={data.variation === 'imageGallery' ? galleryRef : undefined}
            {...data}
            {...variation}
          />
          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <Pagination
                className="desktop-pagination"
                activePage={currentPage}
                totalPages={totalPages}
                onPageChange={(e, { activePage }) => {
                  !isEditMode &&
                    listingRef.current.scrollIntoView({ behavior: 'smooth' });
                  onPaginationChange(e, { activePage });
                }}
                firstItem={null}
                lastItem={null}
                prevItem={{
                  content: (
                    <FormattedMessage
                      id="Previous Page"
                      defaultMessage="Previous Page"
                    />
                  ),
                  icon: false,
                  'aria-disabled': !prevBatch,
                  className: !prevBatch ? 'disabled' : null,
                }}
                nextItem={{
                  content: (
                    <FormattedMessage
                      id="Next Page"
                      defaultMessage="Next Page"
                    />
                  ),
                  icon: false,
                  'aria-disabled': !nextBatch,
                  className: !nextBatch ? 'disabled' : null,
                }}
              />
              <Pagination
                className="mobile-pagination"
                activePage={currentPage}
                totalPages={totalPages}
                boundaryRange={1}
                siblingRange={0}
                onPageChange={(e, { activePage }) => {
                  !isEditMode &&
                    listingRef.current.scrollIntoView({ behavior: 'smooth' });
                  onPaginationChange(e, { activePage });
                }}
                firstItem={null}
                lastItem={null}
                prevItem={undefined}
                nextItem={undefined}
              />
              <div className="total">
                <FormattedMessage id="Result" defaultMessage="Result" />{' '}
                {(currentPage - 1) * batch_size + 1}-
                {(currentPage - 1) * batch_size + listingItems.length}{' '}
                <FormattedMessage id="of" defaultMessage="of" />{' '}
                {total || properties.items_total}
              </div>
            </div>
          )}
        </div>
      ) : isEditMode ? (
        <div className="listing message" ref={listingRef}>
          {isFolderContentsListing && (
            <FormattedMessage
              id="No items found in this container."
              defaultMessage="No items found in this container."
            />
          )}
          {hasLoaded && NoResults && (
            <NoResults isEditMode={isEditMode} {...data} />
          )}
          <Dimmer active={!hasLoaded} inverted>
            <Loader indeterminate size="small">
              <FormattedMessage id="loading" defaultMessage="Loading" />
            </Loader>
          </Dimmer>
        </div>
      ) : (
        <div className="emptyListing">
          {hasLoaded && NoResults && (
            <NoResults isEditMode={isEditMode} {...data} />
          )}
          <Dimmer active={!hasLoaded} inverted>
            <Loader indeterminate size="small">
              <FormattedMessage id="loading" defaultMessage="Loading" />
            </Loader>
          </Dimmer>
        </div>
      )}
    </>
  );
};

export default injectIntl(withQuerystringResults(ListingBody));
