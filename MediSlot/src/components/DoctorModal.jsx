import React, { useEffect } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { 
  X, 
  Calendar, 
  Clock, 
  Award, 
  IndianRupee, 
  CheckCircle2, 
  Stethoscope, 
  BookOpen, 
  ShieldCheck,
  CalendarPlus
} from 'lucide-react';

export const DoctorModal = () => {
  const { 
    selectedDoctor, 
    showDoctorModal, 
    closeDoctorModal, 
    openBookingForm 
  } = useAppointments();

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showDoctorModal) {
        closeDoctorModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDoctorModal, closeDoctorModal]);

  if (!showDoctorModal || !selectedDoctor) return null;

  const handleBookNow = () => {
    openBookingForm(selectedDoctor);
  };

  return (
    <div className="modal-backdrop" onClick={closeDoctorModal}>
      <div 
        className="modal-content doctor-modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="doctor-modal-title"
      >
        {}
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={closeDoctorModal}
          aria-label="Close Doctor Profile"
        >
          <X size={20} />
        </button>

        {}
        <div className="doctor-modal-header">
          <div className="doctor-modal-avatar-wrap">
            <img 
              src={selectedDoctor.image} 
              alt={selectedDoctor.name} 
              className="doctor-modal-avatar"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  selectedDoctor.name
                )}&background=152033&color=38bdf8&size=200`;
              }}
            />
            <div className="verified-badge-large">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <div className="doctor-modal-titles">
            <span className="specialty-badge large">{selectedDoctor.specialty}</span>
            <h2 id="doctor-modal-title" className="doctor-modal-name">{selectedDoctor.name}</h2>
            <p className="doctor-modal-qualifications">{selectedDoctor.qualifications}</p>
            
            <div className="doctor-modal-stats-inline">
              <span className="stat-pill">
                <Award size={15} className="pill-icon mint" />
                <strong>{selectedDoctor.experience}</strong> Years Experience
              </span>
              <span className="stat-pill fee-pill">
                <IndianRupee size={15} className="pill-icon" />
                Consultation: <strong>₹{selectedDoctor.fee}</strong>
              </span>
            </div>
          </div>
        </div>

        {}
        <div className="doctor-modal-body">
          {}
          <div className="modal-section">
            <h4 className="modal-section-title">
              <BookOpen size={16} className="section-title-icon" />
              Professional Biography
            </h4>
            <p className="doctor-full-bio">
              {selectedDoctor.bio}
            </p>
          </div>

          {}
          <div className="modal-section">
            <h4 className="modal-section-title">
              <Calendar size={16} className="section-title-icon" />
              Consultation Schedule
            </h4>
            <div className="days-pill-group wrap-days">
              {selectedDoctor.availableDays.map((day) => (
                <span key={day} className="day-pill active-pill">
                  {day}
                </span>
              ))}
            </div>
          </div>

          {}
          <div className="modal-section">
            <h4 className="modal-section-title">
              <Clock size={16} className="section-title-icon" />
              Typical Daily Slots ({selectedDoctor.slots.length} Slots)
            </h4>
            <div className="slots-grid-preview">
              {selectedDoctor.slots.map((slot) => (
                <span key={slot} className="slot-badge-preview">
                  {slot}
                </span>
              ))}
            </div>
          </div>

          {}
          <div className="clinic-guarantee-box">
            <ShieldCheck size={18} className="guarantee-icon" />
            <div className="guarantee-text">
              <span><strong>MediSlot Verified:</strong> 100% genuine credentials verified by clinic council. Zero waiting policy applied.</span>
            </div>
          </div>
        </div>

        {}
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={closeDoctorModal}
          >
            Close
          </button>
          <button 
            type="button" 
            className="btn btn-primary btn-lg" 
            onClick={handleBookNow}
          >
            <CalendarPlus size={18} />
            Book Appointment (₹{selectedDoctor.fee})
          </button>
        </div>
      </div>
    </div>
  );
};
