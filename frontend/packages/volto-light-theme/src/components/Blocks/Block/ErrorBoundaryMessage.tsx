import { defineMessages, FormattedMessage, useIntl } from 'react-intl';

type ErrorBoundaryMessageProps = {
  name?: string;
  block?: string;
  type?: string;
  isEdit?: boolean;
};

const messages = defineMessages({
  title: {
    id: 'blockErrorBoundaryTitle',
    defaultMessage: 'Block error:',
  },
  description: {
    id: 'blockErrorBoundaryDescription',
    defaultMessage:
      'The {type} block with the id {block} has encountered an error.{lineBreak}You can try to undo your changes (via the undo toolbar or pressing {shortcut}), or try to delete the block and add it again.',
  },
  viewDescription: {
    id: 'blockErrorBoundaryViewDescription',
    defaultMessage:
      'The {type} block with the id {block} errored and cannot be displayed.{lineBreak}Please contact the site administrator for further assistance.',
  },
});

const ErrorBoundaryMessage = (props: ErrorBoundaryMessageProps) => {
  const intl = useIntl();

  if (props.isEdit) {
    return (
      <div className="block-error-boundary">
        <div className="title">{intl.formatMessage(messages.title)}</div>
        <p>
          <FormattedMessage
            {...messages.description}
            values={{
              type: <code>{props.type}</code>,
              block: <code>{props.block}</code>,
              lineBreak: <br />,
              shortcut: <code>ctrl/cmd + Z</code>,
            }}
          />
        </p>
      </div>
    );
  } else {
    return (
      <div className="block-error-boundary">
        <div className="title">{intl.formatMessage(messages.title)}</div>
        <p>
          <FormattedMessage
            {...messages.viewDescription}
            values={{
              type: <code>{props.type}</code>,
              block: <code>{props.block}</code>,
              lineBreak: <br />,
            }}
          />
        </p>
      </div>
    );
  }
};

export default ErrorBoundaryMessage;
