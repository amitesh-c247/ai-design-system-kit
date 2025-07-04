import type { Meta, StoryObj } from '@storybook/react';
import Space from './index';

const meta: Meta<typeof Space> = {
  title: 'Common/Space',
  component: Space,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'text',
    },
    block: {
      control: 'boolean',
    },
    wrap: {
      control: 'boolean',
    },
    separator: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Space>;

export const Horizontal: Story = {
  args: {
    children: [
      <button key="1">Button 1</button>,
      <button key="2">Button 2</button>,
      <button key="3">Button 3</button>,
    ],
    direction: 'horizontal',
    size: '1rem',
  },
};

export const Vertical: Story = {
  args: {
    children: [
      <button key="1">Button 1</button>,
      <button key="2">Button 2</button>,
      <button key="3">Button 3</button>,
    ],
    direction: 'vertical',
    size: '1rem',
  },
};

export const Block: Story = {
  args: {
    children: [
      <span key="1">Block 1</span>,
      <span key="2">Block 2</span>,
      <span key="3">Block 3</span>,
    ],
    block: true,
    direction: 'horizontal',
    size: '2rem',
  },
};

export const WithSeparator: Story = {
  args: {
    children: [
      <span key="1">Item 1</span>,
      <span key="2">Item 2</span>,
      <span key="3">Item 3</span>,
    ],
    separator: '|',
    size: '1rem',
  },
};

export const Wrapping: Story = {
  args: {
    children: Array.from({ length: 10 }, (_, i) => (
      <span key={i}>Item {i + 1}</span>
    )),
    wrap: true,
    size: '1rem',
    style: { maxWidth: 300, border: '1px solid #ccc', padding: 8 },
  },
};
