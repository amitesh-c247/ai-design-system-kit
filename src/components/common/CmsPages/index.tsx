'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Table from '@/components/common/Table';
import CardWrapper from '@/components/common/CardWrapper';

import { cmsService, type Page } from '@/services/cms';
import { Pencil, Trash2 } from 'lucide-react';
import styles from './styles.module.scss';

const CmsPagesComponent: React.FC = () => {
  const tCommon = useTranslations('common');
  const tCms = useTranslations('cms');
  const router = useRouter();
  
  // State management
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    variant: 'success' | 'danger';
  }>({ show: false, message: '', variant: 'success' });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const fetchPages = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await cmsService.getPages();
      // Sort pages by creation date (newest first)
      const sortedData = data.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setPages(sortedData);
    } catch {
      setError('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddPage = () => {
    router.push('/cms/add');
  };

  const handleEdit = (page: Page) => {
    router.push(`/cms/${page.id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    
    setSubmitting(true);
    try {
      await cmsService.deletePage(id);
      setToast({ show: true, message: 'Page deleted successfully', variant: 'success' });
      fetchPages();
    } catch {
      setToast({ show: true, message: 'Failed to delete page', variant: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  // Pagination logic
  const total = pages.length;
  const pagedPages = pages.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
      title={tCms('pagesTitle')}
      onCreate={handleOpenAddPage}
      createButtonText={tCms('addPage')}
    >
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
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

      {toast.show && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
          <div className={`alert alert-${toast.variant}`}>{toast.message}</div>
        </div>
      )}
    </CardWrapper>
  );
};

export default CmsPagesComponent; 