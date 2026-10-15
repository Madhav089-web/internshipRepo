import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  IndianRupee, 
  AlertTriangle, 
  Printer, 
  ArrowRight,
  X
} from 'lucide-react';

export const BookingConfirmationModal = () => {
  const { 
    lastBookedAppointment, 
    showConfirmationModal, 
    closeConfirmationModal, 
    setActiveView 
  } = useAppointments();

  const [copied, setCopied] = useState(false);

  if (!showConfirmationModal || !lastBookedAppointment) return null;

  const handleCopy = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(lastBookedAppointment.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleGoToAppointments = () => {
    closeConfirmationModal();
    setActiveView('my-appointments');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop" onClick={closeConfirmationModal}>
      <div 
        className="modal-content confirmation-modal-content print-receipt-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          type="button" 
          className="modal-close-btn no-print" 
          onClick={closeConfirmationModal}
          aria-label="Close Confirmation Modal"
        >
          <X size={20} />
        </button>

        {}
        <div className="confirmation-header">
          <div className="confirmation-icon-ring">
            <CheckCircle2 size={48} className="mint-icon" />
          </div>
          <span className="confirmation-badge">Appointment Reserved</span>
          <h2 className="confirmation-title">Booking Confirmed!</h2>
          <p className="confirmation-sub">
            Your appointment has been registered in the MediSlot Clinic Network.
          </p>
        </div>

        {}
        <div className="ref-id-card">
          <span className="ref-id-label">Appointment Reference ID</span>
          <div className="ref-id-row">
            <span className="ref-id-value">{lastBookedAppointment.referenceId}</span>
            <button 
              type="button" 
              className="copy-btn no-print" 
              onClick={handleCopy}
              title="Copy Reference ID"
            >
              {copied ? <Check size={16} className="mint" /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {}
        <div className="receipt-slip">
          <div className="receipt-row">
            <div className="receipt-item">
              <span className="receipt-item-label">
                <Stethoscope size={14} /> Doctor
              </span>
              <span className="receipt-item-value">{lastBookedAppointment.doctorName}</span>
              <span className="receipt-item-sub">{lastBookedAppointment.specialty}</span>
            </div>

            <div className="receipt-item">
              <span className="receipt-item-label">
                <User size={14} /> Patient
              </span>
              <span className="receipt-item-value">{lastBookedAppointment.patientName}</span>
              <span className="receipt-item-sub">
                {lastBookedAppointment.age} yrs • {lastBookedAppointment.gender}
              </span>
            </div>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-row">
            <div className="receipt-item">
              <span className="receipt-item-label">
                <Calendar size={14} /> Date
              </span>
              <span className="receipt-item-value">{lastBookedAppointment.date}</span>
            </div>

            <div className="receipt-item">
              <span className="receipt-item-label">
                <Clock size={14} /> Time Slot
              </span>
              <span className="receipt-item-value time-val">{lastBookedAppointment.slot}</span>
            </div>

            <div className="receipt-item">
              <span className="receipt-item-label">
                <IndianRupee size={14} /> Fee
              </span>
              <span className="receipt-item-value fee-val">₹{lastBookedAppointment.fee}</span>
            </div>
          </div>
        </div>

        {}
        <div className="booking-warning-banner confirmation-warning">
          <AlertTriangle size={18} className="warning-icon" />
          <div className="warning-text">
            <strong>WARNING:</strong> This is a simulated booking. No real appointments are confirmed.
          </div>
        </div>

        {}
        <div className="confirmation-actions no-print">
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={handlePrint}
          >
            <Printer size={16} />
            Print Slip
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleGoToAppointments}
          >
            View My Appointments
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
