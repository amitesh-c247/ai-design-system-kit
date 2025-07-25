import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumb from "./index";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  argTypes: {
    crumbs: {
      control: "object",
      description: "Array of breadcrumb items with link and title",
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
          "A breadcrumb component for navigation showing the current page location.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    crumbs: [
      { link: "/", title: "Home" },
      { link: "/products", title: "Products" },
      { link: "/products/electronics", title: "Electronics" },
      { link: "", title: "Current Page" },
    ],
  },
};

export const SimpleNavigation: Story = {
  args: {
    crumbs: [
      { link: "/", title: "Home" },
      { link: "/dashboard", title: "Dashboard" },
      { link: "", title: "Users" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Simple breadcrumb navigation with 3 levels.",
      },
    },
  },
};

export const DeepNavigation: Story = {
  args: {
    crumbs: [
      { link: "/", title: "Home" },
      { link: "/admin", title: "Admin" },
      { link: "/admin/users", title: "Users" },
      { link: "/admin/users/manage", title: "Manage" },
      { link: "/admin/users/manage/roles", title: "Roles" },
      { link: "", title: "Edit Role" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Deep navigation breadcrumb with multiple levels.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb
      crumbs={[
        { link: "/", title: "🏠 Home" },
        { link: "/cms", title: "📝 CMS" },
        { link: "/cms/articles", title: "📄 Articles" },
        { link: "", title: "➕ Create New" },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb with icons for better visual identification.",
      },
    },
  },
};

export const OnlyActivePage: Story = {
  args: {
    crumbs: [{ link: "", title: "Current Page Only" }],
  },
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb showing only the current active page.",
      },
    },
  },
};

export const WithoutLinks: Story = {
  args: {
    crumbs: [
      { link: "", title: "Home" },
      { link: "", title: "Products" },
      { link: "", title: "Electronics" },
      { link: "", title: "Laptops" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb items without links (display only).",
      },
    },
  },
};

export const ResponsiveBreadcrumb: Story = {
  render: () => (
    <div>
      <h6>Desktop View:</h6>
      <Breadcrumb
        crumbs={[
          { link: "/", title: "Home" },
          { link: "/categories", title: "Categories" },
          { link: "/categories/electronics", title: "Electronics" },
          { link: "/categories/electronics/computers", title: "Computers" },
          {
            link: "/categories/electronics/computers/laptops",
            title: "Laptops",
          },
          { link: "", title: "Gaming Laptops" },
        ]}
      />

      <h6 className="mt-4">Mobile View (truncated):</h6>
      <Breadcrumb
        className="d-sm-none"
        crumbs={[
          { link: "", title: "..." },
          {
            link: "/categories/electronics/computers/laptops",
            title: "Laptops",
          },
          { link: "", title: "Gaming Laptops" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Responsive breadcrumb that shows full path on desktop and truncated path on mobile.",
      },
    },
  },
};
