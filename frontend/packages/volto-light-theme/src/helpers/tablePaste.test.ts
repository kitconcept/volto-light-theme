import { describe, expect, it } from 'vitest';
import { createEditor, Editor, Transforms } from 'slate';
import { blockTagDeserializer } from '@plone/volto-slate/editor/deserialize';
import { withTable } from '@plone/volto-slate/editor/plugins/Table/extensions';
import { extractTables } from '@plone/volto-slate/blocks/Table/deconstruct';
import {
  extractTablesWithDefaults,
  NEW_TABLE_SETTINGS,
  replaceTableEmitter,
  hoistTables,
  insertFragmentWithTables,
  isTableMarkup,
  parseTSV,
  withTablePaste,
  wrapCellContent,
} from './tablePaste';

const p = (text: string) => ({ type: 'p', children: [{ text }] });

const table = (rows: string[][]) => ({
  type: 'table',
  children: [
    {
      type: 'tbody',
      children: rows.map((cells) => ({
        type: 'tr',
        children: cells.map((text) => ({ type: 'td', children: [p(text)] })),
      })),
    },
  ],
});

const makeEditor = (children: any[]) => {
  const editor = createEditor();
  editor.children = children as any;
  return editor;
};

const types = (editor: Editor) => editor.children.map((n: any) => n.type);
const text = (editor: Editor, index: number) => Editor.string(editor, [index]);

describe('parseTSV', () => {
  it('parses a 2x2 table', () => {
    expect(parseTSV('a\tb\nc\td')).toEqual(
      table([
        ['a', 'b'],
        ['c', 'd'],
      ]),
    );
  });

  it('ignores a trailing newline and CRLF line endings', () => {
    expect(parseTSV('a\tb\r\nc\td\r\n')).toEqual(
      table([
        ['a', 'b'],
        ['c', 'd'],
      ]),
    );
  });

  it('keeps empty cells', () => {
    expect(parseTSV('a\t\n\td')).toEqual(
      table([
        ['a', ''],
        ['', 'd'],
      ]),
    );
  });

  it('reads quoted cells with tabs, newlines and quotes', () => {
    const result = parseTSV('"x\ty"\t"say ""hi"""\n"line 1\nline 2"\tz');
    const cells = result.children[0].children.map((row: any) =>
      row.children.map((cell: any) => cell.children),
    );
    expect(cells).toEqual([
      [[p('x\ty')], [p('say "hi"')]],
      [[p('line 1'), p('line 2')], [p('z')]],
    ]);
  });

  it('pads rows shortened by merged cells', () => {
    expect(parseTSV('a\tb\tc\nd\te\tf\ntotal\t9')).toEqual(
      table([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['total', '9', ''],
      ]),
    );
  });

  it.each([
    ['plain text', 'hello\nworld'],
    ['a single row', 'a\tb'],
    ['a single column', 'a\nb'],
    ['only one full row', 'a\tb\nc'],
    ['mostly short rows', 'a\tb\nc\td\ne\nf\ng'],
    ['an unclosed quote', '"a\tb\nc\td'],
    ['empty text', ''],
  ])('rejects %s', (_name, input) => {
    expect(parseTSV(input)).toBeNull();
  });
});

describe('extractTablesWithDefaults', () => {
  it('gives extracted Table blocks the settings of a new Table block', () => {
    const editor = makeEditor([
      table([
        ['a', 'b'],
        ['c', 'd'],
      ]),
      p(''),
    ]);
    const blocks = extractTablesWithDefaults(
      editor,
      Editor.pathRef(editor, [0]),
    );

    expect(blocks).toHaveLength(1);
    const [, block] = blocks[0];
    expect(block['@type']).toBe('slateTable');
    expect(block.table).toMatchObject(NEW_TABLE_SETTINGS);
    expect(block.table.rows).toHaveLength(2);
  });

  it('replaces only volto-slate’s table emitter', () => {
    const other = () => [];
    expect(replaceTableEmitter([other, extractTables])).toEqual([
      other,
      extractTablesWithDefaults,
    ]);
  });
});

describe('isTableMarkup', () => {
  it.each([
    ['<table><tr><td>a</td></tr></table>', true],
    ['\n  <TABLE class="x">…</TABLE>\n', true],
    ['<tablet>', false],
    ['Use <table> for tabular data', false],
    ['<p>x</p><table></table>', false],
  ])('%j → %s', (input, expected) => {
    expect(isTableMarkup(input)).toBe(expected);
  });
});

describe('hoistTables', () => {
  it('lifts a nested table out of its wrapper', () => {
    const t = table([['a']]);
    const wrapped = {
      type: 'div',
      children: [p('before'), t, p('after')],
    };
    expect(hoistTables([wrapped])).toEqual([
      { type: 'div', children: [p('before')] },
      t,
      { type: 'div', children: [p('after')] },
    ]);
  });
});

describe('wrapCellContent', () => {
  it('wraps bare text in cells in paragraphs', () => {
    const editor = createEditor();
    const pasted = {
      type: 'table',
      children: [
        {
          type: 'tbody',
          children: [
            {
              type: 'tr',
              children: [
                { type: 'th', children: [{ text: 'Name' }] },
                { type: 'td', children: [p('kept')] },
                { type: 'td', children: [] },
              ],
            },
          ],
        },
      ],
    };
    const cells = wrapCellContent(editor, pasted).children[0].children[0]
      .children;
    expect(cells.map((cell: any) => cell.children)).toEqual([
      [p('Name')],
      [p('kept')],
      [p('')],
    ]);
  });
});

