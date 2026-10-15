import React, { useState } from 'react';
import {
  Eye,
  Edit2,
  Trash2,
  BookmarkCheck,
  RotateCcw,
  BookOpen,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

const BookCard = ({ book }) => {
  const { openModal, bookHasOverdueCopies, getBookActiveBorrowers } = useLibrary();
  const [imgError, setImgError] = useState(false);

  const available = Number(book.availableCopies) || 0;
  const total = Number(book.totalCopies) || 1;
  const borrowedCount = Math.max(0, total - available);
  const isOverdue = bookHasOverdueCopies(book.id);
  const activeBorrowers = getBookActiveBorrowers(book.id);

  
  let statusBadge = {
    label: 'Available',
    className: 'badge-status--available'
  };

  if (available === 0) {
    statusBadge = {
      label: 'All Borrowed',
      className: 'badge-status--borrowed'
    };
  } else if (available < total) {
    statusBadge = {
      label: `${available}/${total} Available`,
      className: 'badge-status--partial'
    };
  }

  if (isOverdue) {
    statusBadge = {
      label: 'Overdue Loan',
      className: 'badge-status--overdue'
    };
  }

  const fallbackCover = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300';

  return (
    <article className={`book-card ${isOverdue ? 'book-card--overdue' : ''}`}>
      {}
      <div className="book-card-cover-wrapper" onClick={() => openModal('detail', book)}>
        <img
          src={imgError || !book.cover ? fallbackCover : book.cover}
          alt={`Cover of ${book.title}`}
          className="book-card-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="book-card-overlay">
          <button
            type="button"
            className="book-card-preview-btn"
            title="Inspect Book Details"
          >
            <Eye size={18} />
            <span>Quick View</span>
          </button>
        </div>

        {}
        <span className="book-card-category-badge">{book.category}</span>

        {}
        {isOverdue && (
          <span className="book-card-overdue-flag" title="Has an overdue borrowing record">
            <AlertCircle size={14} /> Overdue
          </span>
        )}
      </div>

      {}
      <div className="book-card-body">
        <div className="book-card-header">
          <h3
            className="book-card-title"
            title={book.title}
            onClick={() => openModal('detail', book)}
          >
            {book.title}
          </h3>
          <p className="book-card-author">by {book.author}</p>
        </div>

        {}
        <div className="book-card-meta">
          <div className="meta-item" title="ISBN">
            <span className="meta-label">ISBN:</span>
            <span className="meta-value mono">{book.isbn}</span>
          </div>
          <div className="meta-item-row">
            <span className="meta-sub">
              <Calendar size={12} /> {book.year || 'N/A'}
            </span>
            <span className="meta-dot">•</span>
            <span className="meta-sub publisher" title={book.publisher}>
              {book.publisher || 'Independent'}
            </span>
          </div>
        </div>

        {}
        <div className="book-card-stock-row">
          <div className="stock-counter">
            <BookOpen size={14} className="stock-icon" />
            <span>
              <strong>{available}</strong> of <strong>{total}</strong> in stock
            </span>
          </div>
          <span className={`badge-status ${statusBadge.className}`}>
            {statusBadge.label}
          </span>
        </div>

        {}
        <div className="stock-progress-track">
          <div
            className="stock-progress-bar"
            style={{ width: `${Math.round((available / total) * 100)}%` }}
            title={`${available} of ${total} copies remaining`}
          />
        </div>

        {}
        <div className="book-card-actions">
          {}
          {available > 0 ? (
            <button
              type="button"
              className="btn btn-primary btn-action-borrow"
              onClick={() => openModal('borrow', book)}
              title="Borrow this book"
            >
              <BookmarkCheck size={16} />
              <span>Borrow</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-disabled btn-action-borrow"
              disabled
              title="All copies are currently borrowed"
            >
              <BookmarkCheck size={16} />
              <span>Checked Out</span>
            </button>
          )}

          {}
          {borrowedCount > 0 && (
            <button
              type="button"
              className="btn btn-return btn-action-return"
              onClick={() => {
                if (activeBorrowers.length === 1) {
                  openModal('confirmReturn', {
                    recordId: activeBorrowers[0].id,
                    bookTitle: book.title,
                    borrowerName: activeBorrowers[0].borrowerName
                  });
                } else {
                  
                  openModal('detail', book);
                }
              }}
              title={`Return a borrowed copy (${borrowedCount} out)`}
            >
              <RotateCcw size={15} />
              <span>Return</span>
            </button>
          )}

          {}
          <div className="book-card-icon-actions">
            <button
              type="button"
              className="icon-btn icon-btn--detail"
              onClick={() => openModal('detail', book)}
              title="View full details"
              aria-label="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              type="button"
              className="icon-btn icon-btn--edit"
              onClick={() => openModal('edit', book)}
              title="Edit book metadata"
              aria-label="Edit Book"
            >
              <Edit2 size={16} />
            </button>
            <button
              type="button"
              className="icon-btn icon-btn--delete"
              onClick={() => openModal('delete', book)}
              title="Delete from collection"
              aria-label="Delete Book"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
