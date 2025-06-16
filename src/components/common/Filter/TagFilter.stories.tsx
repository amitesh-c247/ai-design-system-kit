import { Meta, StoryFn } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import TagFilter from './TagFilter';

export default {
  title: 'LeanDesign/Filter/Tag',
  component: TagFilter,
  parameters: {
    docs: {
      description: {
        component:
          'The TagFilter is used to render a tag that can be used to filter a list of items. It is usually used in combination with the PopupFilter.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/proto/UPYLw23K7IgW1JH6RY7i6m/Leanspace-Design-System-(beta)?node-id=995-29596&starting-point-node-id=178%3A1',
    },
  },
} as Meta<typeof TagFilter>;

const Template: StoryFn<typeof TagFilter> = (args) => <TagFilter {...args} />;

export const Basic = Template.bind({});
Basic.decorators = [
  (Story) => (
    <QueryClientProvider client={new QueryClient()}>
      <Story />
    </QueryClientProvider>
  ),
];
Basic.args = {
  showFilterButton: true,
  type: 'contact',
};
