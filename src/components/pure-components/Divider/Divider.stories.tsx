import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Divider from './index';

const meta: Meta<typeof Divider> = {
  title: 'Common/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    noMargin: { control: 'boolean' },
    vertical: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// Basic Divider
export const Basic: Story = {
  render: () => (
    <div>
      <p>Content above</p>
      <Divider />
      <p>Content below</p>
    </div>
  ),
};

// No Margin
export const NoMargin: Story = {
  render: () => (
    <div>
      <p>Content above</p>
      <Divider noMargin />
      <p>Content below</p>
    </div>
  ),
};

// Vertical Divider
export const Vertical: Story = {
  render: () => (
    <div>
      <span>Content</span>
      <Divider vertical />
      <span>Content</span>
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div>
      <p>Primary Divider</p>
      <Divider variant="primary" />
      <p>Secondary Divider</p>
      <Divider variant="secondary" />
      <p>Success Divider</p>
      <Divider variant="success" />
      <p>Danger Divider</p>
      <Divider variant="danger" />
      <p>Warning Divider</p>
      <Divider variant="warning" />
      <p>Info Divider</p>
      <Divider variant="info" />
      <p>Light Divider</p>
      <Divider variant="light" />
      <p>Dark Divider</p>
      <Divider variant="dark" />
    </div>
  ),
};
