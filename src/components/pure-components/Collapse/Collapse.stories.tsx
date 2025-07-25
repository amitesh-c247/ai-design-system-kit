import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Collapse from "./index";

const meta: Meta<typeof Collapse> = {
  title: "Common/Collapse",
  component: Collapse,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapse>;

// Basic Collapse
export const Basic: Story = {
  render: () => (
    <Collapse>
      <Collapse.Panel key="1" header="Section 1">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel key="2" header="Section 2">
        Content for section 2
      </Collapse.Panel>
      <Collapse.Panel key="3" header="Section 3">
        Content for section 3
      </Collapse.Panel>
    </Collapse>
  ),
};

// Default Open
export const DefaultOpen: Story = {
  render: () => (
    <Collapse defaultActiveKey="1">
      <Collapse.Panel key="1" header="Section 1 (Default Open)">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel key="2" header="Section 2">
        Content for section 2
      </Collapse.Panel>
    </Collapse>
  ),
};

// Multiple Open
export const MultipleOpen: Story = {
  render: () => (
    <Collapse defaultActiveKey={["1", "2"]}>
      <Collapse.Panel key="1" header="Section 1">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel key="2" header="Section 2">
        Content for section 2
      </Collapse.Panel>
    </Collapse>
  ),
};

// Bordered Style
export const Bordered: Story = {
  render: () => (
    <Collapse bordered>
      <Collapse.Panel key="1" header="Section 1">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel key="2" header="Section 2">
        Content for section 2
      </Collapse.Panel>
    </Collapse>
  ),
};

// Disabled Panel
export const WithDisabledPanel: Story = {
  render: () => (
    <Collapse>
      <Collapse.Panel key="1" header="Section 1">
        Content for section 1
      </Collapse.Panel>
      <Collapse.Panel key="2" header="Section 2 (Disabled)" disabled>
        Content for section 2
      </Collapse.Panel>
    </Collapse>
  ),
};