describe('insertFragmentWithTables', () => {
  const t = table([
    ['a', 'b'],
    ['c', 'd'],
  ]);

  it('replaces an empty block and adds an empty paragraph after it', () => {
    const editor = makeEditor([p('')]);
    Transforms.select(editor, Editor.start(editor, [0]));

    insertFragmentWithTables(editor, [t]);

    expect(editor.children).toEqual([t, p('')]);
    expect(editor.selection?.anchor.path).toEqual([1, 0]);
  });

  it('inserts after a block when the cursor is at its end', () => {
    const editor = makeEditor([p('ab')]);
    Transforms.select(editor, Editor.end(editor, [0]));

    insertFragmentWithTables(editor, [t]);

    expect(types(editor)).toEqual(['p', 'table', 'p']);
    expect(text(editor, 0)).toBe('ab');
    expect(text(editor, 2)).toBe('');
  });

  it('inserts before a block when the cursor is at its start', () => {
    const editor = makeEditor([p('ab')]);
    Transforms.select(editor, Editor.start(editor, [0]));

    insertFragmentWithTables(editor, [t]);

    expect(types(editor)).toEqual(['table', 'p']);
    expect(text(editor, 1)).toBe('ab');
  });

  it('splits a block when the cursor is in its middle', () => {
    const editor = makeEditor([p('abcd')]);
    Transforms.select(editor, { path: [0, 0], offset: 2 });

    insertFragmentWithTables(editor, [t]);

    expect(types(editor)).toEqual(['p', 'table', 'p']);
    expect(text(editor, 0)).toBe('ab');
    expect(text(editor, 2)).toBe('cd');
  });

  it('keeps the order of text and tables in the fragment', () => {
    const editor = makeEditor([p('')]);
    Transforms.select(editor, Editor.start(editor, [0]));

    insertFragmentWithTables(editor, [p('x'), t, p('y')]);

    expect(types(editor)).toEqual(['p', 'table', 'p']);
    expect(text(editor, 0)).toBe('x');
    expect(text(editor, 2)).toBe('y');
  });
});

describe('withTablePaste', () => {
  const setup = () => {
    const calls: string[] = [];
    const editor: any = createEditor();
    editor.children = [p('')];
    editor.dataTransferHandlers = {
      'text/html': () => {
        calls.push('html');
        return true;
      },
      'text/plain': () => {
        calls.push('plain');
        return true;
      },
    };
    withTablePaste(editor);
    Transforms.select(editor, Editor.start(editor, [0]));
    return { editor, calls };
  };

  it('pastes table markup copied as plain text as a table', () => {
    const { editor, calls } = setup();
    // The deserializers volto-slate's Table plugin and Text block install
    withTable(editor);
    editor.htmlTagsToSlate.P = blockTagDeserializer('p');

    const markup = `
      <table>
        <caption> Course 2021 </caption>
        <thead><tr><th>Person</th><th>Topic</th><th>Age</th></tr></thead>
        <tbody><tr><th scope="row">Chris</th><td>HTML</td><td>22</td></tr></tbody>
        <tfoot><tr><th colspan="2">Average age</th><td>22</td></tr></tfoot>
      </table>
    `;
    editor.dataTransferHandlers['text/plain'](markup, 'text/plain');

    expect(calls).toEqual([]);
    expect(types(editor)).toEqual(['p', 'table', 'p']);
    expect(text(editor, 0)).toBe('Course 2021');

    const sections = (editor.children[1] as any).children;
    const rowLengths = sections.flatMap((section: any) =>
      section.children.map((row: any) => row.children.length),
    );
    expect(rowLengths).toEqual([3, 3, 3]);
    expect(Editor.string(editor, [1, 2, 0, 0])).toBe('Average age');
  });

  it('turns TSV into a table', () => {
    const { editor, calls } = setup();
    editor.dataTransferHandlers['text/plain']('a\tb\nc\td', 'text/plain');
    expect(calls).toEqual([]);
    expect(types(editor)).toEqual(['table', 'p']);
  });

  it('turns a slate fragment holding a table into a table', () => {
    const { editor, calls } = setup();
    const encoded = window.btoa(
      encodeURIComponent(
        JSON.stringify([
          table([
            ['a', 'b'],
            ['c', 'd'],
          ]),
        ]),
      ),
    );
    editor.dataTransferHandlers['application/x-slate-fragment'](
      encoded,
      'application/x-slate-fragment',
    );
    expect(calls).toEqual([]);
    expect(types(editor)).toEqual(['table', 'p']);
  });

  it('leaves other plain text to the original handler', () => {
    const { editor, calls } = setup();
    editor.dataTransferHandlers['text/plain']('hello', 'text/plain');
    expect(calls).toEqual(['plain']);
  });

  it('leaves HTML without a table to the original handler', () => {
    const { editor, calls } = setup();
    editor.dataTransferHandlers['text/html']('<p>hello</p>', 'text/html');
    expect(calls).toEqual(['html']);
  });
});
