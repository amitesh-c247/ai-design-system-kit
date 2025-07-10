import type { Meta, StoryObj } from "@storybook/react";
import BorderedTypography, { BorderedTypographyProps } from "./index";

const meta: Meta<typeof BorderedTypography> = {
  title: "Components/Display/BorderedTypography",
  component: BorderedTypography,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A bordered typography component that displays text in a card-like container with various styling options.",
      },
    },
  },
  argTypes: {
    data: {
      control: "text",
      description: "The content to display",
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
      ],
      description: "The color variant of the bordered typography",
    },
    className: {
      control: "text",
      description: "Additional CSS class name",
    },
    hover: {
      control: "boolean",
      description: "Whether to show a hover effect",
    },
    bold: {
      control: "boolean",
      description: "Whether to make the text bold",
    },
    italic: {
      control: "boolean",
      description: "Whether to make the text italic",
    },
    underline: {
      control: "boolean",
      description: "Whether to make the text underlined",
    },
  },
  args: {
    data: "Sample text content",
    variant: "light",
    hover: true,
    bold: false,
    italic: false,
    underline: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: "This is a default bordered typography component",
  },
};

export const Primary: Story = {
  args: {
    data: "Primary variant with blue background",
    variant: "primary",
  },
};

export const Success: Story = {
  args: {
    data: "Success variant with green background",
    variant: "success",
  },
};

export const Danger: Story = {
  args: {
    data: "Danger variant with red background",
    variant: "danger",
  },
};

export const Warning: Story = {
  args: {
    data: "Warning variant with yellow background",
    variant: "warning",
  },
};

export const Info: Story = {
  args: {
    data: "Info variant with cyan background",
    variant: "info",
  },
};

export const Dark: Story = {
  args: {
    data: "Dark variant with dark background",
    variant: "dark",
  },
};

export const Secondary: Story = {
  args: {
    data: "Secondary variant with gray background",
    variant: "secondary",
  },
};

export const Bold: Story = {
  args: {
    data: "Bold text styling",
    bold: true,
  },
};

export const Italic: Story = {
  args: {
    data: "Italic text styling",
    italic: true,
  },
};

export const Underline: Story = {
  args: {
    data: "Underlined text styling",
    underline: true,
  },
};

export const CombinedStyling: Story = {
  args: {
    data: "Bold, italic, and underlined text",
    bold: true,
    italic: true,
    underline: true,
  },
};

export const NoHover: Story = {
  args: {
    data: "This component has no hover effect",
    hover: false,
  },
};

export const LongText: Story = {
  args: {
    data: "This is a much longer text content that demonstrates how the component handles longer strings. It should wrap properly and maintain the card styling.",
    variant: "info",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
      }}
    >
      <BorderedTypography data="Primary variant" variant="primary" />
      <BorderedTypography data="Secondary variant" variant="secondary" />
      <BorderedTypography data="Success variant" variant="success" />
      <BorderedTypography data="Danger variant" variant="danger" />
      <BorderedTypography data="Warning variant" variant="warning" />
      <BorderedTypography data="Info variant" variant="info" />
      <BorderedTypography data="Light variant" variant="light" />
      <BorderedTypography data="Dark variant" variant="dark" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available color variants of the BorderedTypography component.",
      },
    },
  },
};
