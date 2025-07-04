import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'react-bootstrap';
import Drawer from './index';

const meta: Meta<typeof Drawer> = {
  title: 'Common/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['start', 'end', 'top', 'bottom'],
    },
    backdrop: {
      control: 'select',
      options: [true, false, 'static'],
    },
    scrollable: { control: 'boolean' },
    closeButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Basic Drawer
export const Basic: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button onClick={() => setShow(true)}>Open Drawer</Button>
        <Drawer
          show={show}
          onHide={() => setShow(false)}
          title="Basic Drawer"
        >
          <p>This is the content of the drawer.</p>
        </Drawer>
      </>
    );
  },
};

// Different Placements
export const Placements: Story = {
  render: () => {
    const [placement, setPlacement] = useState<'start' | 'end' | 'top' | 'bottom'>('bottom');
    const [show, setShow] = useState(false);

    return (
      <>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <Button onClick={() => { setPlacement('start'); setShow(true); }}>Left</Button>
          <Button onClick={() => { setPlacement('end'); setShow(true); }}>Right</Button>
          <Button onClick={() => { setPlacement('top'); setShow(true); }}>Top</Button>
          <Button onClick={() => { setPlacement('bottom'); setShow(true); }}>Bottom</Button>
        </div>
        <Drawer
          show={show}
          onHide={() => setShow(false)}
          placement={placement}
          title={`${placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer`}
        >
          <p>This is a {placement} drawer.</p>
        </Drawer>
      </>
    );
  },
};

// Without Backdrop
export const WithoutBackdrop: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button onClick={() => setShow(true)}>Open Drawer</Button>
        <Drawer
          show={show}
          onHide={() => setShow(false)}
          title="Drawer without Backdrop"
          backdrop={false}
        >
          <p>This drawer has no backdrop.</p>
        </Drawer>
      </>
    );
  },
};

// Custom Height
export const CustomHeight: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button onClick={() => setShow(true)}>Open Drawer</Button>
        <Drawer
          show={show}
          onHide={() => setShow(false)}
          title="Custom Height Drawer"
          height="50%"
          minHeight="200px"
          maxHeight="80%"
        >
          <p>This drawer has custom height settings.</p>
        </Drawer>
      </>
    );
  },
};
