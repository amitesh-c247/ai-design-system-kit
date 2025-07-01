"use client";

import React, { useState, useEffect } from "react";
import Table from "@/components/common/Table";
import type { Column } from "@/components/common/Table/Table";
import CommonModal from "@/components/common/Modal";
import CmsForm from "@/components/common/CmsForm";
import type { CmsFormValues } from "@/components/common/CmsForm";
import { useTranslations } from "next-intl";
import { Toast, ToastContainer } from "react-bootstrap";
import styles from "./styles.module.scss";
import CardWrapper from '@/components/common/CardWrapper';
import { Trash2, Pencil } from "lucide-react";
import { useCmsQuery, useCreateCmsMutation, useDeleteCmsMutation, useUpdateCmsMutation } from "@/hooks/useCmsCrud";
import { formatDate } from '@/utils/formatDate';
import { useRouter } from "next/navigation";
import { handleDeleteAction } from "@/utils/deleteHandler";

export default function CmsPage() {
  const t = useTranslations("cms");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Partial<CmsFormValues> | undefined>(undefined);
  const [toast, setToast] = useState<{ show: boolean; message: string; variant: "success" | "danger" }>({ show: false, message: "", variant: "success" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useCmsQuery(currentPage, pageSize);
  const cmsPages = data?.data || [];
  const total = data?.total || 0;
  const { mutateAsync: createCms } = useCreateCmsMutation();
  const { mutateAsync: deleteCms } = useDeleteCmsMutation();
  const { mutateAsync: updateCms } = useUpdateCmsMutation();
  const router = useRouter();

  const columns: Column[] = [
    { title: t("pageTitle"), dataIndex: "title" },
    { title: t("slug"), dataIndex: "slug" },
    { title: t("lastModified"), dataIndex: "updated_at", render: (value: string) => formatDate(value) },
    { title: t("status"), dataIndex: "status" },
    {
      title: t("actions"),
      dataIndex: "id",
      render: (_: any, record: any) => (
        <div className={styles.actions}>
          <button
            className={styles.actionLink}
            style={{ color: '#0d6efd', background: 'none', border: 'none', marginRight: 8, cursor: 'pointer' }}
            onClick={() => router.push(`/cms/${record.slug}/edit`)}
            title={t('edit')}
            aria-label={t('edit')}
          >
            <Pencil size={18} />
          </button>
          <button
            className={styles.actionLink}
            style={{ color: '#dc3545', background: 'none', border: 'none', marginLeft: 8, cursor: 'pointer' }}
            onClick={() => handleDelete(record.id)}
            title={t('delete')}
            aria-label={t('delete')}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id: number) =>
    handleDeleteAction({
      id,
      mutation: deleteCms,
      t,
      setToast,
      confirmTitle: t('confirmDelete'),
      confirmButtonText: t('delete'),
      cancelButtonText: t('cancel'),
      successMessage: t('messages.cmsDeleted'),
      errorMessage: t('messages.error'),
    });

  const handleOpenModal = () => {
    setForm(undefined);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = async (data: CmsFormValues) => {
    try {
      if (form) {
        await updateCms({ id: form.id, data });
        setToast({ show: true, message: t('messages.cmsUpdated'), variant: 'success' });
      } else {
        await createCms({ ...data, _method: "post" });
        setToast({ show: true, message: t('messages.cmsCreated'), variant: 'success' });
      }
      setShowModal(false);
      setForm(undefined);
    } catch (err: any) {
      setToast({ show: true, message: err?.message || t('messages.error'), variant: 'danger' });
    }
  };

  return (
    <CardWrapper
      title={t("title")}
      onCreate={() => router.push('/cms/add')}
      createButtonText={t("createCms")}
    >
      <Table
        columns={columns}
        dataSource={cmsPages}
        rowKey="id"
        hover
        pagination={{
          currentPage,
          pageSize,
          total,
          onChange: setCurrentPage,
          onPageSizeChange: (size) => {
            setPageSize(size);
            setCurrentPage(1);
          },
        }}
        loading={isLoading}
      />
      <CommonModal
        show={showModal}
        onClose={handleCloseModal}
        title={t("editCms")}
      >
        <CmsForm
          defaultValues={form}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </CommonModal>
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast bg={toast.variant} onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={3000} autohide>
          <Toast.Body style={{ color: toast.variant === "danger" ? "#fff" : undefined }}>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </CardWrapper>
  );
} 