import { visualTestBase } from './base';

const PUBLIC_PAGES = [
  '/block/heading-block',
  '/block/button-block',
  '/block/highlight-block',
  '/block/image-block',
  '/block/search-block',
  '/block/introduction-block',
  '/block/separator-block',
  '/block/teaser-block',
  '/block/table-block',
  '/block/text-block',
  '/block/video-block',
  '/block/toc-block',
  '/block/block-accordion',
  '/block/maps-block',
];

const PRIVATE_PAGES = ['/block/button-block', '/block/block-accordion'];

describe('Blocks', () => {
  visualTestBase(PUBLIC_PAGES, PRIVATE_PAGES);
});
