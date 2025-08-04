import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import Input from "@/components/pure-components/Form/Input";
import { useTranslations } from "next-intl";
import {
  isValidJsonString,
  setFormValues,
} from "@/types/utils/useSyncFormValues";
import dynamic from "next/dynamic";

import { Controller } from "react-hook-form";
import type { EditorJSData } from "@/components/pure-components/EditorJS";

export interface CmsFormValues {
  title: string;
  content: any; // Can be string (for LINK) or EditorJSData (for TEXT)
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

// EditorJS component loaded dynamically for better performance
const EditorJS = dynamic(
  () => import("@/components/pure-components/EditorJS"),
  {
    ssr: false,
  }
);

// Helper function to check if EditorJS data has meaningful content
const hasEditorJSContent = (
  data: EditorJSData | string | null | undefined
): boolean => {
  if (!data) return false;

  // Handle string content (for LINK type or legacy data)
  if (typeof data === "string") {
    return data.trim() !== "";
  }

  // Handle EditorJS format
  if (typeof data === "object" && data.blocks && Array.isArray(data.blocks)) {
    return data.blocks.some((block: any) => {
      if (!block || !block.data) return false;

      switch (block.type) {
        case "paragraph":
          return block.data.text && block.data.text.trim() !== "";
        case "header":
          return block.data.text && block.data.text.trim() !== "";
        case "list":
          return (
            block.data.items &&
            Array.isArray(block.data.items) &&
            block.data.items.some((item: string) => item && item.trim() !== "")
          );
        case "checklist":
          return (
            block.data.items &&
            Array.isArray(block.data.items) &&
            block.data.items.some(
              (item: any) => item.text && item.text.trim() !== ""
            )
          );
        case "quote":
          return block.data.text && block.data.text.trim() !== "";
        case "warning":
          return (
            (block.data.title && block.data.title.trim() !== "") ||
            (block.data.message && block.data.message.trim() !== "")
          );
        case "code":
          return block.data.code && block.data.code.trim() !== "";
        case "delimiter":
          return true; // Delimiter is content by itself
        case "image":
          return block.data.url && block.data.url.trim() !== "";
        case "embed":
          return block.data.source && block.data.source.trim() !== "";
        case "table":
          return (
            block.data.content &&
            Array.isArray(block.data.content) &&
            block.data.content.some((row: string[]) =>
              row.some((cell: string) => cell && cell.trim() !== "")
            )
          );
        default:
          return true; // For unknown block types, assume they have content
      }
    });
  }

  return false;
};

const initialValues: Partial<CmsFormValues> = {
  title: "",
  content: {
    time: Date.now(),
    blocks: [],
    version: "2.28.2",
  },
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
    defaultValues: defaultValues || initialValues,
  });

  useEffect(() => {
    if (defaultValues) {
      setFormValues<CmsFormValues>(defaultValues, initialValues, setValue);

      // If content_type is TEXT and content is available, ensure it's properly formatted for EditorJS
      if (defaultValues.content_type === "TEXT" && defaultValues.content) {
        let contentValue = defaultValues.content;

        // If it's a string, try to parse it as JSON (for EditorJS format)
        if (typeof contentValue === "string") {
          try {
            const parsed = JSON.parse(contentValue);
            // If it's EditorJS format, use it directly
            if (parsed && parsed.blocks && Array.isArray(parsed.blocks)) {
              contentValue = parsed;
            } else {
              // Convert plain text to EditorJS format
              contentValue = {
                time: Date.now(),
                blocks: [
                  {
                    type: "paragraph",
                    data: { text: parsed || contentValue },
                  },
                ],
                version: "2.28.2",
              };
            }
          } catch (e) {
            // If parsing fails, treat as plain text and convert to EditorJS format
            contentValue = {
              time: Date.now(),
              blocks: [
                {
                  type: "paragraph",
                  data: { text: contentValue },
                },
              ],
              version: "2.28.2",
            };
          }
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
        let parsedData = content || "";

        // Handle EditorJS format
        if (content && isValidJsonString(content)) {
          try {
            const parsed = JSON.parse(content);
            if (parsed && parsed.blocks && Array.isArray(parsed.blocks)) {
              parsedData = parsed;
            } else {
              // Convert plain text to EditorJS format
              parsedData = {
                time: Date.now(),
                blocks: [
                  {
                    type: "paragraph",
                    data: { text: parsed },
                  },
                ],
                version: "2.28.2",
              };
            }
          } catch (e) {
            // Convert plain text to EditorJS format
            parsedData = {
              time: Date.now(),
              blocks: [
                {
                  type: "paragraph",
                  data: { text: content },
                },
              ],
              version: "2.28.2",
            };
          }
        } else if (typeof content === "string" && content.trim()) {
          // Convert plain text to EditorJS format
          parsedData = {
            time: Date.now(),
            blocks: [
              {
                type: "paragraph",
                data: { text: content },
              },
            ],
            version: "2.28.2",
          };
        }

        setValue("content", parsedData);
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

  // Handle content change for EditorJS
  const handleEditorJSChange = (data: EditorJSData) => {
    // Clear errors when user has valid content
    if (hasEditorJSContent(data) && errors.content) {
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
            value={
              (typeof watch("content") === "string" ? watch("content") : "") ||
              ""
            }
            onChange={handleLinkContentChange}
            isInvalid={!!errors.content}
            feedback={errors.content?.message as string}
            placeholder="Enter URL or link content"
          />
        ) : (
          <Controller
            name="content"
            control={control}
            defaultValue={parsedContent || ""}
            rules={{
              validate: (value: any) => {
                const currentContentType = watch("content_type");

                if (currentContentType === "LINK") {
                  return (
                    (value &&
                      typeof value === "string" &&
                      value.trim() !== "") ||
                    t("form.contentRequired")
                  );
                }

                // For TEXT (EditorJS) content
                return hasEditorJSContent(value) || t("form.contentRequired");
              },
            }}
            render={({ field, fieldState }) => (
              <EditorJS
                data={field.value || undefined}
                onChange={(data: EditorJSData) => {
                  field.onChange(data);
                  handleEditorJSChange(data);
                }}
                placeholder="Type / for commands"
                isInvalid={!!fieldState.error}
                error={fieldState.error?.message}
                minHeight={300}
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
          <Button
            variant="secondary"
            onClick={onCancel}
            type="button"
            disabled={isLoading}
          >
            {t("cancel")}
          </Button>
        )}
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting || isLoading}
        >
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
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
