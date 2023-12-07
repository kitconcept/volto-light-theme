import React from 'react';
import {
  Image,
  Grid,
  Button,
  Container as SemanticContainer,
} from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FormattedDate } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import { expandToBackendURL } from '@plone/volto/helpers';

const EventMetadataView = (props) => {
  const content = props.properties;
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <Grid stackable className="details-container">
      <Grid.Row columns={2}>
        <Grid.Column>
          <div>
            <div className="event-title">
              <span className="event-heading">
                <FormattedMessage id="Start" defaultMessage="Start" />
              </span>
              <div className="event-detail">
                {' '}
                {content?.start && (
                  <FormattedDate date={content?.start} format={dateOptions} />
                )}{' '}
                {props.intl.locale === 'de' ? ' Uhr' : ''}
              </div>
              <div className="separator"></div>
            </div>
            <div className="event-title">
              <span className="event-heading">
                {' '}
                <FormattedMessage id="End" defaultMessage="End" />
              </span>
              <div className="event-detail">
                {' '}
                {content?.end && (
                  <FormattedDate date={content?.end} format={dateOptions} />
                )}{' '}
                {props.intl.locale === 'de' ? ' Uhr' : ''}
              </div>
              <div className="separator"></div>
            </div>
            {content?.location && (
              <div className="event-title">
                <span className="event-heading">
                  <FormattedMessage id="Location" defaultMessage="Location" />
                </span>
                <div className="event-detail">{content?.location}</div>
              </div>
            )}
          </div>
        </Grid.Column>
        <Grid.Column>
          <div>
            {content?.event_url && (
              <div className="event-title">
                <span className="event-heading">
                  <FormattedMessage id="Website" defaultMessage="Website" />
                </span>
                <div className="event-detail">
                  <UniversalLink className="event-url" href={content.event_url}>
                    {content.event_url}
                  </UniversalLink>
                </div>
                <div className="separator"></div>
              </div>
            )}

            {(content?.contact_name ||
              content?.contact_email ||
              content?.contact_email) && (
              <div className="event-title">
                <span className="event-heading">
                  <FormattedMessage id="Contact" defaultMessage="Contact" />
                </span>
                <div className="event-detail">
                  <div>
                    {content?.contact_name && <p>{content.contact_name}</p>}
                    {content?.contact_email && (
                      <p>
                        <a href={`mailto:${content.contact_email}`}>
                          {content.contact_email}
                        </a>
                      </p>
                    )}
                    {content?.contact_phone && (
                      <p>
                        <FormattedMessage id="Phone" defaultMessage="Phone" />{' '}
                        <a href={`tel:${content.contact_phone}`}>
                          {content.contact_phone}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Grid.Column>
        <div className="event-button">
          <a
            className="ics-download"
            target="_blank"
            rel="noreferrer"
            href={
              content ? `${expandToBackendURL(content['@id'])}/ics_view ` : ''
            }
          >
            <Button className="event-btn">
              <FormattedMessage
                id="ICS-Download"
                defaultMessage="ICS Download"
              />
            </Button>
          </a>
        </div>
      </Grid.Row>
    </Grid>
  );
};

export default injectIntl(EventMetadataView);
