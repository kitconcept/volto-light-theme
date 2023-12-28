/**
 * Remove when https://github.com/plone/volto/pull/5581 is merged and released to 17
 */
import React from 'react';
import cx from 'classnames';
import {
  buildStyleClassNamesFromData,
  buildStyleClassNamesExtenders,
} from '@plone/volto/helpers';

import { buildStyleObjectFromData } from '@plone/volto/helpers/Blocks/Blocks';

const StyleWrapper = (props) => {
  let classNames,
    style = [];
  const { children, content, data = {}, block } = props;
  classNames = buildStyleClassNamesFromData(data.styles);

  classNames = buildStyleClassNamesExtenders({
    block,
    content,
    data,
    classNames,
  });

  style = buildStyleObjectFromData(data.styles);

  const rewrittenChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = {
        ...props,
        className: cx([child.props.className, ...classNames]),
        style: { ...child.props.style, ...style },
      };
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return rewrittenChildren;
};

export default StyleWrapper;
