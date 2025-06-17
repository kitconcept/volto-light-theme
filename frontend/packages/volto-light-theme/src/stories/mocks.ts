import cloneDeep from 'lodash/cloneDeep';

const demoImage = 'black-starry-night.jpg';
const personImage = 'person.png';

export function ObjectBrowserItem(demoImage) {
  return {
    '@id': '/folder/page',
    '@type': 'Document',
    description:
      'The Page content type can be used to display content on a single page of the website. Pages can be structured using text, images and blocks.',
    Description:
      'The Page content type can be used to display content on a single page of the website. Pages can be structured using text, images and blocks.',
    Title: 'Page',
    title: 'Page',
    getRemoteUrl: null,
    hasPreviewImage: true,
    head_title: null,
    image_field: 'preview_image',
    image_scales: {
      preview_image: [
        {
          'content-type': 'image/jpeg',
          download: demoImage,
          filename: 'black-starry-night.jpg',
          height: 1708,
          scales: {
            great: {
              download: demoImage,
              height: 854,
              width: 1200,
            },
            huge: {
              download: demoImage,
              height: 1138,
              width: 1600,
            },
            icon: {
              download: demoImage,
              height: 22,
              width: 32,
            },
            large: {
              download: demoImage,
              height: 569,
              width: 800,
            },
            larger: {
              download: demoImage,
              height: 711,
              width: 1000,
            },
            mini: {
              download: demoImage,
              height: 142,
              width: 200,
            },
            preview: {
              download: demoImage,
              height: 284,
              width: 400,
            },
            teaser: {
              download: demoImage,
              height: 427,
              width: 600,
            },
            thumb: {
              download: demoImage,
              height: 91,
              width: 128,
            },
            tile: {
              download: demoImage,
              height: 45,
              width: 64,
            },
          },
          size: 693013,
          width: 2400,
        },
      ],
    },
  };
}

export const teaserBlock = {
  '@type': 'teaser',
  href: [
    {
      '@id': '.',
      '@type': 'Document',
      title: 'Page',
      Title: 'Page',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      Description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.',
      getRemoteUrl: null,
      hasPreviewImage: true,
      head_title: 'Head title',
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            'content-type': 'image/jpeg',
            download: demoImage,
            filename: 'black-starry-night.jpg',
            height: 1708,
            scales: {
              great: {
                download: demoImage,
                height: 854,
                width: 1200,
              },
              huge: {
                download: demoImage,
                height: 1138,
                width: 1600,
              },
              icon: {
                download: demoImage,
                height: 22,
                width: 32,
              },
              large: {
                download: demoImage,
                height: 569,
                width: 800,
              },
              larger: {
                download: demoImage,
                height: 711,
                width: 1000,
              },
              mini: {
                download: demoImage,
                height: 142,
                width: 200,
              },
              preview: {
                download: demoImage,
                height: 284,
                width: 400,
              },
              teaser: {
                download: demoImage,
                height: 427,
                width: 600,
              },
              thumb: {
                download: demoImage,
                height: 91,
                width: 128,
              },
              tile: {
                download: demoImage,
                height: 45,
                width: 64,
              },
            },
            size: 693013,
            width: 2400,
          },
        ],
      },
    },
  ],
  styles: {
    align: 'left',
  },
  title: 'Headline H2',
};

export const personBlock = {
  '@type': 'teaser',
  href: [
    {
      '@id': '.',
      '@type': 'Person',
      title: 'Kathryn Janeway',
      Title: 'Kathryn Janeway',
      description:
        'USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations.',
      Description:
        'USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations.',
      contact_email: 'janeway@ufp.earth.com',
      contact_room: "Captain's Ready Room",
      contact_phone: '123456789',
      contact_building: 'Sapphire Building',
      contact_website: null,
      getRemoteUrl: null,
      hasPreviewImage: true,
      image_field: 'preview_image',
      image_scales: {
        preview_image: [
          {
            'content-type': 'image/jpeg',
            download: personImage,
            filename: 'black-starry-night.jpg',
            height: 286,
            scales: {
              great: {
                download: personImage,
                height: 854,
                width: 1200,
              },
              huge: {
                download: personImage,
                height: 1138,
                width: 1600,
              },
              icon: {
                download: personImage,
                height: 22,
                width: 32,
              },
              large: {
                download: personImage,
                height: 569,
                width: 800,
              },
              larger: {
                download: personImage,
                height: 711,
                width: 1000,
              },
              mini: {
                download: personImage,
                height: 142,
                width: 200,
              },
              preview: {
                download: personImage,
                height: 284,
                width: 400,
              },
              teaser: {
                download: personImage,
                height: 427,
                width: 600,
              },
              thumb: {
                download: personImage,
                height: 91,
                width: 128,
              },
              tile: {
                download: personImage,
                height: 45,
                width: 64,
              },
            },
            size: 693013,
            width: 200,
          },
        ],
      },
    },
  ],
  styles: {
    align: 'left',
  },
  title: 'Headline H2',
};

