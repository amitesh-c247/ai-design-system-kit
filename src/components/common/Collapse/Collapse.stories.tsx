import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Collapse from './index';

const meta: Meta<typeof Collapse> = {
  title: 'Common/Collapse',
  component: Collapse,
  tags: ['autodocs'],
  argTypes: {
    defaultActiveKey: { control: 'text' },
    alwaysOpen: { control: 'boolean' },
    flush: { control: 'boolean' },
    bg: { control: 'select', options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] },
    text: { control: 'select', options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] },
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

// Basic Collapse
export const Basic: Story = {
  render: () => (
    <Collapse>
      <Collapse.Panel eventKey="1" header="Section 1">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel eventKey="2" header="Section 2">
        Content for section 2
      </Collapse.Panel>
      <Collapse.Panel eventKey="3" header="Section 3">
        Content for section 3
      </Collapse.Panel>
    </Collapse>
  ),
};

// Default Open
export const DefaultOpen: Story = {
  render: () => (
    <Collapse defaultActiveKey="1">
      <Collapse.Panel eventKey="1" header="Section 1 (Default Open)">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel eventKey="2" header="Section 2">
        Content for section 2
      </Collapse.Panel>
    </Collapse>
  ),
};

// Always Open
export const AlwaysOpen: Story = {
  render: () => (
    <Collapse alwaysOpen>
      <Collapse.Panel eventKey="1" header="Section 1">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel eventKey="2" header="Section 2">
        Content for section 2
      </Collapse.Panel>
    </Collapse>
  ),
};

// Flush Style
export const Flush: Story = {
  render: () => (
    <Collapse flush>
      <Collapse.Panel eventKey="1" header="Section 1">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel eventKey="2" header="Section 2">
        Content for section 2
      </Collapse.Panel>
    </Collapse>
  ),
};

// With Custom Background
export const WithBackground: Story = {
  render: () => (
    <Collapse bg="light">
      <Collapse.Panel eventKey="1" header="Section 1">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel eventKey="2" header="Section 2">
        Content for section 2
      </Collapse.Panel>
    </Collapse>
  ),
};

// Disabled Panel
export const WithDisabledPanel: Story = {
  render: () => (
    <Collapse>
      <Collapse.Panel eventKey="1" header="Section 1">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel eventKey="2" header="Section 2 (Disabled)" disabled>
        Content for section 2
      </Collapse.Panel>
    </Collapse>
  ),
}; 