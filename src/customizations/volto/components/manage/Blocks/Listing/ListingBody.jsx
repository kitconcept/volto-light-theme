import React, { createRef, useRef } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Pagination, Dimmer, Loader } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import withQuerystringResults from '@plone/volto/components/manage/Blocks/Listing/withQuerystringResults';

const ListingBody = withQuerystringResults((props) => {
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
  let galleryRef;

  if (data.variation === 'imageGallery') {
    galleryRef = useRef();
  }
  const listingRef = createRef();
  return listingItems?.length > 0 ? (
    <div ref={listingRef}>
      <ListingBodyTemplate
        items={listingItems}
        isEditMode={isEditMode}
        ref={galleryRef}
        {...data}
      />
      {totalPages > 1 && (
        <div className="pagination-wrapper">
          <Pagination
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
              icon: true,
              'aria-disabled': !prevBatch,
              className: !prevBatch ? 'disabled' : null,
            }}
            nextItem={{
              content: (
                <FormattedMessage id="Next Page" defaultMessage="Next Page" />
              ),
              icon: true,
              'aria-disabled': !nextBatch,
              className: !nextBatch ? 'disabled' : null,
            }}
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
      {hasLoaded && (
        <FormattedMessage
          id="No results found."
          defaultMessage="No results found."
        />
      )}
      <Dimmer active={!hasLoaded} inverted>
        <Loader indeterminate size="small">
          <FormattedMessage id="loading" defaultMessage="Loading" />
        </Loader>
      </Dimmer>
    </div>
  ) : (
    <div className="listing message" ref={listingRef}>
      {hasLoaded && (
        <FormattedMessage
          id="No results found."
          defaultMessage="No results found."
        />
      )}
      <Dimmer active={!hasLoaded} inverted>
        <Loader indeterminate size="small">
          <FormattedMessage id="loading" defaultMessage="Loading" />
        </Loader>
      </Dimmer>
    </div>
  );
});

export default injectIntl(ListingBody);
