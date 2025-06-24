import React, { useId } from 'react'
import ContentLoader from 'react-content-loader'

const Loader = () => {
  const random = Math.random() * (1 - 0.7) + 0.7
  return (
    <ContentLoader
      height={24}
      width="100%"
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      uniqueKey={useId()}
    >
      <rect x="0" y="4" rx="4" ry="4" width={`${random * 80}%`} height="16" />
    </ContentLoader>
  )
}

interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

const TableSkeleton = ({ columns, rows = 8 }: TableSkeletonProps) => (
  <>
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <tr key={rowIdx}>
        {Array.from({ length: columns }).map((_, colIdx) => (
          <td
            key={colIdx}
            style={{ padding: '8px 16px', verticalAlign: 'middle', backgroundColor: '#fff' }}
          >
            <Loader />
          </td>
        ))}
      </tr>
    ))}
  </>
)

export default TableSkeleton
