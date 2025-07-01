import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import Input from "@/components/common/Form/Input";
import { useTranslations } from "next-intl";
import { isValidJsonString, setFormValues } from "@/utils/useSyncFormValues";
import dynamic from "next/dynamic";
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import EditorJSField from '@/components/common/EditorJSField';

export interface CmsFormValues {
  title: string;
  content: string;
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
}

const EditorJS = dynamic(() => import("@/components/common/EditorJSField"), {
  ssr: false,
});

const initialValues = {
  title: "",
  status: "",
  is_agreement: 0,
  open_in_new_tab: 0,
  content_type: "",
  slug: "",
};

const CmsForm: React.FC<CmsFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
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
  } = useForm<CmsFormValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (defaultValues)
      setFormValues<CmsFormValues>(defaultValues, initialValues, setValue);
  }, [defaultValues]);

  const contentType = watch("content_type");

  useEffect(() => {
    if (contentType) {
      if (contentType === "TEXT") {
        const parsedText = isValidJsonString(defaultValues?.content)
          ? JSON.parse(defaultValues?.content)
          : "";
        setValue("content", parsedText);
      } else if (contentType === "LINK") {
        setValue("content", defaultValues?.content);
      }
    }
  }, [contentType, defaultValues]);
  // On submit, convert content to JSON string
  const handleSubmitWithStringContent = (data: CmsFormValues) => {
    const newData = {
      ...data,
      content:
        typeof data.content === "string"
          ? data.content
          : JSON.stringify(data.content),
    };
    onSubmit(newData as CmsFormValues);
  };

  const parsedContent = watch("content");

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
            {...register("content", { required: t("form.contentRequired") })}
            isInvalid={!!errors.content}
            feedback={errors.content?.message}
          />
        ) : (
          <Controller
            name="content"
            control={control}
            defaultValue={parsedContent || { blocks: [] }}
            rules={{
              validate: (value: any) => {
                if (!value || !value.blocks || value.blocks.length === 0) {
                  return t('form.contentRequired');
                }
                // Check if at least one block has non-empty content
                const hasContent = value.blocks.some((block: any) => {
                  if (block.type === 'paragraph' && block.data && block.data.text && block.data.text.trim() !== '') return true;
                  if (block.type === 'header' && block.data && block.data.text && block.data.text.trim() !== '') return true;
                  if (block.type === 'list' && block.data && block.data.items && block.data.items.length > 0) return true;
                  if (block.type === 'quote' && block.data && block.data.text && block.data.text.trim() !== '') return true;
                  if (block.type === 'image' && block.data && block.data.url) return true;
                  return false;
                });
                return hasContent || t('form.contentRequired');
              }
            }}
            render={({ field }) => (
              <EditorJSField
                name="content"
                control={control}
                defaultValue={field.value}
                isInvalid={!!errors.content}
                feedback={errors.content?.message}
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
            // @ts-ignore
            register("is_agreement").onChange({
              target: { value, name: "is_agreement" },
            });
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
            // @ts-ignore
            register("open_in_new_tab").onChange({
              target: { value, name: "open_in_new_tab" },
            });
          }}
        />
      </Form.Group>
      <div className="d-flex justify-content-end gap-2 mt-4">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} type="button">
            {t("cancel")}
          </Button>
        )}
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {t("save")}
        </Button>
      </div>
    </Form>
  );
};

export default CmsForm;
