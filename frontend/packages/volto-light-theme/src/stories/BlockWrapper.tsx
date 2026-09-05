import cx from 'classnames';
import config from '@plone/volto/registry';
import { findStyleByName } from '@plone/volto/helpers/Blocks/Blocks';
import StyleWrapper from '@plone/volto/components/manage/Blocks/Block/StyleWrapper';

// Reproduces the real content-area structure around a single block, so stories
// behave exactly as on a page:
//
//   .q.container            → size container (container-type: inline-size), full width
//     #page-document        → the page canvas, full width
//       .blocks-group-wrapper → full width, paints the theme band edge to edge
//         (StyleWrapper)     → the block, which carries its OWN width and centers
//
// The width always lives on the block layer (via block CSS or the
// `#page-document .blocks-group-wrapper > *` rules), never on the frame, so a
// themed band spans edge to edge just like the example content. In production a
// block is never rendered bare — RenderBlocksV2 always wraps it in a
// `.blocks-group-wrapper` — so we always render that layer too, defaulting the
// theme to `default` (white). Set the theme via `data.theme` or the `theme` prop.
//
// Optional story helpers (not part of the page structure):
//   - `pageClassName`: extra class on `#page-document` (e.g. `person-squared-images`,
//     a content-area modifier that only sets CSS variables).
//   - `width`: constrains the block to a narrower column (a value for `max-width`),
//     to demonstrate layouts that only appear in a narrow container.
const BlockWrapper = (props) => {
  const { block, data, isContainer, pageClassName, width } = props;
  const content = props.content || {
    blocks: {},
    blocks_layout: {
      items: [],
    },
  };

  const theme = props.theme ?? data?.theme ?? 'default';
  const themes =
    config.blocks?.blocksConfig?.[data?.['@type']]?.themes ??
    config.blocks.themes;

  const styleWrapper = (
    <StyleWrapper
      content={content}
      id={block || 'block-1'}
      block={block || 'block-1'}
      data={data}
      isContainer={isContainer}
    >
      {props.children}
    </StyleWrapper>
  );

  return (
    <div className="q container" style={{ containerType: 'inline-size' }}>
      <div id="page-document" className={cx(pageClassName)}>
        <div
          className={cx('blocks-group-wrapper', theme)}
          style={findStyleByName(themes, theme)}
        >
          {width ? (
            <div style={{ maxWidth: width, marginRight: 'auto', marginLeft: 'auto' }}>
              {styleWrapper}
            </div>
          ) : (
            styleWrapper
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockWrapper;
