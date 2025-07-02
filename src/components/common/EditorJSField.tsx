import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import { Controller } from 'react-hook-form';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import Paragraph from '@editorjs/paragraph';

interface EditorJSFieldProps {
  name: string;
  control: any;
  defaultValue?: any;
  isInvalid?: boolean;
  feedback?: string;
  rules?: any;
  trigger?: (name: string) => void;
}

const EditorJSField: React.FC<EditorJSFieldProps> = ({ name, control, defaultValue, rules, trigger }) => {
  const holderId = useRef(`editorjs-${name}-${Math.random().toString(36).substr(2, 9)}`);
  const editorRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  // Refs to always have latest onChange and trigger
  const onChangeRef = useRef<(data: any) => void>();
  const triggerRef = useRef<typeof trigger>();
  onChangeRef.current = undefined;
  triggerRef.current = trigger;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (mounted && !editorRef.current) {
      const holderElement = document.getElementById(holderId.current);
      if (holderElement) {
        editorRef.current = new EditorJS({
          holder: holderId.current,
          data: defaultValue || { blocks: [] },
          autofocus: true,
          minHeight: 150,
          tools: {
            header: Header,
            list: List,
            image: ImageTool,
            quote: Quote,
            paragraph: Paragraph,
          },
          onChange: async () => {
            const data = await editorRef.current.save();
            if (onChangeRef.current) onChangeRef.current(data);
            if (triggerRef.current) triggerRef.current(name);
          },
        });
      }
    }
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, defaultValue, name]);

  // Blur event for validation
  useEffect(() => {
    const holder = document.getElementById(holderId.current);
    if (holder && trigger) {
      const handleBlur = () => trigger(name);
      holder.addEventListener('blur', handleBlur, true);
      return () => holder.removeEventListener('blur', handleBlur, true);
    }
  }, [trigger, name]);

  // Sync value to EditorJS only if value changes and editor is ready
  useEffect(() => {
    if (editorRef.current && control?._formValues) {
      const value = control._formValues[name];
      if (value) {
        editorRef.current.isReady.then(() => {
          editorRef.current.render(value);
        });
      }
    }
  }, [control, name]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || { blocks: [] }}
      rules={rules}
      render={({ field: { onChange }, fieldState }) => {
        // Store the latest onChange in a ref for Editor.js to use
        onChangeRef.current = onChange;
        return (
          <div>
            <div id={holderId.current} style={{ border: fieldState.invalid ? '1px solid #dc3545' : '1px solid #ced4da', borderRadius: 4, minHeight: 150 }} />
            {fieldState.error?.message && (
              <div className="invalid-feedback d-block">{fieldState.error.message}</div>
            )}
          </div>
        );
      }}
    />
  );
};

export default EditorJSField; 