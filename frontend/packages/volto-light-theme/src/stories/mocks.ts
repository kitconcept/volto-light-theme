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
      head_title: 'Kicker',
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

function slideImageScales(image = demoImage) {
  return {
    preview_image: [
      {
        'content-type': 'image/jpeg',
        download: image,
        filename: 'black-starry-night.jpg',
        height: 1708,
        scales: {
          great: { download: image, height: 854, width: 1200 },
          huge: { download: image, height: 1138, width: 1600 },
          icon: { download: image, height: 22, width: 32 },
          large: { download: image, height: 569, width: 800 },
          larger: { download: image, height: 711, width: 1000 },
          mini: { download: image, height: 142, width: 200 },
          preview: { download: image, height: 284, width: 400 },
          teaser: { download: image, height: 427, width: 600 },
          thumb: { download: image, height: 91, width: 128 },
          tile: { download: image, height: 45, width: 64 },
        },
        size: 693013,
        width: 2400,
      },
    ],
  };
}

export const eventMetadataContent = {
  '@id': 'https://plone.org/events/conference',
  '@type': 'Event',
  title: 'Plone Conference 2026',
  start: '2026-10-08T09:00:00',
  end: '2026-10-12T18:00:00',
  whole_day: false,
  open_end: false,
  location: 'Vigo, Spain',
  event_url: 'https://plone.org/events/conference',
  contact_name: 'Conference Team',
  contact_email: 'conference@plone.org',
  contact_phone: '+34 555 010 100',
};

function searchResult(id, title, description) {
  return {
    '@id': `https://plone.org/${id}`,
    '@type': 'Document',
    id,
    title,
    description,
    review_state: 'published',
  };
}

export const searchResultItems = [
  searchResult(
    'about',
    'About Plone',
    'Plone is a free and open source content management system.',
  ),
  searchResult(
    'features',
    'Features',
    'Discover the powerful features that make Plone stand out.',
  ),
  searchResult(
    'documentation',
    'Documentation',
    'Everything you need to get started and go deep with Plone.',
  ),
  searchResult(
    'community',
    'Community',
    'Meet the people and organisations behind Plone.',
  ),
];

function eventItem(id, title, head_title, description, start, end) {
  return {
    '@id': `https://plone.org/events/${id}`,
    '@type': 'Event',
    id,
    title,
    head_title,
    description,
    start,
    end,
    review_state: 'published',
  };
}

// Events used to feed the eventCalendar listing (the block reads them from the
// redux `querystringsearch` results, injected via the Wrapper's `customStore`).
export const eventCalendarItems = [
  eventItem(
    'event-1',
    'Annual Community Meetup',
    'Conference',
    'A full day of talks, workshops and networking for the community.',
    '2026-09-15T09:00:00',
    '2026-09-15T17:00:00',
  ),
  eventItem(
    'event-2',
    'Autumn Training Days',
    'Workshop',
    'A hands-on, multi-day training covering the fundamentals and beyond.',
    '2026-09-20T09:00:00',
    '2026-09-22T16:00:00',
  ),
  eventItem(
    'event-3',
    'Release Party',
    'Celebration',
    'Join us to celebrate the newest release with the whole team.',
    '2026-10-05T18:00:00',
    '2026-10-05T22:00:00',
  ),
  eventItem(
    'event-4',
    'Open Sprint',
    'Sprint',
    'A collaborative sprint focused on documentation and testing.',
    '2026-10-18T09:00:00',
    '2026-10-20T18:00:00',
  ),
];

function carouselColumn(id, title, description) {
  return {
    '@id': id,
    '@type': 'teaser',
    head_title: 'Kicker',
    title,
    description,
    styles: { align: 'center' },
    href: [
      {
        '@id': '.',
        '@type': 'Document',
        title,
        Title: title,
        description,
        Description: description,
        hasPreviewImage: true,
        head_title: 'Kicker',
        image_field: 'preview_image',
        image_scales: slideImageScales(),
      },
    ],
  };
}

const carouselColumns = [
  carouselColumn('col-1', 'First card', 'Lorem ipsum dolor sit amet.'),
  carouselColumn('col-2', 'Second card', 'Consetetur sadipscing elitr.'),
  carouselColumn('col-3', 'Third card', 'Sed diam nonumy eirmod tempor.'),
  carouselColumn('col-4', 'Fourth card', 'Invidunt ut labore et dolore.'),
  carouselColumn('col-5', 'Fifth card', 'Magna aliquyam erat, sed diam.'),
  carouselColumn('col-6', 'Sixth card', 'At vero eos et accusam et justo.'),
];

