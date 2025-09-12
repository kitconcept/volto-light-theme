import * as React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Modal } from '@plone/components';
import { Dialog, DialogTrigger } from 'react-aria-components';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

const messages = defineMessages({
  openConfiguration: {
    id: 'Open configuration',
    defaultMessage: 'Open configuration',
  },
});

const ModalJSONEditor = (props) => {
  const intl = useIntl();
  const [textValue, setTextValue] = React.useState(
    JSON.stringify(props.value, null, 2),
  );
  const [error, setError] = React.useState('');

  return (
    <>
      <FormFieldWrapper
        {...props}
        error={error ? [error] : undefined}
        className="block-config-json-editor"
      >
        <DialogTrigger>
          <div className="button-wrapper">
            <Button aria-label="Open configuration">
              {intl.formatMessage(messages.openConfiguration)}
            </Button>
          </div>
          <Modal className="block-config-json-editor-modal">
            <Dialog>
              {({ close }) => (
                <div className="block-config-json-editor-dialog">
                  <textarea
                    value={textValue}
                    onChange={(e) => {
                      setTextValue(e.target.value);
                      try {
                        const validJSON = JSON.parse(e.target.value);
                        props.onChange(props.id, validJSON);
                        setError('');
                      } catch (error) {
                        setError(`Invalid JSON: ${error.message}`);
                      }
                    }}
                  />
                  {error && (
                    <div className="block-config-json-editor-error">
                      {error}
                    </div>
                  )}
                  <Button aria-label="Close" onPress={close}>
                    Close
                  </Button>
                </div>
              )}
            </Dialog>
          </Modal>
        </DialogTrigger>
      </FormFieldWrapper>
    </>
  );
};

export default ModalJSONEditor;
