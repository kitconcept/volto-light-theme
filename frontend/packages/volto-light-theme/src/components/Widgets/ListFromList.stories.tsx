import ListFromList from './ListFromList';
import { withWidgetWrapper } from '../../stories/WidgetWrapper';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Widgets/ListFromList',
  component: ListFromList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 'var(--layout-container-width)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ListFromList>;

export default meta;
type Story = StoryObj<typeof meta>;

const Widget = withWidgetWrapper(ListFromList);

export const Default: Story = {
  render: (args) => <Widget {...args} />,
  args: {
    id: 'listfromlist',
    title: 'List from List',
    'aria-label': 'List from List',
    options: [
      'Adobe Photoshop',
      'Adobe XD',
      'Documents',
      'Adobe InDesign',
      'Utilities',
      'Adobe AfterEffects',
      'Pictures',
      'Adobe Fresco',
      'Apps',
      'Adobe Illustrator',
      'Adobe Lightroom',
      'Adobe Dreamweaver',
    ],
    value: [
      'Pictures',
      'Adobe Fresco',
      'Apps',
      'Adobe Illustrator',
      'Adobe Lightroom',
      'Adobe Dreamweaver',
    ],
    onChange: () => {},
  },
};
