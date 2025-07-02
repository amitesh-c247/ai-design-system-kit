"use client";

import React, { useEffect, useState } from "react";
import CmsForm from "@/components/common/CmsForm";
import type { CmsFormValues } from "@/components/common/CmsForm";
import { cmsService, type Page } from "@/services/cms";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CardWrapper from '@/components/common/CardWrapper';
import { Toast, ToastContainer } from "react-bootstrap";

export default function CmsEditPage() {
  const t = useTranslations("cms");
  const router = useRouter();
  const params = useParams();
  const slug = typeof params?.id === 'string' ? params.id : undefined;
  
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = React.useState<{ show: boolean; message: string; variant: "success" | "danger" }>({ show: false, message: "", variant: "success" });

  useEffect(() => {
    const fetchPage = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const fetchedPage = await cmsService.getPage(slug);
        if (fetchedPage) {
          setPage(fetchedPage);
        } else {
          setError('Page not found');
        }
      } catch (err) {
        setError(t('messages.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug, t]);

  const handleFormSubmit = async (formData: CmsFormValues) => {
    if (!page) return;
    
    try {
      setSaving(true);
      
      // Convert form data to service format
      const pageData = {
        title: formData.title,
        content: typeof formData.content === 'string' ? formData.content : JSON.stringify(formData.content),
        slug: formData.slug,
        status: formData.status === 'PUBLISHED' ? 'published' as const : 'draft' as const,
        meta_title: '',
        meta_description: '',
        is_agreement: formData.is_agreement,
        open_in_new_tab: formData.open_in_new_tab,
        content_type: formData.content_type,
      };

      await cmsService.updatePage(page.id, pageData);
      setToast({ show: true, message: t('messages.cmsUpdated'), variant: 'success' });
      setTimeout(() => router.push('/cms'), 1000);
    } catch (err: any) {
      setToast({ show: true, message: err?.message || t('messages.error'), variant: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => router.push('/cms');

  if (!slug) return null;
  
  if (loading) return (
    <CardWrapper title={t("editCms")}>
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </CardWrapper>
  );
  
  if (error) return (
    <CardWrapper title={t("editCms")}>
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </CardWrapper>
  );

  if (!page) return (
    <CardWrapper title={t("editCms")}>
      <div className="alert alert-warning" role="alert">
        Page not found
      </div>
    </CardWrapper>
  );

  // Convert page data to form format
  // Parse content if it's a JSON string (for EditorJS)
  let parsedContent = page.content;
  try {
    // Check if content is a JSON string and parse it
    if (typeof page.content === 'string' && page.content.startsWith('{')) {
      parsedContent = JSON.parse(page.content);
    }
  } catch (e) {
    console.warn('Failed to parse content as JSON, using as string:', e);
  }

  const defaultValues: Partial<CmsFormValues> = {
    title: page.title,
    content: parsedContent,
    status: page.status === 'published' ? 'PUBLISHED' : 'DRAFT',
    is_agreement: page.is_agreement || 0,
    open_in_new_tab: page.open_in_new_tab || 0,
    content_type: page.content_type || 'TEXT',
    slug: page.slug,
  };

  return (
    <CardWrapper title={t("editCms")}> 
      <CmsForm 
        onSubmit={handleFormSubmit} 
        defaultValues={defaultValues} 
        onCancel={handleCancel}
        isLoading={saving}
      />
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast bg={toast.variant} onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={3000} autohide>
          <Toast.Body style={{ color: toast.variant === "danger" ? "#fff" : undefined }}>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </CardWrapper>
  );
} 