import React from 'react';
import { Search, Filter, BookOpen, X, RefreshCw } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { CATEGORIES } from '../data/books';

const SearchFilter = ({ totalCount, filteredCount }) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    availabilityFilter,
    setAvailabilityFilter
  } = useLibrary();

  const isFiltered =
    searchTerm.trim() !== '' ||
    selectedCategory !== 'All' ||
    availabilityFilter !== 'All';

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setAvailabilityFilter('All');
  };

  return (
    <div className="filter-panel">
      <div className="filter-row">
        {}
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search catalog"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {}
        <div className="select-wrapper">
          <label htmlFor="category-select" className="filter-label">
            <Filter size={15} />
            <span>Category:</span>
          </label>
          <select
            id="category-select"
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {}
        <div className="select-wrapper">
          <label htmlFor="availability-select" className="filter-label">
            <BookOpen size={15} />
            <span>Availability:</span>
          </label>
          <select
            id="availability-select"
            className="filter-select"
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Available">Available Only (Copies &gt; 0)</option>
            <option value="Borrowed">Currently Borrowed</option>
            <option value="Overdue">Overdue Items</option>
          </select>
        </div>

        {}
        {isFiltered && (
          <button
            type="button"
            className="btn btn-secondary btn-sm clear-filters-btn"
            onClick={handleResetFilters}
            title="Clear all active filters"
          >
            <RefreshCw size={14} />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {}
      <div className="filter-status-bar">
        <span className="results-counter">
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> books
          {isFiltered && <span className="filtered-indicator"> (Filtered)</span>}
        </span>

        {isFiltered && (
          <div className="active-filter-tags">
            {searchTerm && (
              <span className="filter-tag">
                Query: "{searchTerm}"
                <button type="button" onClick={() => setSearchTerm('')}>
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="filter-tag">
                {selectedCategory}
                <button type="button" onClick={() => setSelectedCategory('All')}>
                  <X size={12} />
                </button>
              </span>
            )}
            {availabilityFilter !== 'All' && (
              <span className="filter-tag">
                {availabilityFilter}
                <button type="button" onClick={() => setAvailabilityFilter('All')}>
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
