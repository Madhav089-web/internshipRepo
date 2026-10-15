import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  IndianRupee, 
  XCircle, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  Tag
} from 'lucide-react';

export const AppointmentCard = ({ appointment, onRequestCancel }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyRef = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(appointment.referenceId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Upcoming':
        return (
          <span className="status-badge status-upcoming">
            <span className="status-dot"></span>
            Upcoming
          </span>
        );
      case 'Completed':
        return (
          <span className="status-badge status-completed">
            <CheckCircle2 size={13} />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="status-badge status-cancelled">
            <XCircle size={13} />
            Cancelled
          </span>
        );
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className={`appointment-card ${appointment.status.toLowerCase()}`}>
      <div className="app-card-top">
        <div className="app-card-doctor-info">
          <div className="app-doctor-avatar">
            <Stethoscope size={20} className="doctor-avatar-icon" />
          </div>
          <div>
            <h4 className="app-doctor-name">{appointment.doctorName}</h4>
            <span className="app-specialty">{appointment.specialty}</span>
          </div>
        </div>

        <div className="app-card-status-wrap">
          {getStatusBadge(appointment.status)}
        </div>
      </div>

      <div className="app-card-details">
        {}
        <div className="app-detail-row">
          <div className="app-detail-item">
            <Calendar size={14} className="detail-icon" />
            <span className="detail-label">Date:</span>
            <span className="detail-val">{appointment.date}</span>
          </div>
          <div className="app-detail-item">
            <Clock size={14} className="detail-icon" />
            <span className="detail-label">Slot:</span>
            <span className="detail-val slot-val">{appointment.slot}</span>
          </div>
        </div>

        {}
        <div className="app-patient-box">
          <div className="patient-primary">
            <User size={14} className="mint" />
            <strong>{appointment.patientName}</strong>
            <span className="patient-demographics">
              ({appointment.age} yrs • {appointment.gender})
            </span>
          </div>
          <div className="patient-contacts">
            <span className="contact-item">
              <Phone size={12} /> {appointment.contact}
            </span>
            <span className="contact-item">
              <Mail size={12} /> {appointment.email}
            </span>
          </div>
        </div>

        {}
        <div className="app-meta-footer">
          <div className="app-ref-wrapper">
            <Tag size={13} className="ref-icon" />
            <span className="ref-label">Ref:</span>
            <span className="ref-code">{appointment.referenceId}</span>
            <button
              type="button"
              className="copy-mini-btn"
              onClick={handleCopyRef}
              title="Copy Reference ID"
            >
              {copied ? <Check size={12} className="mint" /> : <Copy size={12} />}
            </button>
          </div>

          <div className="app-fee-badge">
            <IndianRupee size={13} />
            <span>₹{appointment.fee}</span>
          </div>
        </div>
      </div>

      {}
      {appointment.status === 'Upcoming' && (
        <div className="app-card-actions">
          <button
            type="button"
            className="btn btn-outline-danger btn-sm w-full"
            onClick={() => onRequestCancel(appointment)}
          >
            <XCircle size={15} />
            Cancel Appointment
          </button>
        </div>
      )}
    </div>
  );
};
