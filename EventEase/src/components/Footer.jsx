import React from 'react';
import { useEventContext } from '../context/EventContext';
import { Sparkles, Heart, Calendar, Mail, MapPin, Phone, Github, Twitter, Linkedin } from 'lucide-react';
import { CATEGORIES } from '../data/events';

export default function Footer() {
  const { setActiveView, setSelectedCategory } = useEventContext();

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setActiveView('events');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="footer-logo-emoji">🎪</span>
            <span className="footer-logo-title">EventEase</span>
          </div>
          <p className="footer-brand-desc">
            The next-generation event discovery and ticketing platform connecting passionate communities
            with extraordinary summits, concerts, sports, and cultural festivals across India.
          </p>
          <div className="footer-tagline-pill">
            <Sparkles size={14} />
            <span>Discover. Connect. Celebrate.</span>
          </div>
        </div>

        {}
        <div className="footer-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links-list">
            <li>
              <button onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Home Page
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveView('events'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                All Events
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveView('my-registrations'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                My Registrations &amp; Passes
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveView('organizer'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Organizer Dashboard
              </button>
            </li>
          </ul>
        </div>

        {}
        <div className="footer-col">
          <h4 className="footer-col-title">Popular Categories</h4>
          <ul className="footer-links-list">
            {CATEGORIES.filter((c) => c !== 'All').slice(0, 5).map((cat) => (
              <li key={cat}>
                <button onClick={() => handleCategoryClick(cat)}>
                  {cat} Events
                </button>
              </li>
            ))}
          </ul>
        </div>

        {}
        <div className="footer-col">
          <h4 className="footer-col-title">Support &amp; Inquiries</h4>
          <ul className="footer-contact-list">
            <li>
              <Mail size={16} className="teal-icon" />
              <span>support@eventease.live</span>
            </li>
            <li>
              <Phone size={16} className="coral-icon" />
              <span>+91 (800) 456-7890</span>
            </li>
            <li>
              <MapPin size={16} className="purple-icon" />
              <span>Indiranagar, Bangalore, Karnataka</span>
            </li>
          </ul>
        </div>
      </div>

      {}
      <div className="footer-bottom-bar">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} EventEase Inc. Crafted with{' '}
          <span className="heart-icon">❤️</span> for modern event-goers. All rights reserved.
        </p>
        <div className="footer-legal-links">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
          <span>•</span>
          <span>Organizer Guidelines</span>
        </div>
      </div>
    </footer>
  );
}
