import React from 'react';
import { Users as UsersIcon } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { AccessDenied } from '../components/AccessDenied';

export const UsersPage: React.FC = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <AccessDenied sectionName="User Administration" />;
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p>Manage system users, roles, and editor section assignments.</p>
        </div>
      </div>

      <div className="table-card">
        <div className="empty-state-box">
          <div className="empty-state-icon">
            <UsersIcon size={40} strokeWidth={1.5} color="#9ca3af" />
          </div>
          <h3 className="empty-state-title">User Management (Administration)</h3>
          <p className="empty-state-desc">
            Administrative user management APIs are configured in the backend (/v1/admin/users). Full CRUD UI is scheduled for Phase 3 administration tooling.
          </p>
        </div>
      </div>
    </div>
  );
};
