import React, { useState, useEffect, useRef } from "react";
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Type,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code,
  Minus,
  Table,
  AlertCircle,
  ChevronRight,
  Bookmark,
  Plus,
  Highlighter,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Eraser,
  Palette,
  Image,
  Video,
  Hash,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import styles from "./TipTapEditor.module.scss";

interface TipTapEditorProps {
  content?: string;
  defaultValue?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  name?: string;
  isInvalid?: boolean;
  feedback?: string;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  content,
  defaultValue,
  onChange,
  placeholder = "Type '/' for commands...",
  error,
  className = "",
  name,
  isInvalid,
  feedback,
}) => {
  // Use content prop if provided, otherwise use defaultValue
  const initialContent = content || defaultValue || "";
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [commandMenuPosition, setCommandMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const commandMenuRef = useRef<HTMLDivElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "tiptap-link",
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Subscript,
      Superscript,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);

      // Check for slash command
      const { state } = editor;
      const { selection } = state;
      const { $from } = selection;

      // Get text before cursor
      const textBefore = $from.nodeBefore?.textContent || "";
      const beforeCursor = state.doc.textBetween(
        Math.max(0, $from.pos - 20),
        $from.pos,
        "\n"
      );

      // Check if we just typed a slash
      if (beforeCursor.endsWith("/") && !showCommandMenu) {
        const coords = editor.view.coordsAtPos($from.pos);
        setCommandMenuPosition({
          x: coords.left,
          y: coords.bottom + 10,
        });
        setShowCommandMenu(true);
        setSearchQuery("");
        setSelectedCommandIndex(0);
      } else if (showCommandMenu && !beforeCursor.includes("/")) {
        setShowCommandMenu(false);
      }
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    const newContent = content || defaultValue || "";
    if (editor && newContent !== editor.getHTML()) {
      editor.commands.setContent(newContent);
    }
  }, [editor, content, defaultValue]);

  const commands = [
    // Basic
    {
      title: "Text",
      description: "Just start typing with plain text.",
      icon: <Type size={16} />,
      command: () => {
        editor?.chain().focus().setParagraph().run();
        setShowCommandMenu(false);
      },
      category: "Basic",
    },
    {
      title: "Heading 1",
      description: "Big section heading.",
      icon: <Heading1 size={16} />,
      command: () => {
        editor?.chain().focus().toggleHeading({ level: 1 }).run();
        setShowCommandMenu(false);
      },
      category: "Basic",
    },
    {
      title: "Heading 2",
      description: "Medium section heading.",
      icon: <Heading2 size={16} />,
      command: () => {
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
        setShowCommandMenu(false);
      },
      category: "Basic",
    },
    {
      title: "Heading 3",
      description: "Small section heading.",
      icon: <Heading3 size={16} />,
      command: () => {
        editor?.chain().focus().toggleHeading({ level: 3 }).run();
        setShowCommandMenu(false);
      },
      category: "Basic",
    },
    {
      title: "Heading 4",
      description: "Smaller section heading.",
      icon: <Heading4 size={16} />,
      command: () => {
        editor?.chain().focus().toggleHeading({ level: 4 }).run();
        setShowCommandMenu(false);
      },
      category: "Basic",
    },
    {
      title: "Heading 5",
      description: "Small section heading.",
      icon: <Heading5 size={16} />,
      command: () => {
        editor?.chain().focus().toggleHeading({ level: 5 }).run();
        setShowCommandMenu(false);
      },
      category: "Basic",
    },
    {
      title: "Heading 6",
      description: "Smallest section heading.",
      icon: <Heading6 size={16} />,
      command: () => {
        editor?.chain().focus().toggleHeading({ level: 6 }).run();
        setShowCommandMenu(false);
      },
      category: "Basic",
    },
    // Lists
    {
      title: "Bulleted list",
      description: "Create a simple bulleted list.",
      icon: <List size={16} />,
      command: () => {
        editor?.chain().focus().toggleBulletList().run();
        setShowCommandMenu(false);
      },
      category: "Lists",
    },
    {
      title: "Numbered list",
      description: "Create a list with numbering.",
      icon: <ListOrdered size={16} />,
      command: () => {
        editor?.chain().focus().toggleOrderedList().run();
        setShowCommandMenu(false);
      },
      category: "Lists",
    },
    {
      title: "To-do list",
      description: "Track tasks with a to-do list.",
      icon: <CheckSquare size={16} />,
      command: () => {
        // Note: This would need TaskList extension
        editor?.chain().focus().toggleBulletList().run();
        setShowCommandMenu(false);
      },
      category: "Lists",
    },
    // Content
    {
      title: "Quote",
      description: "Capture a quote.",
      icon: <Quote size={16} />,
      command: () => {
        editor?.chain().focus().toggleBlockquote().run();
        setShowCommandMenu(false);
      },
      category: "Content",
    },
    {
      title: "Code",
      description: "Capture a code snippet.",
      icon: <Code size={16} />,
      command: () => {
        editor?.chain().focus().toggleCodeBlock().run();
        setShowCommandMenu(false);
      },
      category: "Content",
    },
    {
      title: "Divider",
      description: "Visually divide blocks.",
      icon: <Minus size={16} />,
      command: () => {
        editor?.chain().focus().setHorizontalRule().run();
        setShowCommandMenu(false);
      },
      category: "Content",
    },
    // Advanced
    {
      title: "Table",
      description: "Add a table.",
      icon: <Table size={16} />,
      command: () => {
        // Note: This would need Table extension
        editor?.chain().focus().setParagraph().run();
        setShowCommandMenu(false);
      },
      category: "Advanced",
    },
    {
      title: "Callout",
      description: "Make writing stand out.",
      icon: <AlertCircle size={16} />,
      command: () => {
        editor?.chain().focus().toggleBlockquote().run();
        setShowCommandMenu(false);
      },
      category: "Advanced",
    },
    {
      title: "Toggle",
      description: "Toggle list.",
      icon: <ChevronRight size={16} />,
      command: () => {
        editor?.chain().focus().toggleBulletList().run();
        setShowCommandMenu(false);
      },
      category: "Advanced",
    },
    {
      title: "Bookmark",
      description: "Save a link as a visual bookmark.",
      icon: <Bookmark size={16} />,
      command: () => {
        const url = prompt("Enter URL:");
        if (url) {
          editor
            ?.chain()
            .focus()
            .setLink({ href: url })
            .insertContent(url)
            .run();
        }
        setShowCommandMenu(false);
      },
      category: "Advanced",
    },
    // Formatting
    {
      title: "Bold",
      description: "Make text bold.",
      icon: <Bold size={16} />,
      command: () => {
        editor?.chain().focus().toggleBold().run();
        setShowCommandMenu(false);
      },
      category: "Formatting",
    },
    {
      title: "Italic",
      description: "Make text italic.",
      icon: <Italic size={16} />,
      command: () => {
        editor?.chain().focus().toggleItalic().run();
        setShowCommandMenu(false);
      },
      category: "Formatting",
    },
    {
      title: "Underline",
      description: "Underline text.",
      icon: <UnderlineIcon size={16} />,
      command: () => {
        editor?.chain().focus().toggleUnderline().run();
        setShowCommandMenu(false);
      },
      category: "Formatting",
    },
    {
      title: "Strikethrough",
      description: "Strike through text.",
      icon: <Strikethrough size={16} />,
      command: () => {
        editor?.chain().focus().toggleStrike().run();
        setShowCommandMenu(false);
      },
      category: "Formatting",
    },
    {
      title: "Highlight",
      description: "Highlight text.",
      icon: <Highlighter size={16} />,
      command: () => {
        editor?.chain().focus().toggleHighlight().run();
        setShowCommandMenu(false);
      },
      category: "Formatting",
    },
    {
      title: "Inline Code",
      description: "Mark text as code.",
      icon: <Code size={16} />,
      command: () => {
        editor?.chain().focus().toggleCode().run();
        setShowCommandMenu(false);
      },
      category: "Formatting",
    },
    {
      title: "Subscript",
      description: "Make text subscript.",
      icon: <SubscriptIcon size={16} />,
      command: () => {
        editor?.chain().focus().toggleSubscript().run();
        setShowCommandMenu(false);
      },
      category: "Formatting",
    },
    {
      title: "Superscript",
      description: "Make text superscript.",
      icon: <SuperscriptIcon size={16} />,
      command: () => {
        editor?.chain().focus().toggleSuperscript().run();
        setShowCommandMenu(false);
      },
      category: "Formatting",
    },
    // Alignment
    {
      title: "Align Left",
      description: "Align text to the left.",
      icon: <AlignLeft size={16} />,
      command: () => {
        editor?.chain().focus().setTextAlign("left").run();
        setShowCommandMenu(false);
      },
      category: "Alignment",
    },
    {
      title: "Align Center",
      description: "Center align text.",
      icon: <AlignCenter size={16} />,
      command: () => {
        editor?.chain().focus().setTextAlign("center").run();
        setShowCommandMenu(false);
      },
      category: "Alignment",
    },
    {
      title: "Align Right",
      description: "Align text to the right.",
      icon: <AlignRight size={16} />,
      command: () => {
        editor?.chain().focus().setTextAlign("right").run();
        setShowCommandMenu(false);
      },
      category: "Alignment",
    },
    {
      title: "Justify",
      description: "Justify text alignment.",
      icon: <AlignJustify size={16} />,
      command: () => {
        editor?.chain().focus().setTextAlign("justify").run();
        setShowCommandMenu(false);
      },
      category: "Alignment",
    },
    // Utilities
    {
      title: "Clear Formatting",
      description: "Remove all formatting from text.",
      icon: <Eraser size={16} />,
      command: () => {
        editor?.chain().focus().clearNodes().unsetAllMarks().run();
        setShowCommandMenu(false);
      },
      category: "Utilities",
    },
  ];

  const filteredCommands = commands.filter(
    (command) =>
      command.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      command.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCommandKeyDown = (e: React.KeyboardEvent) => {
    if (!showCommandMenu) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedCommandIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedCommandIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredCommands[selectedCommandIndex]) {
          // Remove the slash before executing command
          const { state } = editor!;
          const { selection } = state;
          const { $from } = selection;

          // Find and delete the slash
          const beforeCursor = state.doc.textBetween(
            Math.max(0, $from.pos - 20),
            $from.pos,
            "\n"
          );
          const slashIndex = beforeCursor.lastIndexOf("/");
          if (slashIndex !== -1) {
            const deleteFrom = $from.pos - (beforeCursor.length - slashIndex);
            editor
              ?.chain()
              .focus()
              .deleteRange({ from: deleteFrom, to: $from.pos })
              .run();
          }

          filteredCommands[selectedCommandIndex].command();
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowCommandMenu(false);
        break;
    }
  };

  // Click outside to close command menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandMenuRef.current &&
        !commandMenuRef.current.contains(event.target as Node)
      ) {
        setShowCommandMenu(false);
      }
    };

    if (showCommandMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showCommandMenu]);

  // Reset selected index when search query changes
  useEffect(() => {
    setSelectedCommandIndex(0);
  }, [searchQuery]);

  const handleLinkClick = () => {
    const { from, to } = editor!.state.selection;
    const text = editor!.state.doc.textBetween(from, to);

    if (editor!.isActive("link")) {
      editor!.chain().focus().unsetLink().run();
      setShowLinkInput(false);
    } else {
      setShowLinkInput(true);
      setLinkUrl("");
      setTimeout(() => linkInputRef.current?.focus(), 100);
    }
  };

  const handleLinkSubmit = () => {
    if (linkUrl) {
      editor!.chain().focus().setLink({ href: linkUrl }).run();
    }
    setShowLinkInput(false);
    setLinkUrl("");
  };

  const handleLinkKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLinkSubmit();
    } else if (e.key === "Escape") {
      setShowLinkInput(false);
      setLinkUrl("");
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div
      className={`${styles.notionEditor} ${className}`}
      onKeyDown={handleCommandKeyDown}
    >
      <div
        className={`${styles.editorContent} ${
          error || isInvalid ? styles.invalid : ""
        }`}
      >
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className={styles.bubbleMenu}
        >
          <div className={styles.bubbleMenuContent}>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive("bold") ? styles.active : ""
              }`}
            >
              <Bold size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive("italic") ? styles.active : ""
              }`}
            >
              <Italic size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive("strike") ? styles.active : ""
              }`}
            >
              <Strikethrough size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive("underline") ? styles.active : ""
              }`}
            >
              <UnderlineIcon size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive("code") ? styles.active : ""
              }`}
            >
              <Code size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive("highlight") ? styles.active : ""
              }`}
            >
              <Highlighter size={14} />
            </button>
            <div className={styles.bubbleMenuDivider} />
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive("subscript") ? styles.active : ""
              }`}
            >
              <SubscriptIcon size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive("superscript") ? styles.active : ""
              }`}
            >
              <SuperscriptIcon size={14} />
            </button>
            <div className={styles.bubbleMenuDivider} />
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive({ textAlign: "left" }) ? styles.active : ""
              }`}
            >
              <AlignLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive({ textAlign: "center" }) ? styles.active : ""
              }`}
            >
              <AlignCenter size={14} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive({ textAlign: "right" }) ? styles.active : ""
              }`}
            >
              <AlignRight size={14} />
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive({ textAlign: "justify" }) ? styles.active : ""
              }`}
            >
              <AlignJustify size={14} />
            </button>
            <div className={styles.bubbleMenuDivider} />
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().clearNodes().unsetAllMarks().run()
              }
              className={styles.bubbleMenuBtn}
              title="Clear formatting"
            >
              <Eraser size={14} />
            </button>
            <div className={styles.bubbleMenuDivider} />
            <button
              type="button"
              onClick={handleLinkClick}
              className={`${styles.bubbleMenuBtn} ${
                editor.isActive("link") ? styles.active : ""
              }`}
            >
              <LinkIcon size={14} />
            </button>
          </div>
          {showLinkInput && (
            <div className={styles.bubbleMenuLinkInput}>
              <input
                ref={linkInputRef}
                type="url"
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={handleLinkKeyDown}
                className={styles.linkInput}
              />
              <button
                type="button"
                onClick={handleLinkSubmit}
                className={styles.linkBtn}
              >
                Apply
              </button>
            </div>
          )}
        </BubbleMenu>

        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className={styles.floatingMenu}
        >
          <button
            type="button"
            onClick={() => {
              const { state } = editor;
              const { selection } = state;
              const { $from } = selection;

              const coords = editor.view.coordsAtPos($from.pos);
              setCommandMenuPosition({
                x: coords.left,
                y: coords.bottom + 10,
              });
              setShowCommandMenu(true);
              setSearchQuery("");
              setSelectedCommandIndex(0);
            }}
            className={styles.floatingMenuBtn}
          >
            <Plus size={16} />
          </button>
        </FloatingMenu>

        <EditorContent editor={editor} />
      </div>

      {(error || feedback) && (
        <div className={styles.editorError}>{error || feedback}</div>
      )}

      {showCommandMenu && (
        <div
          ref={commandMenuRef}
          className={styles.commandMenu}
          style={{
            left: commandMenuPosition.x,
            top: commandMenuPosition.y,
          }}
        >
          <div className={styles.commandMenuSearch}>
            <input
              type="text"
              placeholder="Search commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.commandSearchInput}
              autoFocus
            />
          </div>
          <div className={styles.commandMenuItems}>
            {filteredCommands.length > 0 ? (
              filteredCommands.map((command, index) => (
                <button
                  key={command.title}
                  type="button"
                  onClick={() => {
                    // Remove the slash before executing command
                    const { state } = editor;
                    const { selection } = state;
                    const { $from } = selection;

                    const beforeCursor = state.doc.textBetween(
                      Math.max(0, $from.pos - 20),
                      $from.pos,
                      "\n"
                    );
                    const slashIndex = beforeCursor.lastIndexOf("/");
                    if (slashIndex !== -1) {
                      const deleteFrom =
                        $from.pos - (beforeCursor.length - slashIndex);
                      editor
                        .chain()
                        .focus()
                        .deleteRange({ from: deleteFrom, to: $from.pos })
                        .run();
                    }

                    command.command();
                  }}
                  className={`${styles.commandMenuItem} ${
                    index === selectedCommandIndex ? styles.selected : ""
                  }`}
                >
                  {command.icon}
                  <div className={styles.commandMenuItemContent}>
                    <div className={styles.commandMenuItemTitle}>
                      {command.title}
                    </div>
                    <div className={styles.commandMenuItemDescription}>
                      {command.description}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className={styles.commandMenuEmpty}>No commands found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TipTapEditor;
