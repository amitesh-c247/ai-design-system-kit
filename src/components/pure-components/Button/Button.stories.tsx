import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { Plus } from "lucide-react";
import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "icon",
        "iconBordered",
        "danger",
      ],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: "Button",
  type: "primary",
};

export const Variants = () => (
  <div className="d-flex flex-column gap-2">
    <Button type="primary">Primary</Button>
    <Button type="secondary">Secondary</Button>
    <Button type="tertiary">Tertiary</Button>
    <Button type="icon" icon={<Plus size={16} />} size="large" />
    <Button type="iconBordered" icon={<Plus size={16} />} />
    <Button type="danger">Danger</Button>
  </div>
);

export const Loading = () => (
  <div className="d-flex flex-column gap-2">
    <Button type="primary" loading>
      Primary
    </Button>
    <Button type="secondary" loading>
      Secondary
    </Button>
    <Button type="tertiary" loading>
      Tertiary
    </Button>
    <Button type="icon" icon={<Plus size={16} />} size="large" loading />
    <Button type="iconBordered" icon={<Plus size={16} />} loading />
    <Button type="danger" loading>
      Danger
    </Button>
  </div>
);

export const Disabled = () => (
  <div className="d-flex flex-column gap-2">
    <Button type="primary" disabled>
      Primary
    </Button>
    <Button type="secondary" disabled>
      Secondary
    </Button>
    <Button type="tertiary" disabled>
      Tertiary
    </Button>
    <Button type="icon" icon={<Plus size={16} />} size="large" disabled />
    <Button type="iconBordered" icon={<Plus size={16} />} disabled />
    <Button type="danger" disabled>
      Danger
    </Button>
  </div>
);
