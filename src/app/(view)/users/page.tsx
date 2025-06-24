"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Table from "@/components/common/Table";
import type { Column } from "@/components/common/Table/Table";
import CommonModal from "@/components/common/Modal";
import UserForm, { UserFormValues } from "@/components/common/UserForm";
import {
  useUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/hooks/useUserCrud";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Toast, ToastContainer } from "react-bootstrap";
import styles from "./styles.module.scss";
import commonStyles from "../../../../assets/scss/admin.module.scss"
import { Trash2, Pencil } from "lucide-react";
import { handleDeleteAction } from "@/utils/deleteHandler";
import CardWrapper from '@/components/common/CardWrapper';

type User = UserFormValues & { id: number };


export default function UsersPage() {
  const t = useTranslations("users");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{ make: string; short_code: string; status: 'ACTIVE' | 'DISABLED' }>({ make: '', short_code: '', status: 'ACTIVE' });
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    variant: "success" | "danger";
  }>({ show: false, message: "", variant: "success" });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useUsersQuery(currentPage, pageSize);


  const users = data?.data || [];
  const total = data?.total || 0;
  const { mutateAsync: createUser } = useCreateUserMutation();
  const { mutateAsync: deleteUser } = useDeleteUserMutation();
  const { mutateAsync: updateUser } = useUpdateUserMutation();
  const [editId, setEditId] = useState<number | null>(null);

  // Keep currentPage in sync with URL
  useEffect(() => {
    if (currentPage !== pageFromUrl) {
      router.replace(`?page=${currentPage}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // If the URL changes (e.g., back/forward), update currentPage
  useEffect(() => {
    if (pageFromUrl !== currentPage) {
      setCurrentPage(pageFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageFromUrl]);

  const handleDelete = (id: number) =>
    handleDeleteAction({
      id,
      mutation: deleteUser,
      t,
      setToast,
    });

  const columns: Column[] = [
    { title: t("make"), dataIndex: "make" },
    { title: t("short_code"), dataIndex: "short_code" },
    { title: t("status"), dataIndex: "status" },
    {
      title: t("actions"),
      dataIndex: "id",
      render: (_: any, record: User) => (
        <div className={styles.actions}>
          <button
            className={styles.actionLink}
            style={{ color: '#0d6efd', background: 'none', border: 'none', marginRight: 8, cursor: 'pointer' }}
            onClick={() => {
              setEditId(record.id);
              setForm({ make: record.make, short_code: record.short_code, status: record.status as 'ACTIVE' | 'DISABLED' });
              setShowModal(true);
            }}
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

  const handleOpenModal = () => {
    setForm({ make: '', short_code: '', status: 'ACTIVE' });
    setEditId(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = async (data: UserFormValues) => {
    try {
      if (editId) {
        await updateUser({ id: editId, data });
        setToast({ show: true, message: t('messages.userUpdated'), variant: 'success' });
      } else {
        await createUser({...data,_method:"post"});
        setToast({ show: true, message: t('messages.userCreated'), variant: 'success' });
      }
      setShowModal(false);
      setEditId(null);
    } catch (err: any) {
      setToast({ show: true, message: err?.message || t('messages.error'), variant: 'danger' });
    }
  };

  return (
    <CardWrapper
      title={t("title")}
      onCreate={handleOpenModal}
      createButtonText={t("createUser")}
    >
      <Table
        columns={columns}
        dataSource={users}
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
        title={editId ? t("editUser") : t("createNewUser")}
      >
        <UserForm
          defaultValues={form}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </CommonModal>
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