export const carouselBlock = {
  '@type': 'carousel',
  items_to_show: 4,
  columns: carouselColumns,
};

export const bannerBlock = {
  '@type': 'banner',
  // The View builds the image src as `${url}/@@images/image`; a matching static
  // file exists at stories/static/demo-banner/@@images/image.
  url: 'demo-banner',
  alt: 'Starry night banner',
  text: 'Discover the night sky',
  additionalText: 'A journey through the stars above us',
  styles: {
    'blockWidth:noprefix': 'layout',
  },
};

export const socialNetworks = [
  {
    id: 'facebook',
    title: 'Facebook',
    href: [{ '@id': 'https://facebook.com/plone' }],
  },
  {
    id: 'instagram',
    title: 'Instagram',
    href: [{ '@id': 'https://instagram.com/plone' }],
  },
  {
    id: 'mastodon',
    title: 'Mastodon',
    href: [{ '@id': 'https://plone.social/@plone' }],
  },
  {
    id: 'bluesky',
    title: 'Bluesky',
    href: [{ '@id': 'https://bsky.app/profile/plone.org' }],
  },
  {
    id: 'youtube',
    title: 'YouTube',
    href: [{ '@id': 'https://youtube.com/@plone' }],
  },
  {
    id: 'github',
    title: 'GitHub',
    href: [{ '@id': 'https://github.com/plone' }],
  },
];

export const followUsBlock = {
  '@type': 'followUsBlock',
  title: 'Follow us',
  animate: false,
  allowedNetworks: [],
  styles: {},
};

function accordionPanel(id, title, text) {
  const slateId = `${id}-slate`;
  return {
    '@type': 'accordionPanel',
    title,
    blocks: {
      [slateId]: {
        '@type': 'slate',
        value: [{ type: 'p', children: [{ text }] }],
        plaintext: text,
      },
    },
    blocks_layout: { items: [slateId] },
  };
}

export const accordionBlock = {
  '@type': 'accordion',
  title_size: 'h3',
  collapsed: false,
  data: {
    blocks: {
      'panel-1': accordionPanel(
        'panel-1',
        'What is Plone?',
        'Plone is a free and open source content management system built on top of the Zope application server. Plone is positioned as an enterprise CMS.',
      ),
      'panel-2': accordionPanel(
        'panel-2',
        'How do I create content?',
        'Content is created using blocks. Each block can hold text, images, teasers and many other kinds of content, arranged however you like.',
      ),
      'panel-3': accordionPanel(
        'panel-3',
        'Is it accessible?',
        'Accessibility is a first-class concern. Components ship with sensible semantics and keyboard support out of the box.',
      ),
    },
    blocks_layout: { items: ['panel-1', 'panel-2', 'panel-3'] },
  },
};

export const buttonBlock = {
  '@type': '__button',
  title: 'Read more',
  href: [{ '@id': 'https://plone.org', title: 'Plone' }],
  styles: {
    'align:noprefix': 'left',
  },
};

export const headingBlock = {
  '@type': 'heading',
  tag: 'h2',
  heading: 'This is a section heading',
};

