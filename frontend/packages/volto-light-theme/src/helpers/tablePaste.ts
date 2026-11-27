/**
 * Turns tables pasted into a Text block into separate Table (`slateTable`)
 * blocks.
 *
 * volto-slate already splits top-level `table` nodes out of a Text block into
 * Table blocks (`extractTables` in `deconstructToVoltoBlocks`), but on paste
 * that never happens:
 *
 * - Slate's `insertFragment` unwraps the table into plain text unless the
 *   destination block is empty.
 * - When the block is empty, the table becomes the only top-level node, and
 *   `deconstructToVoltoBlocks` skips editors that have a single node.
 *
 * `withTablePaste` inserts pasted tables as top-level nodes next to the
 * current block and always leaves a node after them, so the stock extraction
 * runs. It handles tables in a slate fragment (copied from a Text block), in
 * HTML (captions become paragraphs, merged cells are padded), in the HTML
 * source pasted as plain text, and in tab-separated plain text (the format
 * every spreadsheet copies as `text/plain`).
 *
 * `extractTablesWithDefaults` gives the extracted Table blocks the settings of
 * a Table block added from the block chooser.
 *
 * TODO: Remove once VLT depends on a Volto version that handles this itself.
 */
import { Editor, Element, Path, Range, Text, Transforms } from 'slate';
import { deserialize } from '@plone/volto-slate/editor/deserialize';
import { extractTables } from '@plone/volto-slate/blocks/Table/deconstruct';

type SlateNode = any;
type DataTransferHandler = (data: string, fullMime: string) => boolean;

const TABLE = 'table';

const createParagraph = (text = ''): SlateNode => ({
  type: 'p',
  children: [{ text }],
});

const isTable = (node: SlateNode): boolean =>
  Element.isElement(node) && (node as SlateNode).type === TABLE;

const containsTable = (node: SlateNode): boolean =>
  isTable(node) ||
  (Element.isElement(node) && node.children.some(containsTable));

const isWhitespaceText = (node: SlateNode): boolean =>
  Text.isText(node) && node.text.trim() === '';

/**
 * Splits the wrappers around nested tables, so that every table of the
 * fragment is a top-level node. The content around a table stays in a copy of
 * its wrapper.
 */
export function hoistTables(nodes: SlateNode[]): SlateNode[] {
  const result: SlateNode[] = [];

  for (const node of nodes) {
    if (isTable(node) || !containsTable(node)) {
      result.push(node);
      continue;
    }

    let run: SlateNode[] = [];
    const flush = () => {
      if (run.length > 0) {
        result.push({ ...node, children: run });
        run = [];
      }
    };

    for (const child of hoistTables(node.children)) {
      if (isTable(child)) {
        flush();
        result.push(child);
      } else {
        run.push(child);
      }
    }
    flush();
  }

  return result;
}

/**
 * Parses tab-separated text, as spreadsheets and browsers put it on the
 * clipboard: a tab between cells, a newline between rows, and cells holding
 * tabs, newlines or quotes wrapped in double quotes (`""` is a quote).
 *
 * @returns A slate `table` node, or `null` when the text is not a table of at
 * least 2 rows and 2 columns. Short rows are padded with empty cells as long
 * as at least 2 rows, and at least half of them, have the full width.
 */
