"use client";
import React, { useState } from "react";
import Table from "@/components/common/Table";
import CardWrapper from "@/components/common/CardWrapper";
import Modal from "@/components/common/Modal";
import Input from "@/components/common/Form/Input";
import TextArea from "@/components/common/Form/Input/TextArea";
import { Form, FormGroup, FormLabel } from "@/components/common/Form";
import { type Faq as FaqType } from "@/services/faq";
import { handleDeleteAction } from "@/utils/deleteHandler";
import {
  useFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "@/hooks/faq";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Toast, ToastContainer } from "react-bootstrap";
import Button from "@/components/common/Button";
import ActionButton from "@/components/common/ActionButton";

const FaqComponent: React.FC = () => {
  const tCommon = useTranslations("common");
  const t = useTranslations("faq");

  // React Query hooks
  const { data: faqs = [], isLoading: loading, error } = useFaqsQuery();
  const createFaqMutation = useCreateFaqMutation();
  const updateFaqMutation = useUpdateFaqMutation();
  const deleteFaqMutation = useDeleteFaqMutation();

  // Local state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    variant: "success" | "danger";
  }>({ show: false, message: "", variant: "success" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const submitting = createFaqMutation.isPending || updateFaqMutation.isPending;

  const handleOpenModal = () => {
    setForm({ title: "", description: "" });
    setEditingId(null);
    setShowModal(true);
  };

  const handleEdit = (faq: FaqType) => {
    setForm({ title: faq.title, description: faq.description });
    setEditingId(faq.id);
    setShowModal(true);
  };

  const handleDelete = (id: string) =>
    handleDeleteAction({
      id,
      mutation: deleteFaqMutation.mutateAsync,
      t,
      setToast,
      confirmTitle: t("confirmDelete"),
      confirmText: t("confirmText"),
      confirmButtonText: t("delete"),
      cancelButtonText: t("cancel"),
      successMessage: t("messages.faqDeleted"),
      errorMessage: t("messages.errorDeleting"),
    });

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({ title: "", description: "" });
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateFaqMutation.mutateAsync({ id: editingId, data: form })
        setToast({
          show: true,
          message: t('messages.faqUpdated'),
          variant: 'success',
        })
      } else {
        await createFaqMutation.mutateAsync(form)
        setToast({
          show: true,
          message: t('messages.faqCreated'),
          variant: 'success',
        })
      }
      setShowModal(false)
      setEditingId(null)
      setForm({ title: '', description: '' })
    } catch {
      setToast({
        show: true,
        message: t('messages.errorSaving'),
        variant: 'danger',
      })
    }
  }

  // Pagination logic
  const total = faqs.length;
  const pagedFaqs = faqs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Description", dataIndex: "description" },
    {
      title: "Actions",
      dataIndex: "id",
      render: (_: any, record: FaqType) => (
        <>
          <div className="action-wrap">
            <ActionButton
              title=""
              icon={<Pencil width={16} />}
              variant="primary"
              size="sm"
              tooltip={t("edit")}
              onClick={() => {
                handleEdit(record)
              }}
            />
            <ActionButton
              title=""
              icon={<Trash2 width={16} />}
              variant="danger"
              size="sm"
              tooltip={t("delete")}
              onClick={() => handleDelete(record.id)}
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <CardWrapper
      title={t("faqTitle")}
      onCreate={handleOpenModal}
      createButtonText={t("addFaq")}
    >
      {error && (
        <div className="alert alert-danger" role="alert">
          {t("messages.errorLoading")}
        </div>
      )}

      <Table
        columns={columns}
        dataSource={pagedFaqs}
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
        loading={loading}
      />
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title={editingId ? t("editFaq") : t("addFaq")}
        footer={null}
      >
        <Form onSubmit={handleFormSubmit}>
          <FormGroup>
            <FormLabel>{t("title")}</FormLabel>
            <Input
              name="title"
              placeholder={t("title")}
              value={form.title}
              onChange={handleFormChange}
              required
              disabled={submitting}
              autoFocus
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>{t("description")}</FormLabel>
            <TextArea
              name="description"
              placeholder={t("description")}
              value={form.description}
              onChange={handleFormChange}
              required
              disabled={submitting}
              rows={4}
            />
          </FormGroup>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button
              variant="secondary"
              type="button"
              onClick={handleCloseModal}
            >
              {tCommon("actions.cancel", { default: t("cancel") })}
            </Button>
            <Button variant="primary" type="submit">
              {editingId ? t("update") : t("save")}
            </Button>
          </div>
        </Form>
      </Modal>
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
};

export default FaqComponent;
