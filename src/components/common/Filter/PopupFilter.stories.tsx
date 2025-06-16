import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PopupFilter from './PopupFilter';

export default {
  title: 'LeanDesign/Filter/Popup',
  component: PopupFilter,
  parameters: {
    docs: {
      description: {
        component:
          'The FilterButton is used to render the top level button that opens and closes the actual filter. This is a low level component, it is usually taken care of by the other filters.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/proto/UPYLw23K7IgW1JH6RY7i6m/Leanspace-Design-System-(beta)?node-id=995-29596&starting-point-node-id=178%3A1',
    },
  },
} as Meta<typeof PopupFilter>;

const Template: StoryFn<typeof PopupFilter> = (args) => <PopupFilter {...args} />;

export const Basic = Template.bind({});
Basic.decorators = [
  (Story) => (
    <QueryClientProvider client={new QueryClient()}>
      <Story />
    </QueryClientProvider>
  ),
];
Basic.args = {
  label: 'Resource',
  labelCount: 0,
  labelName: 'All',
  onApply: () => alert('Apply filter.'),
  onClear: () => alert('Clear filter.'),
  children: <input placeholder="A custom filtering component" />,
};
