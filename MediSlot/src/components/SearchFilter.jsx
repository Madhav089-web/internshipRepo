import React from 'react';
import { Search, Filter, X, ArrowUpDown, Calendar } from 'lucide-react';
import { specialties } from '../data/doctors';

export const SearchFilter = ({
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedDay,
  setSelectedDay,
  sortBy,
  setSortBy,
  totalResults
}) => {
  const days = ['All Days', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedSpecialty !== 'All Specialties' ||
    selectedDay !== 'All Days' ||
    sortBy !== 'default';

  const handleReset = () => {
    setSearchQuery('');
    setSelectedSpecialty('All Specialties');
    setSelectedDay('All Days');
    setSortBy('default');
  };

  return (
    <div className="search-filter-card">
      <div className="search-filter-grid">
        {}
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search doctor by name or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {}
        <div className="filter-dropdown-wrapper">
          <Filter className="dropdown-icon" size={16} />
          <select
            className="filter-select"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            aria-label="Filter by Specialty"
          >
            {specialties.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        {}
        <div className="filter-dropdown-wrapper">
          <Calendar className="dropdown-icon" size={16} />
          <select
            className="filter-select"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            aria-label="Filter by Day"
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        {}
        <div className="filter-dropdown-wrapper">
          <ArrowUpDown className="dropdown-icon" size={16} />
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort Doctors"
          >
            <option value="default">Sort: Recommended</option>
            <option value="exp-desc">Experience (High to Low)</option>
            <option value="fee-asc">Fee (Low to High)</option>
            <option value="fee-desc">Fee (High to Low)</option>
            <option value="name-asc">Doctor Name (A to Z)</option>
          </select>
        </div>
      </div>

      {}
      <div className="search-status-bar">
        <span className="results-count">
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'specialist' : 'specialists'}
        </span>

        {hasActiveFilters && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={handleReset}
          >
            <X size={14} />
            Reset all filters
          </button>
        )}
      </div>
    </div>
  );
};
