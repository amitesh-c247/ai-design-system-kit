"use client";

import React, { useState } from "react";
import Table from "@/components/pure-components/Table";
import CommonModal from "@/components/pure-components/Modal";
import UserForm, { UserFormValues } from "@/components/users/UserForm";
import type { UITableColumn } from "@/types/ui";
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
import { handleDeleteAction } from "@/types/utils/deleteHandler";
import CardWrapper from "@/components/pure-components/CardWrapper";
import ActionButton from "@/components/pure-components/ActionButton";
import { formatDate } from "@/types/utils/formatDate";

// Update User type to match new user object
type User = {
  id: string;
  name: string;
  email: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};

export default function UsersPage() {
  const t = useTranslations("users");
  const [showModal, setShowModal] = useState(false);
  // Remove make/short_code, use new user fields
  const [form, setForm] = useState<Partial<User>>({
    name: "",
    email: "",
    status: 0,
  });
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    variant: "success" | "danger";
  }>({ show: false, message: "", variant: "success" });

  // Use the pagination hook for URL state management
  const {
    params: pagination,
    setPage,
    setPageSize,
    setSearch,
  } = useStandardPagination({
    defaultPageSize: 10,
  });

  // Fetch users with current pagination state
  const { data, isLoading } = useUsersQuery(
    pagination.page,
    pagination.pageSize,
    pagination.search
  );

  const users = data?.users || [];
  const total = data?.total || 0;
  const { mutateAsync: createUser } = useCreateUserMutation();
  const { mutateAsync: deleteUser } = useDeleteUserMutation();
  const { mutateAsync: updateUser } = useUpdateUserMutation();
  const [editId, setEditId] = useState<number | null>(null);

  const handleDelete = (id: string) =>
    handleDeleteAction({
      id,
      mutation: (id: string | number) => deleteUser(id),
      t,
      setToast,
    });

  const columns: UITableColumn<User>[] = [
    { key: "name", title: t("name"), dataIndex: "name" },
    { key: "email", title: t("email"), dataIndex: "email" },
    {
      key: "status",
      title: t("status"),
      dataIndex: "status",
      render: (status: number) =>
        status === 0 ? t("statusOptions.active") : t("statusOptions.inactive"),
    },
    {
      key: "createdAt",
      title: t("createdAt"),
      dataIndex: "createdAt",
      render: (date: string) => formatDate(date, "YYYY-MM-DD HH:mm"),
    },
    {
      key: "updatedAt",
      title: t("updatedAt"),
      dataIndex: "updatedAt",
      render: (date: string) => formatDate(date, "YYYY-MM-DD HH:mm"),
    },
    {
      key: "actions",
      title: t("actions"),
      dataIndex: "id",
      render: (_: any, record: User) => (
        <div className="action-wrap">
          <ActionButton
            title=""
            icon={<Pencil width={16} />}
            variant="primary"
            size="sm"
            className={`text-white ${styles.actionLink}`}
            tooltip={t("edit")}
            onClick={() => {
              setEditId(record.id as any);
              setForm({
                name: record.name,
                email: record.email,
                status: record.status,
              });
              setShowModal(true);
            }}
          />
          <ActionButton
            title=""
            icon={<Trash2 width={16} />}
            variant="danger"
            size="sm"
            className={`text-white ${styles.actionLink}`}
            tooltip={t("delete")}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  // Update handleOpenModal to use new fields
  const handleOpenModal = () => {
    setForm({ name: "", email: "", status: 0 });
    setEditId(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Update handleFormSubmit to use new fields
  const handleFormSubmit = async (data: any) => {
    try {
      if (editId) {
        await updateUser({ id: editId, data });
        setToast({
          show: true,
          message: t("messages.userUpdated"),
          variant: "success",
        });
      } else {
        await createUser(data);
        setToast({
          show: true,
          message: t("messages.userCreated"),
          variant: "success",
        });
      }
      setShowModal(false);
      setEditId(null);
    } catch (err: any) {
      setToast({
        show: true,
        message: err?.message || t("messages.error"),
        variant: "danger",
      });
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
        <div className="input-group" style={{ maxWidth: "400px" }}>
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
