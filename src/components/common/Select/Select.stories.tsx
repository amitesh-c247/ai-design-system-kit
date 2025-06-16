import type { Meta, StoryObj } from '@storybook/react';
import Select from './index';

const meta: Meta<typeof Select> = {
  title: 'Common/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    isValid: {
      control: 'boolean',
    },
    isInvalid: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4', disabled: true },
];

const optionGroups = [
  {
    label: 'Group 1',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ],
  },
  {
    label: 'Group 2',
    options: [
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4', disabled: true },
    ],
  },
];

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select an option',
  },
};

export const WithOptionGroups: Story = {
  args: {
    optionGroups,
    placeholder: 'Select an option',
  },
};

export const WithChildren: Story = {
  render: () => (
    <Select placeholder="Select an option">
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
      <option value="4" disabled>Option 4</option>
    </Select>
  ),
};

export const Small: Story = {
  args: {
    options,
    size: 'sm',
    placeholder: 'Small select',
  },
};

export const Large: Story = {
  args: {
    options,
    size: 'lg',
    placeholder: 'Large select',
  },
};

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
    placeholder: 'Disabled select',
  },
};

export const Valid: Story = {
  args: {
    options,
    isValid: true,
    placeholder: 'Valid select',
  },
};

export const Invalid: Story = {
  args: {
    options,
    isInvalid: true,
    placeholder: 'Invalid select',
  },
};
