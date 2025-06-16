import { Meta, StoryFn } from '@storybook/react';

import FilterButton from './FilterButton';

export default {
  title: 'LeanDesign/Filter/Button',
  component: FilterButton,
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
} as Meta<typeof FilterButton>;

const Template: StoryFn<typeof FilterButton> = (args) => <FilterButton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  labelBase: 'Resource',
  labelCount: 0,
  labelName: 'All',
};
