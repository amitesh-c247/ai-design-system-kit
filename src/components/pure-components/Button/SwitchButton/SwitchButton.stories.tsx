import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SwitchButton from "./SwitchButton";

const meta: Meta<typeof SwitchButton> = {
  title: "Components/Form/SwitchButton",
  component: SwitchButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toggle switch button component that can be used for boolean state management.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is in the ON state",
    },
    onChange: {
      action: "changed",
      description: "Callback function called when the switch state changes",
    },
    id: {
      control: "text",
      description: "Optional ID for the switch group",
    },
    label: {
      control: "text",
      description: "Optional label text to display next to the switch",
    },
  },
  args: {
    checked: false,
    id: "switch-example",
    label: "Toggle Switch",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
const InteractiveSwitch = ({ checked: initialChecked, ...props }: any) => {
  const [checked, setChecked] = useState(initialChecked);

  return <SwitchButton checked={checked} onChange={setChecked} {...props} />;
};

export const Default: Story = {
  render: (args) => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
    label: "Default Switch",
  },
};

export const Checked: Story = {
  render: (args) => <InteractiveSwitch {...args} />,
  args: {
    checked: true,
    label: "Checked Switch",
  },
};

export const WithoutLabel: Story = {
  render: (args) => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
    label: undefined,
  },
};

export const WithCustomId: Story = {
  render: (args) => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
    label: "Custom ID Switch",
    id: "custom-switch-id",
  },
};

export const MultipleSwitches: Story = {
  render: () => {
    const [switches, setSwitches] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      sound: false,
    });

    const handleSwitchChange = (key: string, value: boolean) => {
      setSwitches((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <SwitchButton
          checked={switches.notifications}
          onChange={(checked) => handleSwitchChange("notifications", checked)}
          label="Push Notifications"
          id="notifications-switch"
        />
        <SwitchButton
          checked={switches.darkMode}
          onChange={(checked) => handleSwitchChange("darkMode", checked)}
          label="Dark Mode"
          id="dark-mode-switch"
        />
        <SwitchButton
          checked={switches.autoSave}
          onChange={(checked) => handleSwitchChange("autoSave", checked)}
          label="Auto Save"
          id="auto-save-switch"
        />
        <SwitchButton
          checked={switches.sound}
          onChange={(checked) => handleSwitchChange("sound", checked)}
          label="Sound Effects"
          id="sound-switch"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple switch buttons demonstrating different states and configurations.",
      },
    },
  },
};

export const AccessibilityExample: Story = {
  render: (args) => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
    label: "Accessibility Switch",
    id: "accessibility-switch",
  },
  parameters: {
    docs: {
      description: {
        story: "This switch includes proper ARIA attributes for accessibility.",
      },
    },
  },
};
