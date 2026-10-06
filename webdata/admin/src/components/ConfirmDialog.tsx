import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <AlertTriangle size={24} className="confirm-icon danger" />;
      case 'warning':
        return <AlertCircle size={24} className="confirm-icon warning" />;
      case 'primary':
        return <CheckCircle2 size={24} className="confirm-icon primary" />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="480px">
      <div className="confirm-content">
        <div className="confirm-header">
          {getIcon()}
          <p className="confirm-message">{message}</p>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`primary-button ${variant === 'danger' ? 'danger-button' : variant === 'warning' ? 'warning-button' : ''}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};
