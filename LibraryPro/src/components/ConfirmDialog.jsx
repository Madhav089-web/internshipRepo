import React from 'react';
import { AlertTriangle, X, Check, Trash2, HelpCircle } from 'lucide-react';

const ConfirmDialog = ({
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger', 
  onConfirm,
  onClose
}) => {
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window modal-sm" onClick={(e) => e.stopPropagation()}>
        {}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h3 className="modal-title flex items-center gap-2">
              {confirmVariant === 'danger' ? (
                <AlertTriangle size={20} className="text-danger" />
              ) : (
                <HelpCircle size={20} className="text-amber" />
              )}
              <span>{title}</span>
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {}
        <div className="modal-body confirm-dialog-body">
          <p className="confirm-message">{message}</p>
        </div>

        {}
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${confirmVariant === 'danger' ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmVariant === 'danger' ? <Trash2 size={16} /> : <Check size={16} />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
