"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EditorJSData } from "@/components/pure-components/EditorJS";
import styles from "./styles.module.scss";

// Dynamic import with proper loading state
const EditorJS = dynamic(
  () => import("@/components/pure-components/EditorJS"),
  {
    ssr: false,
    loading: () => (
      <div className={styles.loadingEditor}>Loading Notion-like editor...</div>
    ),
  }
);

const TipTapEditor = dynamic(
  () => import("@/components/pure-components/TipTapEditor"),
  {
    ssr: false,
    loading: () => (
      <div className={styles.loadingEditor}>Loading TipTap editor...</div>
    ),
  }
);

export default function EditorsDemo() {
  const [tiptapContent, setTiptapContent] = useState<string>("");
  const [editorJSContent, setEditorJSContent] = useState<
    EditorJSData | undefined
  >();
  const [showPreview, setShowPreview] = useState(false);

  const handleEditorJSChange = (data: EditorJSData) => {
    console.log("EditorJS content changed:", data);
    setEditorJSContent(data);
  };

  const handleTipTapChange = (content: string) => {
    console.log("TipTap content changed:", content);
    setTiptapContent(content);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>📝 Text Editors Demo</h1>
        <p className={styles.subtitle}>
          Compare and test both TipTap and EditorJS (Notion-like) editors
        </p>
        <button
          className={styles.toggleButton}
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? "✏️ Edit Mode" : "👁️ Preview Mode"}
        </button>
      </div>

      <div className={styles.content}>
        {!showPreview ? (
          <div className={styles.editorsGrid}>
            {/* EditorJS Section */}
            <div className={styles.editorSection}>
              <div className={styles.editorHeader}>
                <h2>🎯 EditorJS (Notion-like)</h2>
                <div className={styles.badges}>
                  <span className={styles.badge}>Block-based</span>
                  <span className={styles.badge}>JSON Output</span>
                </div>
              </div>
              <div className={styles.features}>
                <p>
                  ✅ Type <code>/</code> for commands
                </p>
                <p>✅ Drag blocks to reorder</p>
                <p>✅ 15+ content types</p>
                <p>✅ Inline formatting</p>
              </div>
              <div className={styles.editorWrapper}>
                <EditorJS
                  data={editorJSContent}
                  onChange={handleEditorJSChange}
                  placeholder="Type '/' for commands or start writing..."
                  minHeight={300}
                  autofocus={false}
                />
              </div>
              <div className={styles.shortcuts}>
                <h4>⌨️ Keyboard Shortcuts:</h4>
                <div className={styles.shortcutGrid}>
                  <code>CMD+SHIFT+H</code> <span>Header</span>
                  <code>CMD+SHIFT+L</code> <span>List</span>
                  <code>CMD+SHIFT+O</code> <span>Quote</span>
                  <code>CMD+SHIFT+C</code> <span>Code</span>
                </div>
              </div>
            </div>

            {/* TipTap Section */}
            <div className={styles.editorSection}>
              <div className={styles.editorHeader}>
                <h2>📄 TipTap (Traditional)</h2>
                <div className={styles.badges}>
                  <span className={styles.badge}>Rich Text</span>
                  <span className={styles.badge}>HTML Output</span>
                </div>
              </div>
              <div className={styles.features}>
                <p>✅ WYSIWYG editing</p>
                <p>✅ Toolbar formatting</p>
                <p>✅ Traditional rich text</p>
                <p>✅ HTML output</p>
              </div>
              <div className={styles.editorWrapper}>
                <TipTapEditor
                  content={tiptapContent}
                  onChange={handleTipTapChange}
                  placeholder="Start typing with traditional rich text editor..."
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.previewGrid}>
            <div className={styles.previewSection}>
              <h3>🎯 EditorJS Data (JSON)</h3>
              <pre className={styles.jsonPreview}>
                {editorJSContent
                  ? JSON.stringify(editorJSContent, null, 2)
                  : "No content yet"}
              </pre>
            </div>
            <div className={styles.previewSection}>
              <h3>📄 TipTap Data (HTML)</h3>
              <pre className={styles.htmlPreview}>
                {tiptapContent || "No content yet"}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Debug Info */}
      <div className={styles.debugInfo}>
        <h3>🔧 Debug Information</h3>
        <div className={styles.debugGrid}>
          <div>
            <strong>EditorJS Blocks:</strong>{" "}
            {editorJSContent?.blocks?.length || 0}
          </div>
          <div>
            <strong>TipTap Length:</strong> {tiptapContent.length}
          </div>
          <div>
            <strong>Client-side Rendering:</strong> ✅ Active
          </div>
          <div>
            <strong>Dynamic Imports:</strong> ✅ Working
          </div>
        </div>
      </div>

      {/* Test Instructions */}
      <div className={styles.instructions}>
        <h3>🧪 How to Test EditorJS</h3>
        <ol>
          <li>
            <strong>Click in the EditorJS area</strong> (left side)
          </li>
          <li>
            <strong>Type some text</strong> to create a paragraph
          </li>
          <li>
            <strong>
              Press <code>/</code>
            </strong>{" "}
            to open the command menu
          </li>
          <li>
            <strong>Try different blocks:</strong>
            <ul>
              <li>
                <code>/header</code> - Create headers
              </li>
              <li>
                <code>/list</code> - Create lists
              </li>
              <li>
                <code>/quote</code> - Create quotes
              </li>
              <li>
                <code>/code</code> - Code blocks
              </li>
              <li>
                <code>/warning</code> - Warning callouts
              </li>
            </ul>
          </li>
          <li>
            <strong>Use keyboard shortcuts</strong> (see above)
          </li>
          <li>
            <strong>Drag blocks</strong> using the handle on the left
          </li>
          <li>
            <strong>Switch to Preview Mode</strong> to see the JSON output
          </li>
        </ol>
      </div>
    </div>
  );
}
