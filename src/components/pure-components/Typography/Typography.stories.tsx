import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Typography from "./index";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "caption",
        "overline",
      ],
      description: "Typography variant",
    },
    color: {
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
        "muted",
      ],
      description: "Text color",
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "Text alignment",
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semibold", "bold"],
      description: "Font weight",
    },
    gutterBottom: {
      control: "boolean",
      description: "Add margin bottom",
    },
    noWrap: {
      control: "boolean",
      description: "Prevent text wrapping",
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
    variant: "body1",
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
      <Typography variant="subtitle1" gutterBottom>
        Subtitle 1 - Larger subtitle text
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Subtitle 2 - Smaller subtitle text
      </Typography>
      <Typography variant="body1" gutterBottom>
        Body 1 - Regular body text used for most content. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Body 2 - Smaller body text for secondary content. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="caption" gutterBottom>
        Caption - Small text for captions and labels
      </Typography>
      <Typography variant="overline">
        OVERLINE - UPPERCASE TEXT FOR OVERLINES
      </Typography>
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

export const Colors: Story = {
  render: () => (
    <div>
      <Typography variant="h5" color="primary" gutterBottom>
        Primary Color
      </Typography>
      <Typography variant="body1" color="secondary" gutterBottom>
        Secondary Color
      </Typography>
      <Typography variant="body1" color="success" gutterBottom>
        Success Color
      </Typography>
      <Typography variant="body1" color="danger" gutterBottom>
        Danger Color
      </Typography>
      <Typography variant="body1" color="warning" gutterBottom>
        Warning Color
      </Typography>
      <Typography variant="body1" color="info" gutterBottom>
        Info Color
      </Typography>
      <Typography variant="body1" color="muted" gutterBottom>
        Muted Color
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Typography with different semantic colors.",
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <div>
      <Typography variant="body1" align="left" gutterBottom>
        Left aligned text - This text is aligned to the left side of the
        container.
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Center aligned text - This text is centered in the container.
      </Typography>
      <Typography variant="body1" align="right" gutterBottom>
        Right aligned text - This text is aligned to the right side of the
        container.
      </Typography>
      <Typography variant="body1" align="justify" gutterBottom>
        Justified text - This text is justified, meaning it stretches to fill
        the full width of the container by adjusting spacing between words.
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Typography with different text alignments.",
      },
    },
  },
};

export const FontWeights: Story = {
  render: () => (
    <div>
      <Typography variant="h4" weight="light" gutterBottom>
        Light Weight
      </Typography>
      <Typography variant="h4" weight="normal" gutterBottom>
        Normal Weight
      </Typography>
      <Typography variant="h4" weight="medium" gutterBottom>
        Medium Weight
      </Typography>
      <Typography variant="h4" weight="semibold" gutterBottom>
        Semibold Weight
      </Typography>
      <Typography variant="h4" weight="bold" gutterBottom>
        Bold Weight
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Typography with different font weights.",
      },
    },
  },
};

export const NoWrap: Story = {
  render: () => (
    <div style={{ width: "200px", border: "1px solid #ccc", padding: "10px" }}>
      <Typography variant="body1" gutterBottom>
        This text will wrap normally when it reaches the edge of the container.
      </Typography>
      <Typography variant="body1" noWrap>
        This text will not wrap and will be truncated with ellipsis when it
        reaches the edge.
      </Typography>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Typography with nowrap option to prevent text wrapping.",
      },
    },
  },
};