export function parseTSV(text: string): SlateNode | null {
  if (!text || !text.includes('\t')) return null;

  const input = text.replace(/\r\n?/g, '\n').replace(/\n$/, '');
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (inQuotes) {
      if (char !== '"') {
        cell += char;
      } else if (input[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = false;
      }
    } else if (char === '"' && cell === '') {
      inQuotes = true;
    } else if (char === '\t') {
      row.push(cell);
      cell = '';
    } else if (char === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (inQuotes) return null;
  row.push(cell);
  rows.push(row);

  // Rows copied from merged cells (`colspan`) come out shorter: pad them, but
  // only when most rows have the full width, so prose with a stray tab stays
  // text.
  const columns = Math.max(...rows.map((cells) => cells.length));
  const fullRows = rows.filter((cells) => cells.length === columns).length;
  if (
    rows.length < 2 ||
    columns < 2 ||
    fullRows < 2 ||
    fullRows * 2 < rows.length
  ) {
    return null;
  }

  return {
    type: TABLE,
    children: [
      {
        type: 'tbody',
        children: rows.map((cells) => ({
          type: 'tr',
          children: [...cells, ...Array(columns - cells.length).fill('')].map(
            (value) => ({
              type: 'td',
              children: value.split('\n').map((line) => createParagraph(line)),
            }),
          ),
        })),
      },
    ],
  };
}

/**
 * Wraps the text and inline content of every table cell in paragraphs. Pasted
 * HTML gives cells like `<td>text</td>`, but each Table block cell is an
 * editor of its own, which drops text that is not inside a block.
 */
export function wrapCellContent(editor: Editor, node: SlateNode): SlateNode {
  if (!Element.isElement(node)) return node;

  const { type, children } = node as SlateNode;
  if (type !== 'td' && type !== 'th') {
    return {
      ...node,
      children: children.map((child: SlateNode) =>
        wrapCellContent(editor, child),
      ),
    };
  }

  const blocks: SlateNode[] = [];
  let inlines: SlateNode[] = [];
  const flush = () => {
    if (inlines.length > 0) {
      blocks.push({ type: 'p', children: inlines });
      inlines = [];
    }
  };
  for (const child of children) {
    if (Text.isText(child) || editor.isInline(child)) {
      inlines.push(child);
    } else {
      flush();
      blocks.push(child);
    }
  }
  flush();

  return {
    ...node,
    children: blocks.length > 0 ? blocks : [createParagraph()],
  };
}

/**
 * Inserts a table as a top-level node at the selection: in place of an empty
 * block, or before, after or in the middle of a block (which gets split). The
 * selection moves to the start of the node after the table, which is added as
 * an empty paragraph if there is none.
 */
function insertTable(editor: Editor, pastedTable: SlateNode) {
  const table = wrapCellContent(editor, pastedTable);

  if (editor.selection && Range.isExpanded(editor.selection)) {
    Transforms.delete(editor);
  }

  const { selection } = editor;
  const blockEntry = selection
    ? Editor.above(editor, {
        at: selection,
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
        mode: 'highest',
      })
    : undefined;

  let tablePath: Path;

  if (!selection || !blockEntry) {
    tablePath = [editor.children.length];
    Transforms.insertNodes(editor, table, { at: tablePath });
  } else {
    const [block, blockPath] = blockEntry;
    const point = selection.anchor;

    if (Editor.isEmpty(editor, block as Element)) {
      tablePath = blockPath;
      Transforms.insertNodes(editor, table, { at: tablePath });
      Transforms.removeNodes(editor, { at: Path.next(tablePath) });
    } else if (Editor.isEnd(editor, point, blockPath)) {
      tablePath = Path.next(blockPath);
      Transforms.insertNodes(editor, table, { at: tablePath });
    } else if (Editor.isStart(editor, point, blockPath)) {
      tablePath = blockPath;
      Transforms.insertNodes(editor, table, { at: tablePath });
    } else {
      Transforms.splitNodes(editor, {
        at: point,
        match: (_n, path) => path.length === 1,
        always: true,
      });
      tablePath = Path.next(blockPath);
      Transforms.insertNodes(editor, table, { at: tablePath });
    }
  }

  const nextPath = Path.next(tablePath);
  if (!Editor.hasPath(editor, nextPath)) {
    Transforms.insertNodes(editor, createParagraph(), { at: nextPath });
  }
  Transforms.select(editor, Editor.start(editor, nextPath));
}

/**
 * Inserts a pasted fragment. Tables (nested ones included) become top-level
 * nodes; the content between them is inserted as usual.
 */
export function insertFragmentWithTables(
  editor: Editor,
  fragment: SlateNode[],
) {
  let run: SlateNode[] = [];
  const flush = () => {
    if (run.length > 0 && !run.every(isWhitespaceText)) {
      editor.insertFragment(run);
    }
    run = [];
  };

  for (const node of hoistTables(fragment)) {
    if (isTable(node)) {
      flush();
      insertTable(editor, node);
    } else {
      run.push(node);
    }
  }
  flush();
}

const htmlBody = (html: string): HTMLElement | null => {
  const parsed = new DOMParser().parseFromString(html, 'text/html');

  // The Table block has no caption, so a caption becomes a paragraph above
  // its table instead of being lost.
  parsed.querySelectorAll('table > caption').forEach((caption) => {
    const paragraph = parsed.createElement('p');
    paragraph.textContent = (caption.textContent || '').trim();
    caption.parentElement?.before(paragraph);
    caption.remove();
  });

  // The Table block has no cell spanning: a cell spanning n columns becomes
  // the cell plus n - 1 empty ones, so the columns stay aligned.
  parsed.querySelectorAll('td[colspan], th[colspan]').forEach((cell) => {
    const span = parseInt(cell.getAttribute('colspan') || '1', 10);
    cell.removeAttribute('colspan');
    for (let i = 1; i < span && i < 100; i++) {
      cell.after(parsed.createElement(cell.nodeName.toLowerCase()));
    }
  });

  // Google Sheets wraps its table, as volto-slate's own handler knows.
  return parsed.getElementsByTagName('google-sheets-html-origin').length > 0
    ? parsed.querySelector('google-sheets-html-origin > table')
    : parsed.body;
};

/**
 * Whether plain text is the HTML source of a table, e.g. copied from a code
 * example, which only puts `text/plain` on the clipboard.
 */
export const isTableMarkup = (text: string): boolean => {
  const markup = text.trim();
  return /^<table[\s>]/i.test(markup) && /<\/table>$/i.test(markup);
};

const hasHtmlTable = (el: HTMLElement | null): boolean =>
  !!el && (el.nodeName === 'TABLE' || !!el.querySelector('table'));

/**
 * The settings a Table block starts with when it is added from the block
 * chooser (`initialTable` in volto-slate's `TableBlockEdit`, which is not
 * exported).
 */
export const NEW_TABLE_SETTINGS = {
  hideHeaders: false,
  fixed: true,
  compact: false,
  basic: false,
  celled: true,
  inverted: false,
  striped: false,
};

/**
 * `extractTables` creates Table blocks with only `table.rows`, so they render
 * without the borders (`celled`) and fixed layout of a new Table block. This
 * emitter gives them the same settings.
 */
export const extractTablesWithDefaults = (editor: Editor, pathRef: any) =>
  extractTables(editor, pathRef).map(([id, block]: [string, any]) => [
    id,
    { ...block, table: { ...NEW_TABLE_SETTINGS, ...block.table } },
  ]);

/**
 * Replaces volto-slate's `extractTables` in a list of block emitters.
 */
export const replaceTableEmitter = (emitters: any[] = []) =>
  emitters.map((emit) =>
    emit === extractTables ? extractTablesWithDefaults : emit,
  );

export const withTablePaste = (editor: any) => {
  const handlers: Record<string, DataTransferHandler> =
    editor.dataTransferHandlers || {};
  const handleFragment = handlers['application/x-slate-fragment'];
  const handleHtml = handlers['text/html'];
  const handlePlain = handlers['text/plain'];

  editor.dataTransferHandlers = {
    ...handlers,
    // Content copied from a slate editor in edit mode, e.g. a Text block that
    // holds a table. Decoded as volto-slate's own handler does.
    'application/x-slate-fragment': (data: string, fullMime: string) => {
      let fragment: SlateNode[];
      try {
        fragment = JSON.parse(decodeURIComponent(window.atob(data)));
      } catch {
        return handleFragment(data, fullMime);
      }
      if (!Array.isArray(fragment) || !fragment.some(containsTable)) {
        return handleFragment(data, fullMime);
      }

      editor.beforeInsertFragment?.(fragment);
      insertFragmentWithTables(editor, fragment);
      return true;
    },
    'text/html': (data: string, fullMime: string) => {
      const body = htmlBody(data);
      if (!hasHtmlTable(body)) return handleHtml(data, fullMime);

      const value = deserialize(editor, body);
      let fragment = Array.isArray(value) ? value : [value];
      fragment = editor.normalizeExternalData
        ? editor.normalizeExternalData(fragment)
        : fragment;

      if (!fragment.some(containsTable)) return handleHtml(data, fullMime);

      insertFragmentWithTables(editor, fragment);
      return true;
    },
    'text/plain': (data: string, fullMime: string) => {
      if (isTableMarkup(data)) {
        return editor.dataTransferHandlers['text/html'](
          data.trim(),
          'text/html',
        );
      }

      const table = parseTSV(data);
      if (!table) return handlePlain(data, fullMime);

      insertFragmentWithTables(editor, [table]);
      return true;
    },
  };

  return editor;
};
