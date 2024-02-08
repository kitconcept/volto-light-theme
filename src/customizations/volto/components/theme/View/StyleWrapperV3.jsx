import React from 'react';
import cx from 'classnames';
import {
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
  buildStyleObjectFromData,
} from '@plone/volto/helpers';

const StyleWrapperV3 = (props) => {
  let classNames,
    styles = [];

  const { blocksConfig, data, children, content, block } = props;
  const category = blocksConfig?.[data['@type']]?.category;

  classNames = buildStyleClassNamesFromData(data.styles);

  classNames = buildStyleClassNamesExtenders({
    block,
    content,
    data,
    classNames,
  });

  styles = buildStyleObjectFromData(data.styles);

  return (
    <div
      className={cx(
        'block',
        data['@type'],
        { [`category-${category}`]: category },
        classNames,
        styles,
      )}
    >
      <div className="block-inner-container">{children}</div>
    </div>
  );
};

export default StyleWrapperV3;
