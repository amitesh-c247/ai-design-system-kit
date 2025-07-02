import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import Input from "@/components/common/Form/Input";
import { useTranslations } from "next-intl";
import { isValidJsonString, setFormValues } from "@/utils/useSyncFormValues";
import dynamic from "next/dynamic";

import { Controller } from 'react-hook-form';
import EditorJSField from '@/components/common/EditorJSField';

export interface CmsFormValues {
  title: string;
  content: any; // Can be string (for LINK) or EditorJS object (for TEXT)
  status: "PUBLISHED" | "DRAFT";
  is_agreement: 0 | 1;
  open_in_new_tab: 0 | 1;
  content_type: "TEXT" | "LINK";
  slug: string;
}

interface CmsFormProps {
  defaultValues?: Partial<CmsFormValues>;
  onSubmit: SubmitHandler<CmsFormValues>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const EditorJS = dynamic(() => import("@/components/common/EditorJSField"), {
  ssr: false,
});

const initialValues: Partial<CmsFormValues> = {
  title: "",
  content: "",
  status: undefined,
  is_agreement: 0,
  open_in_new_tab: 0,
  content_type: undefined,
  slug: "",
};

const CmsForm: React.FC<CmsFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const t = useTranslations("cms");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    control,
    clearErrors,
    trigger,
  } = useForm<CmsFormValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (defaultValues) {
      setFormValues<CmsFormValues>(defaultValues, initialValues, setValue);
      
      // If content_type is TEXT and content is available, ensure it's properly formatted for EditorJS
      if (defaultValues.content_type === 'TEXT' && defaultValues.content) {
        let contentValue = defaultValues.content;
        
        // If it's a string, try to parse it as JSON
        if (typeof contentValue === 'string') {
          try {
            contentValue = JSON.parse(contentValue);
          } catch (e) {
            // If parsing fails, wrap plain text in EditorJS format
            contentValue = {
              blocks: [{
                type: 'paragraph',
                data: { text: contentValue }
              }]
            };
          }
        }
        
                 // Ensure it has the proper EditorJS structure
         if (!contentValue || typeof contentValue !== 'object' || !contentValue.blocks) {
           contentValue = { blocks: [] };
         }
        
        setValue("content", contentValue);
      }
    }
  }, [defaultValues, setValue]);

  const contentType = watch("content_type");

  const hasInitialized = useRef(false);
  
  useEffect(() => {
    if (contentType && !hasInitialized.current) {
      hasInitialized.current = true;
      // Clear content errors when switching content type
      clearErrors("content");
      
      if (contentType === "TEXT") {
        const content = defaultValues?.content;
        const parsedText = (content && isValidJsonString(content))
          ? JSON.parse(content)
          : content || { blocks: [] };
        setValue("content", parsedText);
      } else if (contentType === "LINK") {
        setValue("content", (defaultValues?.content as string) || "");
      }
    }
  }, [contentType, defaultValues, setValue, clearErrors]);

  // On submit, convert content to JSON string
  const handleSubmitWithStringContent = (data: CmsFormValues) => {
    const newData = {
      ...data,
      content:
        typeof data.content === "string"
          ? data.content
          : JSON.stringify(data.content),
    };
    onSubmit(newData);
  };

  const parsedContent = watch("content");
  const contentValue = watch("content");

  // Handle content change for LINK type
  const handleLinkContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue("content", value);
    // Clear errors when user starts typing
    if (value.trim() && errors.content) {
      clearErrors("content");
    }
  };

  // Check if EditorJS content has meaningful data
  const hasEditorContent = (data: any): boolean => {
    if (!data) return false;
    
    // Handle string content (might be JSON string)
    if (typeof data === 'string') {
      if (data.trim() === '') return false;
      try {
        data = JSON.parse(data);
      } catch {
        // If it's not JSON, treat as regular string content
        return data.trim() !== '';
      }
    }
    
    if (!data.blocks || !Array.isArray(data.blocks)) return false;
    
    return data.blocks.some((block: any) => {
      if (!block || !block.data) return false;
      
      switch (block.type) {
        case 'paragraph':
          return block.data.text && block.data.text.trim() !== '';
        case 'header':
          return block.data.text && block.data.text.trim() !== '';
        case 'list':
          return block.data.items && Array.isArray(block.data.items) && 
                 block.data.items.some((item: string) => item && item.trim() !== '');
        case 'quote':
          return block.data.text && block.data.text.trim() !== '';
        case 'image':
          return block.data.url && block.data.url.trim() !== '';
        case 'code':
          return block.data.code && block.data.code.trim() !== '';
        default:
          return true; // For unknown block types, assume they have content
      }
    });
  };

  // Handle content change for EditorJS
  const handleEditorChange = (data: any) => {
    // Clear errors when user has valid content
    if (hasEditorContent(data) && errors.content) {
      clearErrors("content");
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleSubmitWithStringContent)}>
      <Form.Group className="mb-3">
        <Form.Label>{t("pageTitle")}</Form.Label>
        <Input
          {...register("title", { required: t("form.titleRequired") })}
          isInvalid={!!errors.title}
          feedback={errors.title?.message}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t("contentType")}</Form.Label>
        <Form.Select
          {...register("content_type", {
            required: t("form.contentTypeRequired"),
          })}
          isInvalid={!!errors.content_type}
        >
          <option value="TEXT">{t("contentTypeOptions.text")}</option>
          <option value="LINK">{t("contentTypeOptions.link")}</option>
        </Form.Select>
        {errors.content_type && (
          <div className="invalid-feedback d-block">
            {errors.content_type.message}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t("content")}</Form.Label>
        {contentType === "LINK" ? (
          <Input
            value={(typeof watch("content") === "string" ? watch("content") : "") || ""}
            onChange={handleLinkContentChange}
            isInvalid={!!errors.content}
            feedback={errors.content?.message as string}
            placeholder="Enter URL or link content"
          />
        ) : (
          <Controller
            name="content"
            control={control}
            defaultValue={parsedContent || { blocks: [] }}
            rules={{
              validate: (value: any) => {
                const currentContentType = watch("content_type");
                
                if (currentContentType === 'LINK') {
                  return (value && typeof value === 'string' && value.trim() !== '') || t('form.contentRequired');
                }
                
                // For TEXT (EditorJS) content
                return hasEditorContent(value) || t('form.contentRequired');
              }
            }}
            render={({ field, fieldState }) => (
              <EditorJSField
                name="content"
                defaultValue={field.value || { blocks: [] }}
                isInvalid={!!fieldState.error}
                feedback={fieldState.error?.message}
                onChange={(data) => {
                  field.onChange(data);
                  handleEditorChange(data);
                }}
              />
            )}
          />
        )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{t("status")}</Form.Label>
        <Form.Select
          {...register("status", { required: t("form.statusRequired") })}
          isInvalid={!!errors.status}
        >
          <option value="PUBLISHED">{t("statusOptions.published")}</option>
          <option value="DRAFT">{t("statusOptions.draft")}</option>
        </Form.Select>
        {errors.status && (
          <div className="invalid-feedback d-block">
            {errors.status.message}
          </div>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="isAgreement">
        <Form.Check
          type="checkbox"
          label={t("isAgreement")}
          {...register("is_agreement")}
          checked={!!watch("is_agreement")}
          onChange={(e) => {
            // react-hook-form expects 0/1, not boolean
            const value = e.target.checked ? 1 : 0;
            setValue("is_agreement", value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="openInNewTab">
        <Form.Check
          type="checkbox"
          label={t("openInNewTab")}
          {...register("open_in_new_tab")}
          checked={!!watch("open_in_new_tab")}
          onChange={(e) => {
            const value = e.target.checked ? 1 : 0;
            setValue("open_in_new_tab", value);
          }}
        />
      </Form.Group>
      <div className="d-flex justify-content-end gap-2 mt-4">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} type="button" disabled={isLoading}>
            {t("cancel")}
          </Button>
        )}
        <Button variant="primary" type="submit" disabled={isSubmitting || isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {t("saving")}
            </>
          ) : (
            t("save")
          )}
        </Button>
      </div>
    </Form>
  );
};

export default CmsForm;
