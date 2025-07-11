import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import CodeBlock from "@tiptap/extension-code-block";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";

interface TipTapEditorProps {
  name: string;
  defaultValue?: string;
  isInvalid?: boolean;
  feedback?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
  minHeight?: number;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  name,
  defaultValue = "",
  isInvalid = false,
  feedback,
  onChange,
  placeholder = "Start writing your content...",
  minHeight = 200,
}) => {
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto",
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-gray-100 p-4 rounded font-mono text-sm",
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-200",
        },
      }),
      Underline.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
    ],
    content: defaultValue,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
  });

  // Show loading state on server-side
  if (!isClient) {
    return (
      <div
        style={{
          minHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
          color: "#6c757d",
          fontSize: "14px",
          border: "1px solid #dee2e6",
          borderRadius: "0.375rem",
        }}
      >
        Loading editor...
      </div>
    );
  }

  if (!editor) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          minHeight,
          border: isInvalid ? "1px solid #dc3545" : "1px solid #dee2e6",
          borderRadius: "0.375rem",
          backgroundColor: "#fff",
        }}
      >
        <EditorContent
          editor={editor}
          style={{
            padding: "1rem",
            minHeight,
          }}
        />
      </div>
      {isInvalid && feedback && (
        <div
          style={{
            color: "#dc3545",
            fontSize: "0.875rem",
            marginTop: "0.25rem",
          }}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default TipTapEditor;
