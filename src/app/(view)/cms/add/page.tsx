"use client";

import React, { useEffect, useState } from "react";
import CmsForm from "@/components/common/CmsForm";
import type { CmsFormValues } from "@/components/common/CmsForm";
import { useCreateCmsMutation, useUpdateCmsMutation } from "@/hooks/useCmsCrud";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CardWrapper from '@/components/common/CardWrapper';
import { Toast, ToastContainer } from "react-bootstrap";

export default function CmsAddPage() {
  const t = useTranslations("cms");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { mutateAsync: createCms } = useCreateCmsMutation();
  const { mutateAsync: updateCms } = useUpdateCmsMutation();
  const [toast, setToast] = React.useState<{ show: boolean; message: string; variant: "success" | "danger" }>({ show: false, message: "", variant: "success" });
  const [defaultValues, setDefaultValues] = useState<Partial<CmsFormValues> | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined' && id) {
      // Try to get state from history (edit case)
      const state = window.history.state && window.history.state.usr;
      if (state) {
        setDefaultValues(state);
      }
    }
  }, [id]);

  const handleFormSubmit = async (data: CmsFormValues) => {
    try {
      if (id && defaultValues) {
        await updateCms({ id: Number(id), data });
        setToast({ show: true, message: t('messages.cmsUpdated'), variant: 'success' });
      } else {
        await createCms({ ...data, _method: "post" });
        setToast({ show: true, message: t('messages.cmsCreated'), variant: 'success' });
      }
      setTimeout(() => router.push('/cms'), 1000);
    } catch (err: any) {
      setToast({ show: true, message: err?.message || t('messages.error'), variant: 'danger' });
    }
  };

  return (
    <CardWrapper title={id ? t("editCms") : t("createNewCms")}> 
      <CmsForm onSubmit={handleFormSubmit} defaultValues={defaultValues} />
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast bg={toast.variant} onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={3000} autohide>
          <Toast.Body style={{ color: toast.variant === "danger" ? "#fff" : undefined }}>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </CardWrapper>
  );
} 