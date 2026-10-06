import React from 'react';
import { ClipboardList } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { AccessDenied } from '../components/AccessDenied';

export const AuditLogsPage: React.FC = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <AccessDenied sectionName="Audit Logs" />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Audit Logs</h1>
          <p>System audit trail recording content mutations, publishing actions, and session logins.</p>
        </div>
      </div>

      <div className="table-card">
        <div className="empty-state-box">
          <div className="empty-state-icon">
            <ClipboardList size={40} strokeWidth={1.5} color="#9ca3af" />
          </div>
          <h3 className="empty-state-title">Audit Trail</h3>
          <p className="empty-state-desc">
            All CMS operations (create, draft updates, publish, archive, delete) are actively recorded in the audit_logs database table with IP snapshots and action diffs.
          </p>
        </div>
      </div>
    </div>
  );
};
