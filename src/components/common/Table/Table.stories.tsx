import type { Meta, StoryObj } from '@storybook/react';
import Table from './index';

const meta: Meta<typeof Table> = {
  title: 'Common/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    bordered: { control: 'boolean' },
    striped: { control: 'boolean' },
    hover: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'lg'] },
    variant: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = [
  { dataIndex: 'name', title: 'Name' },
  { dataIndex: 'age', title: 'Age' },
  { dataIndex: 'address', title: 'Address' },
];

const dataSource = [
  { name: 'John Doe', age: 32, address: 'New York' },
  { name: 'Jane Smith', age: 27, address: 'Los Angeles' },
  { name: 'Bob Johnson', age: 45, address: 'Chicago' },
];

export const Basic: Story = {
  args: {
    columns,
    dataSource,
    rowKey: 'name',
  },
};

export const Bordered: Story = {
  args: {
    columns,
    dataSource,
    rowKey: 'name',
    bordered: true,
  },
};

export const Striped: Story = {
  args: {
    columns,
    dataSource,
    rowKey: 'name',
    striped: true,
  },
};

export const Hover: Story = {
  args: {
    columns,
    dataSource,
    rowKey: 'name',
    hover: true,
  },
};

export const Small: Story = {
  args: {
    columns,
    dataSource,
    rowKey: 'name',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    columns,
    dataSource,
    rowKey: 'name',
    size: 'lg',
  },
};

export const WithCustomRender: Story = {
  args: {
    columns: [
      { dataIndex: 'name', title: 'Name' },
      { dataIndex: 'age', title: 'Age' },
      {
        dataIndex: 'address',
        title: 'Address',
        render: (text: string, record: { name: string; age: number; address: string }) => (
          <span style={{ color: 'blue' }}>{text}</span>
        ),
      },
    ],
    dataSource,
    rowKey: 'name',
    bordered: true,
    hover: true,
  },
};
