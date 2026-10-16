import type { Page } from '@playwright/test';
import { save } from './blocks';
import { createContent } from './content';
import { selectInternalLink } from './object-browser';
import { expect } from './test';

type RelationItem = {
  contentType: string;
  contentId: string;
  contentTitle: string;
};

export const richtextTargets: RelationItem[] = [
  {
    contentType: 'Document',
    contentId: 'document-linked',
    contentTitle: 'Document that is linked',
  },
  {
    contentType: 'News Item',
    contentId: 'news-item-linked',
    contentTitle: 'News Item that is linked',
  },
  {
    contentType: 'Event',
    contentId: 'event-linked',
    contentTitle: 'Event that is linked',
  },
  {
    contentType: 'File',
    contentId: 'file-linked',
    contentTitle: 'File that is linked',
  },
  {
    contentType: 'Image',
    contentId: 'image-linked',
    contentTitle: 'Image that is linked',
  },
  {
    contentType: 'Link',
    contentId: 'link-linked',
    contentTitle: 'Link that is linked',
  },
];

export const documentTarget = richtextTargets[0];
export const imageTarget = richtextTargets[4];

export const blockRelations = [
  { form: 'teaser', title: 'teaser block' },
  { form: 'teaser-override', title: 'teaser block with a UI image override' },
  { form: 'image', title: 'image block source' },
  { form: 'image-link', title: 'image block link' },
  { form: 'grid', title: 'teaser block inside a grid block' },
] as const;

type BlockForm = (typeof blockRelations)[number]['form'];

async function createReferrer(
  page: Page,
  contentTitle: string,
  block: Record<string, unknown>,
) {
  const referrer = {
    contentType: 'Document',
    contentId: 'document-linking',
    contentTitle,
  };
  await createContent(page, {
    ...referrer,
    bodyModifier: (body) => ({
      ...body,
      blocks: { title: { '@type': 'title' }, abc: block },
      blocks_layout: { items: ['title', 'abc'] },
    }),
  });
  return referrer;
}

export async function createRichtextRelation(page: Page, target: RelationItem) {
  await createContent(page, {
    ...target,
    bodyModifier: (body) =>
      target.contentType === 'Link'
        ? { ...body, remoteUrl: 'https://plone.org' }
        : body,
  });
  return createReferrer(
    page,
    `Document that is linking a ${target.contentType}`,
    {
      '@type': 'slate',
      plaintext: ' My Link ',
      value: [
        {
          type: 'p',
          children: [
            { text: '' },
            {
              type: 'link',
              data: { url: `/${target.contentId}` },
              children: [{ text: 'My Link' }],
            },
            { text: '' },
          ],
        },
      ],
    },
  );
}

export async function createBlockRelation(page: Page, form: BlockForm) {
  if (form !== 'image') {
    await createContent(page, documentTarget);
  }
  if (['teaser-override', 'image', 'image-link'].includes(form)) {
    await createContent(page, imageTarget);
  }

  const teaser = {
    '@type': 'teaser',
    description: '',
    href: [
      {
        '@id': '/document-linked',
        '@type': 'Document',
        Title: 'Document linked',
        title: 'Document linked',
        image_field: form === 'teaser-override' ? 'image' : '',
      },
    ],
    title: 'Document linked',
  };
  const image = {
    '@type': 'image',
    alt: imageTarget.contentTitle,
    image_field: 'image',
    url: '/image-linked',
    ...(form === 'image-link' && {
      href: [
        {
          '@id': 'document-linked',
          Title: 'Document linked in image block',
        },
      ],
    }),
  };
  const referrer = await createReferrer(
    page,
    form === 'grid'
      ? 'Document that is linking via teaser block in grid'
      : `Document that is linking via ${form.startsWith('image') ? 'image' : 'teaser'} block`,
    form === 'grid'
      ? {
          '@type': 'gridBlock',
          blocks: {
            xyz: {
              ...teaser,
              description: 'linked',
              styles: { align: 'left' },
            },
          },
          blocks_layout: { items: ['xyz'] },
        }
      : form.startsWith('image')
        ? image
        : teaser,
  );

  if (form === 'teaser-override') {
    await page.goto('/document-linking/edit');
    await page.locator('.block.teaser .card-summary').click();
    // Re-select the same target so API fixture URLs use the editor's link format.
    const targetField = page.locator(
      '.field-wrapper-href .objectbrowser-field',
    );
    await targetField
      .getByRole('button', { name: 'Open object browser' })
      .click();
    await selectInternalLink(page, targetField, documentTarget.contentTitle);
    const field = page.locator(
      '.field-wrapper-preview_image .objectbrowser-field',
    );
    await selectInternalLink(page, field, imageTarget.contentTitle, {
      doubleClick: false,
    });
    await expect(
      field.getByText(imageTarget.contentTitle, { exact: true }),
    ).toBeVisible();
    await save(page);
  }
  return referrer;
}
