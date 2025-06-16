import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './index';

const meta: Meta<typeof Checkbox> = {
  title: 'Common/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
    inline: { control: 'boolean' },
    isValid: { control: 'boolean' },
    isInvalid: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic Checkbox
export const Basic: Story = {
  args: {
    label: 'Basic Checkbox',
    id: 'basic-checkbox',
  },
};

// Checked State
export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
    id: 'checked-checkbox',
  },
};

// Disabled States
export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
    id: 'disabled-checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Checkbox',
    disabled: true,
    checked: true,
    id: 'disabled-checked-checkbox',
  },
};

// Inline Checkboxes
export const InlineCheckboxes: Story = {
  render: () => (
    <div>
      <Checkbox
        label="Option 1"
        id="inline-1"
        inline
      />
      <Checkbox
        label="Option 2"
        id="inline-2"
        inline
      />
      <Checkbox
        label="Option 3"
        id="inline-3"
        inline
      />
    </div>
  ),
};

// Validation States
export const ValidState: Story = {
  args: {
    label: 'Valid Checkbox',
    isValid: true,
    feedback: 'This checkbox is valid',
    id: 'valid-checkbox',
  },
};

export const InvalidState: Story = {
  args: {
    label: 'Invalid Checkbox',
    isInvalid: true,
    feedback: 'This checkbox is invalid',
    id: 'invalid-checkbox',
  },
};

// Custom Value
export const WithValue: Story = {
  args: {
    label: 'Checkbox with Value',
    value: 'custom-value',
    id: 'value-checkbox',
  },
};

// With Custom Class
export const WithCustomClass: Story = {
  args: {
    label: 'Custom Styled Checkbox',
    className: 'custom-checkbox',
    id: 'custom-class-checkbox',
  },
}; 