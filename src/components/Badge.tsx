import React from 'react';
import { FacultyStatus } from '../types/index.ts';

interface BadgeProps {
  status: FacultyStatus | string;
  className?: string;
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  switch (status) {
    case 'PUBLISHED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Published
        </span>
      );
    case 'PENDING_APPROVAL':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          Pending Approval
        </span>
      );
    case 'DRAFT':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-300 dark:bg-slate-800 dark:text-slate-300 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Draft
        </span>
      );
    case 'REJECTED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Changes Requested
        </span>
      );
    case 'ARCHIVED':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-600 border border-zinc-300 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
          Archived
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 ${className}`}>
          {status}
        </span>
      );
  }
};
