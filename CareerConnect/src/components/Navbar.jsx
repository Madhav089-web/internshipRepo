import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { Briefcase, Bookmark, FileText, Menu, X, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { activeView, setActiveView, savedJobs, applications } = useJobs();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {}
        <div 
          className="brand-logo" 
          onClick={() => handleNavClick('listings')}
          role="button"
          tabIndex={0}
        >
          <div className="logo-icon-wrap">
            <Briefcase className="logo-icon" size={24} />
          </div>
          <div className="logo-text-group">
            <span className="brand-title">
              Career<span className="text-accent">Connect</span>
            </span>
            <span className="brand-tagline">Pro Tech Careers</span>
          </div>
        </div>

        {}
        <nav className="desktop-nav">
          <button
            type="button"
            className={`nav-link ${activeView === 'listings' ? 'active' : ''}`}
            onClick={() => handleNavClick('listings')}
          >
            <Briefcase size={17} />
            <span>Job Listings</span>
          </button>

          <button
            type="button"
            className={`nav-link ${activeView === 'saved' ? 'active' : ''}`}
            onClick={() => handleNavClick('saved')}
          >
            <Bookmark size={17} />
            <span>Saved Jobs</span>
            {savedJobs.length > 0 && (
              <span className="badge-counter saved-counter">
                {savedJobs.length}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`nav-link ${activeView === 'applications' ? 'active' : ''}`}
            onClick={() => handleNavClick('applications')}
          >
            <FileText size={17} />
            <span>My Applications</span>
            {applications.length > 0 && (
              <span className="badge-counter app-counter">
                {applications.length}
              </span>
            )}
          </button>
        </nav>

        {}
        <div className="navbar-right-actions">
          <div className="portal-status-pill">
            <span className="status-dot"></span>
            <span className="status-label">Live Openings</span>
          </div>
          
          {}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <button
            type="button"
            className={`mobile-nav-link ${activeView === 'listings' ? 'active' : ''}`}
            onClick={() => handleNavClick('listings')}
          >
            <div className="mobile-nav-link-content">
              <Briefcase size={20} />
              <span>Job Listings</span>
            </div>
            <span className="mobile-chevron">›</span>
          </button>

          <button
            type="button"
            className={`mobile-nav-link ${activeView === 'saved' ? 'active' : ''}`}
            onClick={() => handleNavClick('saved')}
          >
            <div className="mobile-nav-link-content">
              <Bookmark size={20} />
              <span>Saved Jobs</span>
            </div>
            {savedJobs.length > 0 && (
              <span className="badge-counter saved-counter">
                {savedJobs.length}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`mobile-nav-link ${activeView === 'applications' ? 'active' : ''}`}
            onClick={() => handleNavClick('applications')}
          >
            <div className="mobile-nav-link-content">
              <FileText size={20} />
              <span>My Applications</span>
            </div>
            {applications.length > 0 && (
              <span className="badge-counter app-counter">
                {applications.length}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
export default Navbar;
