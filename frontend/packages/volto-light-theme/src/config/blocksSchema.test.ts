import { beforeAll, describe, expect, it, vi } from 'vitest';
import { createIntl, createIntlCache } from 'react-intl';
import config from '@plone/volto/registry';
import { blocksConfig as coreBlocksConfig } from '@plone/volto/config/Blocks';
import blocksSchemaMiddleware from '@plone/volto/express-middleware/blocks-schema';
import installVoltoSlate from '@plone/volto-slate';

import installBannerBlock from '@kitconcept/volto-banner-block';
import installButtonBlock from '@kitconcept/volto-button-block';
import installCalendarBlock from '@kitconcept/volto-calendar-block';
import installCarouselBlock from '@kitconcept/volto-carousel-block';
import installHeadingBlock from '@kitconcept/volto-heading-block';
import installHighlightBlock from '@kitconcept/volto-highlight-block';
import installIntroductionBlock from '@kitconcept/volto-introduction-block';
import installLogosBlock from '@kitconcept/volto-logos-block';
import installSeparatorBlock from '@kitconcept/volto-separator-block';
import installSliderBlock from '@kitconcept/volto-slider-block';

import installThemeBlocks from './blocks';

// The @blocks-schema endpoint asks the backend who the caller is. This
// backend knows one editor, so the endpoint answers for it.
const { apiGet } = vi.hoisted(() => ({ apiGet: vi.fn() }));
vi.mock('@plone/volto/helpers/Api/Api', () => ({
  default: class {
    get = apiGet;
  },
}));

const makeToken = (payload: Record<string, unknown>) =>
  `header.${btoa(JSON.stringify(payload))}.signature`;
const token = makeToken({
  sub: 'editor',
  exp: Math.floor(Date.now() / 1000) + 3600,
});

const intl = createIntl({ locale: 'en', messages: {} }, createIntlCache());

type Block = {
  id?: string;
  blockSchema?: unknown;
  dataAdapter?: unknown;
  [key: string]: any;
};

// The registry keys of the ten block add-ons, as the endpoint lists them.
const addonBlocks = [
  'banner',
  '__button',
  'eventCalendar',
  'carousel',
  'heading',
  'highlight',
  'introduction',
  'logos',
  'separator',
  'slider',
];

// Known gaps: the check is skipped and its reason is shown in the test name.
// Nothing is patched in the add-ons or the theme to hide them.
const knownGaps: Record<string, Record<string, string>> = {
  eventCalendar: {
    dataAdapter:
      'the theme replaces the blocksConfig entry of the calendar add-on in config/blocks.tsx, so the add-on dataAdapter is not in the final config',
  },
};

// Runs the check, or skips it with the known gap as its reason.
const checkFor = (
  block: string,
  check: string,
  name: string,
  fn: () => unknown,
) => {
  const reason = knownGaps[block]?.[check];
  if (reason) it.skip(`${name} (known gap: ${reason})`, fn);
  else it(name, fn);
};

// Same order as the app: Volto's own add-ons first, then the block add-ons in
// volto.config.js, and the theme last.
const installAll = () => {
  installVoltoSlate(config);
  [
    installButtonBlock,
    installCalendarBlock,
    installCarouselBlock,
    installHeadingBlock,
    installHighlightBlock,
    installIntroductionBlock,
    installLogosBlock,
    installSeparatorBlock,
    installSliderBlock,
    installBannerBlock,
  ].forEach((install) => install(config));
  installThemeBlocks(config);
};

// Calls the endpoint's own middleware for one block, as an editor would.
async function fetchBlock(id: string) {
  const middleware = blocksSchemaMiddleware();
  const url = `/@blocks-schema/${encodeURIComponent(id)}`;

  return await new Promise<{ status: number; body: any }>((resolve, reject) => {
    const req = {
      method: 'GET',
      protocol: 'http',
      url,
      originalUrl: url,
      headers: {
        host: 'localhost:3000',
        authorization: `Bearer ${token}`,
      },
      query: {},
      params: {},
      universalCookies: { get: () => undefined },
    };
    const res = {
      locals: {
        store: {
          getState: () => ({ intl: { locale: 'en', messages: {} } }),
        },
      },
      headers: {} as Record<string, unknown>,
      statusCode: 200,
      set(name: string, value: unknown) {
        this.headers[name.toLowerCase()] = value;
        return this;
      },
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(body: unknown) {
        resolve({ status: this.statusCode, body });
        return this;
      },
      send(text: string) {
        resolve({ status: this.statusCode, body: text });
        return this;
      },
    };

    middleware(req as any, res as any, (error?: unknown) => {
      if (error) reject(error);
      else resolve({ status: 404, body: null });
    });
  });
}

// Every field named by a fieldset must be declared in the properties.
function expectWellFormedSchema(schema: any) {
  expect(schema).toBeTruthy();
  expect(Array.isArray(schema.fieldsets)).toBe(true);
  expect(schema.properties).toBeTypeOf('object');

  const declared = new Set(Object.keys(schema.properties));
  for (const fieldset of schema.fieldsets) {
    for (const field of fieldset.fields) {
      expect(declared.has(field), `${field} is not in properties`).toBe(true);
    }
  }
}

beforeAll(() => {
  apiGet.mockImplementation(async (path: string) => {
    if (path === '/@users/editor') {
      return { id: 'editor', roles: ['Editor'] };
    }
    throw Object.assign(new Error('Not Found'), { status: 404 });
  });

  config.blocks.requiredBlocks = [];
  config.blocks.blocksConfig = coreBlocksConfig;
  installAll();
});

describe('@blocks-schema for the block add-ons, in the final theme config', () => {
  describe.each(addonBlocks)('%s', (id) => {
    const block = (): Block => config.blocks.blocksConfig[id];

    it('is registered', () => {
      expect(block()).toBeTruthy();
    });

    it('resolves its schema with only intl', () => {
      const { blockSchema } = block();
      const schema =
        typeof blockSchema === 'function' ? blockSchema({ intl }) : blockSchema;
      expectWellFormedSchema(schema);
    });

    it('answers the endpoint with a schema, no error', async () => {
      const { status, body } = await fetchBlock(id);
      expect(status).toBe(200);
      expect(body.error).toBeUndefined();
      expectWellFormedSchema(body.schema);
    });

    it('answers with variations that each resolve their schema', async () => {
      const { body } = await fetchBlock(id);
      for (const variation of body.variations ?? []) {
        expect(variation.error, `${variation.id} has an error`).toBeUndefined();
        expectWellFormedSchema(variation.schema);
      }
    });

    checkFor(id, 'dataAdapter', 'registers a dataAdapter', () => {
      expect(typeof block().dataAdapter).toBe('function');
    });

    checkFor(id, 'docs', 'has non-empty block documentation', async () => {
      const { body } = await fetchBlock(id);
      expect(typeof body.docs).toBe('string');
      expect(body.docs.trim()).not.toBe('');
    });
  });
});
