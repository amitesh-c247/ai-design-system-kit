"use client";

import React, { useEffect, useState } from "react";
import CmsForm from "@/components/cms/CmsForm";
import type { CmsFormValues } from "@/components/cms/CmsForm";
import { cmsService } from "@/services/cms";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CardWrapper from "@/components/pure-components/CardWrapper";
import { Toast, ToastContainer } from "react-bootstrap";

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
            // Parse content if it's a JSON string (for EditorJS)
            let parsedContent = page.content;
            try {
              // Check if content is a JSON string and parse it
              if (
                typeof page.content === "string" &&
                page.content.startsWith("{")
              ) {
                parsedContent = JSON.parse(page.content);
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
              is_agreement: page.is_agreement || 0,
              open_in_new_tab: page.open_in_new_tab || 0,
              content_type: page.content_type || "TEXT",
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
        meta_title: "",
        meta_description: "",
        is_agreement: data.is_agreement,
        open_in_new_tab: data.open_in_new_tab,
        content_type: data.content_type,
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
