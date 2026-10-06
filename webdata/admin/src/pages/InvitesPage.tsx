import React from 'react';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { AccessDenied } from '../components/AccessDenied';

export const InvitesPage: React.FC = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <AccessDenied sectionName="Invites Administration" />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Invites Management</h1>
          <p>Issue invitation links for new editors and faculty members with predefined roles and sections.</p>
        </div>
      </div>

      <div className="table-card">
        <div className="empty-state-box">
          <div className="empty-state-icon">
            <UserPlus size={40} strokeWidth={1.5} color="#9ca3af" />
          </div>
          <h3 className="empty-state-title">Invitation System</h3>
          <p className="empty-state-desc">
            Invite creation and token verification backend endpoints are live (/v1/admin/invites). The full invitations dashboard is reserved for Phase 3 administration.
          </p>
        </div>
      </div>
    </div>
  );
};
