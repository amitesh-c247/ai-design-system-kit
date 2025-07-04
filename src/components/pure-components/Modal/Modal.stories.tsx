import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from './index';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'lg', 'xl'],
    },
    centered: {
      control: 'boolean',
    },
    closeButton: {
      control: 'boolean',
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
      <Modal {...args} show={show} onHide={() => setShow(false)}>
        <p>This is the modal content.</p>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Title',
    footer: (
      <>
        <Button variant="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Save
        </Button>
      </>
    ),
  },
};

export const WithoutTitle: Story = {
  render: ModalTemplate,
  args: {
    footer: (
      <>
        <Button variant="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Save
        </Button>
      </>
    ),
  },
};

export const WithoutFooter: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Title',
  },
};

export const Small: Story = {
  render: ModalTemplate,
  args: {
    title: 'Small Modal',
    size: 'sm',
    footer: (
      <>
        <Button variant="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Save
        </Button>
      </>
    ),
  },
};

export const Large: Story = {
  render: ModalTemplate,
  args: {
    title: 'Large Modal',
    size: 'lg',
    footer: (
      <>
        <Button variant="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Save
        </Button>
      </>
    ),
  },
};

export const ExtraLarge: Story = {
  render: ModalTemplate,
  args: {
    title: 'Extra Large Modal',
    size: 'xl',
    footer: (
      <>
        <Button variant="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Save
        </Button>
      </>
    ),
  },
};

export const Centered: Story = {
  render: ModalTemplate,
  args: {
    title: 'Centered Modal',
    centered: true,
    footer: (
      <>
        <Button variant="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Save
        </Button>
      </>
    ),
  },
};

export const WithoutCloseButton: Story = {
  render: ModalTemplate,
  args: {
    title: 'Modal Without Close Button',
    closeButton: false,
    footer: (
      <>
        <Button variant="secondary" onClick={() => {}}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {}}>
          Save
        </Button>
      </>
    ),
  },
};