export const slateBlock = {
  '@type': 'slate',
  value: [
    { type: 'h2', children: [{ text: 'A rich text section' }] },
    {
      type: 'p',
      children: [
        { text: 'Lorem ipsum dolor sit amet, ' },
        { type: 'strong', children: [{ text: 'consetetur sadipscing' }] },
        { text: ' elitr, sed diam ' },
        { type: 'em', children: [{ text: 'nonumy eirmod' }] },
        {
          text: ' tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        },
      ],
    },
    {
      type: 'ul',
      children: [
        { type: 'li', children: [{ text: 'First list item' }] },
        { type: 'li', children: [{ text: 'Second list item' }] },
        { type: 'li', children: [{ text: 'Third list item' }] },
      ],
    },
  ],
  plaintext: 'A rich text section Lorem ipsum dolor sit amet...',
};

export const imageBlock = {
  '@type': 'image',
  url: '.',
  image_field: 'preview_image',
  image_scales: slideImageScales(),
  alt: 'A starry night sky',
  styles: {
    'size:noprefix': 'l',
    'align:noprefix': 'center',
  },
};

export const videoBlock = {
  '@type': 'video',
  url: 'https://www.youtube.com/watch?v=RQERWhVcYqE',
  align: 'center',
};

export const tocContent = {
  blocks: {
    'h-1': { '@type': 'heading', tag: 'h2', heading: 'Introduction' },
    'h-2': { '@type': 'heading', tag: 'h2', heading: 'Getting started' },
    'h-3': { '@type': 'heading', tag: 'h2', heading: 'Configuration' },
    'h-4': { '@type': 'heading', tag: 'h2', heading: 'Advanced topics' },
  },
  blocks_layout: {
    items: ['h-1', 'h-2', 'h-3', 'h-4'],
  },
};

export const tocBlock = {
  '@type': 'toc',
  title: 'Table of contents',
  levels: ['h2'],
};

export const highlightBlock = {
  '@type': 'highlight',
  url: '.',
  image_field: 'preview_image',
  image_scales: slideImageScales(),
  headtitle: 'Kicker',
  title: 'This is a highlight headline',
  value: [
    {
      type: 'p',
      children: [
        {
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        },
      ],
    },
  ],
  button: true,
  buttonText: 'Continue reading',
  buttonLink: [{ '@id': 'https://plone.org', title: 'Plone' }],
  styles: {
    descriptionColor: 'highlight-custom-color-1',
  },
};

function sliderSlide(id, title, description) {
  return {
    '@id': id,
    head_title: 'Kicker',
    title,
    description,
    buttonText: 'Continue reading',
    href: [
      {
        '@id': '.',
        '@type': 'Document',
        title,
        Title: title,
        description,
        Description: description,
        getRemoteUrl: null,
        hasPreviewImage: true,
        head_title: 'Kicker',
        image_field: 'preview_image',
        image_scales: slideImageScales(),
      },
    ],
  };
}

export const sliderBlock = {
  '@type': 'slider',
  variation: 'default',
  // In production the slider always renders inside a `.blocks-group-wrapper`,
  // which defines the `--theme-*` variables. The slider dots depend on those
  // variables for their color, so the wrapper (added by BlockWrapper when a
  // `theme` is present) is required for the dots to be visible.
  theme: 'default',
  slides: [
    sliderSlide(
      'slide-1',
      'First slide headline',
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    ),
    sliderSlide(
      'slide-2',
      'Second slide headline',
      'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    ),
    sliderSlide(
      'slide-3',
      'Third slide headline',
      'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.',
    ),
  ],
};

export const separatorBlock = {
  '@type': 'separator',
  styles: {},
};

export const introductionBlock = {
  '@type': 'introduction',
  value: [
    {
      type: 'p',
      children: [
        {
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, ',
        },
        { type: 'strong', children: [{ text: 'sed diam voluptua' }] },
        { text: '. At vero eos et accusam et justo duo dolores et ea rebum, ' },
        { type: 'em', children: [{ text: 'stet clita kasd gubergren' }] },
        { text: ', no sea takimata sanctus est Lorem ipsum dolor sit amet.' },
      ],
    },
  ],
};

function logoItem(id, alt, image) {
  return {
    '@id': id,
    alt,
    logo: [
      {
        '@id': '',
        image_field: 'image',
        image_scales: {
          image: [
            {
              download: image,
              filename: image,
              'content-type': 'image/jpeg',
            },
          ],
        },
      },
    ],
    href: [{ '@id': 'https://plone.org', title: alt }],
  };
}

export const logosBlock = {
  '@type': 'logos',
  logos_size: 's',
  logos_container_width: 'default',
  logos: [
    logoItem('logo-1', 'Logo one', 'image-light.jpg'),
    logoItem('logo-2', 'Logo two', 'black-starry-night.jpg'),
    logoItem('logo-3', 'Logo three', 'person.png'),
    logoItem('logo-4', 'Logo four', 'image-light.jpg'),
    logoItem('logo-5', 'Logo five', 'black-starry-night.jpg'),
    logoItem('logo-6', 'Logo six', 'person.png'),
  ],
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
      head_title: 'Kicker',
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
          head_title: 'Kicker',
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
      head_title: 'Kicker',
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
          head_title: 'Kicker',
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
