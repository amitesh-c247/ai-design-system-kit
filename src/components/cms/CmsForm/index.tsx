import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import Input from "@/components/pure-components/Form/Input";
import { useTranslations } from "next-intl";
import { isValidJsonString, setFormValues } from "@/utils/useSyncFormValues";
import dynamic from "next/dynamic";

import { Controller } from "react-hook-form";
import TipTapEditor from "@/components/pure-components/TipTapEditor";

export interface CmsFormValues {
  title: string;
  content: any; // Can be string (for LINK) or HTML string (for TEXT)
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

const TipTap = dynamic(
  () => import("@/components/pure-components/TipTapEditor"),
  {
    ssr: false,
  }
);

// Helper function to convert EditorJS format to HTML
const convertEditorJSToHTML = (editorJSData: any): string => {
  if (
    !editorJSData ||
    !editorJSData.blocks ||
    !Array.isArray(editorJSData.blocks)
  ) {
    return "";
  }

  return editorJSData.blocks
    .map((block: any) => {
      switch (block.type) {
        case "paragraph":
          return `<p>${block.data.text || ""}</p>`;
        case "header":
          const level = block.data.level || 1;
          return `<h${level}>${block.data.text || ""}</h${level}>`;
        case "list":
          const listType = block.data.style === "ordered" ? "ol" : "ul";
          const items = block.data.items || [];
          const listItems = items
            .map((item: string) => `<li>${item}</li>`)
            .join("");
          return `<${listType}>${listItems}</${listType}>`;
        case "quote":
          return `<blockquote><p>${block.data.text || ""}</p></blockquote>`;
        case "image":
          return `<img src="${block.data.url || ""}" alt="${
            block.data.caption || ""
          }" />`;
        case "code":
          return `<pre><code>${block.data.code || ""}</code></pre>`;
        default:
          return `<p>${block.data.text || ""}</p>`;
      }
    })
    .join("");
};

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

      // If content_type is TEXT and content is available, ensure it's properly formatted for TipTap
      if (defaultValues.content_type === "TEXT" && defaultValues.content) {
        let contentValue = defaultValues.content;

        // If it's a string, try to parse it as JSON (for backward compatibility with EditorJS)
        if (typeof contentValue === "string") {
          try {
            const parsed = JSON.parse(contentValue);
            // If it's EditorJS format, convert to HTML
            if (parsed && parsed.blocks && Array.isArray(parsed.blocks)) {
              contentValue = convertEditorJSToHTML(parsed);
            } else {
              contentValue = parsed;
            }
          } catch (e) {
            // If parsing fails, treat as plain text
            contentValue = contentValue;
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
        let parsedText = content || "";

        // Handle EditorJS format for backward compatibility
        if (content && isValidJsonString(content)) {
          try {
            const parsed = JSON.parse(content);
            if (parsed && parsed.blocks && Array.isArray(parsed.blocks)) {
              parsedText = convertEditorJSToHTML(parsed);
            } else {
              parsedText = parsed;
            }
          } catch (e) {
            parsedText = content;
          }
        }

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

  // Check if TipTap content has meaningful data
  const hasTipTapContent = (data: any): boolean => {
    if (!data) return false;

    // Handle string content (HTML)
    if (typeof data === "string") {
      // Remove HTML tags and check if there's actual text content
      const textContent = data.replace(/<[^>]*>/g, "").trim();
      return textContent !== "";
    }

    // Handle EditorJS format for backward compatibility
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
              block.data.items.some(
                (item: string) => item && item.trim() !== ""
              )
          );
        case "quote":
          return block.data.text && block.data.text.trim() !== "";
        case "image":
          return block.data.url && block.data.url.trim() !== "";
        case "code":
          return block.data.code && block.data.code.trim() !== "";
        default:
          return true; // For unknown block types, assume they have content
      }
    });
    }

    return false;
  };

  // Handle content change for TipTap
  const handleTipTapChange = (data: any) => {
    // Clear errors when user has valid content
    if (hasTipTapContent(data) && errors.content) {
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

                // For TEXT (TipTap) content
                return hasTipTapContent(value) || t("form.contentRequired");
              },
            }}
            render={({ field, fieldState }) => (
              <TipTapEditor
                name="content"
                defaultValue={field.value || ""}
                isInvalid={!!fieldState.error}
                feedback={fieldState.error?.message}
                onChange={(data) => {
                  field.onChange(data);
                  handleTipTapChange(data);
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
