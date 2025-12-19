"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import classNames from "classnames";

export interface EditorJSData {
  time?: number;
  blocks: Array<{
    id?: string;
    type: string;
    data: any;
  }>;
  version?: string;
}

export interface EditorJSProps {
  data?: EditorJSData;
  onChange?: (data: EditorJSData) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  minHeight?: number;
  error?: string;
  isInvalid?: boolean;
  autofocus?: boolean;
}

const EditorJSComponent: React.FC<EditorJSProps> = ({
  data,
  onChange,
  placeholder = "Type '/' for commands",
  readOnly = false,
  className = "",
  minHeight = 300,
  error,
  isInvalid = false,
  autofocus = false,
}) => {
  const editorRef = useRef<any>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Store the initial data to prevent re-renders
  const initialDataRef = useRef<EditorJSData | undefined>(data);
  const isDataLoadedRef = useRef(false);

  // Update initial data ref when data prop changes during form initialization
  useEffect(() => {
    if (data && !isDataLoadedRef.current) {
      initialDataRef.current = data;
    }
  }, [data]);

  // Memoize onChange to prevent unnecessary re-renders - CRITICAL FIX
  const handleChange = useCallback(async () => {
    try {
      if (editorRef.current && onChange) {
        const savedData = await editorRef.current.save();
        console.log("📝 Content changed:", savedData);
        onChange(savedData);
      }
    } catch (saveError) {
      console.error("❌ Save error:", saveError);
    }
  }, [onChange]);

  // Initialize editor ONLY ONCE - CRITICAL FIX
  useEffect(() => {
    if (isInitialized || !holderRef.current) return;

    let mounted = true;

    const initializeEditor = async () => {
      try {
        console.log("🚀 [EditorJS] Starting initialization...");
        setEditorError(null);

        // Import EditorJS and all tools
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const List = (await import("@editorjs/list")).default;
        const Paragraph = (await import("@editorjs/paragraph")).default;
        const Quote = (await import("@editorjs/quote")).default;
        const Code = (await import("@editorjs/code")).default;
        const Checklist = (await import("@editorjs/checklist")).default;
        const Delimiter = (await import("@editorjs/delimiter")).default;
        const Table = (await import("@editorjs/table")).default;

        console.log("📦 [EditorJS] All modules loaded successfully");

        if (!mounted) return;

        // Create editor with comprehensive tools
        const editor = new EditorJS({
          holder: holderRef.current,
          placeholder: placeholder,
          onChange: handleChange,
          data: initialDataRef.current || undefined,
          tools: {
            // Basic paragraph tool
            paragraph: {
              class: Paragraph,
              inlineToolbar: true,
              config: {
                placeholder: "Type '/' for commands or start writing...",
              },
            },

            // Headers (H1, H2, H3)
            header: {
              class: Header,
              config: {
                placeholder: "Heading",
                levels: [1, 2, 3],
                defaultLevel: 2,
              },
              shortcut: "CMD+SHIFT+H",
            },

            // Lists (bulleted and numbered)
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: "unordered",
              },
              shortcut: "CMD+SHIFT+L",
            },

            // To-do checklist
            checklist: {
              class: Checklist,
              inlineToolbar: true,
              shortcut: "CMD+SHIFT+C",
            },

            // Quote blocks
            quote: {
              class: Quote,
              inlineToolbar: true,
              config: {
                quotePlaceholder: "Enter a quote",
                captionPlaceholder: "Quote author",
              },
              shortcut: "CMD+SHIFT+O",
            },

            // Code blocks
            code: {
              class: Code,
              config: {
                placeholder: "Enter your code here...",
              },
              shortcut: "CMD+SHIFT+K",
            },

            // Table
            table: {
              class: Table,
              inlineToolbar: true,
              config: {
                rows: 2,
                cols: 3,
              },
            },

            // Delimiter (divider)
            delimiter: Delimiter,
          },
          logLevel: "ERROR" as any,
        });

        console.log("⏳ [EditorJS] Waiting for editor to be ready...");
        await editor.isReady;

        if (!mounted) {
          editor.destroy();
          return;
        }

        editorRef.current = editor;
        isDataLoadedRef.current = true; // Mark data as loaded
        setIsInitialized(true);
        setIsReady(true);
        console.log("🎉 [EditorJS] Successfully initialized with all tools!");
      } catch (err) {
        console.error("❌ [EditorJS] Initialization failed:", err);
        if (mounted) {
          setEditorError(err instanceof Error ? err.message : "Unknown error");
          setIsReady(true);
        }
      }
    };

    const timer = setTimeout(initializeEditor, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (editorRef.current) {
        try {
          editorRef.current.destroy();
          editorRef.current = null;
          console.log("🧹 [EditorJS] Cleaned up successfully");
        } catch (destroyError) {
          console.error("❌ [EditorJS] Cleanup error:", destroyError);
        }
      }
    };
  }, []); // EMPTY DEPENDENCY ARRAY - Initialize only once

  // Handle data changes when editor is ready
  useEffect(() => {
    if (editorRef.current && data && isReady) {
      // Only render if we haven't loaded data yet, or if data has changed significantly
      const shouldRender =
        !isDataLoadedRef.current ||
        (data.blocks && data.blocks.length > 0 && !isDataLoadedRef.current);

      if (shouldRender) {
        try {
          editorRef.current.render(data);
          isDataLoadedRef.current = true;
          console.log(
            "🔄 [EditorJS] Data loaded with",
            data.blocks?.length || 0,
            "blocks"
          );
        } catch (renderError) {
          console.error("❌ [EditorJS] Render error:", renderError);
        }
      }
    }
  }, [data, isReady]); // Only run when data or isReady changes

  if (editorError) {
    return (
      <div className={classNames("app-editorjs-wrapper", className)}>
        <div
          className={classNames("app-editorjs-holder", "error")}
          style={{ minHeight: `${minHeight}px` }}
        >
          <div className="app-editorjs-error-state">
            <h4>🚨 EditorJS Error</h4>
            <p>
              <strong>Error:</strong> {editorError}
            </p>
            <p>Check the browser console for more details.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames("app-editorjs-wrapper", className)}>
      <div
        ref={holderRef}
        className={classNames("app-editorjs-holder", {
          invalid: isInvalid,
        })}
        style={{ minHeight: `${minHeight}px` }}
      />
      {error && <div className="app-editorjs-error-message">{error}</div>}
      {!isReady && (
        <div className="app-editorjs-loading-state">
          <div className="app-editorjs-loading-spinner" />
          <span>Loading EditorJS...</span>
        </div>
      )}
    </div>
  );
};

export default EditorJSComponent;
