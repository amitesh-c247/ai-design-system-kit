import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "react-bootstrap";
import { Plus, Edit, Trash2, Download, Share, Settings } from "lucide-react";
import Tooltip from "./index";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Utilities/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Tooltip text content",
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Tooltip placement relative to target",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A tooltip component for providing additional information on hover or focus.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "This is a helpful tooltip",
    placement: "top",
    children: <Button variant="primary">Hover me</Button>,
  },
};

export const AllPlacements: Story = {
  render: () => (
    <div
      className="d-flex justify-content-center align-items-center gap-4"
      style={{ minHeight: "200px" }}
    >
      <Tooltip title="Tooltip on top" placement="top">
        <Button variant="outline-primary">Top</Button>
      </Tooltip>

      <Tooltip title="Tooltip on right" placement="right">
        <Button variant="outline-primary">Right</Button>
      </Tooltip>

      <Tooltip title="Tooltip on bottom" placement="bottom">
        <Button variant="outline-primary">Bottom</Button>
      </Tooltip>

      <Tooltip title="Tooltip on left" placement="left">
        <Button variant="outline-primary">Left</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips in all four placement positions.",
      },
    },
  },
};

export const LongContent: Story = {
  render: () => (
    <div className="d-flex gap-3 align-items-center flex-wrap">
      <Tooltip title="This is a short tooltip">
        <Button variant="primary">Short</Button>
      </Tooltip>

      <Tooltip title="This is a much longer tooltip that contains more detailed information about the button and what it does when clicked.">
        <Button variant="secondary">Long content</Button>
      </Tooltip>

      <Tooltip
        title="Multi-line tooltip content&#10;Line 2 of the tooltip&#10;Line 3 with more info"
      >
        <Button variant="info">Multi-line</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips with varying content lengths.",
      },
    },
  },
};

export const FormElements: Story = {
  render: () => (
    <div className="d-flex flex-column gap-3">
      <div>
        <label htmlFor="username" className="form-label">
          Username
          <Tooltip
            title="Username must be 3-20 characters long"
            placement="right"
          >
            <span className="text-primary ms-1" style={{ cursor: "help" }}>
              ℹ️
            </span>
          </Tooltip>
        </label>
        <input type="text" className="form-control" id="username" />
      </div>

      <div>
        <label htmlFor="password" className="form-label">
          Password
          <Tooltip
            title="Password must contain at least 8 characters, including uppercase, lowercase, and numbers"
            placement="right"
          >
            <span className="text-primary ms-1" style={{ cursor: "help" }}>
              ℹ️
            </span>
          </Tooltip>
        </label>
        <input type="password" className="form-control" id="password" />
      </div>

      <Tooltip title="Click to submit the form" placement="top">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips used with form elements for help text.",
      },
    },
  },
};

export const IconButtons: Story = {
  render: () => (
    <div className="d-flex gap-2 align-items-center flex-wrap">
      <Tooltip title="Add new item">
        <Button variant="outline-primary" size="sm">
          <Plus size={16} />
        </Button>
      </Tooltip>

      <Tooltip title="Edit selected">
        <Button variant="outline-secondary" size="sm">
          <Edit size={16} />
        </Button>
      </Tooltip>

      <Tooltip title="Delete selected">
        <Button variant="outline-danger" size="sm">
          <Trash2 size={16} />
        </Button>
      </Tooltip>

      <Tooltip title="Download file">
        <Button variant="outline-success" size="sm">
          <Download size={16} />
        </Button>
      </Tooltip>

      <Tooltip title="Share content">
        <Button variant="outline-info" size="sm">
          <Share size={16} />
        </Button>
      </Tooltip>

      <Tooltip title="Settings">
        <Button variant="outline-warning" size="sm">
          <Settings size={16} />
        </Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips providing context for icon-only buttons.",
      },
    },
  },
};

export const DisabledElements: Story = {
  render: () => (
    <div className="d-flex gap-3 align-items-center flex-wrap">
      <Tooltip title="This button is disabled because you don't have permission">
        <span>
          <Button variant="primary" disabled>
            Disabled Button
          </Button>
        </span>
      </Tooltip>

      <Tooltip title="Feature coming soon!">
        <span>
          <Button variant="secondary" disabled>
            Coming Soon
          </Button>
        </span>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tooltips on disabled elements (wrapped in span for accessibility).",
      },
    },
  },
};

export const TableTooltips: Story = {
  render: () => (
    <table className="table table-sm">
      <thead>
        <tr>
          <th>
            Name
            <Tooltip title="User's full name" placement="top">
              <span className="text-muted ms-1" style={{ cursor: "help" }}>
                ℹ️
              </span>
            </Tooltip>
          </th>
          <th>
            Status
            <Tooltip
              title="Account status: Active, Inactive, or Suspended"
              placement="top"
            >
              <span className="text-muted ms-1" style={{ cursor: "help" }}>
                ℹ️
              </span>
            </Tooltip>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>
            <Tooltip title="Account is active and verified">
              <span className="badge bg-success">Active</span>
            </Tooltip>
          </td>
          <td>
            <Tooltip title="Edit user details">
              <Button variant="outline-primary" size="sm">
                <Edit size={14} />
              </Button>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td>
            <Tooltip title="Account is temporarily suspended">
              <span className="badge bg-warning">Suspended</span>
            </Tooltip>
          </td>
          <td>
            <Tooltip title="Edit user details">
              <Button variant="outline-primary" size="sm">
                <Edit size={14} />
              </Button>
            </Tooltip>
          </td>
        </tr>
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips used in tables for additional context.",
      },
    },
  },
};
