import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { NodesPickerFilter } from './ResourcePicker';

export default {
  title: 'LeanDesign/Filter/NodesPicker',
  component: NodesPickerFilter,
  parameters: {
    docs: {
      description: {
        component: 'Filter by assets. To be used over the deprecated `ResourceTreeFilter`.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/proto/UPYLw23K7IgW1JH6RY7i6m/Leanspace-Design-System-(beta)?node-id=995-29596&starting-point-node-id=178%3A1',
    },
  },
} as Meta<typeof NodesPickerFilter>;

const Template: StoryFn<typeof NodesPickerFilter> = (args) => <NodesPickerFilter {...args} />;

export const Basic = Template.bind({});
Basic.decorators = [
  (Story) => (
    <QueryClientProvider client={new QueryClient()}>
      <Story />
    </QueryClientProvider>
  ),
];
Basic.args = {
  filterLabel: 'Options',
  value: [],
};
