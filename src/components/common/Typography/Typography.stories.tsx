import Space from '../Space';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypographyProps } from '.';
import Typography from '.';

const meta: Meta<typeof Typography> = {
  title: 'Common/Typography',
  component: Typography,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Basic: Story = {
  args: {
    children: 'Default text',
  },
};

export const H1: Story = {
  args: {
    variant: 'h1',
    component: 'h1',
    children: 'Special',
  },
};

export const H2: Story = {
  args: {
    variant: 'h2',
    component: 'h2',
    children: 'Hero Title',
  },
};

export const H3: Story = {
  args: {
    variant: 'h3',
    component: 'h3',
    children: 'Big Data',
  },
};

export const H5: Story = {
  args: {
    variant: 'h5',
    component: 'h5',
    children: 'Page Title',
  },
};

export const H6: Story = {
  args: {
    variant: 'h6',
    component: 'h6',
    children: 'Subtitle 1/Service Name',
  },
};

export const H7: Story = {
  args: {
    variant: 'h7',
    component: 'h6',
    children: 'Subtitle 2',
  },
};

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Important Text',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Paragraph',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'Small Text',
  },
};

export const Tiny: Story = {
  args: {
    variant: 'tiny',
    children: 'Tiny Text',
  },
};

export const CustomComponent: Story = {
  render: () => (
    <Space direction="vertical">
      <Typography variant="body2" component="span">
        span
      </Typography>
      <Typography variant="body2" component="button">
        button
      </Typography>
      <Typography variant="body2" component="li">
        li
      </Typography>
    </Space>
  ),
};

export const Variants: Story = {
  render: () => (
    <Space direction="vertical">
      <Typography {...(H1.args as TypographyProps)} />
      <Typography {...(H2.args as TypographyProps)} />
      <Typography {...(H3.args as TypographyProps)} />
      <Typography {...(H5.args as TypographyProps)} />
      <Typography {...(H6.args as TypographyProps)} />
      <Typography {...(H7.args as TypographyProps)} />
      <Typography {...(Body1.args as TypographyProps)} />
      <Typography {...(Body2.args as TypographyProps)} />
      <Typography {...(Caption.args as TypographyProps)} />
      <Typography {...(Small.args as TypographyProps)} />
      <Typography {...(Tiny.args as TypographyProps)} />
    </Space>
  ),
};

export const Colors: Story = {
  render: () => (
    <Space direction="vertical">
      <Typography {...(Body2.args as TypographyProps)} color="primary">
        primary
      </Typography>
      <Typography {...(Body2.args as TypographyProps)} color="secondary">
        secondary
      </Typography>
      <Typography {...(Body2.args as TypographyProps)} color="link">
        link
      </Typography>
      <Typography {...(Body2.args as TypographyProps)} color="text">
        text
      </Typography>
      <Typography {...(Body2.args as TypographyProps)} color="disabled">
        disabled
      </Typography>
      <Typography {...(Body2.args as TypographyProps)} color="inverted">
        inverted
      </Typography>
      <Typography {...(Body2.args as TypographyProps)} color="success">
        success
      </Typography>
      <Typography {...(Body2.args as TypographyProps)} color="error">
        error
      </Typography>
      <Typography {...(Body2.args as TypographyProps)} color="warning">
        warning
      </Typography>
    </Space>
  ),
};
