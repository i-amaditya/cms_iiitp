import React from 'react';
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are currently no items to display.',
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="empty-state-box">
      <div className="empty-state-icon">
        {icon || <FolderOpen size={40} strokeWidth={1.5} color="#9ca3af" />}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="primary-button mt-4" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};
