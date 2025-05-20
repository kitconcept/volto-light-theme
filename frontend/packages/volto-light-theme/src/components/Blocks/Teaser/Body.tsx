import DefaultBody from './DefaultBody';
import { BlockWrapper } from '@kitconcept/volto-bm3-compat';
import config from '@plone/volto/registry';
import cx from 'classnames';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import isEmpty from 'lodash/isEmpty';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const TeaserBody = (props) => {
  const { variation, data, className, isEditMode } = props;
  const intl = useIntl();

  const hasType = data.href?.[0]?.['@type'];

  const BodyComponent =
    (config?.getComponent &&
      hasType &&
      config.getComponent({ name: 'Teaser', dependencies: [hasType] })
        .component) ||
    variation?.template ||
    DefaultBody;

  return (
    <BlockWrapper
      {...props}
      className={cx(
        { [`${hasType?.toLowerCase()}-teaser`]: hasType },
        className,
      )}
    >
      {isEmpty(data.href) && isEditMode ? (
        <div className="ui message">
          <div className="teaser-item placeholder">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </div>
      ) : (
        <BodyComponent {...props} />
      )}
    </BlockWrapper>
  );
};

export default TeaserBody;
