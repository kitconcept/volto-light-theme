import { visualTestBase } from './base';

const PUBLIC_PAGES = [
  '/vertical-spacing/grid-and-button',
  '/vertical-spacing/grid-and-grids',
  '/vertical-spacing/grid-and-text',
  '/vertical-spacing/heading-and-introduction',
  '/vertical-spacing/highlight-and-grid',
  '/vertical-spacing/highlight-and-text',
  '/vertical-spacing/teasers-and-text',
  '/vertical-spacing/text',
];

const PRIVATE_PAGES = [];

describe('Vertical Spacing', () => {
  visualTestBase(PUBLIC_PAGES, PRIVATE_PAGES);
});
