import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import EditorJSField from "./EditorJSField";

const meta: Meta<typeof EditorJSField> = {
  title: "Components/Form/EditorJSField",
  component: EditorJSField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A rich content editor component built with EditorJS that provides block-based content editing.",
      },
    },
  },
  argTypes: {
    name: {
      control: "text",
      description: "The name identifier for the editor field",
    },
    defaultValue: {
      control: "object",
      description: "Initial content data for the editor",
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
      action: "changed",
      description: "Callback function called when the editor content changes",
    },
  },
  args: {
    name: "content-editor",
    isInvalid: false,
    feedback: "",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
const InteractiveEditorJSField = ({
  defaultValue: initialValue,
  ...props
}: any) => {
  const [data, setData] = useState(initialValue);

  return <EditorJSField defaultValue={data} onChange={setData} {...props} />;
};

export const Default: Story = {
  render: (args) => <InteractiveEditorJSField {...args} />,
  args: {
    name: "default-editor",
  },
};

export const WithInitialContent: Story = {
  render: (args) => <InteractiveEditorJSField {...args} />,
  args: {
    name: "content-editor",
    defaultValue: {
      blocks: [
        {
          type: "header",
          data: {
            text: "Welcome to EditorJS",
            level: 1,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This is a rich content editor that supports various block types including headers, paragraphs, and lists.",
          },
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Header blocks for titles",
              "Paragraph blocks for text",
              "List blocks for bullet points",
              "And much more!",
            ],
          },
        },
      ],
    },
  },
};

export const WithComplexContent: Story = {
  render: (args) => <InteractiveEditorJSField {...args} />,
  args: {
    name: "complex-editor",
    defaultValue: {
      blocks: [
        {
          type: "header",
          data: {
            text: "Article Title",
            level: 1,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This is the introduction paragraph. It provides an overview of the article content and sets the context for the reader.",
          },
        },
        {
          type: "header",
          data: {
            text: "First Section",
            level: 2,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This is the first section of the article. It contains detailed information about the main topic.",
          },
        },
        {
          type: "list",
          data: {
            style: "ordered",
            items: [
              "First important point",
              "Second important point",
              "Third important point",
            ],
          },
        },
        {
          type: "header",
          data: {
            text: "Second Section",
            level: 2,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This is the second section with additional information and details.",
          },
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: ["Feature one", "Feature two", "Feature three"],
          },
        },
      ],
    },
  },
};

export const Invalid: Story = {
  render: (args) => <InteractiveEditorJSField {...args} />,
  args: {
    name: "invalid-editor",
    isInvalid: true,
    feedback: "This field is required and cannot be empty.",
  },
};

export const Empty: Story = {
  render: (args) => <InteractiveEditorJSField {...args} />,
  args: {
    name: "empty-editor",
    defaultValue: {
      blocks: [],
    },
  },
};

export const WithLongContent: Story = {
  render: (args) => <InteractiveEditorJSField {...args} />,
  args: {
    name: "long-content-editor",
    defaultValue: {
      blocks: [
        {
          type: "header",
          data: {
            text: "Long Article Example",
            level: 1,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
        },
        {
          type: "paragraph",
          data: {
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          },
        },
        {
          type: "header",
          data: {
            text: "Second Section",
            level: 2,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
          },
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: [
              "First bullet point with detailed information",
              "Second bullet point with additional details",
              "Third bullet point with comprehensive content",
            ],
          },
        },
      ],
    },
  },
};

export const MultipleEditors: Story = {
  render: () => {
    const [editor1Data, setEditor1Data] = useState({
      blocks: [
        {
          type: "header",
          data: {
            text: "First Editor",
            level: 2,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This is the first editor instance.",
          },
        },
      ],
    });

    const [editor2Data, setEditor2Data] = useState({
      blocks: [
        {
          type: "header",
          data: {
            text: "Second Editor",
            level: 2,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This is the second editor instance.",
          },
        },
      ],
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <h3>Editor 1</h3>
          <EditorJSField
            name="editor-1"
            defaultValue={editor1Data}
            onChange={setEditor1Data}
          />
        </div>
        <div>
          <h3>Editor 2</h3>
          <EditorJSField
            name="editor-2"
            defaultValue={editor2Data}
            onChange={setEditor2Data}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple EditorJS instances demonstrating independent state management.",
      },
    },
  },
};

export const ReadOnlyExample: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <h4>Editable Version:</h4>
        <InteractiveEditorJSField {...args} />
      </div>
      <div>
        <h4>Read-Only Version:</h4>
        <div
          style={{
            border: "1px solid #ced4da",
            borderRadius: 4,
            minHeight: 200,
            padding: "20px",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div>
            <h1>Welcome to EditorJS</h1>
            <p>
              This is a rich content editor that supports various block types
              including headers, paragraphs, and lists.
            </p>
            <ul>
              <li>Header blocks for titles</li>
              <li>Paragraph blocks for text</li>
              <li>List blocks for bullet points</li>
              <li>And much more!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    name: "readonly-example",
    defaultValue: {
      blocks: [
        {
          type: "header",
          data: {
            text: "Welcome to EditorJS",
            level: 1,
          },
        },
        {
          type: "paragraph",
          data: {
            text: "This is a rich content editor that supports various block types including headers, paragraphs, and lists.",
          },
        },
        {
          type: "list",
          data: {
            style: "unordered",
            items: [
              "Header blocks for titles",
              "Paragraph blocks for text",
              "List blocks for bullet points",
              "And much more!",
            ],
          },
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison between editable and read-only versions of the EditorJS field.",
      },
    },
  },
};
