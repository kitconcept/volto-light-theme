import { visualTestBase } from './base';

const PUBLIC_PAGES = [
  '/block/table-block',
  '/block/text-block',
  '/block/video-block',
  '/block/toc-block',
  '/block/block-accordion',
  '/block/maps-block',
];

const PRIVATE_PAGES = [];

describe('Blocks', () => {
  visualTestBase(PUBLIC_PAGES, PRIVATE_PAGES);
});
