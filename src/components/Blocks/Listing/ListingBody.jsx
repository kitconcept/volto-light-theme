import React, { createRef, useMemo } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import { Pagination, Dimmer, Loader } from 'semantic-ui-react';
import Slugger from 'github-slugger';
import { renderLinkElement } from '@plone/volto-slate/editor/render';
import config from '@plone/volto/registry';
import withQuerystringResults from '@plone/volto/components/manage/Blocks/Listing/withQuerystringResults';

const Headline = ({ headlineTag, id, data = {}, listingItems, isEditMode }) => {
  let attr = { id };
  const slug = Slugger.slug(data.headline);
  attr.id = slug || id;
  const LinkedHeadline = useMemo(() => renderLinkElement(headlineTag), [
    headlineTag,
  ]);
  return (
    <LinkedHeadline
      mode={!isEditMode && 'view'}
      children={data.headline}
      attributes={attr}
      className={cx('headline', {
        emptyListing: !listingItems?.length > 0,
      })}
    />
  );
};

const ListingBody = withQuerystringResults((props) => {
  const {
    data,
    isEditMode,
    listingItems,
    totalPages,
    onPaginationChange,
    variation,
    currentPage,
    prevBatch,
    nextBatch,
    isFolderContentsListing,
    hasLoaded,
    id,
    total,
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

  const listingRef = createRef();

  const NoResults = variation?.noResultsComponent
    ? variation.noResultsComponent
    : config.blocks?.blocksConfig['listing'].noResultsComponent;

  const HeadlineTag = data.headlineTag || 'h2';

  const batchSize =
    (data?.b_size
      ? parseInt(data?.b_size)
      : parseInt(data?.querystring?.b_size)) ?? undefined;

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
            {...data}
            {...variation}
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
              {batchSize && (
                <div className="total-results-summary">
                  <FormattedMessage
                    id="Results {currentBatch} of {totalResults}"
                    defaultMessage="Results {currentBatch} of {totalResults}"
                    values={{
                      currentBatch: (
                        <span>
                          {batchSize * (currentPage - 1) + 1}-
                          {batchSize * (currentPage - 1) + batchSize > total
                            ? total
                            : batchSize * (currentPage - 1) + batchSize}
                        </span>
                      ),
                      totalResults: <span>{total}</span>,
                    }}
                  />
                </div>
              )}
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
});

export default injectIntl(ListingBody);
