import React, { useEffect, useState, useCallback, useRef } from "react";
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
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Palette,
  Type,
  Upload,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";

// Custom Image extension with resizing support
const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute("width"),
        renderHTML: (attributes) => {
          if (!attributes.width) {
            return {};
          }
          return {
            width: attributes.width,
          };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute("height"),
        renderHTML: (attributes) => {
          if (!attributes.height) {
            return {};
          }
          return {
            height: attributes.height,
          };
        },
      },
    };
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement("div");
      container.className = "resizable-image-container";

      const image = document.createElement("img");
      image.src = node.attrs.src;
      image.alt = node.attrs.alt || "";
      image.className = "resizable-image";

      // Add error handling for image loading
      image.onerror = () => {
        console.error(
          "Failed to load image:",
          node.attrs.src.substring(0, 100) + "..."
        );
        image.style.display = "none";
        const errorDiv = document.createElement("div");
        errorDiv.className = "image-error";
        errorDiv.textContent = "Failed to load image";
        errorDiv.style.cssText =
          "padding: 20px; border: 1px dashed #ccc; color: #666; text-align: center;";
        container.appendChild(errorDiv);
      };

      if (node.attrs.width) {
        image.style.width = node.attrs.width;
      }
      if (node.attrs.height) {
        image.style.height = node.attrs.height;
      }

      container.appendChild(image);

      // Add resize handles
      const resizeHandle = document.createElement("div");
      resizeHandle.className = "resize-handle";
      resizeHandle.innerHTML = '<div class="resize-handle-inner"></div>';
      container.appendChild(resizeHandle);

      // Resize functionality
      let isResizing = false;
      let startX, startY, startWidth, startHeight;

      const startResize = (e) => {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = image.offsetWidth;
        startHeight = image.offsetHeight;

        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", stopResize);
        e.preventDefault();
      };

      const resize = (e) => {
        if (!isResizing) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const newWidth = Math.max(50, startWidth + deltaX);
        const newHeight = Math.max(50, startHeight + deltaY);

        image.style.width = `${newWidth}px`;
        image.style.height = `${newHeight}px`;
      };

      const stopResize = () => {
        if (!isResizing) return;
        isResizing = false;

        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", stopResize);

        // Update the node attributes
        if (getPos && typeof getPos === "function") {
          editor.commands.updateAttributes(
            "image",
            {
              width: image.style.width,
              height: image.style.height,
            },
            { at: getPos() }
          );
        }
      };

      resizeHandle.addEventListener("mousedown", startResize);

      return {
        dom: container,
        destroy: () => {
          resizeHandle.removeEventListener("mousedown", startResize);
        },
      };
    };
  },
});

interface TipTapEditorProps {
  name: string;
  defaultValue?: string;
  isInvalid?: boolean;
  feedback?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
  minHeight?: number;
}

