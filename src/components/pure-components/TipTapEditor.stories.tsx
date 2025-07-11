import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TipTapEditor from "./TipTapEditor";

const meta: Meta<typeof TipTapEditor> = {
  title: "Components/Form/TipTapEditor",
  component: TipTapEditor,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modern rich text editor component built with TipTap that provides comprehensive content editing capabilities including formatting, links, images, and more.",
      },
    },
  },
  argTypes: {
    name: {
      control: "text",
      description: "The name identifier for the editor field",
    },
    defaultValue: {
      control: "text",
      description: "Initial HTML content for the editor",
    },
    isInvalid: {
      control: "boolean",
      description: "Whether to show the invalid state styling",
    },
    feedback: {
      control: "text",
      description: "Error message to display when the field is invalid",
    },
    onChange: {
      description: "Callback function called when the editor content changes",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when editor is empty",
    },
    minHeight: {
      control: "number",
      description: "Minimum height of the editor in pixels",
    },
  },
  args: {
    name: "content-editor",
    isInvalid: false,
    feedback: "",
    placeholder: "Start writing your content...",
    minHeight: 200,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
const InteractiveTipTapEditor = ({
  defaultValue: initialValue,
  ...props
}: any) => {
  const [content, setContent] = useState(initialValue);

  return (
    <TipTapEditor defaultValue={content} onChange={setContent} {...props} />
  );
};

export const Default: Story = {
  render: (args) => <InteractiveTipTapEditor {...args} />,
  args: {
    name: "default-editor",
  },
};

export const WithInitialContent: Story = {
  render: (args) => <InteractiveTipTapEditor {...args} />,
  args: {
    name: "content-editor",
    defaultValue: `
      <h1>Welcome to TipTap Editor</h1>
      <p>This is a modern rich text editor that supports various formatting options including:</p>
      <ul>
        <li><strong>Bold text</strong> and <em>italic text</em></li>
        <li><u>Underlined text</u> and <mark>highlighted text</mark></li>
        <li><a href="https://tiptap.dev">Links</a> and images</li>
        <li>Code blocks and inline code</li>
        <li>And much more!</li>
      </ul>
    `,
  },
};

export const WithComplexContent: Story = {
  render: (args) => <InteractiveTipTapEditor {...args} />,
  args: {
    name: "complex-editor",
    defaultValue: `
      <h1>Article Title</h1>
      <p>This is the introduction paragraph. It provides an overview of the article content and sets the context for the reader.</p>
      
      <h2>First Section</h2>
      <p>This is the first section of the article. It contains detailed information about the main topic.</p>
      
      <ol>
        <li>First important point</li>
        <li>Second important point</li>
        <li>Third important point</li>
      </ol>
      
      <h2>Second Section</h2>
      <p>This is the second section with additional information and details.</p>
      
      <ul>
        <li>Feature one</li>
        <li>Feature two</li>
        <li>Feature three</li>
      </ul>
      
      <blockquote>
        <p>This is a blockquote that highlights important information.</p>
      </blockquote>
      
      <pre><code>// This is a code block
function example() {
  return "Hello, TipTap!";
}</code></pre>
    `,
  },
};

export const Invalid: Story = {
  render: (args) => <InteractiveTipTapEditor {...args} />,
  args: {
    name: "invalid-editor",
    isInvalid: true,
    feedback: "This field is required and cannot be empty.",
  },
};

export const Empty: Story = {
  render: (args) => <InteractiveTipTapEditor {...args} />,
  args: {
    name: "empty-editor",
    defaultValue: "",
  },
};

export const WithCustomPlaceholder: Story = {
  render: (args) => <InteractiveTipTapEditor {...args} />,
  args: {
    name: "custom-placeholder-editor",
    placeholder: "Write your article content here...",
  },
};

export const WithCustomHeight: Story = {
  render: (args) => <InteractiveTipTapEditor {...args} />,
  args: {
    name: "custom-height-editor",
    minHeight: 400,
    defaultValue: `
      <h1>Large Editor Example</h1>
      <p>This editor has a custom minimum height of 400px, providing more space for content creation.</p>
      <p>You can adjust the minHeight prop to customize the editor's size according to your needs.</p>
    `,
  },
};

export const WithLongContent: Story = {
  render: (args) => <InteractiveTipTapEditor {...args} />,
  args: {
    name: "long-content-editor",
    defaultValue: `
      <h1>Long Article Example</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h2>Second Section</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <ul>
        <li>First bullet point with detailed information</li>
        <li>Second bullet point with additional details</li>
        <li>Third bullet point with comprehensive content</li>
      </ul>
      
      <h2>Third Section</h2>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
      
      <blockquote>
        <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
      </blockquote>
    `,
  },
};

export const MultipleEditors: Story = {
  render: () => {
    const [editor1Content, setEditor1Content] = useState(`
      <h1>First Editor</h1>
      <p>This is the content of the first editor.</p>
    `);

    const [editor2Content, setEditor2Content] = useState(`
      <h1>Second Editor</h1>
      <p>This is the content of the second editor.</p>
    `);

    return (
      <div style={{ display: "flex", gap: "2rem", flexDirection: "column" }}>
        <div>
          <h3>Editor 1</h3>
          <TipTapEditor
            name="editor-1"
            defaultValue={editor1Content}
            onChange={setEditor1Content}
            minHeight={150}
          />
        </div>
        <div>
          <h3>Editor 2</h3>
          <TipTapEditor
            name="editor-2"
            defaultValue={editor2Content}
            onChange={setEditor2Content}
            minHeight={150}
          />
        </div>
      </div>
    );
  },
};
