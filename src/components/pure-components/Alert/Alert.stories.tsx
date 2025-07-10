import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Alert from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Alert component for displaying various types of notifications and messages.",
      },
    },
  },
  argTypes: {
    type: {
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
      description: "The type/variant of the alert",
    },
    message: {
      control: "text",
      description: "The main message content of the alert",
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show an icon in the alert",
    },
    closable: {
      control: "boolean",
      description: "Whether the alert can be closed by the user",
    },
    heading: {
      control: "text",
      description: "Optional heading for the alert",
    },
    links: {
      control: "object",
      description: "Array of links to display in the alert",
    },
    persistCloseId: {
      control: "text",
      description: "ID for persisting the closed state in localStorage",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: "info",
    showIcon: true,
    message: "This is an alert message!",
    links: [
      {
        label: "View Documentation",
        to: "https://example.com",
        openExternalLinkInNewTab: true,
      },
    ],
  },
};

export const Success: Story = {
  args: {
    type: "success",
    message: "This is a success alert",
    showIcon: true,
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    message: "This is a warning alert",
    showIcon: true,
  },
};

export const Danger: Story = {
  args: {
    type: "danger",
    message: "This is a danger alert",
    showIcon: true,
  },
};

export const WithHeading: Story = {
  args: {
    type: "info",
    heading: "Alert Heading",
    message: "This alert has both a heading and a message.",
    showIcon: true,
  },
};

export const WithLinks: Story = {
  args: {
    type: "info",
    message: "This is an alert with multiple links",
    links: [
      {
        label: "Documentation",
        to: "https://example.com/docs",
        openExternalLinkInNewTab: true,
      },
      {
        label: "Support",
        to: "https://example.com/support",
        openExternalLinkInNewTab: true,
      },
    ],
  },
};

export const Closable: Story = {
  args: {
    type: "warning",
    message: "This is a closable alert",
    closable: true,
  },
};

export const WithAction: Story = {
  args: {
    type: "info",
    message: "This alert has an action button",
    action: {
      label: "Take Action",
      onClick: () => alert("Action clicked!"),
    },
  },
};
