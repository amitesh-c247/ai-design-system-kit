"use client";

import React from "react";
import CmsForm from "@/components/common/CmsForm";
import type { CmsFormValues } from "@/components/common/CmsForm";
import { useUpdateCmsMutation, useCmsPageQuery } from "@/hooks/cms";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CardWrapper from '@/components/common/CardWrapper';
import { Toast, ToastContainer } from "react-bootstrap";

export default function CmsEditPage() {
  const t = useTranslations("cms");
  const router = useRouter();
  const params = useParams();
  const slug = typeof params?.id === 'string' ? params.id : undefined;
  if (!slug) return null;
  const { data, isLoading, error } = useCmsPageQuery(slug);
  const { mutateAsync: updateCms } = useUpdateCmsMutation();
  const [toast, setToast] = React.useState<{ show: boolean; message: string; variant: "success" | "danger" }>({ show: false, message: "", variant: "success" });

  const handleFormSubmit = async (formData: CmsFormValues) => {
    try {
      await updateCms({ id: data?.data?.id, data: formData });
      setToast({ show: true, message: t('messages.cmsUpdated'), variant: 'success' });
      setTimeout(() => router.push('/cms'), 1000);
    } catch (err: any) {
      setToast({ show: true, message: err?.message || t('messages.error'), variant: 'danger' });
    }
  };

  const handleCancel = () => router.push('/cms');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{t('messages.error')}</div>;

  return (
    <CardWrapper title={t("editCms")}> 
      <CmsForm onSubmit={handleFormSubmit} defaultValues={data?.data} onCancel={handleCancel} />
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast bg={toast.variant} onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={3000} autohide>
          <Toast.Body style={{ color: toast.variant === "danger" ? "#fff" : undefined }}>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </CardWrapper>
  );
} 