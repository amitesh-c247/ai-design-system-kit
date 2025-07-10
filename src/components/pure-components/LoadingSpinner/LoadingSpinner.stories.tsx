import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LoadingSpinner from "./index";

const meta: Meta<typeof LoadingSpinner> = {
  title: "Components/LoadingSpinner",
  component: LoadingSpinner,
  tags: ["autodocs"],
  argTypes: {
    fullScreen: {
      control: "boolean",
      description: "Whether the spinner should cover the full screen",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "A loading spinner component to indicate loading states.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const FullScreen: Story = {
  args: {
    fullScreen: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Full screen loading spinner that covers the entire viewport.",
      },
    },
  },
};

export const InContext: Story = {
  render: () => (
    <div className="border p-4 text-center">
      <h5>Loading Data...</h5>
      <LoadingSpinner />
      <p className="mt-2 text-muted">Please wait while we fetch your data.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loading spinner used in a realistic context.",
      },
    },
  },
};

export const MultipleSpinners: Story = {
  render: () => (
    <div className="d-flex flex-column gap-4">
      <div className="border p-3 text-center">
        <h6>Small Context</h6>
        <LoadingSpinner />
      </div>

      <div className="border p-3 text-center">
        <h6>Button Loading</h6>
        <button className="btn btn-primary" disabled>
          <LoadingSpinner />
          <span className="ms-2">Loading...</span>
        </button>
      </div>

      <div className="border p-3 text-center">
        <h6>Card Loading</h6>
        <div className="card" style={{ height: "200px" }}>
          <div className="card-body d-flex align-items-center justify-content-center">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loading spinners in different contexts and layouts.",
      },
    },
  },
};
