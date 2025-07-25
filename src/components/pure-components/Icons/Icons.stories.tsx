import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  LoaderIcon,
  Eye,
  EyeOff,
} from "./index";

// Create a wrapper component to showcase all icons
const IconShowcase: React.FC = () => (
  <div className="d-flex gap-3 align-items-center flex-wrap">
    <div className="text-center">
      <ChevronDown size={24} />
      <div className="mt-1 small">ChevronDown</div>
    </div>
    <div className="text-center">
      <ChevronUp size={24} />
      <div className="mt-1 small">ChevronUp</div>
    </div>
    <div className="text-center">
      <AlertCircle size={24} />
      <div className="mt-1 small">AlertCircle</div>
    </div>
    <div className="text-center">
      <AlertTriangle size={24} />
      <div className="mt-1 small">AlertTriangle</div>
    </div>
    <div className="text-center">
      <CheckCircle size={24} />
      <div className="mt-1 small">CheckCircle</div>
    </div>
    <div className="text-center">
      <Info size={24} />
      <div className="mt-1 small">Info</div>
    </div>
    <div className="text-center">
      <LoaderIcon size={24} />
      <div className="mt-1 small">LoaderIcon</div>
    </div>
    <div className="text-center">
      <Eye size={24} />
      <div className="mt-1 small">Eye</div>
    </div>
    <div className="text-center">
      <EyeOff size={24} />
      <div className="mt-1 small">EyeOff</div>
    </div>
  </div>
);

const meta: Meta<typeof IconShowcase> = {
  title: "Components/Display/Icons",
  component: IconShowcase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A collection of SVG icons for various UI elements. Each icon is a separate component with consistent sizing and styling properties.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  render: () => <IconShowcase />,
  parameters: {
    docs: {
      description: {
        story: "All available icons in the component library.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="d-flex gap-4 align-items-center">
      <div className="text-center">
        <ChevronDown size={16} />
        <div className="mt-1 small">16px</div>
      </div>
      <div className="text-center">
        <ChevronDown size={20} />
        <div className="mt-1 small">20px</div>
      </div>
      <div className="text-center">
        <ChevronDown size={24} />
        <div className="mt-1 small">24px</div>
      </div>
      <div className="text-center">
        <ChevronDown size={32} />
        <div className="mt-1 small">32px</div>
      </div>
      <div className="text-center">
        <ChevronDown size={48} />
        <div className="mt-1 small">48px</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons in different sizes (16px, 20px, 24px, 32px, 48px).",
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div className="d-flex gap-3 align-items-center flex-wrap">
      <div className="text-center">
        <AlertCircle size={32} color="#dc3545" />
        <div className="mt-1 small">Red</div>
      </div>
      <div className="text-center">
        <CheckCircle size={32} color="#198754" />
        <div className="mt-1 small">Green</div>
      </div>
      <div className="text-center">
        <AlertTriangle size={32} color="#ffc107" />
        <div className="mt-1 small">Yellow</div>
      </div>
      <div className="text-center">
        <Info size={32} color="#0d6efd" />
        <div className="mt-1 small">Blue</div>
      </div>
      <div className="text-center">
        <LoaderIcon size={32} color="#6c757d" />
        <div className="mt-1 small">Gray</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons with custom colors for different states and contexts.",
      },
    },
  },
};

export const StatusIcons: Story = {
  render: () => (
    <div className="d-flex gap-4 align-items-center flex-wrap">
      <div className="d-flex align-items-center gap-2">
        <CheckCircle size={20} color="#198754" />
        <span>Success</span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <AlertCircle size={20} color="#dc3545" />
        <span>Error</span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <AlertTriangle size={20} color="#ffc107" />
        <span>Warning</span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <Info size={20} color="#0d6efd" />
        <span>Information</span>
      </div>
      <div className="d-flex align-items-center gap-2">
        <LoaderIcon size={20} color="#6c757d" />
        <span>Loading</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icons used to indicate different status states in the application.",
      },
    },
  },
};

export const InteractiveElements: Story = {
  render: () => (
    <div className="d-flex gap-3 align-items-center flex-wrap">
      <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
        <Eye size={16} />
        Show
      </button>
      <button className="btn btn-outline-secondary d-flex align-items-center gap-2">
        <EyeOff size={16} />
        Hide
      </button>
      <div className="dropdown">
        <button
          className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
          type="button"
        >
          Options
          <ChevronDown size={16} />
        </button>
      </div>
      <div className="accordion" style={{ maxWidth: "200px" }}>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button d-flex align-items-center gap-2"
              type="button"
            >
              <ChevronUp size={16} />
              Expand Section
            </button>
          </h2>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icons used in interactive elements like buttons, dropdowns, and accordions.",
      },
    },
  },
};

export const LoadingAnimation: Story = {
  render: () => (
    <div className="d-flex gap-4 align-items-center">
      <div className="text-center">
        <LoaderIcon
          size={24}
          className="spinner-border"
          style={{ animation: "spin 1s linear infinite" }}
        />
        <div className="mt-1 small">Spinning</div>
      </div>
      <div className="text-center">
        <LoaderIcon size={32} color="#0d6efd" />
        <div className="mt-1 small">Static</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Loading icon with and without animation.",
      },
    },
  },
};

export const WithCustomClasses: Story = {
  render: () => (
    <div className="d-flex gap-3 align-items-center flex-wrap">
      <CheckCircle size={24} className="text-success" />
      <AlertCircle size={24} className="text-danger" />
      <AlertTriangle size={24} className="text-warning" />
      <Info size={24} className="text-info" />
      <LoaderIcon size={24} className="text-muted" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icons with custom CSS classes for styling.",
      },
    },
  },
};
