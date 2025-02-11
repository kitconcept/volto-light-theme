import { FormattedMessage } from 'react-intl';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { expandToBackendURL } from '@plone/volto/helpers/Url/Url';
import { Container } from '@plone/components';

const EventMetadataView = (props) => {
  const content = props.properties;
  const isWholeDay = !!content.whole_day;
  const isOpenEnd = !content.end || !!content.open_end;
  const dateOptions = isWholeDay
    ? {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    : {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };

  return (
    <div className="block eventMetadata ">
      <Container className="details-container">
        <div className="content-container">
          <div className="event-details">
            <div className="event-title">
              <span className="event-heading">
                <FormattedMessage id="Start" defaultMessage="Start" />
              </span>
              <div className="event-detail">
                {' '}
                {content?.start && (
                  <FormattedDate date={content.start} format={dateOptions} />
                )}
              </div>
              <div className="separator"></div>
            </div>
            {!isOpenEnd ? (
              <div className="event-title">
                <span className="event-heading">
                  {' '}
                  <FormattedMessage id="End" defaultMessage="End" />
                </span>
                <div className="event-detail">
                  {' '}
                  {content?.end && (
                    <FormattedDate date={content.end} format={dateOptions} />
                  )}
                </div>
                <div className="separator"></div>
              </div>
            ) : null}
            {content?.location && (
              <div className="event-title">
                <span className="event-heading">
                  <FormattedMessage id="Location" defaultMessage="Location" />
                </span>
                <div className="event-detail">{content?.location}</div>
              </div>
            )}
          </div>

          <div className="event-details">
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
        </div>
        <div className="event-button">
          <a
            className="ics-download"
            target="_blank"
            rel="noreferrer"
            href={
              content && content['@id']
                ? `${expandToBackendURL(content['@id'])}/ics_view `
                : ''
            }
          >
            <button className="event-btn">
              <FormattedMessage
                id="ICS-Download"
                defaultMessage="ICS Download"
              />
            </button>
          </a>
        </div>
      </Container>
    </div>
  );
};

export default EventMetadataView;