const altPersonBlock = cloneDeep(personBlock);

altPersonBlock.href[0].image_scales.preview_image[0] = {
  'content-type': 'image/jpeg',
  download: demoImage,
  filename: 'black-starry-night.jpg',
  height: 286,
  scales: {
    great: {
      download: demoImage,
      height: 854,
      width: 1200,
    },
    huge: {
      download: demoImage,
      height: 1138,
      width: 1600,
    },
    icon: {
      download: demoImage,
      height: 22,
      width: 32,
    },
    large: {
      download: demoImage,
      height: 569,
      width: 800,
    },
    larger: {
      download: demoImage,
      height: 711,
      width: 1000,
    },
    mini: {
      download: demoImage,
      height: 142,
      width: 200,
    },
    preview: {
      download: demoImage,
      height: 284,
      width: 400,
    },
    teaser: {
      download: demoImage,
      height: 427,
      width: 600,
    },
    thumb: {
      download: demoImage,
      height: 91,
      width: 128,
    },
    tile: {
      download: demoImage,
      height: 45,
      width: 64,
    },
  },
  size: 693013,
  width: 200,
};

export const gridBlockOne = {
  '@type': 'gridBlock',
  blocks: {
    '281a22fb-c353-4b91-b2bc-88e6a52ed65a': {
      ...teaserBlock,
    },
  },
  blocks_layout: {
    items: ['281a22fb-c353-4b91-b2bc-88e6a52ed65a'],
  },
};

export const gridBlockTwo = {
  '@type': 'gridBlock',
  blocks: {
    '281a22fb-c353-4b91-b2bc-88e6a52ed65a': {
      ...teaserBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1': {
      ...teaserBlock,
    },
  },
  blocks_layout: {
    items: [
      '281a22fb-c353-4b91-b2bc-88e6a52ed65a',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1',
    ],
  },
};

export const gridBlockThree = {
  '@type': 'gridBlock',
  blocks: {
    '281a22fb-c353-4b91-b2bc-88e6a52ed65a': {
      ...teaserBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1': {
      ...teaserBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df2': {
      ...teaserBlock,
    },
  },
  blocks_layout: {
    items: [
      '281a22fb-c353-4b91-b2bc-88e6a52ed65a',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df2',
    ],
  },
};

export const gridBlockFour = {
  '@type': 'gridBlock',
  blocks: {
    '281a22fb-c353-4b91-b2bc-88e6a52ed65a': {
      ...teaserBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1': {
      ...teaserBlock,
    },
    '281a22fb-c353-4b91-b2bc-88e6a52ed652': {
      ...teaserBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df2': {
      ...teaserBlock,
    },
  },
  blocks_layout: {
    items: [
      '281a22fb-c353-4b91-b2bc-88e6a52ed65a',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1',
      '281a22fb-c353-4b91-b2bc-88e6a52ed652',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df2',
    ],
  },
};

