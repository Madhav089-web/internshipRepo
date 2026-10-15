import React from 'react';
import { PlusCircle, BookX, Sparkles } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import BookCard from './BookCard';
import SearchFilter from './SearchFilter';

const BookCatalog = () => {
  const { books, filteredBooks, openModal, setSearchTerm, setSelectedCategory, setAvailabilityFilter } = useLibrary();

  const handleClearAll = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setAvailabilityFilter('All');
  };

  return (
    <section className="catalog-section" aria-label="Book Catalog">
      {}
      <div className="catalog-header-bar">
        <div>
          <h2 className="section-title">
            <span>Library Collection Catalog</span>
          </h2>
          <p className="section-subtitle">
            Browse, search, edit, and manage circulation records across the archive.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => openModal('add')}
        >
          <PlusCircle size={18} />
          <span>Add New Book</span>
        </button>
      </div>

      {}
      <SearchFilter
        totalCount={books.length}
        filteredCount={filteredBooks.length}
      />

      {}
      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="empty-catalog-state">
          <div className="empty-icon-wrap">
            <BookX size={48} className="empty-icon" />
          </div>
          <h3 className="empty-title">No Books Found in Catalog</h3>
          <p className="empty-text">
            No matching titles, authors, or ISBNs align with your current search and filter selections.
          </p>
          <div className="empty-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClearAll}
            >
              <Sparkles size={16} />
              <span>Clear All Search Filters</span>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => openModal('add')}
            >
              <PlusCircle size={16} />
              <span>Add a Book Now</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookCatalog;
