import React from 'react';
import { useEventContext } from '../context/EventContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast, closeToast } = useEventContext();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'error':
        return <AlertCircle size={20} className="toast-icon-error" />;
      case 'info':
        return <Info size={20} className="toast-icon-info" />;
      case 'success':
      default:
        return <CheckCircle2 size={20} className="toast-icon-success" />;
    }
  };

  return (
    <div className={`toast-notification toast-${toast.type || 'success'}`} role="status">
      <div className="toast-body">
        {getIcon()}
        <span className="toast-message">{toast.message}</span>
      </div>
      <button className="toast-close-btn" onClick={closeToast} aria-label="Dismiss notification">
        <X size={16} />
      </button>
      <div className="toast-progress-bar"></div>
    </div>
  );
}