export const gridBlock = {
  '@type': 'gridBlock',
  blocks: {
    '281a22fb-c353-4b91-b2bc-88e6a52ed65a': {
      '@type': 'teaser',
      description:
        'Lorem ipsum dolor sit amet adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
      head_title: 'Head title ',
      href: [
        {
          '@id': '.',
          '@type': 'Document',
          description:
            'Der Teaser-Block erlaubt das Hinzuf\u00fcgen eines Elements welches einen bestehenden Inhalte der Webseite mit einem Bild, einem Titel und einer Beschreibung anteasert.',
          Title: 'Block: Teaser',
          Description:
            'Der Teaser-Block erlaubt das Hinzuf\u00fcgen eines Elements welches einen bestehenden Inhalte der Webseite mit einem Bild, einem Titel und einer Beschreibung anteasert.',
          title: 'Block: Teaser',
          getRemoteUrl: null,
          hasPreviewImage: true,
          head_title: 'Head Title',
          image_field: 'preview_image',
          image_scales: {
            preview_image: [
              {
                'content-type': 'image/jpeg',
                download: demoImage,
                filename: 'black-starry-night.jpg',
                height: 1708,
                scales: {
                  great: {
                    download: demoImage,
                    height: 854,
                    width: 1200,
                  },
                  huge: {
                    download: demoImage,
                    height: 1138,
                    width: 1600,
                  },
                  icon: {
                    download: demoImage,
                    height: 22,
                    width: 32,
                  },
                  large: {
                    download: demoImage,
                    height: 569,
                    width: 800,
                  },
                  larger: {
                    download: demoImage,
                    height: 711,
                    width: 1000,
                  },
                  mini: {
                    download: demoImage,
                    height: 142,
                    width: 200,
                  },
                  preview: {
                    download: demoImage,
                    height: 284,
                    width: 400,
                  },
                  teaser: {
                    download: demoImage,
                    height: 427,
                    width: 600,
                  },
                  thumb: {
                    download: demoImage,
                    height: 91,
                    width: 128,
                  },
                  tile: {
                    download: demoImage,
                    height: 45,
                    width: 64,
                  },
                },
                size: 693013,
                width: 2400,
              },
            ],
          },
        },
      ],
      styles: {
        align: 'left',
      },
      title: 'Teaser Title H3',
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1': {
      '@type': 'teaser',
      description:
        'Lorem ipsum dolor sit amet adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.',
      head_title: 'Head title ',
      href: [
        {
          '@id': '.',
          '@type': 'Document',
          description:
            'Der Grid-Block erlaubt das Hinzuf\u00fcgen mehrspaltiger Bl\u00f6cke. Ein Grid-Block kann zwischen ein und vier Spalten mit unterschiedlichen Bl\u00f6cken enthalten.Teaser und Bilder k\u00f6nnen in einem Grid-Block hinzugef\u00fcgt werden.',
          title: 'Block: Grid',
          Description:
            'Der Grid-Block erlaubt das Hinzuf\u00fcgen mehrspaltiger Bl\u00f6cke. Ein Grid-Block kann zwischen ein und vier Spalten mit unterschiedlichen Bl\u00f6cken enthalten.Teaser und Bilder k\u00f6nnen in einem Grid-Block hinzugef\u00fcgt werden.',
          Title: 'Block: Grid',
          getRemoteUrl: null,
          hasPreviewImage: true,
          head_title: 'Head Title',
          image_field: 'preview_image',
          image_scales: {
            preview_image: [
              {
                'content-type': 'image/jpeg',
                download: demoImage,
                filename: 'black-starry-night.jpg',
                height: 1708,
                scales: {
                  great: {
                    download: demoImage,
                    height: 854,
                    width: 1200,
                  },
                  huge: {
                    download: demoImage,
                    height: 1138,
                    width: 1600,
                  },
                  icon: {
                    download: demoImage,
                    height: 22,
                    width: 32,
                  },
                  large: {
                    download: demoImage,
                    height: 569,
                    width: 800,
                  },
                  larger: {
                    download: demoImage,
                    height: 711,
                    width: 1000,
                  },
                  mini: {
                    download: demoImage,
                    height: 142,
                    width: 200,
                  },
                  preview: {
                    download: demoImage,
                    height: 284,
                    width: 400,
                  },
                  teaser: {
                    download: demoImage,
                    height: 427,
                    width: 600,
                  },
                  thumb: {
                    download: demoImage,
                    height: 91,
                    width: 128,
                  },
                  tile: {
                    download: demoImage,
                    height: 45,
                    width: 64,
                  },
                },
                size: 693013,
                width: 2400,
              },
            ],
          },
        },
      ],
      preview_image: [
        {
          '@id': '',
          image_field: 'image',
          image_scales: {
            image: [
              {
                'content-type': 'image/jpeg',
                download: demoImage,
                filename: 'image-light.jpg',
                height: 633,
                scales: {
                  icon: {
                    download: demoImage,
                    height: 17,
                    width: 32,
                  },
                  large: {
                    download: demoImage,
                    height: 449,
                    width: 800,
                  },
                  larger: {
                    download: demoImage,
                    height: 562,
                    width: 1000,
                  },
                  mini: {
                    download: demoImage,
                    height: 112,
                    width: 200,
                  },
                  preview: {
                    download: demoImage,
                    height: 224,
                    width: 400,
                  },
                  teaser: {
                    download: demoImage,
                    height: 337,
                    width: 600,
                  },
                  thumb: {
                    download: demoImage,
                    height: 71,
                    width: 128,
                  },
                  tile: {
                    download: demoImage,
                    height: 35,
                    width: 64,
                  },
                },
                size: 475285,
                width: 1126,
              },
            ],
          },
          title: 'Image - Light',
        },
      ],
      styles: {
        align: 'left',
      },
      title: 'Teaser Title H3',
    },
  },
  blocks_layout: {
    items: [
      '281a22fb-c353-4b91-b2bc-88e6a52ed65a',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1',
    ],
  },
  styles: {
    backgroundColor: 'grey',
  },
};

export const gridBlockTwoDocumentPerson = {
  '@type': 'gridBlock',
  blocks: {
    '281a22fb-c353-4b91-b2bc-88e6a52ed65a': {
      ...teaserBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1': {
      ...personBlock,
    },
  },
  blocks_layout: {
    items: [
      '281a22fb-c353-4b91-b2bc-88e6a52ed65a',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1',
    ],
  },
};

