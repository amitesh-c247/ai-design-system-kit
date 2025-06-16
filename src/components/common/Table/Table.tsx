import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

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
}) => {
  return (
    <BootstrapTable
      className={className}
      bordered={bordered}
      striped={striped}
      hover={hover}
      size={size}
      variant={variant}
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
  );
};

export default Table; 