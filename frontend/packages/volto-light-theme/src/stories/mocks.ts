const demoImage = 'black-starry-night.jpg';

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
