import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "react-bootstrap";
import Toast from "./index";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "error", "warning", "info"],
      description: "Toast variant type",
    },
    position: {
      control: "select",
      options: [
        "top-end",
        "top-start",
        "bottom-end",
        "bottom-start",
        "top-center",
        "bottom-center",
      ],
      description: "Position of the toast",
    },
    autoHide: {
      control: "boolean",
      description: "Whether the toast should auto hide",
    },
    delay: {
      control: "number",
      description: "Delay in milliseconds before auto hide",
    },
    show: {
      control: "boolean",
      description: "Whether the toast is visible",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "A toast component for displaying temporary notifications.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ToastTemplate = (args: any) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button onClick={() => setShow(true)}>Show Toast</Button>
      <Toast {...args} show={show} onClose={() => setShow(false)} />
    </div>
  );
};

export const Default: Story = {
  render: ToastTemplate,
  args: {
    title: "Default Toast",
    message: "This is a default toast message.",
    variant: "info",
  },
};

export const Success: Story = {
  render: ToastTemplate,
  args: {
    title: "Success!",
    message: "Your action was completed successfully.",
    variant: "success",
  },
};

export const Error: Story = {
  render: ToastTemplate,
  args: {
    title: "Error!",
    message: "Something went wrong. Please try again.",
    variant: "error",
  },
};

export const Warning: Story = {
  render: ToastTemplate,
  args: {
    title: "Warning!",
    message: "Please check your input and try again.",
    variant: "warning",
  },
};

export const AllVariants: Story = {
  render: () => {
    const [toasts, setToasts] = useState<any[]>([]);

    const showToast = (variant: string, title: string, message: string) => {
      const newToast = {
        id: Date.now(),
        variant,
        title,
        message,
        show: true,
      };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3000);
    };

    return (
      <div>
        <div className="d-flex gap-2 mb-3">
          <Button
            variant="success"
            onClick={() =>
              showToast(
                "success",
                "Success!",
                "Operation completed successfully."
              )
            }
          >
            Success Toast
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              showToast("error", "Error!", "Something went wrong.")
            }
          >
            Error Toast
          </Button>
          <Button
            variant="warning"
            onClick={() =>
              showToast("warning", "Warning!", "Please check your input.")
            }
          >
            Warning Toast
          </Button>
          <Button
            variant="info"
            onClick={() =>
              showToast("info", "Info!", "Here is some information.")
            }
          >
            Info Toast
          </Button>
        </div>

        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            show={toast.show}
            variant={toast.variant}
            title={toast.title}
            message={toast.message}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
            autoHide
            delay={3000}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example showing all toast variants in action.",
      },
    },
  },
};

export const AutoHide: Story = {
  render: ToastTemplate,
  args: {
    title: "Auto Hide Toast",
    message: "This toast will automatically hide after 3 seconds.",
    variant: "info",
    autoHide: true,
    delay: 3000,
  },
};

export const NoAutoHide: Story = {
  render: ToastTemplate,
  args: {
    title: "Manual Close Toast",
    message: "This toast will stay until manually closed.",
    variant: "warning",
    autoHide: false,
  },
};

export const DifferentPositions: Story = {
  render: () => {
    const [toasts, setToasts] = useState<any[]>([]);

    const showToast = (position: string, title: string) => {
      const newToast = {
        id: Date.now(),
        position,
        title,
        message: `Toast positioned at ${position}`,
        show: true,
      };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3000);
    };

    return (
      <div>
        <div className="d-flex gap-2 mb-3 flex-wrap">
          <Button
            variant="outline-primary"
            onClick={() => showToast("top-end", "Top Right")}
          >
            Top Right
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => showToast("top-start", "Top Left")}
          >
            Top Left
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => showToast("bottom-end", "Bottom Right")}
          >
            Bottom Right
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => showToast("bottom-start", "Bottom Left")}
          >
            Bottom Left
          </Button>
        </div>

        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            show={toast.show}
            position={toast.position}
            title={toast.title}
            message={toast.message}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
            autoHide
            delay={3000}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Toasts positioned at different locations on the screen.",
      },
    },
  },
};
