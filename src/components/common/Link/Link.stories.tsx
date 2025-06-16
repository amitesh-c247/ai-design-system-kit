import type { Meta, StoryObj } from '@storybook/react';
import Link from './index';
import { FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

const meta: Meta<typeof Link> = {
  title: 'Common/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['tertiary', 'standalone', 'inline', 'inlineIcon', 'button'],
    },
    iconPosition: {
      control: 'select',
      options: ['start', 'end'],
    },
    emphasized: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
    openExternalLinkInNewTab: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Tertiary: Story = {
  args: {
    to: '#',
    variant: 'tertiary',
    children: 'Tertiary Link',
  },
};

export const TertiaryWithIcon: Story = {
  args: {
    to: '#',
    variant: 'tertiary',
    icon: <FaArrowRight />,
    iconPosition: 'end',
    children: 'Tertiary Link with Icon',
  },
};

export const Standalone: Story = {
  args: {
    to: '#',
    variant: 'standalone',
    children: 'Standalone Link',
  },
};

export const StandaloneEmphasized: Story = {
  args: {
    to: '#',
    variant: 'standalone',
    emphasized: true,
    children: 'Standalone Link Emphasized',
  },
};

export const Inline: Story = {
  args: {
    to: '#',
    variant: 'inline',
    children: 'Inline Link',
  },
};

export const InlineWithIcon: Story = {
  args: {
    to: '#',
    variant: 'inlineIcon',
    icon: <FaExternalLinkAlt />,
    children: 'Inline Link with Icon',
  },
};

export const Button: Story = {
  args: {
    to: '#',
    variant: 'button',
    children: 'Button Link',
  },
};

export const ButtonWithIcon: Story = {
  args: {
    to: '#',
    variant: 'button',
    icon: <FaArrowRight />,
    iconPosition: 'end',
    children: 'Button Link with Icon',
  },
};

export const Disabled: Story = {
  args: {
    to: '#',
    variant: 'tertiary',
    isDisabled: true,
    children: 'Disabled Link',
  },
};

export const ExternalLink: Story = {
  args: {
    to: 'https://example.com',
    variant: 'tertiary',
    icon: <FaExternalLinkAlt />,
    iconPosition: 'end',
    openExternalLinkInNewTab: true,
    children: 'External Link',
  },
};
