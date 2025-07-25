import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Banner from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Components/Display/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A simple banner component for displaying page titles and headers.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "The title text to display in the banner",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Welcome to Our Platform",
  },
};

export const PageTitle: Story = {
  args: {
    title: "Dashboard",
  },
};

export const LongTitle: Story = {
  args: {
    title: "This is a longer banner title that spans multiple words",
  },
};

export const ShortTitle: Story = {
  args: {
    title: "Home",
  },
};

export const ProductTitle: Story = {
  args: {
    title: "Our Amazing Product Features",
  },
};
