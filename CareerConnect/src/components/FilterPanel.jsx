import React from 'react';
import { useJobs } from '../context/JobContext';
import { Filter, RotateCcw, MapPin, Briefcase, Award } from 'lucide-react';

export const FilterPanel = () => {
  const { filters, setFilters, clearFilters, filteredJobs, jobs, searchQuery } = useJobs();

  const locations = ['All', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Remote'];
  const types = ['All', 'Full-time', 'Part-time', 'Remote', 'Contract'];
  const experiences = ['All', 'Entry', 'Mid', 'Senior'];

  const hasActiveFilters = 
    filters.location !== 'All' || 
    filters.type !== 'All' || 
    filters.experience !== 'All' || 
    searchQuery.trim() !== '';

  const handleLocationChange = (loc) => {
    setFilters((prev) => ({ ...prev, location: loc }));
  };

  const handleTypeChange = (t) => {
    setFilters((prev) => ({ ...prev, type: t }));
  };

  const handleExpChange = (exp) => {
    setFilters((prev) => ({ ...prev, experience: exp }));
  };

  return (
    <div className="filter-panel-card">
      <div className="filter-panel-header">
        <div className="filter-header-title">
          <Filter size={18} className="text-primary" />
          <span>Refine Opportunities</span>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            className="filter-clear-link"
            onClick={clearFilters}
            title="Reset all filters"
          >
            <RotateCcw size={14} />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      <div className="filter-groups-grid">
        {}
        <div className="filter-group">
          <label className="filter-label">
            <MapPin size={15} className="filter-label-icon text-accent" />
            <span>Location</span>
          </label>
          <div className="filter-chips-container">
            {locations.map((loc) => (
              <button
                key={loc}
                type="button"
                className={`filter-chip ${filters.location === loc ? 'active' : ''}`}
                onClick={() => handleLocationChange(loc)}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {}
        <div className="filter-group">
          <label className="filter-label">
            <Briefcase size={15} className="filter-label-icon text-primary" />
            <span>Employment Type</span>
          </label>
          <div className="filter-chips-container">
            {types.map((type) => (
              <button
                key={type}
                type="button"
                className={`filter-chip ${filters.type === type ? 'active' : ''}`}
                onClick={() => handleTypeChange(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {}
        <div className="filter-group">
          <label className="filter-label">
            <Award size={15} className="filter-label-icon text-yellow-400" />
            <span>Experience Level</span>
          </label>
          <div className="filter-chips-container">
            {experiences.map((exp) => (
              <button
                key={exp}
                type="button"
                className={`filter-chip ${filters.experience === exp ? 'active' : ''}`}
                onClick={() => handleExpChange(exp)}
              >
                {exp === 'All' ? 'All Levels' : `${exp} Level`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {}
      <div className="filter-results-bar">
        <div className="results-count">
          Showing <strong className="text-highlight">{filteredJobs.length}</strong> of{' '}
          <span>{jobs.length}</span> positions
          {searchQuery && (
            <span className="search-query-badge">
              matching "{searchQuery}"
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <div className="active-filters-tags">
            {filters.location !== 'All' && (
              <span className="active-filter-pill">
                Location: {filters.location}
                <button type="button" onClick={() => handleLocationChange('All')}>✕</button>
              </span>
            )}
            {filters.type !== 'All' && (
              <span className="active-filter-pill">
                Type: {filters.type}
                <button type="button" onClick={() => handleTypeChange('All')}>✕</button>
              </span>
            )}
            {filters.experience !== 'All' && (
              <span className="active-filter-pill">
                Exp: {filters.experience}
                <button type="button" onClick={() => handleExpChange('All')}>✕</button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
