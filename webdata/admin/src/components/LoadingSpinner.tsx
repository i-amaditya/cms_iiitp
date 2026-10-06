import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-state">
      <Loader2 size={32} className="spin-icon text-primary" />
      <p>{message}</p>
    </div>
  );
};
