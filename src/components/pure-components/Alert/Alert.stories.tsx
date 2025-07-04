import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Alert from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    showIcon: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
  },
} as Meta<typeof Alert>;

const Template: StoryFn<typeof Alert> = (args) => <Alert {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  type: 'info',
  showIcon: true,
  message: 'This is an alert message!',
  links: [
    {
      label: 'View Documentation',
      to: 'https://example.com',
      openExternalLinkInNewTab: true,
    },
  ],
};

export const Types = () => (
  <div className="d-flex flex-column gap-2">
    <Alert type="info" message="This is an info alert" />
    <Alert type="success" message="This is a success alert" />
    <Alert type="warning" message="This is a warning alert" />
    <Alert type="danger" message="This is a danger alert" />
  </div>
);

export const WithLinks = () => (
  <div className="d-flex flex-column gap-2">
    <Alert
      type="info"
      message="This is an alert with a link"
      links={[
        {
          label: 'Documentation',
          to: 'https://example.com/docs',
          openExternalLinkInNewTab: true,
        },
      ]}
    />
    <Alert
      type="warning"
      message="This is an alert with multiple links"
      links={[
        {
          label: 'Documentation',
          to: 'https://example.com/docs',
          openExternalLinkInNewTab: true,
        },
        {
          label: 'Support',
          to: 'https://example.com/support',
          openExternalLinkInNewTab: true,
        },
      ]}
    />
  </div>
);

export const Closable = () => (
  <div className="d-flex flex-column gap-2">
    <Alert type="info" message="This is a closable alert" closable />
    <Alert
      type="warning"
      message="This is a closable alert with persistence"
      closable
      persistCloseId="storybook-persisted-closable"
    />
  </div>
);
