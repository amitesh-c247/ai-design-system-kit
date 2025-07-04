import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Card from './Card';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'strong', 'tight', 'tight-strong'],
    },
    bordered: {
      control: 'boolean',
    },
  },
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => <Card {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Card content',
};

export const Variants = () => (
  <div className="d-flex flex-column gap-2">
    <Card>Default Card</Card>
    <Card variant="strong">Strong Card</Card>
    <Card variant="tight">Tight Card</Card>
    <Card variant="tight-strong">Tight Strong Card</Card>
    <Card bordered>Bordered Card</Card>
  </div>
);

export const WithContent = () => (
  <div className="d-flex flex-column gap-2">
    <Card>
      <h5 className="card-title">Card Title</h5>
      <p className="card-text">
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </p>
      <button className="btn btn-primary">Go somewhere</button>
    </Card>
    <Card variant="strong">
      <h5 className="card-title">Strong Card</h5>
      <p className="card-text">
        This card has a strong background color to make it stand out.
      </p>
    </Card>
  </div>
);
