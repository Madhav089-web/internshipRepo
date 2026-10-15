import React from 'react';
import { useEventContext } from '../context/EventContext';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Users,
  MapPin,
  TrendingUp,
  Award
} from 'lucide-react';

export default function HeroSection() {
  const { setActiveView, events, registrations } = useEventContext();

  const totalRegistered = events.reduce((sum, ev) => sum + (ev.registered || 0), 0);
  const totalCities = new Set(events.map((e) => e.city)).size;

  const scrollToEvents = () => {
    setActiveView('events');
    const el = document.getElementById('events-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {}
      <div className="hero-particles-wrapper" aria-hidden="true">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="glow-orb orb-teal"></div>
        <div className="glow-orb orb-coral"></div>
      </div>

      <div className="hero-content">
        {}
        <div className="hero-pill-badge">
          <Sparkles size={16} className="pill-icon" />
          <span>Premier Experiential Event Platform</span>
        </div>

        {}
        <h1 className="hero-headline">
          Discover &amp; Book <br />
          <span className="gradient-text">Amazing Events</span>
        </h1>

        {}
        <p className="hero-description">
          From cutting-edge tech conferences and high-energy music festivals to comedy galas and
          culinary food walks. Seamless registrations, real-time ticket passes, and instant confirmation.
        </p>

        {}
        <div className="hero-actions">
          <button onClick={scrollToEvents} className="hero-primary-btn">
            <span>Explore Events</span>
            <ArrowRight size={18} />
          </button>
          <button onClick={() => setActiveView('organizer')} className="hero-secondary-btn">
            <span>Organizer Hub</span>
          </button>
        </div>

        {}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper teal-glow">
              <Calendar size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{events.length}+</span>
              <span className="stat-label">Curated Events</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper coral-glow">
              <Users size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{(totalRegistered || 5000).toLocaleString()}+</span>
              <span className="stat-label">Registered Attendees</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper purple-glow">
              <MapPin size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{totalCities > 0 ? totalCities : 8}+</span>
              <span className="stat-label">Major Metros &amp; Cities</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper emerald-glow">
              <Award size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">99.8%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
