/**
 * EventView view component.
 * @module components/theme/View/EventView
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  hasBlocksData,
  flattenHTMLToAppURL,
  expandToBackendURL,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBaseUrl,
} from '@plone/volto/helpers';
import { Image, Grid, Button } from 'semantic-ui-react';
import { FormattedDate } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { map } from 'lodash';
import { UniversalLink } from '@plone/volto/components';
import { FormattedMessage, injectIntl } from 'react-intl';

const EventTextfieldView = ({ content }) => (
  <React.Fragment>
    {content.title && <h1 className="documentFirstHeading">{content.title}</h1>}
    {content.description && (
      <p className="documentDescription">{content.description}</p>
    )}
    {content.image && (
      <Image
        className="document-image"
        src={content.image.scales.thumb.download}
        floated="right"
      />
    )}
    {content.text && (
      <div
        dangerouslySetInnerHTML={{
          __html: flattenHTMLToAppURL(content.text.data),
        }}
      />
    )}
  </React.Fragment>
);

/**
 * EventView view component class.
 * @function EventView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const EventView = (props) => {
  const { content } = props;
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  return (
    <div id="page-document" className="view-wrapper event-view">
      <Grid>
        <Grid.Column width={12}>
          <div>
            <div className="dates">
              {content?.start ? (
                <span className="day">
                  <FormattedDate date={content?.start} format={dateOptions} />{' '}
                  {props.intl.locale === 'de' ? ' Uhr' : ''}
                </span>
              ) : (
                <span className="day">
                  <FormattedMessage id="No date" defaultMessage="No date" />
                </span>
              )}{' '}
              &mdash;&nbsp;
              {content?.end ? (
                <span className="day">
                  <FormattedDate date={content?.end} format={dateOptions} />{' '}
                  {props.intl.locale === 'de' ? ' Uhr' : ''}
                </span>
              ) : (
                <span className="day">
                  <FormattedMessage id="No date" defaultMessage="No date" />
                </span>
              )}
            </div>
          </div>
          {hasBlocksData(content) ? (
            <div>
              {map(content[blocksLayoutFieldname].items, (block) => {
                const Block =
                  config.blocks.blocksConfig[
                    content[blocksFieldname]?.[block]?.['@type']
                  ]?.['view'] || null;
                if (
                  config.blocks.blocksConfig[
                    content[blocksFieldname]?.[block]?.['@type']
                  ]?.['id'] === 'title'
                ) {
                  return (
                    <>
                      <Block
                        key={block}
                        id={block}
                        properties={content}
                        data={content[blocksFieldname][block]}
                        path={getBaseUrl(props.location?.pathname || '')}
                      />
                      <Grid>
                        <Grid.Row columns={2}>
                          <Grid.Column>
                            <div>
                              <div className="event-title">
                                <span className="event-heading">
                                  <FormattedMessage
                                    id="Start"
                                    defaultMessage="Start"
                                  />
                                </span>
                                <div className="event-detail">
                                  {' '}
                                  <FormattedDate
                                    date={content?.start}
                                    format={dateOptions}
                                  />{' '}
                                  {props.intl.locale === 'de' ? ' Uhr' : ''}
                                </div>
                                <div className="separator"></div>
                              </div>
                              <div className="event-title">
                                <span className="event-heading">
                                  {' '}
                                  <FormattedMessage
                                    id="End"
                                    defaultMessage="End"
                                  />
                                </span>
                                <div className="event-detail">
                                  {' '}
                                  <FormattedDate
                                    date={content?.end}
                                    format={dateOptions}
                                  />{' '}
                                  {props.intl.locale === 'de' ? ' Uhr' : ''}
                                </div>
                                <div className="separator"></div>
                              </div>
                              <div className="event-title">
                                <span className="event-heading">
                                  {' '}
                                  <FormattedMessage
                                    id="Location"
                                    defaultMessage="Location"
                                  />
                                </span>
                                <div className="event-detail">
                                  {content?.location}
                                </div>
                              </div>
                            </div>
                          </Grid.Column>
                          <Grid.Column>
                            <div>
                              <div className="event-title">
                                <span className="event-heading">
                                  <FormattedMessage
                                    id="Website"
                                    defaultMessage="Website"
                                  />
                                </span>
                                <div className="event-detail">
                                  <UniversalLink
                                    className="event-url"
                                    href={content.event_url}
                                  >
                                    {content.event_url}
                                  </UniversalLink>
                                </div>
                                <div className="separator"></div>
                              </div>
                              <div className="event-title">
                                <span className="event-heading">
                                  <FormattedMessage
                                    id="Contact"
                                    defaultMessage="Contact"
                                  />
                                </span>
                                <div className="event-detail">
                                  <div>
                                    {content?.contact_name && (
                                      <p>{content.contact_name}</p>
                                    )}
                                    {content?.contact_email && (
                                      <p>
                                        <a
                                          href={`mailto:${content.contact_email}`}
                                        >
                                          {content.contact_email}
                                        </a>
                                      </p>
                                    )}
                                    {content?.contact_phone && (
                                      <p>
                                        <FormattedMessage
                                          id="Phone"
                                          defaultMessage="Phone"
                                        />{' '}
                                        <a
                                          href={`tel:${content.contact_phone}`}
                                        >
                                          {content.contact_phone}
                                        </a>
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Grid.Column>
                          <div className="event-button">
                            <Button className="event-btn">
                              <a
                                className="ics-download"
                                target="_blank"
                                rel="noreferrer"
                                href={`${expandToBackendURL(
                                  content['@id'],
                                )}/ics_view`}
                              >
                                <FormattedMessage
                                  id="ICS-Download"
                                  defaultMessage="ICS Download"
                                />
                              </a>
                            </Button>
                          </div>
                        </Grid.Row>
                      </Grid>
                    </>
                  );
                }
                return Block !== null ? (
                  <Block
                    key={block}
                    id={block}
                    properties={content}
                    data={content[blocksFieldname][block]}
                    path={getBaseUrl(props.location?.pathname || '')}
                  />
                ) : (
                  <div key={block}>
                    <FormattedMessage
                      id="Unknown block"
                      defaultMessage="Unknown block"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <EventTextfieldView {...props} />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
EventView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.shape({
      data: PropTypes.string,
    }),
    attendees: PropTypes.arrayOf(PropTypes.string).isRequired,
    contact_email: PropTypes.string,
    contact_name: PropTypes.string,
    contact_phone: PropTypes.string,
    end: PropTypes.string.isRequired,
    event_url: PropTypes.string,
    location: PropTypes.string,
    open_end: PropTypes.bool,
    recurrence: PropTypes.any,
    start: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    whole_day: PropTypes.bool,
  }).isRequired,
};
export default injectIntl(EventView);