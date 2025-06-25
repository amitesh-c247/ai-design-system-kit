"use client"
import React, { useEffect, useState } from 'react';
import Table from '@/components/common/Table';
import CardWrapper from '@/components/common/CardWrapper';
import Modal from '@/components/common/Modal';
import Toast from '@/components/common/Toast';
import Input from '@/components/common/Form/Input';
import TextArea from '@/components/common/Form/Input/TextArea';
import { Form, FormGroup, FormLabel } from "@/components/common/Form";
import { faqService, type Faq as FaqType } from '@/services/faq';
import { Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const FaqComponent: React.FC = () => {
  const tCommon = useTranslations('common');
  const tFaq = useTranslations('faq');
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; variant: 'success' | 'danger' }>({ show: false, message: '', variant: 'success' });
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await faqService.getFaqs();
      setFaqs(data);
    } catch {
      setError('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setForm({ title: '', description: '' });
    setEditingId(null);
    setShowModal(true);
  };

  const handleEdit = (faq: FaqType) => {
    setForm({ title: faq.title, description: faq.description });
    setEditingId(faq.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    setSubmitting(true);
    try {
      await faqService.deleteFaq(id);
      setToast({ show: true, message: 'FAQ deleted successfully', variant: 'success' });
      fetchFaqs();
    } catch {
      setToast({ show: true, message: 'Failed to delete FAQ', variant: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm({ title: '', description: '' });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        await faqService.updateFaq(editingId, form);
        setToast({ show: true, message: 'FAQ updated successfully', variant: 'success' });
      } else {
        await faqService.createFaq(form);
        setToast({ show: true, message: 'FAQ added successfully', variant: 'success' });
      }
      setShowModal(false);
      setEditingId(null);
      setForm({ title: '', description: '' });
      fetchFaqs();
    } catch {
      setToast({ show: true, message: 'Failed to save FAQ', variant: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  // Pagination logic
  const total = faqs.length;
  const pagedFaqs = faqs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    { title: 'Title', dataIndex: 'title' },
    { title: 'Description', dataIndex: 'description' },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (_: any, record: FaqType) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            style={{ color: '#0d6efd', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => handleEdit(record)}
            title="Edit"
            aria-label="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            style={{ color: '#dc3545', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => handleDelete(record.id)}
            title="Delete"
            aria-label="Delete"
            disabled={submitting}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <CardWrapper
      title={tFaq('faqTitle')}
      onCreate={handleOpenModal}
      createButtonText={tFaq('addFaq')}
    >
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
            setPageSize(size)
            setCurrentPage(1)
          },
        }}
        loading={loading}
      />
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title={editingId ? tFaq('editFaq') : tFaq('addFaq')}
        footer={null}
        size="lg"
      >
        <Form onSubmit={handleFormSubmit}>
          <FormGroup>
            <FormLabel>{tFaq('title')}</FormLabel>
            <Input
              name="title"
              placeholder={tFaq('title')}
              value={form.title}
              onChange={handleFormChange}
              required
              disabled={submitting}
              autoFocus
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>{tFaq('description')}</FormLabel>
            <TextArea
              name="description"
              placeholder={tFaq('description')}
              value={form.description}
              onChange={handleFormChange}
              required
              disabled={submitting}
              rows={4}
            />
          </FormGroup>
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginTop: 16,
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
              disabled={submitting}
            >
              {tCommon('actions.cancel', { default: tFaq('cancel') })}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {editingId ? tFaq('update') : tFaq('save')}
            </button>
          </div>
        </Form>
      </Modal>
      {toast.show && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
          <div className={`alert alert-${toast.variant}`}>{toast.message}</div>
        </div>
      )}
    </CardWrapper>
  )
};

export default FaqComponent;