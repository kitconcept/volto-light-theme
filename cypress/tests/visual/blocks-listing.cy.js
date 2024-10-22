import { visualTestBase } from './base';

const PUBLIC_PAGES = ['/block/grid-block/listing'];

const PRIVATE_PAGES = ['/block/grid-block/listing'];

describe('Blocks-Listing', () => {
  visualTestBase(PUBLIC_PAGES, PRIVATE_PAGES);
});
