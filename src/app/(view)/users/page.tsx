"use client";

import React, { useState } from "react";
import Table from "@/components/common/Table";
import CommonModal from "@/components/common/Modal";
import UserForm, { UserFormValues } from "@/components/common/UserForm";
import type { TableColumn } from "@/types/ui";
import {
  useUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/hooks/user";
import { useStandardPagination } from "@/hooks/usePagination";
import { useTranslations } from "next-intl";
import { Toast, ToastContainer } from "react-bootstrap";
import styles from "./styles.module.scss";
import { Trash2, Pencil, Search } from "lucide-react";
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
  
  // Use the pagination hook for URL state management
  const { params: pagination, setPage, setPageSize, setSearch } = useStandardPagination({
    defaultPageSize: 10,
  });

  // Fetch users with current pagination state
  const { data, isLoading } = useUsersQuery(
    pagination.page, 
    pagination.pageSize, 
    pagination.search
  );

  const users = data?.data || [];
  const total = data?.total || 0;
  const { mutateAsync: createUser } = useCreateUserMutation();
  const { mutateAsync: deleteUser } = useDeleteUserMutation();
  const { mutateAsync: updateUser } = useUpdateUserMutation();
  const [editId, setEditId] = useState<number | null>(null);

  const handleDelete = (id: number) =>
    handleDeleteAction({
      id,
      mutation: (id: string | number) => deleteUser(Number(id)),
      t,
      setToast,
    });

  const columns: TableColumn<User>[] = [
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
        await createUser(data);
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
      {/* Search Input */}
      <div className="mb-3">
        <div className="input-group" style={{ maxWidth: '400px' }}>
          <span className="input-group-text">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder={t("searchPlaceholder") || "Search users..."}
            value={pagination.search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {pagination.search && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setSearch("")}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        hover
        pagination={{
          currentPage: pagination.page,
          pageSize: pagination.pageSize,
          total,
          onChange: setPage,
          onPageSizeChange: setPageSize,
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
