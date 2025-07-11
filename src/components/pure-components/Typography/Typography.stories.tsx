import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./index";

const meta: Meta<typeof Typography> = {
  title: "Common/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"],
      description: "Typography variant",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A typography component for consistent text styling across the application.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is default typography",
    variant: "p",
  },
};

export const Headings: Story = {
  render: () => (
    <div>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All heading variants from h1 to h6.",
      },
    },
  },
};

export const BodyText: Story = {
  render: () => (
    <div>
      <Typography variant="p">
        Body text - Regular body text used for most content. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="span">Span text - Inline text element</Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different body text variants for various content types.",
      },
    },
  },
};
