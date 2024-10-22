import { visualTestBase } from './base';

const PUBLIC_PAGES = [
  '/content-types/page',
  '/content-types/image-light',
  '/content-types/event',
];

const PRIVATE_PAGES = [];

describe('Content', () => {
  visualTestBase(PUBLIC_PAGES, PRIVATE_PAGES);
});
