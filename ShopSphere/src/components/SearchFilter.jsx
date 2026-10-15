import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { categories } from '../data/products';

export const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  totalResults
}) => {
  return (
    <div className="search-filter-wrapper">
      {}
      <div className="search-bar-row">
        {}
        <div className="search-input-box glass-panel">
          <Search className="search-icon w-5 h-5 text-purple-light" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search luxury tech, fashion, sports, books..."
            className="search-input"
            aria-label="Search products"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="search-clear-btn"
              title="Clear search"
            >
              <X className="w-4 h-4 text-purple-200 hover:text-white" />
            </button>
          )}
        </div>

        {}
        <div className="sort-dropdown-box glass-panel">
          <ArrowUpDown className="sort-icon w-4 h-4 text-purple-light" />
          <label htmlFor="product-sort" className="sort-label">Sort by:</label>
          <select
            id="product-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default" className="bg-[#1a0533] text-white">Featured (Default)</option>
            <option value="price-asc" className="bg-[#1a0533] text-white">Price: Low to High</option>
            <option value="price-desc" className="bg-[#1a0533] text-white">Price: High to Low</option>
            <option value="rating-desc" className="bg-[#1a0533] text-white">Highest Customer Rating</option>
            <option value="name-asc" className="bg-[#1a0533] text-white">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>

      {}
      <div id="categories-section" className="categories-tab-bar">
        <div className="categories-scroll">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-pill ${isActive ? 'category-pill-active' : 'category-pill-inactive'}`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {}
        <div className="filter-summary">
          <span className="results-badge">
            Showing <strong className="text-white">{totalResults}</strong> {totalResults === 1 ? 'product' : 'products'}
          </span>
          {(selectedCategory !== 'All' || searchTerm.trim() !== '' || sortBy !== 'default') && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
                setSortBy('default');
              }}
              className="reset-filters-link"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
