import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Accordion from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "Array of accordion items with id, title, and description",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A collapsible content panel for organizing and hiding content.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Accordion Item #1",
        description:
          "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
      },
      {
        id: "2",
        title: "Accordion Item #2",
        description:
          "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes.",
      },
      {
        id: "3",
        title: "Accordion Item #3",
        description:
          "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes.",
      },
    ],
  },
};

export const WithHighlight: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Regular Accordion Item",
        description:
          "This is a regular accordion item without any special styling.",
      },
      {
        id: "2",
        title: "Highlighted Accordion Item",
        description:
          "This accordion item has highlight styling to draw attention.",
        highlight: true,
      },
      {
        id: "3",
        title: "Another Regular Item",
        description: "This is another regular accordion item.",
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Single Accordion Item",
        description:
          "This accordion contains only a single item to demonstrate minimal usage.",
      },
    ],
  },
};

export const LongContent: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Short Item",
        description: "This is a short description.",
      },
      {
        id: "2",
        title: "Long Content Item",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        id: "3",
        title: "Technical FAQ",
        description:
          "How do I configure this component? You can pass an array of items to the component, each item should have an id, title, and description. Optionally, you can add a highlight property to make certain items stand out.",
      },
    ],
  },
};
