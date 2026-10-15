import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import {
  Calendar,
  Ticket,
  LayoutDashboard,
  Home,
  Menu,
  X,
  Sparkles,
  PlusCircle
} from 'lucide-react';

export default function Navbar() {
  const { activeView, setActiveView, registrations, openAddModal } = useEventContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    {
      id: 'my-registrations',
      label: 'My Registrations',
      icon: Ticket,
      badge: registrations.length
    },
    { id: 'organizer', label: 'Organizer Dashboard', icon: LayoutDashboard }
  ];

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-container">
      <div className="navbar-glass">
        {}
        <div className="navbar-brand" onClick={() => handleNavClick('home')}>
          <div className="brand-logo-icon">🎪</div>
          <div className="brand-text-wrapper">
            <span className="brand-title">EventEase</span>
            <span className="brand-tagline">EXPERIENCE MORE</span>
          </div>
        </div>

        {}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-btn ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={18} className="nav-icon" />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {}
        <div className="navbar-actions">
          <button
            onClick={() => {
              openAddModal();
              setMobileMenuOpen(false);
            }}
            className="host-event-btn"
            title="Create and host a new event"
          >
            <PlusCircle size={16} />
            <span className="host-event-text">Create Event</span>
          </button>

          {}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-card" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Navigation</span>
              <button
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mobile-menu-links">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
                  >
                    <div className="mobile-nav-btn-left">
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mobile-menu-footer">
              <button
                onClick={() => {
                  openAddModal();
                  setMobileMenuOpen(false);
                }}
                className="mobile-host-btn"
              >
                <PlusCircle size={18} />
                <span>Publish New Event</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
