import type { Meta, StoryObj } from '@storybook/react';
import Link from './index';
import { ExternalLink as ExternalLinkIcon, ArrowRight } from 'lucide-react';

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
    href: '#',
    variant: 'tertiary',
    children: 'Tertiary Link',
  },
};

export const TertiaryWithIcon: Story = {
  args: {
    href: '#',
    variant: 'tertiary',
    icon: <ArrowRight size={16} />,
    iconPosition: 'end',
    children: 'Tertiary Link with Icon',
  },
};

export const Standalone: Story = {
  args: {
    href: '#',
    variant: 'standalone',
    children: 'Standalone Link',
  },
};

export const StandaloneEmphasized: Story = {
  args: {
    href: '#',
    variant: 'standalone',
    emphasized: true,
    children: 'Standalone Link Emphasized',
  },
};

export const Inline: Story = {
  args: {
    href: '#',
    variant: 'inline',
    children: 'Inline Link',
  },
};

export const InlineWithIcon: Story = {
  args: {
    href: '#',
    variant: 'inlineIcon',
    icon: <ExternalLinkIcon size={16} />,
    children: 'Inline Link with Icon',
  },
};

export const Button: Story = {
  args: {
    href: '#',
    variant: 'button',
    children: 'Button Link',
  },
};

export const ButtonWithIcon: Story = {
  args: {
    href: '#',
    variant: 'button',
    icon: <ArrowRight size={16} />,
    iconPosition: 'end',
    children: 'Button Link with Icon',
  },
};

export const Disabled: Story = {
  args: {
    href: '#',
    variant: 'tertiary',
    isDisabled: true,
    children: 'Disabled Link',
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    variant: 'tertiary',
    icon: <ExternalLinkIcon size={16} />,
    iconPosition: 'end',
    openExternalLinkInNewTab: true,
    children: 'External Link',
  },
};
