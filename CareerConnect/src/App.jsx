import React from 'react';
import { JobProvider, useJobs } from './context/JobContext';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import FilterPanel from './components/FilterPanel';
import JobGrid from './components/JobGrid';
import SavedJobs from './components/SavedJobs';
import ApplicationDashboard from './components/ApplicationDashboard';
import JobDetailModal from './components/JobDetailModal';
import ApplyForm from './components/ApplyForm';
import { Briefcase, Heart, Shield, Code, Sparkles, ExternalLink } from 'lucide-react';

const MainLayout = () => {
  const { activeView, setActiveView } = useJobs();

  return (
    <div className="app-layout">
      {}
      <Navbar />

      {}
      <main className="main-content">
        {activeView === 'listings' && (
          <>
            <HeroSearch />
            <div className="portal-container">
              <FilterPanel />
              <JobGrid />
            </div>
          </>
        )}

        {activeView === 'saved' && (
          <div className="portal-container page-view-container">
            <SavedJobs />
          </div>
        )}

        {activeView === 'applications' && (
          <div className="portal-container page-view-container">
            <ApplicationDashboard />
          </div>
        )}
      </main>

      {}
      <JobDetailModal />
      <ApplyForm />

      {}
      <footer className="footer-container">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-col-brand">
              <div className="footer-logo">
                <Briefcase className="text-primary" size={22} />
                <span className="footer-brand-name">Career<span className="text-accent">Connect</span></span>
              </div>
              <p className="footer-brand-desc">
                The premier tech career nexus uniting exceptional developers, designers, data scientists, and DevOps specialists with India's most innovative tech enterprises.
              </p>
              <div className="platform-compliance-pill">
                <Shield size={14} className="text-emerald-400" />
                <span>Verified Recruitment Platform</span>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-links">
                <li>
                  <button type="button" onClick={() => { setActiveView('listings'); window.scrollTo(0,0); }}>
                    Job Directory
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => { setActiveView('saved'); window.scrollTo(0,0); }}>
                    Saved Bookmarks
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => { setActiveView('applications'); window.scrollTo(0,0); }}>
                    Application Tracker
                  </button>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Key Tech Hubs</h4>
              <ul className="footer-links-static">
                <li>Bangalore Tech Corridors</li>
                <li>Hyderabad Cyberabad</li>
                <li>Pune Hinjewadi IT Park</li>
                <li>Mumbai BKC & Powai</li>
                <li>Delhi NCR & Gurgaon</li>
                <li>Global Remote Roles</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-heading">Architecture</h4>
              <p className="footer-tech-info">
                Crafted with React 18, Vite, Context API, Lucide Icons, and LocalStorage client persistence.
              </p>
              <div className="tech-pills-row">
                <span className="tech-badge">React 18</span>
                <span className="tech-badge">Vite</span>
                <span className="tech-badge">Vanilla CSS</span>
                <span className="tech-badge">LocalStore</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="copyright-text">
              © {new Date().getFullYear()} <strong>CareerConnect</strong>. All rights reserved.
            </div>
            <div className="footer-bottom-note">
              <span>Built for high-performance software recruitment</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <JobProvider>
      <MainLayout />
    </JobProvider>
  );
}
