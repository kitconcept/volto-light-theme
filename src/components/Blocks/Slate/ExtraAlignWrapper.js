import cx from 'classnames';
import { buildStyleClassNamesFromData } from '@plone/volto/helpers';
import { buildStylesStyleClassLookahead } from '../../../customizations/volto/components/manage/Blocks/StyleWrapper';

// This extra wrapper is required to fulfill the "all blocks snap to 1440"
// on some of the blocks, the ones that are more pure, eg. the ones the view is
// super simple, and a single element (p or an h)... So it's required on slate
// blocks and heading
const ExtraAlignWrapper = (Component) => ({ ...props }) => {
  const { data, id, properties } = props;
  const styles = buildStyleClassNamesFromData(data.styles);

  const nextBlock =
    properties?.['blocks'][
      properties?.['blocks_layout'].items[
        properties?.['blocks_layout'].items.indexOf(id) + 1
      ]
    ];
  const previousBlock =
    properties?.['blocks'][
      properties?.['blocks_layout'].items[
        properties?.['blocks_layout'].items.indexOf(id) - 1
      ]
    ];

  const lookaheadStyles = buildStylesStyleClassLookahead(
    data,
    nextBlock,
    previousBlock,
  );

  return (
    <div
      className={cx(`${data['@type']}`, styles, lookaheadStyles, {
        [data.align]: data.align,
        [data.styles?.align]: data.styles?.align,
      })}
    >
      <Component {...props} />
    </div>
  );
};

export default ExtraAlignWrapper;
