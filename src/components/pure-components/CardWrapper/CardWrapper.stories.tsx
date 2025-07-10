import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "react-bootstrap";
import CardWrapper from "./index";

const meta: Meta<typeof CardWrapper> = {
  title: "Components/Layout/CardWrapper",
  component: CardWrapper,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Card title",
    },
    subtitle: {
      control: "text",
      description: "Card subtitle",
    },
    bordered: {
      control: "boolean",
      description: "Show border around card",
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Card shadow depth",
    },
    padding: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Card padding size",
    },
    headerActions: {
      control: "object",
      description: "Actions in card header",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A flexible card wrapper component for organizing content with consistent styling.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Default Card",
    children: <p>This is the default card content with standard styling.</p>,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "Card with Subtitle",
    subtitle: "This is a descriptive subtitle",
    children: (
      <div>
        <p>
          Card content goes here. This card includes both a title and subtitle
          for better organization.
        </p>
        <Button variant="primary">Action Button</Button>
      </div>
    ),
  },
};

export const WithHeaderActions: Story = {
  render: () => (
    <CardWrapper
      title="User Management"
      subtitle="Manage user accounts and permissions"
      headerActions={
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" size="sm">
            Settings
          </Button>
          <Button variant="primary" size="sm">
            Add User
          </Button>
        </div>
      }
    >
      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>
                <span className="badge bg-success">Active</span>
              </td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>jane@example.com</td>
              <td>
                <span className="badge bg-warning">Pending</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card with actions in the header for quick access.",
      },
    },
  },
};

export const DifferentShadows: Story = {
  render: () => (
    <div className="row g-3">
      <div className="col-md-6">
        <CardWrapper title="No Shadow" shadow="none">
          <p>Card with no shadow effect.</p>
        </CardWrapper>
      </div>
      <div className="col-md-6">
        <CardWrapper title="Small Shadow" shadow="sm">
          <p>Card with small shadow effect.</p>
        </CardWrapper>
      </div>
      <div className="col-md-6">
        <CardWrapper title="Medium Shadow" shadow="md">
          <p>Card with medium shadow effect.</p>
        </CardWrapper>
      </div>
      <div className="col-md-6">
        <CardWrapper title="Large Shadow" shadow="lg">
          <p>Card with large shadow effect.</p>
        </CardWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Cards with different shadow depths for visual hierarchy.",
      },
    },
  },
};

export const DifferentPadding: Story = {
  render: () => (
    <div className="d-flex flex-column gap-3">
      <CardWrapper title="Small Padding" padding="sm">
        <p>Card with small padding for compact layouts.</p>
      </CardWrapper>
      <CardWrapper title="Medium Padding" padding="md">
        <p>Card with medium padding (default) for standard layouts.</p>
      </CardWrapper>
      <CardWrapper title="Large Padding" padding="lg">
        <p>Card with large padding for spacious layouts.</p>
      </CardWrapper>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Cards with different padding sizes for various use cases.",
      },
    },
  },
};

export const DashboardCards: Story = {
  render: () => (
    <div className="row g-3">
      <div className="col-md-3">
        <CardWrapper title="Total Users" shadow="sm">
          <div className="text-center">
            <h2 className="text-primary mb-0">1,234</h2>
            <small className="text-success">+5.2% from last month</small>
          </div>
        </CardWrapper>
      </div>
      <div className="col-md-3">
        <CardWrapper title="Revenue" shadow="sm">
          <div className="text-center">
            <h2 className="text-success mb-0">$45,678</h2>
            <small className="text-success">+12.1% from last month</small>
          </div>
        </CardWrapper>
      </div>
      <div className="col-md-3">
        <CardWrapper title="Orders" shadow="sm">
          <div className="text-center">
            <h2 className="text-warning mb-0">567</h2>
            <small className="text-danger">-2.3% from last month</small>
          </div>
        </CardWrapper>
      </div>
      <div className="col-md-3">
        <CardWrapper title="Conversion" shadow="sm">
          <div className="text-center">
            <h2 className="text-info mb-0">3.45%</h2>
            <small className="text-success">+0.8% from last month</small>
          </div>
        </CardWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dashboard-style cards for displaying key metrics.",
      },
    },
  },
};

export const FormCard: Story = {
  render: () => (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <CardWrapper
          title="User Profile"
          subtitle="Update your personal information"
          shadow="md"
        >
          <form>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                defaultValue="John"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                defaultValue="Doe"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                defaultValue="john@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bio" className="form-label">
                Bio
              </label>
              <textarea
                className="form-control"
                id="bio"
                rows={3}
                placeholder="Tell us about yourself"
              ></textarea>
            </div>
            <div className="d-flex gap-2">
              <Button variant="primary">Save Changes</Button>
              <Button variant="outline-secondary">Cancel</Button>
            </div>
          </form>
        </CardWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card wrapper used for form layouts.",
      },
    },
  },
};

export const NestedCards: Story = {
  render: () => (
    <CardWrapper
      title="Parent Card"
      subtitle="Contains nested content"
      shadow="lg"
    >
      <div className="row g-3">
        <div className="col-md-6">
          <CardWrapper title="Child Card 1" shadow="sm" padding="sm">
            <p className="mb-0">This is a nested card within a parent card.</p>
          </CardWrapper>
        </div>
        <div className="col-md-6">
          <CardWrapper title="Child Card 2" shadow="sm" padding="sm">
            <p className="mb-0">Another nested card for organizing content.</p>
          </CardWrapper>
        </div>
      </div>
      <div className="mt-3">
        <CardWrapper title="Full Width Child" shadow="sm" padding="sm">
          <p className="mb-0">
            A full-width nested card for additional content.
          </p>
        </CardWrapper>
      </div>
    </CardWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: "Nested cards for complex content organization.",
      },
    },
  },
};

export const BorderedCards: Story = {
  render: () => (
    <div className="row g-3">
      <div className="col-md-6">
        <CardWrapper title="With Border" bordered shadow="none">
          <p>This card has a border instead of shadow.</p>
        </CardWrapper>
      </div>
      <div className="col-md-6">
        <CardWrapper title="Border + Shadow" bordered shadow="sm">
          <p>This card has both border and shadow.</p>
        </CardWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Cards with borders for alternative styling.",
      },
    },
  },
};
