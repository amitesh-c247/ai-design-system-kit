'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Table from '@/components/common/Table';
import CardWrapper from '@/components/common/CardWrapper';
import { handleDeleteAction } from '@/utils/deleteHandler';
import { Toast, ToastContainer } from 'react-bootstrap';
import { usePagesQuery, useDeletePageMutation } from '@/hooks/cms';

import { type Page } from '@/services/cms';
import { Pencil, Trash2 } from 'lucide-react';
import styles from './styles.module.scss';

const CmsPagesComponent: React.FC = () => {
  const tCommon = useTranslations('common');
  const tCms = useTranslations('cms');
  const router = useRouter();
  
  // React Query hooks
  const { data: pages = [], isLoading: loading, error } = usePagesQuery();
  const deletePageMutation = useDeletePageMutation();
  
  // Local state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    variant: 'success' | 'danger';
  }>({ show: false, message: '', variant: 'success' });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);



  // Sort pages by creation date (newest first)
  const sortedPages = [...pages].sort((a: Page, b: Page) => {
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleOpenAddPage = () => {
    router.push('/cms/add');
  };

  const handleEdit = (page: Page) => {
    router.push(`/cms/${page.id}/edit`);
  };

  const handleDelete = (id: string) =>
    handleDeleteAction({
      id,
      mutation: (id: string | number) => deletePageMutation.mutateAsync(String(id)),
      t: tCms,
      setToast,
      confirmTitle: tCms('confirmDelete'),
      confirmButtonText: tCms('delete'),
      cancelButtonText: tCms('cancel'),
      successMessage: tCms('messages.cmsDeleted'),
      errorMessage: tCms('messages.errorDeleting'),
    });

  // Pagination logic
  const total = sortedPages.length;
  const pagedPages = sortedPages.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Table columns
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      render: (slug: string) => <code>/{slug}</code>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status: Page['status']) => (
        <span className={`badge bg-${status === 'published' ? 'success' : status === 'draft' ? 'warning' : 'secondary'}`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      render: (createdAt: string) => {
        if (!createdAt) return '-';
        const date = new Date(createdAt);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      },
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      render: (_: any, record: Page) => (
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
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <CardWrapper
      title={tCms('pagesTitle')}
      onCreate={handleOpenAddPage}
      createButtonText={tCms('addPage')}
    >
      {error && (
        <div className="alert alert-danger" role="alert">
          {tCms('messages.errorLoading')}
        </div>
      )}
      
      <Table
        columns={columns}
        dataSource={pagedPages}
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

      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast bg={toast.variant} onClose={() => setToast({ ...toast, show: false })} show={toast.show} delay={3000} autohide>
          <Toast.Body style={{ color: toast.variant === "danger" ? "#fff" : undefined }}>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </CardWrapper>
  );
};

export default CmsPagesComponent; 