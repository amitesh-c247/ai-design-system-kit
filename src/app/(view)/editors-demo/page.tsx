"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EditorJSData } from "@/components/pure-components/EditorJS";
import classNames from "classnames";

// Dynamic import with proper loading state
const EditorJS = dynamic(
  () => import("@/components/pure-components/EditorJS"),
  {
    ssr: false,
    loading: () => (
      <div className="text-center p-4">Loading Notion-like editor...</div>
    ),
  }
);

const TipTapEditor = dynamic(
  () => import("@/components/pure-components/TipTapEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="text-center p-4">Loading TipTap editor...</div>
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
    <div className="container-fluid p-4" style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <div className="text-center mb-5">
        <h1 className="fs-2 fw-bold mb-3">📝 Text Editors Demo</h1>
        <p className="fs-5 text-muted mb-3" style={{ maxWidth: "600px", margin: "0 auto" }}>
          Compare and test both TipTap and EditorJS (Notion-like) editors
        </p>
        <button
          className="btn btn-primary"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? "✏️ Edit Mode" : "👁️ Preview Mode"}
        </button>
      </div>

      <div>
        {!showPreview ? (
          <div className="row g-4">
            {/* EditorJS Section */}
            <div className="col-12 col-lg-6">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-light">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <h4 className="mb-0 fs-5 fw-semibold">🎯 EditorJS (Notion-like)</h4>
                  </div>
                  <div className="d-flex gap-2">
                    <span className="badge bg-secondary">Block-based</span>
                    <span className="badge bg-secondary">JSON Output</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <p className="mb-1">✅ Type <code>/</code> for commands</p>
                    <p className="mb-1">✅ Drag blocks to reorder</p>
                    <p className="mb-1">✅ 15+ content types</p>
                    <p className="mb-0">✅ Inline formatting</p>
                  </div>
                  <div className="mb-3">
                    <EditorJS
                      data={editorJSContent}
                      onChange={handleEditorJSChange}
                      placeholder="Type '/' for commands or start writing..."
                      minHeight={300}
                      autofocus={false}
                    />
                  </div>
                  <div className="pt-3 border-top">
                    <h5 className="fs-6 mb-2">⌨️ Keyboard Shortcuts:</h5>
                    <div className="d-grid gap-2" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                      <div><code>CMD+SHIFT+H</code> <span>Header</span></div>
                      <div><code>CMD+SHIFT+L</code> <span>List</span></div>
                      <div><code>CMD+SHIFT+O</code> <span>Quote</span></div>
                      <div><code>CMD+SHIFT+C</code> <span>Code</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TipTap Section */}
            <div className="col-12 col-lg-6">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-light">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <h4 className="mb-0 fs-5 fw-semibold">📄 TipTap (Traditional)</h4>
                  </div>
                  <div className="d-flex gap-2">
                    <span className="badge bg-secondary">Rich Text</span>
                    <span className="badge bg-secondary">HTML Output</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <p className="mb-1">✅ WYSIWYG editing</p>
                    <p className="mb-1">✅ Toolbar formatting</p>
                    <p className="mb-1">✅ Traditional rich text</p>
                    <p className="mb-0">✅ HTML output</p>
                  </div>
                  <div>
                    <TipTapEditor
                      content={tiptapContent}
                      onChange={handleTipTapChange}
                      placeholder="Start typing with traditional rich text editor..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0 fs-5">🎯 EditorJS Data (JSON)</h3>
                </div>
                <div className="card-body">
                  <pre className="bg-light p-3 rounded" style={{ maxHeight: "500px", overflow: "auto" }}>
                    {editorJSContent
                      ? JSON.stringify(editorJSContent, null, 2)
                      : "No content yet"}
                  </pre>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0 fs-5">📄 TipTap Data (HTML)</h3>
                </div>
                <div className="card-body">
                  <pre className="bg-light p-3 rounded" style={{ maxHeight: "500px", overflow: "auto" }}>
                    {tiptapContent || "No content yet"}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Debug Info */}
      <div className="card mt-4">
        <div className="card-header">
          <h3 className="mb-0 fs-5">🔧 Debug Information</h3>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <strong>EditorJS Blocks:</strong> {editorJSContent?.blocks?.length || 0}
            </div>
            <div className="col-6 col-md-3">
              <strong>TipTap Length:</strong> {tiptapContent.length}
            </div>
            <div className="col-6 col-md-3">
              <strong>Client-side Rendering:</strong> ✅ Active
            </div>
            <div className="col-6 col-md-3">
              <strong>Dynamic Imports:</strong> ✅ Working
            </div>
          </div>
        </div>
      </div>

      {/* Test Instructions */}
      <div className="card mt-4">
        <div className="card-header">
          <h3 className="mb-0 fs-5">🧪 How to Test EditorJS</h3>
        </div>
        <div className="card-body">
          <ol>
            <li className="mb-2">
              <strong>Click in the EditorJS area</strong> (left side)
            </li>
            <li className="mb-2">
              <strong>Type some text</strong> to create a paragraph
            </li>
            <li className="mb-2">
              <strong>Press <code>/</code></strong> to open the command menu
            </li>
            <li className="mb-2">
              <strong>Try different blocks:</strong>
              <ul className="mt-2">
                <li><code>/header</code> - Create headers</li>
                <li><code>/list</code> - Create lists</li>
                <li><code>/quote</code> - Create quotes</li>
                <li><code>/code</code> - Code blocks</li>
                <li><code>/warning</code> - Warning callouts</li>
              </ul>
            </li>
            <li className="mb-2">
              <strong>Use keyboard shortcuts</strong> (see above)
            </li>
            <li className="mb-2">
              <strong>Drag blocks</strong> using the handle on the left
            </li>
            <li>
              <strong>Switch to Preview Mode</strong> to see the JSON output
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
