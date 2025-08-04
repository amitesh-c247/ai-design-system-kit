import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import EditorJSComponent, { EditorJSData } from "./EditorJS";

const meta: Meta<typeof EditorJSComponent> = {
  title: "Components/Form/EditorJS",
  component: EditorJSComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modern Notion-like block-based editor component built with Editor.js that provides comprehensive content editing capabilities including headers, lists, code blocks, quotes, tables, and more.",
      },
    },
  },
  argTypes: {
    data: {
      control: "object",
      description: "Initial data for the editor in Editor.js format",
    },
    onChange: {
      description: "Callback function called when the editor content changes",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown when editor is empty",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the editor is in read-only mode",
    },
    className: {
      control: "text",
      description: "Custom CSS class to apply to the wrapper",
    },
    minHeight: {
      control: "number",
      description: "Minimum height of the editor in pixels",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    isInvalid: {
      control: "boolean",
      description: "Whether to show the invalid state styling",
    },
    autofocus: {
      control: "boolean",
      description: "Whether to autofocus the editor on mount",
    },
    logLevel: {
      control: "select",
      options: ["VERBOSE", "INFO", "WARN", "ERROR"],
      description: "Log level for debugging",
    },
  },
  args: {
    placeholder: "Let's write an awesome story!",
    readOnly: false,
    className: "",
    minHeight: 300,
    error: "",
    isInvalid: false,
    autofocus: false,
    logLevel: "WARN",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
const InteractiveEditorJS = (props: any) => {
  const [data, setData] = useState<EditorJSData | undefined>(props.data);

  return (
    <div style={{ width: "800px", maxWidth: "100%" }}>
      <EditorJSComponent {...props} data={data} onChange={setData} />
      {data && (
        <details style={{ marginTop: "1rem", fontSize: "0.875rem" }}>
          <summary>Current Editor Data (JSON)</summary>
          <pre
            style={{
              background: "#f3f4f6",
              padding: "1rem",
              borderRadius: "8px",
              overflow: "auto",
              maxHeight: "200px",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};

export const Default: Story = {
  render: (args) => <InteractiveEditorJS {...args} />,
};

export const WithInitialContent: Story = {
  render: (args) => <InteractiveEditorJS {...args} />,
  args: {
    data: {
      time: Date.now(),
      blocks: [
        {
          type: "header",
          data: {
            text: "Welcome to Editor.js",
            level: 1,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This is a modern block-based editor that provides a clean writing experience similar to Notion. You can create various types of content blocks:",
          },
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Rich text with <b>bold</b> and <i>italic</i> formatting",
              "Headers of different levels",
              "Code blocks and inline code",
              "Lists and checklists",
              "Quotes and warnings",
            ],
          },
        },
        {
          type: "quote",
          data: {
            text: "The best way to get started is to quit talking and begin doing.",
            caption: "Walt Disney",
          },
        },
      ],
      version: "2.28.2",
    },
  },
};

export const ArticleExample: Story = {
  render: (args) => <InteractiveEditorJS {...args} />,
  args: {
    data: {
      time: Date.now(),
      blocks: [
        {
          type: "header",
          data: {
            text: "Getting Started with React Development",
            level: 1,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "React is a popular JavaScript library for building user interfaces. In this article, we'll explore the fundamentals of React development.",
          },
        },
        {
          type: "header",
          data: {
            text: "Prerequisites",
            level: 2,
          },
        },
        {
          type: "checklist",
          data: {
            items: [
              { text: "Basic knowledge of JavaScript", checked: true },
              { text: "Node.js installed on your system", checked: true },
              { text: "A code editor (VS Code recommended)", checked: false },
            ],
          },
        },
        {
          type: "header",
          data: {
            text: "Setting up a React Project",
            level: 2,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "The easiest way to create a new React project is using Create React App:",
          },
        },
        {
          type: "code",
          data: {
            code: "npx create-react-app my-app\ncd my-app\nnpm start",
          },
        },
        {
          type: "warning",
          data: {
            title: "Important Note",
            message:
              "Make sure you have Node.js version 14 or higher installed before running these commands.",
          },
        },
        {
          type: "delimiter",
          data: {},
        },
        {
          type: "paragraph",
          data: {
            text: "That's it! You now have a working React application running on your local machine.",
          },
        },
      ],
      version: "2.28.2",
    },
  },
};

export const ReadOnlyMode: Story = {
  render: (args) => <InteractiveEditorJS {...args} />,
  args: {
    readOnly: true,
    data: {
      time: Date.now(),
      blocks: [
        {
          type: "header",
          data: {
            text: "Read-Only Content",
            level: 2,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This editor is in read-only mode. You can view the content but cannot edit it. This is useful for displaying formatted content or creating documentation viewers.",
          },
        },
        {
          type: "quote",
          data: {
            text: "The best interface is no interface.",
            caption: "Golden Krishna",
          },
        },
      ],
      version: "2.28.2",
    },
  },
};

export const InvalidState: Story = {
  render: (args) => <InteractiveEditorJS {...args} />,
  args: {
    isInvalid: true,
    error: "Content is required and cannot be empty.",
  },
};

export const CustomHeight: Story = {
  render: (args) => <InteractiveEditorJS {...args} />,
  args: {
    minHeight: 500,
    placeholder:
      "This editor has a custom minimum height of 500px. Start writing to see how it adapts to your content...",
  },
};

export const WithComplexContent: Story = {
  render: (args) => <InteractiveEditorJS {...args} />,
  args: {
    data: {
      time: Date.now(),
      blocks: [
        {
          type: "header",
          data: {
            text: "Complete Feature Demo",
            level: 1,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This example showcases various Editor.js features and block types available in our implementation.",
          },
        },
        {
          type: "header",
          data: {
            text: "Text Formatting",
            level: 2,
          },
        },
        {
          type: "paragraph",
          data: {
            text: 'You can format text with <b>bold</b>, <i>italic</i>, and <mark class="cdx-marker">highlighted</mark> text. You can also add <code class="inline-code">inline code</code> snippets.',
          },
        },
        {
          type: "header",
          data: {
            text: "Lists and Checklists",
            level: 2,
          },
        },
        {
          type: "list",
          data: {
            style: "ordered",
            items: [
              "First ordered item",
              "Second ordered item with <b>bold text</b>",
              "Third item with a longer description that demonstrates how lists handle multiple lines of content",
            ],
          },
        },
        {
          type: "checklist",
          data: {
            items: [
              { text: "Completed task", checked: true },
              { text: "Pending task", checked: false },
              {
                text: "Another pending task with <i>italic text</i>",
                checked: false,
              },
            ],
          },
        },
        {
          type: "header",
          data: {
            text: "Code and Quotes",
            level: 2,
          },
        },
        {
          type: "code",
          data: {
            code: "function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));",
          },
        },
        {
          type: "quote",
          data: {
            text: "Code is like humor. When you have to explain it, it's bad.",
            caption: "Cory House",
          },
        },
        {
          type: "warning",
          data: {
            title: "Performance Tip",
            message:
              "Always optimize your code for readability first, then for performance. Premature optimization is the root of all evil.",
          },
        },
        {
          type: "delimiter",
          data: {},
        },
        {
          type: "paragraph",
          data: {
            text: "This demonstrates the versatility and power of the Editor.js block-based editing system.",
          },
        },
      ],
      version: "2.28.2",
    },
  },
};

export const MultipleEditors: Story = {
  render: () => {
    const [editor1Data, setEditor1Data] = useState<EditorJSData>({
      blocks: [
        {
          type: "header",
          data: { text: "First Editor", level: 2 },
        },
        {
          type: "paragraph",
          data: { text: "This is the content of the first editor." },
        },
      ],
    });

    const [editor2Data, setEditor2Data] = useState<EditorJSData>({
      blocks: [
        {
          type: "header",
          data: { text: "Second Editor", level: 2 },
        },
        {
          type: "paragraph",
          data: { text: "This is the content of the second editor." },
        },
      ],
    });

    return (
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexDirection: "column",
          width: "800px",
        }}
      >
        <div>
          <h3 style={{ marginBottom: "1rem" }}>Editor 1</h3>
          <EditorJSComponent
            data={editor1Data}
            onChange={setEditor1Data}
            minHeight={200}
            placeholder="First editor content..."
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "1rem" }}>Editor 2</h3>
          <EditorJSComponent
            data={editor2Data}
            onChange={setEditor2Data}
            minHeight={200}
            placeholder="Second editor content..."
          />
        </div>
      </div>
    );
  },
};
