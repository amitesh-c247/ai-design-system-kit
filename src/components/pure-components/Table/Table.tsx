import React from "react";
import { Table as BootstrapTable, Pagination, Spinner } from "react-bootstrap";
import type {
  TableColumn,
  TableProps as CentralizedTableProps,
} from "@/types/ui";
import TableSkeleton from "./TableSkeleton";
import PrevArrowIcon from "@public/IconComponent/PrevArrowIcon";
import NextArrowIcon from "@public/IconComponent/NextArrowIcon";
import Button from "@/components/pure-components/Button";

// Keep existing Column interface for backward compatibility
export interface Column {
  dataIndex: string;
  title: string;
  key?: string;
  render?: (text: any, record: any) => React.ReactNode;
}

// Enhanced interface using centralized types
export interface TableProps {
  columns: Column[];
  dataSource: any[];
  rowKey: string;
  className?: string;
  bordered?: boolean;
  striped?: boolean;
  hover?: boolean;
  size?: "sm" | "lg";
  variant?: string;
  pagination?: {
    currentPage: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
  };
  loading?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  rowKey,
  className = "",
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

    const { currentPage, pageSize, total, onChange, onPageSizeChange } =
      pagination;
    const totalPages = Math.ceil(total / pageSize);
    if (totalPages <= 1) return null;

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, total);

    return (
      <div className="pagination-table-bottom pt-3">
        <span style={{ fontWeight: 500 }}>Go to page</span>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={currentPage}
          onChange={(e) => {
            const page = Math.max(
              1,
              Math.min(totalPages, Number(e.target.value))
            );
            onChange(page);
          }}
          className="form-control"
        />

        <span style={{ fontWeight: 500 }}>Per page</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          className="form-select"
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <span style={{ fontWeight: 500 }}>
          {start} - {end} of {total}
        </span>

        <Button
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            // backgroundColor: currentPage === 1 ? '#60a5fa' : '#60a5fa',
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
          className="btn d-flex align-items-center justify-content-center p-0 border-0"
          variant="primary"
        >
          <PrevArrowIcon />
        </Button>

        <Button
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            // backgroundColor: currentPage === totalPages ? '#dbeafe' : '#60a5fa',
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
          className="btn d-flex align-items-center justify-content-center p-0 border-0"
          variant="primary"
        >
          <NextArrowIcon />
        </Button>
      </div>
    );
  };

  return (
    <>
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
          {loading && dataSource.length === 0 ? (
            <TableSkeleton columns={columns.length} rows={8} />
          ) : (
            <>
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
            </>
          )}
        </tbody>
      </BootstrapTable>
      {renderPagination()}
    </>
  );
};

export default Table;
