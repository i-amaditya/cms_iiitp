import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Pagination as PaginationType } from '../api/types';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (newPage: number) => void;
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  disabled = false,
}) => {
  const { page, totalPages, total, limit } = pagination;

  if (totalPages <= 1 && total <= limit) {
    return null;
  }

  const start = Math.min((page - 1) * limit + 1, total);
  const end = Math.min(page * limit, total);

  return (
    <div className="pagination-bar">
      <div className="pagination-info">
        Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{total}</strong> records
      </div>

      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-btn"
          disabled={page <= 1 || disabled}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        <span className="pagination-current">
          Page <strong>{page}</strong> of <strong>{totalPages || 1}</strong>
        </span>

        <button
          type="button"
          className="pagination-btn"
          disabled={page >= totalPages || disabled}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next Page"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
