# FileUpload Component

A comprehensive file upload component built with React Hook Form and TypeScript, featuring drag-and-drop functionality, file validation, and upload progress tracking.

## Features

- ✅ **React Hook Form Integration** - Seamless integration with `Controller`
- ✅ **Drag & Drop Support** - Modern drag-and-drop file selection
- ✅ **File Validation** - Size and type validation with custom error messages
- ✅ **Multiple File Support** - Upload single or multiple files
- ✅ **Progress Tracking** - Visual upload progress with percentage
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **Dark Mode Support** - Automatic dark mode detection
- ✅ **Accessibility** - Keyboard navigation and screen reader support
- ✅ **TypeScript** - Full TypeScript support with proper typing

## Installation

The component is part of the pure-components library and uses the following dependencies:

```bash
npm install react-hook-form
```

## Basic Usage

```tsx
import { useForm, Controller } from 'react-hook-form';
import { FileUpload } from './FileUpload';

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="files"
        control={control}
        rules={{ required: 'Please select files' }}
        render={({ field }) => (
          <FileUpload
            name="files"
            label="Upload Files"
            accept="*/*"
            multiple={true}
            maxSize={10}
            required
          />
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | **Required.** Form field name for React Hook Form |
| `label` | `string` | `'Upload Files'` | Label for the file upload field |
| `accept` | `string` | `'*/*'` | Accepted file types (e.g., `".pdf,.doc,.docx"` or `"image/*"`) |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `maxSize` | `number` | `10` | Maximum file size in MB |
| `onFileSelect` | `(files: File[]) => void` | - | Callback when files are selected |
| `onFileUpload` | `(files: File[]) => Promise<void>` | - | Callback for file upload with progress |
| `disabled` | `boolean` | `false` | Disable the file upload component |
| `required` | `boolean` | `false` | Make the field required |
| `error` | `string` | - | Error message to display |

## Advanced Usage

### With File Upload Handler

```tsx
const handleFileUpload = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    console.log('Files uploaded successfully');
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

<FileUpload
  name="files"
  label="Upload with Progress"
  accept="image/*"
  multiple={true}
  maxSize={5}
  onFileUpload={handleFileUpload}
/>
```

### With File Selection Handler

```tsx
const handleFileSelect = (files: File[]) => {
  console.log('Selected files:', files);
  // Preview files, validate, etc.
};

<FileUpload
  name="files"
  label="Upload with Preview"
  accept="image/*"
  multiple={true}
  onFileSelect={handleFileSelect}
/>
```

### Custom File Types

```tsx
// Documents only
<FileUpload
  name="documents"
  label="Upload Documents"
  accept=".pdf,.doc,.docx,.txt"
  multiple={true}
  maxSize={20}
/>

// Images only
<FileUpload
  name="images"
  label="Upload Images"
  accept="image/*"
  multiple={true}
  maxSize={5}
/>

// Custom file types
<FileUpload
  name="archives"
  label="Upload Archives"
  accept=".zip,.rar,.7z"
  multiple={true}
  maxSize={50}
/>
```

## File Validation

The component automatically validates files based on:

1. **File Size** - Checks against `maxSize` prop (in MB)
2. **File Type** - Validates against `accept` prop
3. **Required Field** - Ensures files are selected when `required` is true

### Custom Validation

You can add custom validation through React Hook Form's `rules`:

```tsx
<Controller
  name="files"
  control={control}
  rules={{
    required: 'Please select files',
    validate: (files) => {
      if (files.length === 0) return 'Please select at least one file';
      if (files.length > 5) return 'Maximum 5 files allowed';
      return true;
    }
  }}
  render={({ field }) => (
    <FileUpload
      name="files"
      label="Upload Files"
      multiple={true}
      maxSize={10}
    />
  )}
/>
```

## Styling

The component uses CSS modules and includes:

- Modern, clean design
- Hover and focus states
- Responsive layout
- Dark mode support
- Customizable through CSS variables

### Custom Styling

You can override styles by targeting the CSS classes:

```scss
.fileUpload {
  // Custom styles
}

.dropZone {
  // Custom drop zone styles
}

.selectedFiles {
  // Custom file list styles
}
```

## Accessibility

The component includes:

- Keyboard navigation support
- Screen reader announcements
- ARIA labels and descriptions
- Focus management
- Error announcements

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Examples

See the Storybook stories for more examples:

- Basic usage
- Multiple file upload
- File type restrictions
- Upload progress
- Error handling
- Disabled state
- Required field validation

## Troubleshooting

### Common Issues

1. **Files not uploading**: Ensure you have an `onFileUpload` handler
2. **Validation errors**: Check file size and type restrictions
3. **Form submission**: Make sure the component is wrapped in a `Controller`

### Debug Mode

Enable console logging to debug issues:

```tsx
<FileUpload
  name="files"
  onFileSelect={(files) => console.log('Selected:', files)}
  onFileUpload={async (files) => {
    console.log('Uploading:', files);
    // Your upload logic
  }}
/>
```

## Contributing

When contributing to this component:

1. Follow the existing code style
2. Add TypeScript types for new props
3. Include Storybook stories for new features
4. Test with different file types and sizes
5. Ensure accessibility compliance 