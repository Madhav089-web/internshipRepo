import React from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { Calendar, Award, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const DoctorCard = ({ doctor }) => {
  const { openDoctorModal, openBookingForm } = useAppointments();

  
  const getShortDay = (day) => {
    const map = {
      Monday: 'Mon',
      Tuesday: 'Tue',
      Wednesday: 'Wed',
      Thursday: 'Thu',
      Friday: 'Fri',
      Saturday: 'Sat',
      Sunday: 'Sun'
    };
    return map[day] || day;
  };

  return (
    <div className="doctor-card">
      <div className="doctor-card-header">
        {}
        <div className="doctor-photo-wrapper">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="doctor-photo"
            loading="lazy"
            onError={(e) => {
              
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                doctor.name
              )}&background=152033&color=38bdf8&size=200`;
            }}
          />
          <div className="doctor-verified-badge" title="Verified Medical Practitioner">
            <CheckCircle2 size={16} />
          </div>
        </div>

        {}
        <div className="doctor-meta">
          <span className="specialty-badge">{doctor.specialty}</span>
          <h3 className="doctor-name">{doctor.name}</h3>
          <p className="doctor-qualifications" title={doctor.qualifications}>
            {doctor.qualifications}
          </p>
        </div>
      </div>

      <div className="doctor-card-body">
        {}
        <div className="doctor-stats-row">
          <div className="stat-pill">
            <Award size={14} className="pill-icon mint" />
            <span><strong>{doctor.experience}</strong> yrs exp</span>
          </div>
          <div className="stat-pill fee-pill">
            <span className="fee-label">Fee:</span>
            <span className="fee-amount">₹{doctor.fee}</span>
          </div>
        </div>

        {}
        <p className="doctor-bio-snippet">
          {doctor.bio}
        </p>

        {}
        <div className="availability-section">
          <div className="availability-label">
            <Calendar size={13} className="label-icon" />
            <span>Available Days:</span>
          </div>
          <div className="days-pill-group">
            {doctor.availableDays.map((day) => (
              <span key={day} className="day-pill" title={day}>
                {getShortDay(day)}
              </span>
            ))}
          </div>
        </div>

        {}
        <div className="slots-summary">
          <Clock size={13} className="label-icon" />
          <span>{doctor.slots.length} daily appointment slots available</span>
        </div>
      </div>

      {}
      <div className="doctor-card-footer">
        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={() => openDoctorModal(doctor)}
        >
          View & Book
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
