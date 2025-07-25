import type { Meta, StoryObj } from '@storybook/react';
import Input from './index';
import Password, { PasswordProps } from './Password';
import Search, { SearchProps } from './Search';
import TextArea, { TextAreaProps } from './TextArea';
import type { InputProps } from './index';

const meta: Meta<typeof Input> = {
  title: 'Common/Form/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'number', 'tel', 'url'],
    },
    isValid: {
      control: 'boolean',
    },
    isInvalid: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: 'Enter text...',
    'aria-label': 'Input with label',
  },
};

export const WithFeedback: Story = {
  args: {
    placeholder: 'Enter text...',
    isInvalid: true,
    feedback: 'Please enter a valid value',
  },
};

export const Valid: Story = {
  args: {
    placeholder: 'Enter text...',
    isValid: true,
    feedback: 'Looks good!',
    feedbackType: 'valid',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter text...',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    placeholder: 'Enter text...',
    required: true,
  },
};

export const PasswordInput: StoryObj<typeof Password> = {
  render: (args: PasswordProps) => <Password {...args} />,
  args: {
    placeholder: 'Enter password...',
  },
};

export const SearchInput: StoryObj<typeof Search> = {
  render: (args: SearchProps) => <Search {...args} />,
  args: {
    placeholder: 'Search...',
  },
};

export const TextAreaInput: StoryObj<typeof TextArea> = {
  render: (args: TextAreaProps) => <TextArea {...args} />,
  args: {
    placeholder: 'Enter text...',
    rows: 3,
  },
}; 