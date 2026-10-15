import React from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { 
  Activity, 
  CalendarCheck, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Stethoscope, 
  Users, 
  HeartHandshake
} from 'lucide-react';

export const HeroSection = ({ onSelectSpecialty }) => {
  const { setActiveView } = useAppointments();

  const handleFindDoctors = () => {
    setActiveView('doctors');
    const directoryEl = document.getElementById('doctor-directory-section');
    if (directoryEl) {
      directoryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSpecialtyClick = (specialty) => {
    if (onSelectSpecialty) {
      onSelectSpecialty(specialty);
    }
    setActiveView('doctors');
  };

  return (
    <section className="hero-section">
      {}
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      <div className="hero-container">
        {}
        <div className="hero-clinic-badge">
          <span className="live-dot"></span>
          <span className="clinic-name">MediSlot Clinic Network</span>
          <span className="badge-divider">•</span>
          <span className="badge-highlight">Premier Healthcare</span>
        </div>

        {}
        <div className="medical-cross-wrapper" title="Medical Innovation">
          <div className="cross-ring ring-outer"></div>
          <div className="cross-ring ring-inner"></div>
          <div className="medical-cross">
            <div className="cross-arm vertical"></div>
            <div className="cross-arm horizontal"></div>
            <Activity className="cross-icon" size={28} />
          </div>
        </div>

        {}
        <h1 className="hero-title">
          Book Doctor Appointments <span className="gradient-text">Online</span>
        </h1>

        <p className="hero-subtitle">
          Skip waiting rooms. Connect with certified medical specialists, select your preferred time slot, and receive instant booking confirmation in seconds.
        </p>

        {}
        <div className="hero-actions">
          <button 
            type="button" 
            className="btn btn-primary btn-lg pulse-glow"
            onClick={handleFindDoctors}
          >
            <Stethoscope size={20} />
            Find Doctors
            <ArrowRight size={18} />
          </button>

          <button 
            type="button" 
            className="btn btn-outline btn-lg"
            onClick={() => setActiveView('my-appointments')}
          >
            <CalendarCheck size={20} />
            View My Bookings
          </button>
        </div>

        {}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper mint">
              <Users size={22} />
            </div>
            <div className="stat-text">
              <span className="stat-value">8 Specialist Doctors</span>
              <span className="stat-label">Multi-department care</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper sky">
              <Clock size={22} />
            </div>
            <div className="stat-text">
              <span className="stat-value">24/7 Booking</span>
              <span className="stat-label">Accessible round the clock</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper mint">
              <Sparkles size={22} />
            </div>
            <div className="stat-text">
              <span className="stat-value">Instant Confirmation</span>
              <span className="stat-label">Real-time slot allocation</span>
            </div>
          </div>
        </div>

        {}
        <div className="hero-specialties">
          <span className="hero-specialties-label">Popular Specialties:</span>
          <div className="hero-specialty-tags">
            {['Cardiologist', 'Neurologist', 'Pediatrician', 'Dermatologist', 'Orthopedic Surgeon'].map((spec) => (
              <button
                key={spec}
                type="button"
                className="hero-tag"
                onClick={() => handleSpecialtyClick(spec)}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {}
        <div className="hero-disclaimer">
          <ShieldCheck size={16} className="disclaimer-icon" />
          <span>Fictional clinic for demonstration purposes only.</span>
        </div>
      </div>
    </section>
  );
};
