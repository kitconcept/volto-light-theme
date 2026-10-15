import { expect, test } from '../../test';
import { createContent } from '../../content';
import { openBlockEditor } from './editor';

test.describe('Blocks Tests', () => {
  test.beforeEach(async ({ page }) => {
    await openBlockEditor(page);
  });

  test('Handles unknown blocks', async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'test-doc',
      contentTitle: 'my test document',
      bodyModifier: (body) => ({
        ...body,
        blocks: {
          'd3f1c443-583f-4e8e-a682-3bf25752a300': { '@type': 'title' },
          '7624cf59-05d0-4055-8f55-5fd6597d84b0': { '@type': 'slate' },
          abc: { '@type': 'missing' },
        },
        blocks_layout: {
          items: [
            'd3f1c443-583f-4e8e-a682-3bf25752a300',
            '7624cf59-05d0-4055-8f55-5fd6597d84b0',
            'abc',
          ],
        },
      }),
    });
    await page.goto('/test-doc');
    await expect(
      page.locator('#page-document .blocks-group-wrapper div'),
    ).toHaveText('Unknown Block missing');
  });
});
