import { visualTestBase } from './base';

const PUBLIC_PAGES = [
  '/block/grid-block/text',
  '/block/grid-block/image',
  '/block/grid-block/teaser',
];

const PRIVATE_PAGES = [];

describe('Blocks-Grid', () => {
  visualTestBase(PUBLIC_PAGES, PRIVATE_PAGES);
});
