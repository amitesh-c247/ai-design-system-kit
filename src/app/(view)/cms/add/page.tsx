"use client";

import React, { useEffect, useState } from "react";
import CmsForm from "@/components/cms/CmsForm";
import type { CmsFormValues } from "@/components/cms/CmsForm";
import { cmsService } from "@/services/cms";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CardWrapper from "@/components/pure-components/CardWrapper";
import { Toast, ToastContainer } from "react-bootstrap";

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

export default function CmsAddPage() {
  const t = useTranslations("cms");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [toast, setToast] = React.useState<{
    show: boolean;
    message: string;
    variant: "success" | "danger";
  }>({ show: false, message: "", variant: "success" });
  const [defaultValues, setDefaultValues] = useState<
    Partial<CmsFormValues> | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      if (id) {
        try {
          setLoading(true);
          const page = await cmsService.getPage(id);
          if (page) {
            // Parse content if it's a JSON string (for backward compatibility with EditorJS)
            let parsedContent = page.content;
            try {
              // Check if content is a JSON string and parse it
              if (
                typeof page.content === "string" &&
                page.content.startsWith("{")
              ) {
                const parsed = JSON.parse(page.content);
                // If it's EditorJS format, convert to HTML
                if (parsed && parsed.blocks && Array.isArray(parsed.blocks)) {
                  parsedContent = convertEditorJSToHTML(parsed);
                } else {
                  parsedContent = parsed;
                }
              }
            } catch (e) {
              console.warn(
                "Failed to parse content as JSON, using as string:",
                e
              );
            }

            setDefaultValues({
              title: page.title,
              content: parsedContent,
              status: page.status === "published" ? "PUBLISHED" : "DRAFT",
              is_agreement: page.isAgreement ? 1 : 0,
              open_in_new_tab: page.openInNewTab ? 1 : 0,
              content_type: page.contentType === "LINK" ? "LINK" : "TEXT",
              slug: page.slug,
            });
          }
        } catch (err) {
          setToast({
            show: true,
            message: t("messages.error"),
            variant: "danger",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPage();
  }, [id, t]);

  const handleCancel = () => router.push("/cms");

  const handleFormSubmit = async (data: CmsFormValues) => {
    try {
      setLoading(true);

      // Convert form data to service format
      const pageData = {
        title: data.title,
        content:
          typeof data.content === "string"
            ? data.content
            : JSON.stringify(data.content),
        slug: data.slug,
        status:
          data.status === "PUBLISHED"
            ? ("published" as const)
            : ("draft" as const),
        metaTitle: "",
        metaDescription: "",
        isAgreement: Boolean(data.is_agreement),
        openInNewTab: Boolean(data.open_in_new_tab),
        contentType: data.content_type,
      };

      if (id && defaultValues) {
        await cmsService.updatePage(id, pageData);
        setToast({
          show: true,
          message: t("messages.cmsUpdated"),
          variant: "success",
        });
      } else {
        await cmsService.createPage(pageData);
        setToast({
          show: true,
          message: t("messages.cmsCreated"),
          variant: "success",
        });
      }

      setTimeout(() => router.push("/cms"), 1000);
    } catch (err: any) {
      setToast({
        show: true,
        message: err?.message || t("messages.error"),
        variant: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return (
      <CardWrapper title={t("editCms")}>
        <div className="d-flex justify-content-center p-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper title={id ? t("editCms") : t("createNewCms")}>
      <CmsForm
        onSubmit={handleFormSubmit}
        defaultValues={defaultValues}
        onCancel={handleCancel}
        isLoading={loading}
      />
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 9999 }}
      >
        <Toast
          bg={toast.variant}
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
        >
          <Toast.Body
            style={{ color: toast.variant === "danger" ? "#fff" : undefined }}
          >
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </CardWrapper>
  );
}
