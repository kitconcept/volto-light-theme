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
      { id: '1', name: 'Adobe Photoshop' },
      { id: '2', name: 'Adobe XD' },
      { id: '3', name: 'Documents' },
      { id: '4', name: 'Adobe InDesign' },
      { id: '5', name: 'Utilities' },
      { id: '6', name: 'Adobe AfterEffects' },
      { id: '7', name: 'Pictures' },
      { id: '8', name: 'Adobe Fresco' },
      { id: '9', name: 'Apps' },
      { id: '10', name: 'Adobe Illustrator' },
      { id: '11', name: 'Adobe Lightroom' },
      { id: '12', name: 'Adobe Dreamweaver' },
    ],
    value: [
      { id: '7', name: 'Pictures' },
      { id: '8', name: 'Adobe Fresco' },
      { id: '9', name: 'Apps' },
      { id: '10', name: 'Adobe Illustrator' },
      { id: '11', name: 'Adobe Lightroom' },
      { id: '12', name: 'Adobe Dreamweaver' },
    ],
    onChange: () => {},
  },
};
