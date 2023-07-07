/**
 * EventView view component.
 * @module components/theme/View/EventView
 */

import React from "react";
import PropTypes from "prop-types";
import {
  hasBlocksData,
  flattenHTMLToAppURL,
  expandToBackendURL,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getBaseUrl,
} from "@plone/volto/helpers";
import { Image, Grid, Button } from "semantic-ui-react";
import { FormattedDate } from "@plone/volto/components";
import config from "@plone/volto/registry";
import { map } from "lodash";

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
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  console.log(content, "i am event");

  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  return (
    <div id="page-document" className="ui container view-wrapper event-view">
      <Grid>
        <Grid.Column width={12}>
          <div>
            <div className="dates">
              {content?.start ? (
                <span className="day">
                  <FormattedDate date={content?.start} format={dateOptions} />{" "}
                  {}
                  UHR
                </span>
              ) : (
                <span className="day">No date</span>
              )}{" "}
              &mdash;&nbsp;
              {content?.end ? (
                <span className="day">
                  <FormattedDate date={content?.end} format={dateOptions} /> UHR
                </span>
              ) : (
                <span className="day">No date</span>
              )}
            </div>
          </div>
          {hasBlocksData(content) ? (
            <div>
              {map(content[blocksLayoutFieldname].items, (block) => {
                const Block =
                  config.blocks.blocksConfig[
                    content[blocksFieldname]?.[block]?.["@type"]
                  ]?.["view"] || null;
                if (
                  config.blocks.blocksConfig[
                    content[blocksFieldname]?.[block]?.["@type"]
                  ]?.["id"] === "title"
                ) {
                  return (
                    <>
                      <Block
                        key={block}
                        id={block}
                        properties={content}
                        data={content[blocksFieldname][block]}
                        path={getBaseUrl(props.location?.pathname || "")}
                      />
                      {content.description && (
                        <p className="description">{content.description}</p>
                      )}
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <div>
                            <div className="event-title">
                              <span className="event-heading">Anfang</span>
                              <div className="event-detail">
                                {" "}
                                <FormattedDate
                                  date={content?.start}
                                  format={dateOptions}
                                />{" "}
                                {}
                                Uhr
                              </div>
                            </div>
                            <div className="event-title">
                              <span className="event-heading">ende</span>
                              <div className="event-detail">
                                {" "}
                                <FormattedDate
                                  date={content?.end}
                                  format={dateOptions}
                                />{" "}
                                Uhr
                              </div>
                            </div>
                            <div className="event-title">
                              <span className="event-heading">
                                Veranstaltungsort
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
                                Veranstalter
                              </span>
                              <div className="event-detail">
                                Musterevents GmbH
                              </div>
                            </div>
                            <div className="event-title">
                              <span className="event-heading">
                                Veranstalter-website
                              </span>
                              <div className="event-detail">
                                {content.event_url}
                              </div>
                            </div>
                            <div className="event-title">
                              <span className="event-heading">
                                ANsprechpERSON
                              </span>
                              <div className="event-detail">
                                {" "}
                                {content.contact_name} <br />{" "}
                                {content.contact_email}
                                <br />
                                {content.contact_phone}
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
                                content["@id"]
                              )}/ics_view`}
                            >
                              ICS-Download
                            </a>
                          </Button>
                          <Button className="event-btn">Jetzt anmelden</Button>
                        </div>
                      </Grid.Row>
                    </>
                  );
                }
                return Block !== null ? (
                  <Block
                    key={block}
                    id={block}
                    properties={content}
                    data={content[blocksFieldname][block]}
                    path={getBaseUrl(props.location?.pathname || "")}
                  />
                ) : (
                  <div key={block}>
                    {intl.formatMessage(messages.unknownBlock, {
                      block: content[blocksFieldname]?.[block]?.["@type"],
                    })}
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

export default EventView;
