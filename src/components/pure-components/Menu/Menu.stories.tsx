import type { Meta, StoryObj } from '@storybook/react';
import Menu from './index';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const meta: Meta<typeof Menu> = {
  title: 'Common/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu>
      <Menu.Item>Menu Item 1</Menu.Item>
      <Menu.Item>Menu Item 2</Menu.Item>
      <Menu.Item>Menu Item 3</Menu.Item>
    </Menu>
  ),
};

export const WithActiveItem: Story = {
  render: () => (
    <Menu>
      <Menu.Item>Menu Item 1</Menu.Item>
      <Menu.Item active>Active Item</Menu.Item>
      <Menu.Item>Menu Item 3</Menu.Item>
    </Menu>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Menu>
      <Menu.Item>Menu Item 1</Menu.Item>
      <Menu.Item disabled>Disabled Item</Menu.Item>
      <Menu.Item>Menu Item 3</Menu.Item>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <Menu.Item>
        <FaUser className="me-2" />
        Profile
      </Menu.Item>
      <Menu.Item>
        <FaCog className="me-2" />
        Settings
      </Menu.Item>
      <Menu.Item>
        <FaSignOutAlt className="me-2" />
        Logout
      </Menu.Item>
    </Menu>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <Menu>
      <Menu.Item>Menu Item 1</Menu.Item>
      <Menu.Item>Menu Item 2</Menu.Item>
      <div className="dropdown-divider" />
      <Menu.Item>Menu Item 3</Menu.Item>
      <Menu.Item>Menu Item 4</Menu.Item>
    </Menu>
  ),
}; 