import React from 'react';
import { Table as BootstrapTable, Pagination, Spinner } from 'react-bootstrap';

export interface Column {
  dataIndex: string;
  title: string;
  key?: string;
  render?: (text: any, record: any) => React.ReactNode;
}

export interface TableProps {
  columns: Column[];
  dataSource: any[];
  rowKey: string;
  className?: string;
  bordered?: boolean;
  striped?: boolean;
  hover?: boolean;
  size?: 'sm' | 'lg';
  variant?: string;
  pagination?: {
    currentPage: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
  loading?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  rowKey,
  className = '',
  bordered = false,
  striped = false,
  hover = false,
  size,
  variant,
  pagination,
  loading = false,
}) => {
  const renderPagination = () => {
    if (!pagination) return null;
    const { currentPage, pageSize, total, onChange } = pagination;
    const totalPages = Math.ceil(total / pageSize);
    if (totalPages <= 1) return null;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, alignItems: 'center', gap: 12 }}>
        <Pagination style={{ marginBottom: 0 }}>
          <Pagination.Prev onClick={() => onChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} />
        </Pagination>
        <span style={{ minWidth: 32, textAlign: 'center', fontWeight: 500 }}>{currentPage}</span>
        <Pagination style={{ marginBottom: 0 }}>
          <Pagination.Next onClick={() => onChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <BootstrapTable
        className={className}
        bordered={bordered}
        striped={striped}
        hover={hover}
        size={size}
        variant={variant}
        style={{ opacity: loading ? 0.5 : 1 }}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key || column.dataIndex}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((record) => (
            <tr key={record[rowKey]}>
              {columns.map((column) => (
                <td key={`${record[rowKey]}-${column.dataIndex}`}>
                  {column.render
                    ? column.render(record[column.dataIndex], record)
                    : record[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </BootstrapTable>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.6)',
          zIndex: 2,
        }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {renderPagination()}
    </div>
  );
};

export default Table; 