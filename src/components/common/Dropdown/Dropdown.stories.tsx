import type { Meta, StoryFn } from '@storybook/react';
import { Menu } from 'antd';

import { Plus } from '@/components/Icons';

import Dropdown from '.';

const dropdownContent = () => (
  <Menu
    onClick={(keyEvent) => alert(`Clicked on key: ${keyEvent.key}`)}
    items={[
      {
        key: 1,
        label: '1st menu Item',
      },
      {
        key: 2,
        label: '2nd Menu Item',
      },
      {
        key: 3,
        label: '3rd Menu Item',
      },
    ]}
  />
);

export default {
  title: 'LeanDesign/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      description: {
        component: `Dropdown button can be used in scenarios where there are multiple sub-actions originating from a single button. E.g. Add (button lable) - Event (sub-action 1) - Activity (sub-action 2).

The main button can share same props as the [Button component](#button)

'dropdownRender' prop require to pass an <a href="https://ant.design/components/menu/" target="_blank">Antd Menu</a>.
`,
      },
    },
  },
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  dropdownRender: dropdownContent,
  children: 'Dropdown',
  // eslint-disable-next-line no-console, @typescript-eslint/no-unused-vars
  buttonProps: { onClick: (_event) => window.alert('Button clicked!') },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  dropdownRender: dropdownContent,
  icon: <Plus size={16} />,
  children: 'Dropdown with icon menu',
};

export const NoIcon = Template.bind({});
NoIcon.args = {
  dropdownRender: dropdownContent,
  icon: <Plus size={16} />,
  noMenuIcon: true,
  children: 'Dropdown with icon menu',
};

export const CustomContent = Template.bind({});
NoIcon.args = {
  dropdownRender: dropdownContent,
  icon: <Plus size={16} />,
  noMenuIcon: true,
  children: <div>Replace button if passing a react element</div>,
};
