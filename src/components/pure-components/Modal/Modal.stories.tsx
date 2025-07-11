import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Common/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "lg", "xl"],
    },
    centered: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate = (args: any) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Open Modal</Button>
      <Modal {...args} open={show} onCancel={() => setShow(false)}>
        <p>This is the modal content.</p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal Title",
    onOk: () => console.log("OK clicked"),
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const WithoutTitle: Story = {
  render: ModalTemplate,
  args: {
    onOk: () => console.log("OK clicked"),
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const WithoutFooter: Story = {
  render: ModalTemplate,
  args: {
    title: "Modal Title",
  },
};

export const Small: Story = {
  render: ModalTemplate,
  args: {
    title: "Small Modal",
    size: "sm",
    onOk: () => console.log("OK clicked"),
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const Large: Story = {
  render: ModalTemplate,
  args: {
    title: "Large Modal",
    size: "lg",
    onOk: () => console.log("OK clicked"),
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const ExtraLarge: Story = {
  render: ModalTemplate,
  args: {
    title: "Extra Large Modal",
    size: "xl",
    onOk: () => console.log("OK clicked"),
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const Centered: Story = {
  render: ModalTemplate,
  args: {
    title: "Centered Modal",
    centered: true,
    onOk: () => console.log("OK clicked"),
    onCancel: () => console.log("Cancel clicked"),
  },
};

export const NotCentered: Story = {
  render: ModalTemplate,
  args: {
    title: "Not Centered Modal",
    centered: false,
    onOk: () => console.log("OK clicked"),
    onCancel: () => console.log("Cancel clicked"),
  },
};
