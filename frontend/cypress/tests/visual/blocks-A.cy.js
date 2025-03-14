import { visualTestBase } from './base';

const PUBLIC_PAGES = [
  '/block/heading-block',
  '/block/button-block',
  '/block/highlight-block',
  '/block/image-block',
  '/block/introduction-block',
  '/block/separator-block',
  '/block/teaser-block',
];

const PRIVATE_PAGES = [];

describe('Blocks', () => {
  visualTestBase(PUBLIC_PAGES, PRIVATE_PAGES);
});
