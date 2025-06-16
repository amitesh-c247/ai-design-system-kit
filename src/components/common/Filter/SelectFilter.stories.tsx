import { Meta, StoryFn } from '@storybook/react';

import Button from '../Button';
import SelectFilter from './Select';

export default {
  title: 'LeanDesign/Filter/Select',
  component: SelectFilter,
  parameters: {
    docs: {
      description: {
        component: 'A select filter that lets the user pick one of several options.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/proto/UPYLw23K7IgW1JH6RY7i6m/Leanspace-Design-System-(beta)?node-id=995-29596&starting-point-node-id=178%3A1',
    },
  },
} as Meta<typeof SelectFilter>;

const Template: StoryFn<typeof SelectFilter> = (args) => <SelectFilter {...args} />;

const options = [
  { label: 'Option 1', value: 'id-1' },
  { label: 'Option 2', value: 'id-2' },
];

export const Basic = Template.bind({});
Basic.args = {
  filterLabel: 'Options',
  options,
};

export const TagsMode = Template.bind({});
TagsMode.args = {
  mode: 'tags',
  filterLabel: 'Options',
  options,
};

export const MultipleMode = Template.bind({});
MultipleMode.args = {
  mode: 'multiple',
  filterLabel: 'Options',
  options,
};

export const MultipleModeWithManualFilterType = Template.bind({});
MultipleModeWithManualFilterType.args = {
  mode: 'multiple',
  filterLabel: 'Options',
  options,
  dropdownRender: () => <Button onClick={() => alert('Filter Applied')}>Apply</Button>,
};
