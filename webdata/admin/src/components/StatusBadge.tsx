import React from 'react';
import type { ContentStatus } from '../api/types';

interface StatusBadgeProps {
  status: ContentStatus | string;
  hasUnpublishedDraft?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, hasUnpublishedDraft }) => {
  const normalizedStatus = status?.toLowerCase() || 'draft';

  return (
    <div className="status-container">
      <span className={`status-badge status-${normalizedStatus}`}>
        <span className="status-dot" />
        {normalizedStatus.toUpperCase()}
      </span>
      {hasUnpublishedDraft && normalizedStatus === 'published' && (
        <span className="draft-pending-pill" title="This published item has unpublished draft edits">
          Draft Pending
        </span>
      )}
    </div>
  );
};
