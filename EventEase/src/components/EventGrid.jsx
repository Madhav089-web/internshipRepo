import React, { useState, useMemo } from 'react';
import { useEventContext } from '../context/EventContext';
import EventCard from './EventCard';
import { CATEGORIES, CITIES } from '../data/events';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Calendar,
  Frown,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function EventGrid({ title = 'All Upcoming Events', subtitle = null, showOnlyFeatured = false }) {
  const {
    events,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriceFilter,
    setSelectedPriceFilter,
    selectedCity,
    setSelectedCity
  } = useEventContext();

  const [sortBy, setSortBy] = useState('date-asc'); 

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        
        if (showOnlyFeatured && !event.featured) {
          return false;
        }

        
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = event.title.toLowerCase().includes(q);
          const matchDesc = event.description.toLowerCase().includes(q);
          const matchVenue = event.venue.toLowerCase().includes(q);
          const matchCity = event.city.toLowerCase().includes(q);
          const matchCategory = event.category.toLowerCase().includes(q);

          if (!matchTitle && !matchDesc && !matchVenue && !matchCity && !matchCategory) {
            return false;
          }
        }

        
        if (selectedCategory !== 'All') {
          if (event.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        
        if (selectedCity !== 'All Cities') {
          if (event.city.toLowerCase() !== selectedCity.toLowerCase()) {
            return false;
          }
        }

        
        if (selectedPriceFilter === 'Free') {
          if (event.price > 0) return false;
        } else if (selectedPriceFilter === 'Paid') {
          if (event.price === 0) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date-asc') {
          return new Date(a.date) - new Date(b.date);
        }
        if (sortBy === 'date-desc') {
          return new Date(b.date) - new Date(a.date);
        }
        if (sortBy === 'price-asc') {
          return a.price - b.price;
        }
        if (sortBy === 'price-desc') {
          return b.price - a.price;
        }
        if (sortBy === 'popular') {
          return (b.registered || 0) - (a.registered || 0);
        }
        return 0;
      });
  }, [
    events,
    searchQuery,
    selectedCategory,
    selectedCity,
    selectedPriceFilter,
    sortBy,
    showOnlyFeatured
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriceFilter('All');
    setSelectedCity('All Cities');
    setSortBy('date-asc');
  };

  const isFilterActive =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedPriceFilter !== 'All' ||
    selectedCity !== 'All Cities';

  return (
    <section id="events-grid-section" className="events-grid-section">
      <div className="section-header">
        <div>
          <div className="section-pill">
            <Sparkles size={14} />
            <span>Curated Collection</span>
          </div>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
        <div className="results-counter">
          Showing <strong>{filteredEvents.length}</strong> of {events.length} events
        </div>
      </div>

      {}
      <div className="filter-controls-card">
        {}
        <div className="filter-top-row">
          {}
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by event title, artist, city, venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {}
          <div className="select-wrapper">
            <select
              className="custom-select"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Filter by City"
            >
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="price-filter-toggle">
            {['All', 'Free', 'Paid'].map((tier) => (
              <button
                key={tier}
                type="button"
                className={`price-toggle-btn ${selectedPriceFilter === tier ? 'active' : ''}`}
                onClick={() => setSelectedPriceFilter(tier)}
              >
                {tier}
              </button>
            ))}
          </div>

          {}
          <div className="select-wrapper sort-wrapper">
            <SlidersHorizontal size={15} className="sort-icon" />
            <select
              className="custom-select sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort events"
            >
              <option value="date-asc">Date: Earliest First</option>
              <option value="date-desc">Date: Latest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {}
          {isFilterActive && (
            <button
              className="reset-filters-btn"
              onClick={handleResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={15} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {}
        <div className="category-pills-row">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`category-pill-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {}
      {filteredEvents.length > 0 ? (
        <div className="events-cards-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        
        <div className="empty-results-card">
          <div className="empty-icon-wrap">
            <Frown size={48} className="empty-icon" />
          </div>
          <h3 className="empty-title">No Events Found</h3>
          <p className="empty-desc">
            We couldn't find any events matching your selected filters or search terms. Try searching
            for a different keyword or resetting your criteria.
          </p>
          <button className="empty-reset-btn" onClick={handleResetFilters}>
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
}
