import { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TipTapFieldProps {
  value: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
  feedback?: string;
}

const TipTapField: React.FC<TipTapFieldProps> = ({ value, onChange, isInvalid, feedback }) => {
  const initialValue = useRef(value);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialValue.current || '',
    editable: true,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Only update content if value changes from outside (not from typing)
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML() && value !== initialValue.current) {
      editor.commands.setContent(value, false);
    }
    // eslint-disable-next-line
  }, [value, editor]);

  return (
    <div>
      <div style={{ border: isInvalid ? '1px solid #dc3545' : '1px solid #ced4da', borderRadius: 4, minHeight: 150 }}>
        <EditorContent editor={editor} />
      </div>
      {isInvalid && feedback && <div className="invalid-feedback d-block">{feedback}</div>}
    </div>
  );
};

export default TipTapField; 