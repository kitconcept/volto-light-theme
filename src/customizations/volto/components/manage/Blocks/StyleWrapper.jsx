/**
 * OVERRIDE StyleWrapper.jsx
 * REASON: We need to inject the look-around CSS classes
 * FILE: https://github.com/plone/volto/blob/master/src/components/manage/Blocks/Block/StyleWrapper.jsx
 * FILE VERSION: Volto 16.0.0-alpha.25
 * DATE: 2022-08-24
 * DEVELOPER: @sneridagh
 * Every change is marked with a JSX comment at the beginning and end of the change:
 *
 *   START CUSTOMIZATION
 *   <CUSTOMIZATION>
 *   END CUSTOMIZATION
 */
import React from 'react';
import cx from 'classnames';
import { buildStyleClassNamesFromData } from '@plone/volto/helpers';

// START CUSTOMIZATION
export const buildStylesStyleClassLookahead = (
  data,
  nextBlock,
  previousBlock,
) => {
  const resultantStyles = [];
  const previousColor = previousBlock?.styles?.backgroundColor ?? 'transparent';
  const currentColor = data?.styles?.backgroundColor ?? 'transparent';
  const nextColor = nextBlock?.styles?.backgroundColor ?? 'transparent';

  if (currentColor === nextColor) {
    resultantStyles.push('next--is--same--backgroundColor');
  } else if (currentColor !== nextColor) {
    resultantStyles.push('next--is--different--backgroundColor');
  }

  if (currentColor === previousColor) {
    resultantStyles.push('previous--is--same--backgroundColor');
  } else if (currentColor !== previousColor) {
    resultantStyles.push('previous--is--different--backgroundColor');
  }

  if (data?.['@type'] === previousBlock?.['@type']) {
    resultantStyles.push('previous--is--same--block-type');
  }

  if (data?.['@type'] === nextBlock?.['@type']) {
    resultantStyles.push('next--is--same--block-type');
  }

  if (data?.['@type'] !== previousBlock?.['@type']) {
    resultantStyles.push('is--first--of--block-type');
  }

  if (data?.['@type'] !== nextBlock?.['@type']) {
    resultantStyles.push('is--last--of--block-type');
  }

  if (data?.headline || previousBlock?.['@type'] === 'heading') {
    resultantStyles.push('has--headline');
  }

  if (nextBlock?.['@type']) {
    resultantStyles.push(`next--is--${nextBlock['@type']}`);
  }

  return resultantStyles;
};
// END CUSTOMIZATION

const StyleWrapper = (props) => {
  const { children, content, data = {}, id } = props;
  const styles = buildStyleClassNamesFromData(data.styles);

  // START CUSTOMIZATION
  const nextBlock =
    content['blocks'][
      content['blocks_layout'].items[
        content['blocks_layout'].items.indexOf(id) + 1
      ]
    ];
  const previousBlock =
    content['blocks'][
      content['blocks_layout'].items[
        content['blocks_layout'].items.indexOf(id) - 1
      ]
    ];

  const lookaheadStyles = buildStylesStyleClassLookahead(
    data,
    nextBlock,
    previousBlock,
  );
  // END CUSTOMIZATION

  const rewrittenChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childProps = {
        ...props,
        // START CUSTOMIZATION
        className: cx([child.props.className, ...styles, ...lookaheadStyles]),
        // END CUSTOMIZATION
      };
      return React.cloneElement(child, childProps);
    }
    return child;
  });

  return rewrittenChildren;
};

export default StyleWrapper;
