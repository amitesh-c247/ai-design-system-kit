import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Plus, Edit, Trash2, Download, Share, Settings } from "lucide-react";
import ActionButton from "./index";

const meta: Meta<typeof ActionButton> = {
  title: "Components/Utilities/ActionButton",
  component: ActionButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ],
      description: "Button variant/color scheme",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    tooltip: {
      control: "text",
      description: "Tooltip text",
    },
    onClick: {
      action: "clicked",
      description: "Click handler",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "An action button component for triggering specific actions with icons and tooltips.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Add",
    icon: <Plus size={16} />,
    tooltip: "Add new item",
    variant: "primary",
  },
};

export const CommonActions: Story = {
  render: () => (
    <div className="d-flex gap-2 align-items-center flex-wrap">
      <ActionButton
        title="Add"
        icon={<Plus size={16} />}
        variant="primary"
        tooltip="Add new"
      />
      <ActionButton
        title="Edit"
        icon={<Edit size={16} />}
        variant="secondary"
        tooltip="Edit"
      />
      <ActionButton
        title="Delete"
        icon={<Trash2 size={16} />}
        variant="danger"
        tooltip="Delete"
      />
      <ActionButton
        title="Download"
        icon={<Download size={16} />}
        variant="success"
        tooltip="Download"
      />
      <ActionButton
        title="Share"
        icon={<Share size={16} />}
        variant="info"
        tooltip="Share"
      />
      <ActionButton
        title="Settings"
        icon={<Settings size={16} />}
        variant="warning"
        tooltip="Settings"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Common action buttons with different semantic meanings.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="d-flex gap-3 align-items-center">
      <ActionButton
        title="Small"
        icon={<Plus size={12} />}
        size="sm"
        variant="primary"
        tooltip="Small"
      />
      <ActionButton
        title="Medium"
        icon={<Plus size={16} />}
        size="md"
        variant="primary"
        tooltip="Medium"
      />
      <ActionButton
        title="Large"
        icon={<Plus size={20} />}
        size="lg"
        variant="primary"
        tooltip="Large"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Action buttons in different sizes.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="d-flex gap-2 align-items-center flex-wrap">
      <ActionButton
        title="Normal"
        icon={<Plus size={16} />}
        variant="primary"
        tooltip="Normal state"
      />
      <ActionButton
        title="Disabled"
        icon={<Plus size={16} />}
        variant="primary"
        disabled
        tooltip="Disabled state"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different button states: normal and disabled.",
      },
    },
  },
};

export const TableActions: Story = {
  render: () => (
    <div className="border rounded p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">User Management</h6>
        <ActionButton
          title="Add User"
          icon={<Plus size={16} />}
          variant="primary"
          tooltip="Add new user"
        />
      </div>

      <table className="table table-sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>
              <div className="d-flex gap-1">
                <ActionButton
                  title="Edit"
                  icon={<Edit size={14} />}
                  size="sm"
                  variant="secondary"
                  tooltip="Edit user"
                />
                <ActionButton
                  title="Delete"
                  icon={<Trash2 size={14} />}
                  size="sm"
                  variant="danger"
                  tooltip="Delete user"
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td>
              <div className="d-flex gap-1">
                <ActionButton
                  title="Edit"
                  icon={<Edit size={14} />}
                  size="sm"
                  variant="secondary"
                  tooltip="Edit user"
                />
                <ActionButton
                  title="Delete"
                  icon={<Trash2 size={14} />}
                  size="sm"
                  variant="danger"
                  tooltip="Delete user"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Action buttons used in a table context for row-level actions.",
      },
    },
  },
};

export const FloatingActions: Story = {
  render: () => (
    <div
      style={{
        position: "relative",
        height: "300px",
        border: "1px dashed #ccc",
        borderRadius: "8px",
      }}
    >
      <div className="p-3">
        <h6>Content Area</h6>
        <p>This represents a content area with floating action buttons.</p>
      </div>

      {/* Primary floating action */}
      <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <ActionButton
          title="Primary Action"
          icon={<Plus size={20} />}
          size="lg"
          variant="primary"
          tooltip="Primary action"
        />
      </div>

      {/* Secondary floating actions */}
      <div style={{ position: "absolute", bottom: "20px", right: "80px" }}>
        <ActionButton
          title="Secondary Action"
          icon={<Edit size={16} />}
          size="md"
          variant="secondary"
          tooltip="Secondary action"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Floating action buttons positioned over content.",
      },
    },
  },
};

export const GroupedActions: Story = {
  render: () => (
    <div className="d-flex flex-column gap-3">
      <div className="border rounded p-3">
        <h6>Document Actions</h6>
        <div className="btn-group" role="group">
          <ActionButton
            title="Download PDF"
            icon={<Download size={16} />}
            variant="outline-primary"
            tooltip="Download PDF"
          />
          <ActionButton
            title="Share"
            icon={<Share size={16} />}
            variant="outline-primary"
            tooltip="Share document"
          />
          <ActionButton
            title="Edit"
            icon={<Edit size={16} />}
            variant="outline-primary"
            tooltip="Edit document"
          />
        </div>
      </div>

      <div className="border rounded p-3">
        <h6>Dangerous Actions</h6>
        <div className="btn-group" role="group">
          <ActionButton
            title="Archive"
            icon="📦"
            variant="outline-danger"
            tooltip="Archive"
          />
          <ActionButton
            title="Delete"
            icon={<Trash2 size={16} />}
            variant="outline-danger"
            tooltip="Delete"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grouped action buttons for related actions.",
      },
    },
  },
};

export const WithText: Story = {
  render: () => (
    <div className="d-flex gap-2 align-items-center flex-wrap">
      <ActionButton
        title="New"
        icon={<Plus size={16} />}
        variant="primary"
        tooltip="Create new item"
      />
      <ActionButton
        title="Edit"
        icon={<Edit size={16} />}
        variant="secondary"
        tooltip="Edit selected"
      />
      <ActionButton
        title="Delete"
        icon={<Trash2 size={16} />}
        variant="danger"
        tooltip="Delete selected"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Action buttons with both icons and text labels.",
      },
    },
  },
};
