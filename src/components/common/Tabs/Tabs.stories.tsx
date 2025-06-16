import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './index';

const meta: Meta<typeof Tabs> = {
  title: 'Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    defaultActiveKey: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  render: (args: any) => (
    <Tabs defaultActiveKey="tab1" {...args}>
      <Tabs.Pane eventKey="tab1" title="Tab 1">
        <div>Content of Tab 1</div>
      </Tabs.Pane>
      <Tabs.Pane eventKey="tab2" title="Tab 2">
        <div>Content of Tab 2</div>
      </Tabs.Pane>
      <Tabs.Pane eventKey="tab3" title="Tab 3">
        <div>Content of Tab 3</div>
      </Tabs.Pane>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: (args: any) => (
    <Tabs defaultActiveKey="tab1" {...args}>
      <Tabs.Pane eventKey="tab1" title="Active Tab">
        <div>Active tab content</div>
      </Tabs.Pane>
      <Tabs.Pane eventKey="tab2" title="Disabled Tab" disabled>
        <div>This tab is disabled</div>
      </Tabs.Pane>
      <Tabs.Pane eventKey="tab3" title="Another Tab">
        <div>Another tab content</div>
      </Tabs.Pane>
    </Tabs>
  ),
};

export const DynamicTabs: Story = {
  render: (args: any) => {
    const tabData = [
      { key: 'a', title: 'Alpha', content: 'Alpha content' },
      { key: 'b', title: 'Beta', content: 'Beta content' },
      { key: 'c', title: 'Gamma', content: 'Gamma content' },
    ];
    return (
      <Tabs defaultActiveKey="a" {...args}>
        {tabData.map((tab) => (
          <Tabs.Pane eventKey={tab.key} title={tab.title} key={tab.key}>
            <div>{tab.content}</div>
          </Tabs.Pane>
        ))}
      </Tabs>
    );
  },
}; 