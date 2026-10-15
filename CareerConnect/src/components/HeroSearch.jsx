import React from 'react';
import { useJobs } from '../context/JobContext';
import { Search, Sparkles, Building2, MapPin, Briefcase, TrendingUp, CheckCircle2 } from 'lucide-react';

export const HeroSearch = () => {
  const { searchQuery, setSearchQuery, jobs, setFilters } = useJobs();

  const handleQuickTag = (tag) => {
    setSearchQuery(tag);
  };

  const handleQuickLocation = (loc) => {
    setFilters((prev) => ({ ...prev, location: loc }));
  };

  return (
    <section className="hero-section">
      <div className="hero-glow-blob hero-glow-1"></div>
      <div className="hero-glow-blob hero-glow-2"></div>

      <div className="hero-content">
        <div className="hero-badge animate-fade-in">
          <Sparkles size={14} className="text-accent" />
          <span>India’s Leading Tech Talent Network</span>
        </div>

        <h1 className="hero-title">
          Connect With Your Next <br />
          <span className="text-gradient">High-Impact Career</span>
        </h1>

        <p className="hero-subtitle">
          Explore curated roles across Bangalore, Hyderabad, Pune, Mumbai, Delhi NCR, and Remote. 
          Discover competitive salary packages from ₹4 LPA up to ₹80 LPA at top engineering firms.
        </p>

        {}
        <div className="hero-search-box">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by role, company (e.g. React, DevOps, CloudPeak)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search jobs by title or company"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button 
            type="button" 
            className="search-action-btn"
            onClick={() => {
              const el = document.getElementById('jobs-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Find Jobs
          </button>
        </div>

        {}
        <div className="quick-tags-wrap">
          <span className="quick-tags-label">Popular Searches:</span>
          {['React', 'Node.js', 'DevOps', 'Python', 'AWS', 'Blockchain', 'UI/UX'].map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag-chip ${searchQuery.toLowerCase() === tag.toLowerCase() ? 'active-tag' : ''}`}
              onClick={() => handleQuickTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {}
        <div className="hero-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-blue">
              <Briefcase size={22} />
            </div>
            <div className="stat-text">
              <span className="stat-value">{jobs.length}+</span>
              <span className="stat-label">Active Tech Roles</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-cyan">
              <Building2 size={22} />
            </div>
            <div className="stat-text">
              <span className="stat-value">100%</span>
              <span className="stat-label">Verified Companies</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-emerald">
              <TrendingUp size={22} />
            </div>
            <div className="stat-text">
              <span className="stat-value">₹4L - ₹80L</span>
              <span className="stat-label">Verified Compensation</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrap stat-icon-purple">
              <CheckCircle2 size={22} />
            </div>
            <div className="stat-text">
              <span className="stat-value">48 Hours</span>
              <span className="stat-label">Avg. Review Time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
