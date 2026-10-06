import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AccessDeniedProps {
  sectionName?: string;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({ sectionName }) => {
  return (
    <div className="page access-denied-page">
      <div className="access-denied-card">
        <ShieldAlert size={48} className="text-danger" />
        <h2>Access Denied</h2>
        <p>
          {sectionName
            ? `You do not have editorial permissions for the "${sectionName}" section.`
            : 'You do not have permission to view or manage this administrative resource.'}
        </p>
        <p className="access-denied-subtext">
          If you believe this is an error, please contact a system administrator to request section access.
        </p>
        <Link to="/" className="primary-button mt-4">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};