export const gridBlockOnePerson = {
  '@type': 'gridBlock',
  blocks: {
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1': {
      ...personBlock,
    },
  },
  blocks_layout: {
    items: ['f34fa7dd-ce59-4f7f-b795-7d7f1e388df1'],
  },
};

export const gridBlockTwoPerson = {
  '@type': 'gridBlock',
  blocks: {
    '281a22fb-c353-4b91-b2bc-88e6a52ed65a': {
      ...personBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1': {
      ...personBlock,
    },
  },
  blocks_layout: {
    items: [
      '281a22fb-c353-4b91-b2bc-88e6a52ed65a',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1',
    ],
  },
};

export const gridBlockTwoPersonDifferentRatio = {
  '@type': 'gridBlock',
  blocks: {
    '281a22fb-c353-4b91-b2bc-88e6a52ed65a': {
      ...personBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1': {
      ...altPersonBlock,
    },
  },
  blocks_layout: {
    items: [
      '281a22fb-c353-4b91-b2bc-88e6a52ed65a',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1',
    ],
  },
};

export const gridBlockThreePerson = {
  '@type': 'gridBlock',
  blocks: {
    '281a22fb-c353-4b91-b2bc-88e6a52ed65a': {
      ...personBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1': {
      ...personBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df2': {
      ...personBlock,
    },
  },
  blocks_layout: {
    items: [
      '281a22fb-c353-4b91-b2bc-88e6a52ed65a',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df2',
    ],
  },
};

export const gridBlockFourPerson = {
  '@type': 'gridBlock',
  blocks: {
    '281a22fb-c353-4b91-b2bc-88e6a52ed65a': {
      ...personBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1': {
      ...personBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df2': {
      ...personBlock,
    },
    'f34fa7dd-ce59-4f7f-b795-7d7f1e388df3': {
      ...personBlock,
    },
  },
  blocks_layout: {
    items: [
      '281a22fb-c353-4b91-b2bc-88e6a52ed65a',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df1',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df2',
      'f34fa7dd-ce59-4f7f-b795-7d7f1e388df3',
    ],
  },
};

export const listingBlockPerson = {
  '@type': 'listing',
  items: [
    {
      '@id': 'http://localhost:3000/asdasd-asdasdasd',
      '@type': 'Person',
      CreationDate: '2025-05-19T17:23:06+02:00',
      Creator: 'admin',
      Date: '2025-05-22T09:10:50+02:00',
      Description:
        'USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations.',
      EffectiveDate: 'None',
      ExpirationDate: 'None',
      ModificationDate: '2025-05-22T09:10:50+02:00',
      Subject: [],
      Title: 'Kathryn Janeway',
      Type: 'Person',
      UID: '2b730627efc24a089e00a315735bfe5b',
      cmf_uid: 1,
      contact_building: null,
      contact_email: 'janeway@ufp.earth.com',
      contact_phone: '124312312313',
      contact_room: 'Ready room',
      country: null,
      created: '2025-05-19T15:23:06+00:00',
      description:
        'USS Voyager Captain from the 24th century. She is known for her strong leadership skills and her ability to make tough decisions in difficult situations.',
      effective: '1969-12-30T22:00:00+00:00',
      end: null,
      exclude_from_nav: false,
      expires: '2499-12-30T22:00:00+00:00',
      getIcon: null,
      getId: 'asdasd-asdasdasd',
      getObjSize: '0 KB',
      getPath: '/Plone/asdasd-asdasdasd',
      getRemoteUrl: null,
      getURL: 'http://localhost:3000/asdasd-asdasdasd',
      hasPreviewImage: null,
      head_title: null,
      id: 'asdasd-asdasdasd',
      image_field: 'preview_image_link',
      image_scales: {
        preview_image_link: [
          {
            base_path: './',
            'content-type': 'image/png',
            download: personImage,
            filename: 'person.png',
            height: 286,
            scales: {
              icon: {
                download: personImage,
                height: 32,
                width: 24,
              },
              mini: {
                download: personImage,
                height: 260,
                width: 200,
              },
              thumb: {
                download: personImage,
                height: 128,
                width: 98,
              },
              tile: {
                download: personImage,
                height: 64,
                width: 49,
              },
            },
            size: 37757,
            width: 220,
          },
        ],
      },
      is_folderish: true,
      listCreators: ['admin'],
      location: null,
      mime_type: 'text/plain',
      modified: '2025-05-22T07:10:50+00:00',
      nav_title: null,
      portal_type: 'Person',
      review_state: 'private',
      roles: ['member'],
      start: null,
      sync_uid: null,
      title: 'Kathryn Janeway',
      type_title: 'Person',
      username: null,
    },
  ],
  items_total: 1,
};
