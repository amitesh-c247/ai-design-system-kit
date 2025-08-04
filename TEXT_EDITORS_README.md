# Text Editors Implementation

This project now includes two powerful text editors with different approaches to content editing:

## 🎯 Editors Overview

### 1. TipTap Editor (Traditional Rich Text)
- **Location**: `src/components/pure-components/TipTapEditor.tsx`
- **Approach**: Traditional inline rich text editing
- **Output**: HTML format
- **Experience**: Similar to Google Docs or Microsoft Word

### 2. Editor.js (Block-based Editor)
- **Location**: `src/components/pure-components/EditorJS/`
- **Approach**: Modern block-based editing
- **Output**: JSON format
- **Experience**: Similar to Notion or modern CMS editors

## 🚀 Getting Started

### Installation
The required dependencies are already installed:

```bash
# TipTap dependencies (already installed)
@tiptap/core
@tiptap/react
@tiptap/starter-kit
# ... plus various extensions

# Editor.js dependencies (newly added)
@editorjs/editorjs
@editorjs/header
@editorjs/list
@editorjs/code
@editorjs/quote
# ... plus other tools
```

### Demo Page
Visit the demo page to see both editors in action:
- **URL**: `/editors-demo`
- **Features**: Side-by-side comparison, live examples, feature overview

### Storybook
Both components are available in Storybook:
- **TipTap**: `Components/Form/TipTapEditor`
- **Editor.js**: `Components/Form/EditorJS`

## 📖 Usage Examples

### TipTap Editor

```tsx
import TipTapEditor from '@/components/pure-components/TipTapEditor';

function MyComponent() {
  const [content, setContent] = useState('<p>Initial HTML content</p>');

  return (
    <TipTapEditor
      content={content}
      onChange={setContent}
      placeholder="Start typing..."
      className="my-editor"
    />
  );
}
```

### Editor.js

```tsx
import EditorJSComponent, { EditorJSData } from '@/components/pure-components/EditorJS';

function MyComponent() {
  const [data, setData] = useState<EditorJSData>({
    blocks: [
      {
        type: "paragraph",
        data: { text: "Initial content" }
      }
    ]
  });

  return (
    <EditorJSComponent
      data={data}
      onChange={setData}
      placeholder="Let's write an awesome story!"
      minHeight={300}
    />
  );
}
```

## ⚡ Features Comparison

| Feature | TipTap Editor | Editor.js |
|---------|---------------|-----------|
| **Interface** | Traditional WYSIWYG | Block-based |
| **Output Format** | HTML | JSON |
| **Inline Formatting** | ✅ Rich inline tools | ⚠️ Limited inline tools |
| **Block Structure** | ❌ Document flow | ✅ Structured blocks |
| **Drag & Drop** | ❌ No | ✅ Block reordering |
| **Slash Commands** | ✅ Yes | ✅ Plus button menu |
| **Tables** | ⚠️ Basic | ✅ Advanced |
| **Code Blocks** | ✅ Yes | ✅ With better UX |
| **Embeds** | ❌ Limited | ✅ YouTube, etc. |
| **Checklists** | ⚠️ Basic lists | ✅ Interactive todos |
| **Mobile UX** | ✅ Good | ✅ Excellent |

## 🎨 Available Block Types (Editor.js)

### Text Blocks
- **Paragraph**: Basic text with inline formatting
- **Header**: H1-H6 with different styling
- **Quote**: Blockquotes with optional attribution
- **Warning**: Callout/alert blocks with icons

### Lists & Tasks
- **Bullet List**: Unordered lists
- **Numbered List**: Ordered lists  
- **Checklist**: Interactive todo items

### Code & Media
- **Code Block**: Syntax-aware code editor
- **Inline Code**: Code snippets within text
- **Image**: File upload or URL-based images
- **Embed**: YouTube, CodePen, etc.

### Structure
- **Delimiter**: Visual content separators
- **Table**: Interactive data tables
- **Raw HTML**: For custom HTML content
- **Link**: Rich link previews

## 🛠️ Customization

### TipTap Extensions
The TipTap editor includes these extensions:
- StarterKit (basic functionality)
- Placeholder, Link, Underline
- TextAlign, Highlight
- Subscript, Superscript

### Editor.js Tools
The Editor.js setup includes comprehensive tools with proper configuration for each block type.

### Styling
Both editors use CSS Modules with:
- Modern, clean design
- Notion-inspired aesthetics
- Responsive layout
- Dark mode support (Editor.js)

## 📱 Responsive Design

Both editors are fully responsive:
- **Desktop**: Full feature set with hover states
- **Tablet**: Touch-optimized interactions
- **Mobile**: Simplified toolbars, touch gestures

## 🎯 When to Use Which Editor?

### Use TipTap When:
- Users expect traditional document editing
- You need rich inline formatting
- HTML output is preferred
- Building email editors, documentation
- Users are familiar with Google Docs/Word

### Use Editor.js When:
- Building modern content management systems
- Structured content is important
- JSON output works better for your API
- You want a clean, minimal interface
- Building Notion-like applications

## 🚧 Implementation Notes

### API Endpoints (Editor.js)
The Editor.js component references these endpoints:
- `/api/fetchUrl` - For link previews
- `/api/uploadFile` - For image uploads

You may need to implement these endpoints based on your backend requirements.

### Performance
- Both editors are optimized for performance
- Editor.js uses lazy loading for tools
- TipTap has efficient update cycles

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ for TipTap
- ES6+ for Editor.js

## 🔧 Development

### File Structure
```
src/components/pure-components/
├── TipTapEditor.tsx           # TipTap component
├── TipTapEditor.module.scss   # TipTap styles
├── TipTapEditor.stories.tsx   # TipTap stories
├── EditorJS/
│   ├── EditorJS.tsx          # Editor.js component
│   ├── styles.module.scss    # Editor.js styles
│   ├── EditorJS.stories.tsx  # Editor.js stories
│   └── index.ts              # Exports
```

### Scripts
```bash
yarn dev          # Start development server
yarn storybook    # Start Storybook
yarn build        # Build for production
```

## 📚 Resources

- [TipTap Documentation](https://tiptap.dev/)
- [Editor.js Documentation](https://editorjs.io/)
- [Demo Page](http://localhost:3000/editors-demo) (when running locally)
- [Storybook](http://localhost:6006) (when running locally)

---

**Created**: January 2025  
**Status**: ✅ Ready for production use  
**Maintainer**: Development Team 