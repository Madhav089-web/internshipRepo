import React from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { 
  Heart, 
  ShieldAlert, 
  PhoneCall, 
  Clock, 
  MapPin, 
  Mail, 
  Stethoscope, 
  Calendar 
} from 'lucide-react';

export const Footer = () => {
  const { setActiveView } = useAppointments();

  return (
    <footer className="footer-container">
      {}
      <div className="footer-emergency-banner">
        <div className="footer-emergency-content">
          <ShieldAlert size={20} className="emergency-icon" />
          <span>
            <strong>Emergency Advisory:</strong> MediSlot is an outpatient appointment booking system. For urgent medical emergencies, immediately call emergency response (112 / 108) or visit your nearest hospital emergency department.
          </span>
        </div>
      </div>

      <div className="footer-main">
        {}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <span className="brand-icon">🏥</span>
            <span className="brand-name">Medi<span className="brand-accent">Slot</span></span>
          </div>
          <p className="footer-desc">
            A modernized clinical network appointment booking portal empowering patients with friction-free specialist scheduling, instant confirmations, and real-time slot locking.
          </p>
          <div className="footer-disclaimer-tag">
            Fictional clinic for demonstration and academic evaluation only.
          </div>
        </div>

        {}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Navigation</h4>
          <ul className="footer-links-list">
            <li>
              <button 
                type="button" 
                className="footer-link" 
                onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Home Overview
              </button>
            </li>
            <li>
              <button 
                type="button" 
                className="footer-link" 
                onClick={() => { setActiveView('doctors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                Find Specialists
              </button>
            </li>
            <li>
              <button 
                type="button" 
                className="footer-link" 
                onClick={() => { setActiveView('my-appointments'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                My Bookings Portal
              </button>
            </li>
          </ul>
        </div>

        {}
        <div className="footer-col">
          <h4 className="footer-col-title">Clinic Hours</h4>
          <ul className="footer-info-list">
            <li>
              <Clock size={15} className="info-icon sky" />
              <span>Mon - Fri: 08:00 AM - 08:00 PM</span>
            </li>
            <li>
              <Clock size={15} className="info-icon mint" />
              <span>Saturday: 08:30 AM - 05:00 PM</span>
            </li>
            <li>
              <Clock size={15} className="info-icon muted" />
              <span>Sunday: Special Emergency Only</span>
            </li>
          </ul>
        </div>

        {}
        <div className="footer-col">
          <h4 className="footer-col-title">Clinic Support</h4>
          <ul className="footer-info-list">
            <li>
              <MapPin size={15} className="info-icon sky" />
              <span>42 Health Avenue, Medical Enclave, New Delhi, India</span>
            </li>
            <li>
              <PhoneCall size={15} className="info-icon mint" />
              <span>1800-MEDISLOT (Toll-Free)</span>
            </li>
            <li>
              <Mail size={15} className="info-icon sky" />
              <span>care@medislot-network.in</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} MediSlot Clinic Network. All rights reserved.</p>
          <p className="developer-tag">
            Designed & Developed with React + Vite
          </p>
        </div>
      </div>
    </footer>
  );
};
