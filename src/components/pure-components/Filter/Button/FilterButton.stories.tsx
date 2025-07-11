import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import PillButton from "./index";

const meta: Meta<typeof PillButton> = {
  title: "Components/Filter/FilterButton",
  component: PillButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A pill-shaped button component designed for filter interfaces with active state styling.",
      },
    },
  },
  argTypes: {
    active: {
      control: "boolean",
      description: "Whether the button is in active state",
    },
    children: {
      control: "text",
      description: "The button content",
    },
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
        "outline-primary",
        "outline-secondary",
        "outline-success",
        "outline-danger",
        "outline-warning",
        "outline-info",
        "outline-light",
        "outline-dark",
      ],
      description: "The button variant",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "The button size",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    onClick: {
      description: "Callback function called when the button is clicked",
    },
  },
  args: {
    children: "Filter Button",
    active: false,
    variant: "outline-primary",
    size: "sm",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
const InteractiveFilterButton = ({ active: initialActive, ...props }: any) => {
  const [active, setActive] = useState(initialActive);

  return (
    <PillButton active={active} onClick={() => setActive(!active)} {...props} />
  );
};

export const Default: Story = {
  render: (args) => <InteractiveFilterButton {...args} />,
  args: {
    children: "Default Filter",
  },
};

export const Active: Story = {
  render: (args) => <InteractiveFilterButton {...args} />,
  args: {
    children: "Active Filter",
    active: true,
  },
};

export const Primary: Story = {
  render: (args) => <InteractiveFilterButton {...args} />,
  args: {
    children: "Primary Filter",
    variant: "primary",
  },
};

export const Secondary: Story = {
  render: (args) => <InteractiveFilterButton {...args} />,
  args: {
    children: "Secondary Filter",
    variant: "secondary",
  },
};

export const Success: Story = {
  render: (args) => <InteractiveFilterButton {...args} />,
  args: {
    children: "Success Filter",
    variant: "success",
  },
};

export const Danger: Story = {
  render: (args) => <InteractiveFilterButton {...args} />,
  args: {
    children: "Danger Filter",
    variant: "danger",
  },
};

export const Disabled: Story = {
  render: (args) => <PillButton {...args} />,
  args: {
    children: "Disabled Filter",
    disabled: true,
  },
};

export const Large: Story = {
  render: (args) => <InteractiveFilterButton {...args} />,
  args: {
    children: "Large Filter",
    size: "lg",
  },
};

export const Small: Story = {
  render: (args) => <InteractiveFilterButton {...args} />,
  args: {
    children: "Small Filter",
    size: "sm",
  },
};

export const MultipleFilters: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      all: true,
      active: false,
      completed: false,
      archived: false,
    });

    const handleFilterClick = (filterName: string) => {
      setFilters((prev) => ({
        all: filterName === "all",
        active: filterName === "active",
        completed: filterName === "completed",
        archived: filterName === "archived",
      }));
    };

    return (
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <PillButton
          active={filters.all}
          onClick={() => handleFilterClick("all")}
          variant="outline-primary"
          size="sm"
        >
          All
        </PillButton>
        <PillButton
          active={filters.active}
          onClick={() => handleFilterClick("active")}
          variant="outline-success"
          size="sm"
        >
          Active
        </PillButton>
        <PillButton
          active={filters.completed}
          onClick={() => handleFilterClick("completed")}
          variant="outline-info"
          size="sm"
        >
          Completed
        </PillButton>
        <PillButton
          active={filters.archived}
          onClick={() => handleFilterClick("archived")}
          variant="outline-secondary"
          size="sm"
        >
          Archived
        </PillButton>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple filter buttons demonstrating a typical filter interface with mutually exclusive states.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <PillButton variant="primary" size="sm">
          Primary
        </PillButton>
        <PillButton variant="secondary" size="sm">
          Secondary
        </PillButton>
        <PillButton variant="success" size="sm">
          Success
        </PillButton>
        <PillButton variant="danger" size="sm">
          Danger
        </PillButton>
        <PillButton variant="warning" size="sm">
          Warning
        </PillButton>
        <PillButton variant="info" size="sm">
          Info
        </PillButton>
        <PillButton variant="light" size="sm">
          Light
        </PillButton>
        <PillButton variant="dark" size="sm">
          Dark
        </PillButton>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <PillButton variant="outline-primary" size="sm">
          Outline Primary
        </PillButton>
        <PillButton variant="outline-secondary" size="sm">
          Outline Secondary
        </PillButton>
        <PillButton variant="outline-success" size="sm">
          Outline Success
        </PillButton>
        <PillButton variant="outline-danger" size="sm">
          Outline Danger
        </PillButton>
        <PillButton variant="outline-warning" size="sm">
          Outline Warning
        </PillButton>
        <PillButton variant="outline-info" size="sm">
          Outline Info
        </PillButton>
        <PillButton variant="outline-light" size="sm">
          Outline Light
        </PillButton>
        <PillButton variant="outline-dark" size="sm">
          Outline Dark
        </PillButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button variants for the FilterButton component.",
      },
    },
  },
};
