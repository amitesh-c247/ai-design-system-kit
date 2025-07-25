import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload } from "./FileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "Form field name for React Hook Form",
    },
    label: {
      control: "text",
      description: "Label for the file upload field",
    },
    accept: {
      control: "text",
      description: 'Accepted file types (e.g., ".pdf,.doc,.docx" or "image/*")',
    },
    multiple: {
      control: "boolean",
      description: "Allow multiple file selection",
    },
    maxSize: {
      control: "number",
      description: "Maximum file size in MB",
    },
    disabled: {
      control: "boolean",
      description: "Disable the file upload component",
    },
    required: {
      control: "boolean",
      description: "Make the field required",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "files",
    label: "Upload Files",
    accept: "*/*",
    multiple: false,
    maxSize: 10,
    disabled: false,
    required: false,
  },
};

export const MultipleFiles: Story = {
  args: {
    name: "files",
    label: "Upload Multiple Files",
    accept: "*/*",
    multiple: true,
    maxSize: 10,
    disabled: false,
    required: false,
  },
};

export const ImagesOnly: Story = {
  args: {
    name: "images",
    label: "Upload Images",
    accept: "image/*",
    multiple: true,
    maxSize: 5,
    disabled: false,
    required: false,
  },
};

export const DocumentsOnly: Story = {
  args: {
    name: "documents",
    label: "Upload Documents",
    accept: ".pdf,.doc,.docx,.txt",
    multiple: true,
    maxSize: 20,
    disabled: false,
    required: false,
  },
};

export const WithFileSelectHandler: Story = {
  args: {
    name: "files",
    label: "Upload with Handler",
    accept: "*/*",
    multiple: true,
    maxSize: 10,
    disabled: false,
    required: false,
    onFileSelect: (files) => {
      console.log("Selected files:", files);
      alert(`Selected ${files.length} file(s)`);
    },
  },
};

export const WithUploadHandler: Story = {
  args: {
    name: "files",
    label: "Upload with Progress",
    accept: "*/*",
    multiple: true,
    maxSize: 10,
    disabled: false,
    required: false,
    onFileSelect: (files) => {
      console.log("Selected files:", files);
    },
    onFileUpload: async (files) => {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Uploaded files:", files);
      alert("Files uploaded successfully!");
    },
  },
};

export const Disabled: Story = {
  args: {
    name: "files",
    label: "Disabled Upload",
    accept: "*/*",
    multiple: false,
    maxSize: 10,
    disabled: true,
    required: false,
  },
};

export const Required: Story = {
  args: {
    name: "files",
    label: "Required Upload",
    accept: "*/*",
    multiple: false,
    maxSize: 10,
    disabled: false,
    required: true,
  },
};

export const WithError: Story = {
  args: {
    name: "files",
    label: "Upload with Error",
    accept: "*/*",
    multiple: false,
    maxSize: 10,
    disabled: false,
    required: false,
    error: "Please select a valid file",
  },
};

export const SmallMaxSize: Story = {
  args: {
    name: "files",
    label: "Small File Size Limit",
    accept: "*/*",
    multiple: true,
    maxSize: 1, // 1MB
    disabled: false,
    required: false,
  },
};

export const CustomFileTypes: Story = {
  args: {
    name: "files",
    label: "Custom File Types",
    accept: ".zip,.rar,.7z",
    multiple: true,
    maxSize: 50,
    disabled: false,
    required: false,
  },
};
