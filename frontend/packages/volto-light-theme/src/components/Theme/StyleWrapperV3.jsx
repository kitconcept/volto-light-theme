import React from 'react';
import cx from 'classnames';
import {
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
  buildStyleObjectFromData,
} from '@plone/volto/helpers/Blocks/Blocks';

const StyleWrapperV3 = (props) => {
  let classNames,
    style = [];
  const {
    block,
    children,
    content,
    data = {},
    isContainer,
    blocksConfig,
  } = props;
  const category = blocksConfig?.[data['@type']]?.category;
  classNames = buildStyleClassNamesFromData(data.styles);

  classNames = buildStyleClassNamesExtenders({
    block,
    content,
    data,
    classNames,
  });

  style = buildStyleObjectFromData(
    data,
    '',
    // If we are rendering blocks inside a container, then pass also the data from the container
    // This is needed in order to calculate properly the styles for the blocks inside the container
    isContainer && content.blocks ? content : {},
  );

  const rewrittenChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = {
        ...props,
        className: cx(
          [child.props.className, ...classNames],
          child.props.category ? `category-${category}` : '',
        ),
        style: { ...child.props.style, ...style },
      };
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return (
    <div
      className={cx(
        'block',
        data['@type'],
        { [`category-${category}`]: category },
        classNames,
      )}
      style={style}
    >
      <div className="block-inner-container">{rewrittenChildren}</div>
    </div>
  );
};

export default StyleWrapperV3;
