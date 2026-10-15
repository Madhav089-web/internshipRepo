import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { Calendar, UserCheck, Stethoscope, Menu, X, PlusCircle, ShieldAlert } from 'lucide-react';

export const Navbar = () => {
  const { activeView, setActiveView, appointments } = useAppointments();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  
  const upcomingCount = appointments.filter((app) => app.status === 'Upcoming').length;

  const handleNavClick = (view) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {}
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="logo-icon-wrapper">
            <span className="logo-pulse"></span>
            <span className="logo-icon">🏥</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">Medi<span className="brand-accent">Slot</span></span>
            <span className="brand-tagline">Clinical Network</span>
          </div>
        </div>

        {}
        <nav className="navbar-links desktop-only">
          <button
            type="button"
            className={`nav-link ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`nav-link ${activeView === 'doctors' ? 'active' : ''}`}
            onClick={() => handleNavClick('doctors')}
          >
            <Stethoscope size={16} className="nav-icon" />
            Find Doctors
          </button>
          <button
            type="button"
            className={`nav-link ${activeView === 'my-appointments' ? 'active' : ''}`}
            onClick={() => handleNavClick('my-appointments')}
          >
            <Calendar size={16} className="nav-icon" />
            My Appointments
            {upcomingCount > 0 && (
              <span className="nav-badge" title={`${upcomingCount} upcoming appointments`}>
                {upcomingCount}
              </span>
            )}
          </button>
        </nav>

        {}
        <div className="navbar-actions desktop-only">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => handleNavClick('doctors')}
          >
            <PlusCircle size={16} />
            Book Slot
          </button>
        </div>

        {}
        <button
          type="button"
          className="mobile-menu-btn mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {}
      {mobileMenuOpen && (
        <div className="mobile-dropdown mobile-only">
          <button
            type="button"
            className={`mobile-nav-link ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`mobile-nav-link ${activeView === 'doctors' ? 'active' : ''}`}
            onClick={() => handleNavClick('doctors')}
          >
            <Stethoscope size={18} />
            Find Doctors
          </button>
          <button
            type="button"
            className={`mobile-nav-link ${activeView === 'my-appointments' ? 'active' : ''}`}
            onClick={() => handleNavClick('my-appointments')}
          >
            <Calendar size={18} />
            My Appointments
            {upcomingCount > 0 && (
              <span className="nav-badge mobile-badge">{upcomingCount}</span>
            )}
          </button>
          <div className="mobile-action-wrap">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => handleNavClick('doctors')}
            >
              <PlusCircle size={16} />
              Book An Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
