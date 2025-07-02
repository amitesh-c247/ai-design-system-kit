import React, { useEffect, useRef, useState } from 'react';

interface EditorJSFieldProps {
  name: string;
  defaultValue?: any;
  isInvalid?: boolean;
  feedback?: string;
  onChange?: (data: any) => void;
}

const EditorJSField: React.FC<EditorJSFieldProps> = ({ 
  name, 
  defaultValue, 
  isInvalid,
  feedback,
  onChange
}) => {
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const initializingRef = useRef(false);
  const onChangeRef = useRef(onChange);
  const userIsTyping = useRef(false);
  const hasInitializedContent = useRef(false);
  
  // Keep onChange ref updated
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Initialize client-side flag
  useEffect(() => {
    setIsClient(true);
    return () => {
      // Cleanup on unmount
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // Initialize EditorJS
  useEffect(() => {
    if (!isClient || !containerRef.current || initializingRef.current || editorRef.current) {
      return;
    }

    initializingRef.current = true;

    const initEditor = async () => {
      try {
        // Dynamic import for client-side only
        const [
          { default: EditorJS },
          { default: Header },
          { default: List },
          { default: Paragraph }
        ] = await Promise.all([
          import('@editorjs/editorjs'),
          import('@editorjs/header'),
          import('@editorjs/list'),
          import('@editorjs/paragraph')
        ]);

        // Prepare initial data
        const initialData = defaultValue && defaultValue.blocks 
          ? defaultValue 
          : { blocks: [] };

        editorRef.current = new EditorJS({
          holder: containerRef.current!,
          data: initialData,
          placeholder: 'Start writing your content...',
          tools: {
            header: Header,
            list: List,
            paragraph: Paragraph
          },
          onChange: async () => {
            try {
              if (editorRef.current && onChangeRef.current) {
                userIsTyping.current = true;
                const data = await editorRef.current.save();
                // Debounce the onChange to prevent rapid updates
                setTimeout(() => {
                  if (onChangeRef.current) {
                    onChangeRef.current(data);
                  }
                  // Reset typing flag after a delay
                  setTimeout(() => {
                    userIsTyping.current = false;
                  }, 500);
                }, 100);
              }
            } catch (error) {
              console.error('Error saving editor data:', error);
            }
          },
          onReady: () => {
            setIsReady(true);
            initializingRef.current = false;
            // If no defaultValue, mark as initialized to prevent future re-renders
            if (!defaultValue || !defaultValue.blocks || defaultValue.blocks.length === 0) {
              hasInitializedContent.current = true;
            }
          },
        });

      } catch (error) {
        console.error('Failed to initialize EditorJS:', error);
        initializingRef.current = false;
      }
    };

    initEditor();
  }, [isClient, defaultValue]);

  // Update content only on initial load
  useEffect(() => {
    if (isReady && editorRef.current && defaultValue && defaultValue.blocks && !hasInitializedContent.current && !userIsTyping.current) {
      hasInitializedContent.current = true;
      editorRef.current.render(defaultValue).catch((error: any) => {
        console.error('Error rendering editor data:', error);
      });
    }
  }, [isReady, defaultValue]);

  // Show loading state on server-side
  if (!isClient) {
    return (
      <div style={{ 
        minHeight: 200, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
        fontSize: '14px'
      }}>
        Loading editor...
      </div>
    );
  }

  return (
    <div>
      <div 
        ref={containerRef}
        style={{
          minHeight: 200,
          padding: '20px',
          backgroundColor: '#fff'
        }}
      />
      {isInvalid && feedback && (
        <div style={{ 
          color: '#dc3545', 
          fontSize: '0.875rem', 
          marginTop: '0.25rem' 
        }}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default EditorJSField; 