// Image Upload Modal Component
const ImageUploadModal = ({
  isOpen,
  onClose,
  onImageUpload,
}: {
  isOpen: boolean;
  onClose: () => void;
  onImageUpload: (
    src: string,
    alt?: string,
    width?: string,
    height?: string
  ) => void;
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageWidth, setImageWidth] = useState("");
  const [imageHeight, setImageHeight] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalAspectRatio, setOriginalAspectRatio] = useState<number | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);

        // Get original dimensions
        const img = new Image();
        img.onload = () => {
          setOriginalAspectRatio(img.width / img.height);
          if (!imageWidth && !imageHeight) {
            setImageWidth(img.width.toString());
            setImageHeight(img.height.toString());
          }
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWidthChange = (width: string) => {
    setImageWidth(width);
    if (maintainAspectRatio && originalAspectRatio && width) {
      const newHeight = Math.round(parseInt(width) / originalAspectRatio);
      setImageHeight(newHeight.toString());
    }
  };

  const handleHeightChange = (height: string) => {
    setImageHeight(height);
    if (maintainAspectRatio && originalAspectRatio && height) {
      const newWidth = Math.round(parseInt(height) * originalAspectRatio);
      setImageWidth(newWidth.toString());
    }
  };

  const handleUpload = async () => {
    if (uploadMethod === "url") {
      if (imageUrl.trim()) {
        onImageUpload(
          imageUrl.trim(),
          imageAlt.trim() || undefined,
          imageWidth || undefined,
          imageHeight || undefined
        );
        handleClose();
      }
    } else {
      if (selectedFile) {
        setIsLoading(true);
        try {
          // Convert file to base64 for embedding
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64 = e.target?.result as string;
            onImageUpload(
              base64,
              imageAlt.trim() || selectedFile.name,
              imageWidth || undefined,
              imageHeight || undefined
            );
            setIsLoading(false);
            handleClose();
          };
          reader.readAsDataURL(selectedFile);
        } catch (error) {
          console.error("Error uploading image:", error);
          setIsLoading(false);
        }
      }
    }
  };

  const handleClose = () => {
    setImageUrl("");
    setImageAlt("");
    setImageWidth("");
    setImageHeight("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadMethod("url");
    setIsLoading(false);
    setOriginalAspectRatio(null);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUpload();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Image</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            {/* Upload Method Tabs */}
            <ul className="nav nav-tabs mb-3" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    uploadMethod === "url" ? "active" : ""
                  }`}
                  onClick={() => setUploadMethod("url")}
                  type="button"
                >
                  Image URL
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    uploadMethod === "file" ? "active" : ""
                  }`}
                  onClick={() => setUploadMethod("file")}
                  type="button"
                >
                  Upload File
                </button>
              </li>
            </ul>

            {/* URL Upload Method */}
            {uploadMethod === "url" && (
              <div className="tab-content">
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageAlt" className="form-label">
                    Alt Text (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imageAlt"
                    placeholder="Description of the image"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                {imageUrl && (
                  <div className="mb-3">
                    <label className="form-label">Preview:</label>
                    <div className="border rounded p-2">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="img-fluid"
                        style={{ maxHeight: "200px" }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        onLoad={(e) => {
                          const img = e.currentTarget;
                          if (!imageWidth && !imageHeight) {
                            setImageWidth(img.naturalWidth.toString());
                            setImageHeight(img.naturalHeight.toString());
                            setOriginalAspectRatio(
                              img.naturalWidth / img.naturalHeight
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* File Upload Method */}
            {uploadMethod === "file" && (
              <div className="tab-content">
                <div className="mb-3">
                  <label htmlFor="imageFile" className="form-label">
                    Select Image File
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="imageFile"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                  />
                  <div className="form-text">
                    Supported formats: JPG, PNG, GIF, WebP, SVG (Max size: 10MB)
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="fileImageAlt" className="form-label">
                    Alt Text (optional)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fileImageAlt"
                    placeholder="Description of the image"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                {previewUrl && (
                  <div className="mb-3">
                    <label className="form-label">Preview:</label>
                    <div className="border rounded p-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="img-fluid"
                        style={{ maxHeight: "200px" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Image Size Controls */}
            {(imageUrl || previewUrl) && (
              <div className="mb-3">
                <label className="form-label">Image Size</label>
                <div className="row g-2">
                  <div className="col-md-4">
                    <label htmlFor="imageWidth" className="form-label">
                      Width (px)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="imageWidth"
                      placeholder="Width"
                      value={imageWidth}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="imageHeight" className="form-label">
                      Height (px)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="imageHeight"
                      placeholder="Height"
                      value={imageHeight}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      min="1"
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="form-check mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="maintainAspectRatio"
                        checked={maintainAspectRatio}
                        onChange={(e) =>
                          setMaintainAspectRatio(e.target.checked)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="maintainAspectRatio"
                      >
                        Maintain aspect ratio
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpload}
              disabled={
                isLoading ||
                (uploadMethod === "url" && !imageUrl.trim()) ||
                (uploadMethod === "file" && !selectedFile)
              }
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} className="me-2" />
                  Add Image
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Move ToolbarButton outside to prevent recreation
const ToolbarButton = ({
  onClick,
  isActive = false,
  icon: Icon,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  icon: any;
  title: string;
}) => {
  const buttonClass = isActive
    ? "btn btn-sm btn-primary tiptap-toolbar-btn tiptap-toolbar-btn-active"
    : "btn btn-sm btn-outline-secondary tiptap-toolbar-btn";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={buttonClass}
      title={title}
      style={{ margin: "2px" }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Icon size={16} />
    </button>
  );
};

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
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeStates, setActiveStates] = useState({
    bold: false,
    italic: false,
    underline: false,
    highlight: false,
    heading1: false,
    heading2: false,
    heading3: false,
    bulletList: false,
    orderedList: false,
    textAlignLeft: false,
    textAlignCenter: false,
    textAlignRight: false,
    textAlignJustify: false,
    link: false,
    code: false,
    codeBlock: false,
  });
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateActiveStates = useCallback((editor: any) => {
    if (!editor) return;

    // Clear any existing timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    // Use a small delay to ensure the editor state has updated
    updateTimeoutRef.current = setTimeout(() => {
      const newActiveStates = {
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
        highlight: editor.isActive("highlight"),
        heading1: editor.isActive("heading", { level: 1 }),
        heading2: editor.isActive("heading", { level: 2 }),
        heading3: editor.isActive("heading", { level: 3 }),
        bulletList: editor.isActive("bulletList"),
        orderedList: editor.isActive("orderedList"),
        textAlignLeft: editor.isActive({ textAlign: "left" }),
        textAlignCenter: editor.isActive({ textAlign: "center" }),
        textAlignRight: editor.isActive({ textAlign: "right" }),
        textAlignJustify: editor.isActive({ textAlign: "justify" }),
        link: editor.isActive("link"),
        code: editor.isActive("code"),
        codeBlock: editor.isActive("codeBlock"),
      };

      setActiveStates(newActiveStates);
    }, 10);
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
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        validate: (href) => /^https?:\/\//.test(href),
      }),
      ResizableImage.configure({
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
      updateActiveStates(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      updateActiveStates(editor);
    },
    onFocus: ({ editor }) => {
      updateActiveStates(editor);
    },
    onBlur: ({ editor }) => {
      updateActiveStates(editor);
    },
    editorProps: {
      handleClick: (view, pos, event) => {
        const { state } = view;
        const link = state.doc.nodeAt(pos);

        if (link && link.marks.find((mark) => mark.type.name === "link")) {
          const linkMark = link.marks.find((mark) => mark.type.name === "link");
          if (linkMark && linkMark.attrs.href) {
            window.open(linkMark.attrs.href, "_blank", "noopener,noreferrer");
            return true;
          }
        }

        return false;
      },
    },
  });

  // Update active states when editor is ready
  useEffect(() => {
    if (editor) {
      updateActiveStates(editor);
    }
  }, [editor, updateActiveStates]);

  // Update content when defaultValue changes
  useEffect(() => {
    if (editor && defaultValue !== editor.getHTML()) {
      console.log("Setting content:", defaultValue.substring(0, 200) + "...");

      // Check if content contains base64 images
      const hasBase64Images = defaultValue.includes("data:image");
      if (hasBase64Images) {
        console.log("Content contains base64 images");

        // Log the base64 image details
        const base64Matches = defaultValue.match(/data:image[^"]+/g);
        if (base64Matches) {
          console.log(`Found ${base64Matches.length} base64 images`);
          base64Matches.forEach((match, index) => {
            console.log(
              `Base64 image ${index + 1}:`,
              match.substring(0, 100) + "..."
            );
            console.log(`Base64 image ${index + 1} length:`, match.length);
          });
        }
      }

      try {
        // Check if content contains large base64 images
        const base64Matches = defaultValue.match(/data:image[^"]+/g);
        const hasLargeBase64 = base64Matches?.some(
          (match) => match.length > 10000
        );

        if (hasLargeBase64) {
          console.log(
            "Content contains large base64 images, using chunked approach..."
          );

          // Clear the editor first
          editor.commands.clearContent();

          // Split content into parts and process each part
          const parts = defaultValue.split(/(<img[^>]*data:image[^>]*>)/);

          for (const part of parts) {
            if (part.trim()) {
              if (part.includes("data:image")) {
                // Handle base64 image separately
                const imgMatch = part.match(/<img([^>]*data:image[^>]*)>/);
                if (imgMatch) {
                  const imgAttrs = imgMatch[1];
                  const srcMatch = imgAttrs.match(/src="([^"]+)"/);
                  const altMatch = imgAttrs.match(/alt="([^"]*)"/);
                  const widthMatch = imgAttrs.match(/width="([^"]+)"/);
                  const heightMatch = imgAttrs.match(/height="([^"]+)"/);

                  if (srcMatch) {
                    const attrs: any = { src: srcMatch[1] };
                    if (altMatch) attrs.alt = altMatch[1];
                    if (widthMatch) attrs.width = widthMatch[1];
                    if (heightMatch) attrs.height = heightMatch[1];

                    console.log("Inserting base64 image with attrs:", attrs);
                    editor.commands.setImage(attrs);
                  }
                }
              } else {
                // Handle regular content
                editor.commands.insertContent(part);
              }
            }
          }
        } else {
          // Use the regular setContent method for content without large base64
          editor.commands.setContent(defaultValue, false);
        }

        // Verify content was set correctly
        setTimeout(() => {
          const currentContent = editor.getHTML();
          console.log(
            "Content after setting:",
            currentContent.substring(0, 200) + "..."
          );

          // Check if base64 images are missing
          const originalBase64Count = (defaultValue.match(/data:image/g) || [])
            .length;
          const currentBase64Count = (currentContent.match(/data:image/g) || [])
            .length;

          if (originalBase64Count !== currentBase64Count) {
            console.warn(
              `Base64 images missing: ${originalBase64Count} original vs ${currentBase64Count} current`
            );
          } else {
            console.log("All base64 images preserved successfully");
          }
        }, 100);
      } catch (error) {
        console.error("Error setting content:", error);
      }
    }
  }, [editor, defaultValue]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Handle link clicks
  useEffect(() => {
    if (editor && editor.view) {
      const handleLinkClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.tagName === "A" && target.href) {
          event.preventDefault();
          window.open(target.href, "_blank", "noopener,noreferrer");
        }
      };

      const editorElement = editor.view.dom;
      editorElement.addEventListener("click", handleLinkClick);

      return () => {
        editorElement.removeEventListener("click", handleLinkClick);
      };
    }
  }, [editor]);

  const addLink = () => {
    if (linkUrl.trim()) {
      editor.chain().focus().setLink({ href: linkUrl.trim() }).run();
      setLinkUrl("");
      setShowLinkInput(false);
    }
  };

  const handleImageUpload = (
    src: string,
    alt?: string,
    width?: string,
    height?: string
  ) => {
    const attrs: any = { src, alt };
    if (width) attrs.width = width;
    if (height) attrs.height = height;
    editor.chain().focus().setImage(attrs).run();
  };

  const handleToolbarAction = (action: () => void) => {
    return () => {
      action();
      // Force update after a short delay
      setTimeout(() => {
        updateActiveStates(editor);
      }, 50);
    };
  };

  return (
    <div>
      {/* Toolbar */}
      <div className={`tiptap-toolbar ${isInvalid ? "border-danger" : ""}`}>
        <div className="d-flex flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="d-flex gap-1 me-2">
            <ToolbarButton
              onClick={handleToolbarAction(() =>
                editor.chain().focus().toggleBold().run()
              )}
              isActive={activeStates.bold}
              icon={Bold}
              title="Bold"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() =>
                editor.chain().focus().toggleItalic().run()
              )}
              isActive={activeStates.italic}
              icon={Italic}
              title="Italic"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() =>
                editor.chain().focus().toggleUnderline().run()
              )}
              isActive={activeStates.underline}
              icon={UnderlineIcon}
              title="Underline"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() =>
                editor.chain().focus().toggleHighlight().run()
              )}
              isActive={activeStates.highlight}
              icon={Highlighter}
              title="Highlight"
            />
          </div>

          {/* Headings */}
          <div className="d-flex gap-1 me-2">
            <ToolbarButton
              onClick={handleToolbarAction(() => {
                if (editor.isActive("heading", { level: 1 })) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().toggleHeading({ level: 1 }).run();
                }
              })}
              isActive={activeStates.heading1}
              icon={Heading1}
              title="Heading 1"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() => {
                if (editor.isActive("heading", { level: 2 })) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                }
              })}
              isActive={activeStates.heading2}
              icon={Heading2}
              title="Heading 2"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() => {
                if (editor.isActive("heading", { level: 3 })) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().toggleHeading({ level: 3 }).run();
                }
              })}
              isActive={activeStates.heading3}
              icon={Heading3}
              title="Heading 3"
            />
          </div>

          {/* Lists */}
          <div className="d-flex gap-1 me-2">
            <ToolbarButton
              onClick={handleToolbarAction(() => {
                // Toggle bullet list
                editor.chain().focus().toggleBulletList().run();
              })}
              isActive={activeStates.bulletList}
              icon={List}
              title="Bullet List"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() => {
                // Toggle ordered list
                editor.chain().focus().toggleOrderedList().run();
              })}
              isActive={activeStates.orderedList}
              icon={ListOrdered}
              title="Numbered List"
            />
          </div>

          {/* Alignment */}
          <div className="d-flex gap-1 me-2">
            <ToolbarButton
              onClick={handleToolbarAction(() => {
                if (editor.isActive({ textAlign: "left" })) {
                  editor.chain().focus().unsetTextAlign().run();
                } else {
                  editor.chain().focus().setTextAlign("left").run();
                }
              })}
              isActive={activeStates.textAlignLeft}
              icon={AlignLeft}
              title="Align Left"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() => {
                if (editor.isActive({ textAlign: "center" })) {
                  editor.chain().focus().unsetTextAlign().run();
                } else {
                  editor.chain().focus().setTextAlign("center").run();
                }
              })}
              isActive={activeStates.textAlignCenter}
              icon={AlignCenter}
              title="Align Center"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() => {
                if (editor.isActive({ textAlign: "right" })) {
                  editor.chain().focus().unsetTextAlign().run();
                } else {
                  editor.chain().focus().setTextAlign("right").run();
                }
              })}
              isActive={activeStates.textAlignRight}
              icon={AlignRight}
              title="Align Right"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() => {
                if (editor.isActive({ textAlign: "justify" })) {
                  editor.chain().focus().unsetTextAlign().run();
                } else {
                  editor.chain().focus().setTextAlign("justify").run();
                }
              })}
              isActive={activeStates.textAlignJustify}
              icon={AlignJustify}
              title="Justify"
            />
          </div>

          {/* Links and Media */}
          <div className="d-flex gap-1 me-2">
            <ToolbarButton
              onClick={handleToolbarAction(() =>
                setShowLinkInput(!showLinkInput)
              )}
              isActive={activeStates.link}
              icon={LinkIcon}
              title="Add Link"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() => setShowImageModal(true))}
              icon={ImageIcon}
              title="Add Image"
            />
          </div>

          {/* Code */}
          <div className="d-flex gap-1 me-2">
            <ToolbarButton
              onClick={handleToolbarAction(() =>
                editor.chain().focus().toggleCode().run()
              )}
              isActive={activeStates.code}
              icon={Code}
              title="Inline Code"
            />
            <ToolbarButton
              onClick={handleToolbarAction(() => {
                if (editor.isActive("codeBlock")) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().toggleCodeBlock().run();
                }
              })}
              isActive={activeStates.codeBlock}
              icon={Code}
              title="Code Block"
            />
          </div>

          {/* Font Controls */}
          <div className="d-flex gap-1 me-2 tiptap-font-controls">
            <select
              className="form-select form-select-sm"
              style={{ width: "auto" }}
              onChange={(e) => {
                e.preventDefault();
                if (e.target.value && editor) {
                  editor.chain().focus().setFontFamily(e.target.value).run();
                  setTimeout(() => updateActiveStates(editor), 50);
                }
              }}
              value={editor?.getAttributes("textStyle")?.fontFamily || ""}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <option value="">Font</option>
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Times">Times</option>
              <option value="Courier New">Courier New</option>
              <option value="Courier">Courier</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
              <option value="Tahoma">Tahoma</option>
              <option value="Trebuchet MS">Trebuchet MS</option>
              <option value="Arial Black">Arial Black</option>
              <option value="Impact">Impact</option>
              <option value="Comic Sans MS">Comic Sans MS</option>
              <option value="Lucida Console">Lucida Console</option>
              <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
              <option value="Palatino">Palatino</option>
              <option value="Garamond">Garamond</option>
              <option value="Bookman">Bookman</option>
              <option value="Avant Garde">Avant Garde</option>
              <option value="Century Gothic">Century Gothic</option>
              <option value="Futura">Futura</option>
              <option value="Optima">Optima</option>
              <option value="Brush Script MT">Brush Script MT</option>
              <option value="Lucida Handwriting">Lucida Handwriting</option>
              <option value="Copperplate">Copperplate</option>
              <option value="Papyrus">Papyrus</option>
              <option value="Monaco">Monaco</option>
              <option value="Menlo">Menlo</option>
              <option value="Consolas">Consolas</option>
              <option value="Monaco">Monaco</option>
              <option value="Andale Mono">Andale Mono</option>
              <option value="DejaVu Sans">DejaVu Sans</option>
              <option value="DejaVu Serif">DejaVu Serif</option>
              <option value="DejaVu Sans Mono">DejaVu Sans Mono</option>
              <option value="Liberation Sans">Liberation Sans</option>
              <option value="Liberation Serif">Liberation Serif</option>
              <option value="Liberation Mono">Liberation Mono</option>
              <option value="Ubuntu">Ubuntu</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Lato">Lato</option>
              <option value="Source Sans Pro">Source Sans Pro</option>
              <option value="PT Sans">PT Sans</option>
              <option value="Noto Sans">Noto Sans</option>
              <option value="Noto Serif">Noto Serif</option>
              <option value="Playfair Display">Playfair Display</option>
              <option value="Merriweather">Merriweather</option>
              <option value="Lora">Lora</option>
              <option value="Crimson Text">Crimson Text</option>
              <option value="Bitter">Bitter</option>
              <option value="Arvo">Arvo</option>
              <option value="Josefin Sans">Josefin Sans</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Raleway">Raleway</option>
              <option value="Poppins">Poppins</option>
              <option value="Inter">Inter</option>
              <option value="Work Sans">Work Sans</option>
              <option value="Quicksand">Quicksand</option>
              <option value="Nunito">Nunito</option>
              <option value="Rubik">Rubik</option>
              <option value="Karla">Karla</option>
              <option value="DM Sans">DM Sans</option>
              <option value="Space Grotesk">Space Grotesk</option>
              <option value="JetBrains Mono">JetBrains Mono</option>
              <option value="Fira Code">Fira Code</option>
              <option value="Cascadia Code">Cascadia Code</option>
              <option value="Source Code Pro">Source Code Pro</option>
              <option value="Inconsolata">Inconsolata</option>
              <option value="Anonymous Pro">Anonymous Pro</option>
              <option value="IBM Plex Mono">IBM Plex Mono</option>
              <option value="Hack">Hack</option>
              <option value="Victor Mono">Victor Mono</option>
              <option value="Operator Mono">Operator Mono</option>
              <option value="SF Mono">SF Mono</option>
              <option value="SF Pro Display">SF Pro Display</option>
              <option value="SF Pro Text">SF Pro Text</option>
              <option value="Segoe UI">Segoe UI</option>
              <option value="Calibri">Calibri</option>
              <option value="Cambria">Cambria</option>
              <option value="Candara">Candara</option>
              <option value="Corbel">Corbel</option>
              <option value="Constantia">Constantia</option>
              <option value="Consolas">Consolas</option>
              <option value="Corbel">Corbel</option>
              <option value="Franklin Gothic Medium">
                Franklin Gothic Medium
              </option>
              <option value="Gill Sans">Gill Sans</option>
              <option value="Hoefler Text">Hoefler Text</option>
              <option value="Palatino Linotype">Palatino Linotype</option>
              <option value="Baskerville">Baskerville</option>
              <option value="Didot">Didot</option>
              <option value="Bodoni MT">Bodoni MT</option>
              <option value="Century Schoolbook">Century Schoolbook</option>
              <option value="New York">New York</option>
              <option value="Geneva">Geneva</option>
              <option value="Monaco">Monaco</option>
              <option value="Chicago">Chicago</option>
              <option value="Charcoal">Charcoal</option>
              <option value="Sand">Sand</option>
              <option value="Webdings">Webdings</option>
              <option value="Wingdings">Wingdings</option>
              <option value="Wingdings 2">Wingdings 2</option>
              <option value="Wingdings 3">Wingdings 3</option>
              <option value="Zapf Dingbats">Zapf Dingbats</option>
              <option value="Symbol">Symbol</option>
              <option value="MT Extra">MT Extra</option>
              <option value="Bookshelf Symbol 7">Bookshelf Symbol 7</option>
              <option value="MS Reference Sans Serif">
                MS Reference Sans Serif
              </option>
              <option value="MS Reference Specialty">
                MS Reference Specialty
              </option>
              <option value="Stencil">Stencil</option>
              <option value="Old English Text MT">Old English Text MT</option>
              <option value="Blackadder ITC">Blackadder ITC</option>
              <option value="Bradley Hand ITC">Bradley Hand ITC</option>
              <option value="Freestyle Script">Freestyle Script</option>
              <option value="French Script MT">French Script MT</option>
              <option value="Kunstler Script">Kunstler Script</option>
              <option value="Mistral">Mistral</option>
              <option value="Rage Italic">Rage Italic</option>
              <option value="Script MT Bold">Script MT Bold</option>
              <option value="Viner Hand ITC">Viner Hand ITC</option>
              <option value="Vladimir Script">Vladimir Script</option>
              <option value="Wide Latin">Wide Latin</option>
              <option value="Snap ITC">Snap ITC</option>
              <option value="Tempus Sans ITC">Tempus Sans ITC</option>
              <option value="Tw Cen MT">Tw Cen MT</option>
              <option value="Tw Cen MT Condensed">Tw Cen MT Condensed</option>
              <option value="Tw Cen MT Condensed Extra Bold">
                Tw Cen MT Condensed Extra Bold
              </option>
              <option value="Tw Cen MT Condensed Light">
                Tw Cen MT Condensed Light
              </option>
              <option value="Tw Cen MT Condensed Medium">
                Tw Cen MT Condensed Medium
              </option>
              <option value="Tw Cen MT Condensed Ultra Bold">
                Tw Cen MT Condensed Ultra Bold
              </option>
              <option value="Tw Cen MT Condensed Ultra Light">
                Tw Cen MT Condensed Ultra Light
              </option>
              <option value="Tw Cen MT Extra Bold">Tw Cen MT Extra Bold</option>
              <option value="Tw Cen MT Extra Light">
                Tw Cen MT Extra Light
              </option>
              <option value="Tw Cen MT Light">Tw Cen MT Light</option>
              <option value="Tw Cen MT Medium">Tw Cen MT Medium</option>
              <option value="Tw Cen MT Ultra Bold">Tw Cen MT Ultra Bold</option>
              <option value="Tw Cen MT Ultra Light">
                Tw Cen MT Ultra Light
              </option>
              <option value="Tw Cen MT Bold">Tw Cen MT Bold</option>
              <option value="Tw Cen MT Condensed Bold">
                Tw Cen MT Condensed Bold
              </option>
              <option value="Tw Cen MT Condensed Extra Light">
                Tw Cen MT Condensed Extra Light
              </option>
              <option value="Tw Cen MT Condensed Light">
                Tw Cen MT Condensed Light
              </option>
              <option value="Tw Cen MT Condensed Medium">
                Tw Cen MT Condensed Medium
              </option>
              <option value="Tw Cen MT Condensed Ultra Bold">
                Tw Cen MT Condensed Ultra Bold
              </option>
              <option value="Tw Cen MT Condensed Ultra Light">
                Tw Cen MT Condensed Ultra Light
              </option>
              <option value="Tw Cen MT Extra Bold">Tw Cen MT Extra Bold</option>
              <option value="Tw Cen MT Extra Light">
                Tw Cen MT Extra Light
              </option>
              <option value="Tw Cen MT Light">Tw Cen MT Light</option>
              <option value="Tw Cen MT Medium">Tw Cen MT Medium</option>
              <option value="Tw Cen MT Ultra Bold">Tw Cen MT Ultra Bold</option>
              <option value="Tw Cen MT Ultra Light">
                Tw Cen MT Ultra Light
              </option>
            </select>
            <select
              className="form-select form-select-sm"
              style={{ width: "auto" }}
              onChange={(e) => {
                e.preventDefault();
                if (e.target.value && editor) {
                  editor.chain().focus().setFontSize(e.target.value).run();
                  setTimeout(() => updateActiveStates(editor), 50);
                }
              }}
              value={editor?.getAttributes("textStyle")?.fontSize || ""}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <option value="">Size</option>
              <option value="8px">8px</option>
              <option value="9px">9px</option>
              <option value="10px">10px</option>
              <option value="11px">11px</option>
              <option value="12px">12px</option>
              <option value="13px">13px</option>
              <option value="14px">14px</option>
              <option value="15px">15px</option>
              <option value="16px">16px</option>
              <option value="17px">17px</option>
              <option value="18px">18px</option>
              <option value="19px">19px</option>
              <option value="20px">20px</option>
              <option value="21px">21px</option>
              <option value="22px">22px</option>
              <option value="23px">23px</option>
              <option value="24px">24px</option>
              <option value="25px">25px</option>
              <option value="26px">26px</option>
              <option value="27px">27px</option>
              <option value="28px">28px</option>
              <option value="29px">29px</option>
              <option value="30px">30px</option>
              <option value="32px">32px</option>
              <option value="34px">34px</option>
              <option value="36px">36px</option>
              <option value="38px">38px</option>
              <option value="40px">40px</option>
              <option value="42px">42px</option>
              <option value="44px">44px</option>
              <option value="46px">46px</option>
              <option value="48px">48px</option>
              <option value="50px">50px</option>
              <option value="52px">52px</option>
              <option value="54px">54px</option>
              <option value="56px">56px</option>
              <option value="58px">58px</option>
              <option value="60px">60px</option>
              <option value="64px">64px</option>
              <option value="68px">68px</option>
              <option value="72px">72px</option>
              <option value="76px">76px</option>
              <option value="80px">80px</option>
              <option value="84px">84px</option>
              <option value="88px">88px</option>
              <option value="92px">92px</option>
              <option value="96px">96px</option>
              <option value="100px">100px</option>
              <option value="120px">120px</option>
              <option value="140px">140px</option>
              <option value="160px">160px</option>
              <option value="180px">180px</option>
              <option value="200px">200px</option>
              <option value="0.5rem">0.5rem</option>
              <option value="0.75rem">0.75rem</option>
              <option value="0.875rem">0.875rem</option>
              <option value="1rem">1rem</option>
              <option value="1.125rem">1.125rem</option>
              <option value="1.25rem">1.25rem</option>
              <option value="1.375rem">1.375rem</option>
              <option value="1.5rem">1.5rem</option>
              <option value="1.625rem">1.625rem</option>
              <option value="1.75rem">1.75rem</option>
              <option value="1.875rem">1.875rem</option>
              <option value="2rem">2rem</option>
              <option value="2.125rem">2.125rem</option>
              <option value="2.25rem">2.25rem</option>
              <option value="2.375rem">2.375rem</option>
              <option value="2.5rem">2.5rem</option>
              <option value="2.625rem">2.625rem</option>
              <option value="2.75rem">2.75rem</option>
              <option value="2.875rem">2.875rem</option>
              <option value="3rem">3rem</option>
              <option value="3.125rem">3.125rem</option>
              <option value="3.25rem">3.25rem</option>
              <option value="3.375rem">3.375rem</option>
              <option value="3.5rem">3.5rem</option>
              <option value="3.625rem">3.625rem</option>
              <option value="3.75rem">3.75rem</option>
              <option value="3.875rem">3.875rem</option>
              <option value="4rem">4rem</option>
              <option value="4.5rem">4.5rem</option>
              <option value="5rem">5rem</option>
              <option value="5.5rem">5.5rem</option>
              <option value="6rem">6rem</option>
              <option value="6.5rem">6.5rem</option>
              <option value="7rem">7rem</option>
              <option value="7.5rem">7.5rem</option>
              <option value="8rem">8rem</option>
              <option value="8.5rem">8.5rem</option>
              <option value="9rem">9rem</option>
              <option value="9.5rem">9.5rem</option>
              <option value="10rem">10rem</option>
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
              <option value="x-large">x-large</option>
              <option value="xx-large">xx-large</option>
              <option value="xxx-large">xxx-large</option>
              <option value="smaller">smaller</option>
              <option value="larger">larger</option>
            </select>
          </div>

          {/* Color Picker */}
          <div className="d-flex gap-1">
            <input
              type="color"
              className="tiptap-color-picker"
              onChange={(e) => {
                e.preventDefault();
                if (e.target.value && editor) {
                  editor.chain().focus().setColor(e.target.value).run();
                  setTimeout(() => updateActiveStates(editor), 50);
                }
              }}
              onMouseDown={(e) => e.stopPropagation()}
              title="Text Color"
            />
          </div>
        </div>

        {/* Link Input */}
        {showLinkInput && (
          <div className="tiptap-link-input">
            <div className="d-flex gap-2">
              <input
                type="url"
                className="form-control form-control-sm"
                placeholder="Enter URL..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addLink()}
                onMouseDown={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addLink();
                }}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowLinkInput(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor Content */}
      <div
        className={`tiptap-editor-content ${isInvalid ? "border-danger" : ""}`}
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

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
};

// Add CSS styles for resizable images
const styles = `
  .resizable-image-container {
    position: relative;
    display: inline-block;
    max-width: 100%;
  }

  .resizable-image {
    display: block;
    max-width: 100%;
    height: auto;
  }

  .resize-handle {
    position: absolute;
    bottom: -8px;
    right: -8px;
    width: 16px;
    height: 16px;
    background: #007bff;
    border: 2px solid white;
    border-radius: 50%;
    cursor: se-resize;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .resizable-image-container:hover .resize-handle {
    opacity: 1;
  }

  .resize-handle-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
  }

  .resizable-image-container.resizing {
    user-select: none;
  }

  .resizable-image-container.resizing .resize-handle {
    opacity: 1;
  }
`;

// Inject styles into the document
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default TipTapEditor;
