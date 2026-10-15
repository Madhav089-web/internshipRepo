import React, { useState } from 'react';
import { X, BookmarkCheck, Calendar, User, BookOpen, AlertCircle } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { getRelativeDate } from '../data/books';

const BorrowModal = ({ book, onClose }) => {
  const { borrowBook } = useLibrary();
  const [borrowerName, setBorrowerName] = useState('');
  const [error, setError] = useState('');

  if (!book) return null;

  const todayStr = getRelativeDate(0);
  const dueStr = getRelativeDate(14);

  const formatDisplayDate = (dateStr) => {
    try {
      const parts = dateStr.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!borrowerName.trim()) {
      setError('Please enter the patron / borrower name.');
      return;
    }
    if (borrowerName.trim().length < 2) {
      setError('Borrower name must contain at least 2 characters.');
      return;
    }

    borrowBook(book.id, borrowerName);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window modal-md" onClick={(e) => e.stopPropagation()}>
        {}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-eyebrow">Circulation Checkout</span>
            <h2 className="modal-title">Borrow Book</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {}
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {}
            <div className="borrow-summary-card">
              <div className="borrow-summary-header">
                <BookOpen size={20} className="borrow-summary-icon" />
                <div>
                  <h3 className="borrow-summary-title">{book.title}</h3>
                  <p className="borrow-summary-author">By {book.author}</p>
                </div>
              </div>
              <div className="borrow-summary-details">
                <span className="borrow-summary-badge">{book.category}</span>
                <span className="borrow-summary-badge mono">ISBN: {book.isbn}</span>
                <span className="borrow-summary-badge available-badge">
                  {book.availableCopies} Copies Available
                </span>
              </div>
            </div>

            {}
            <div className="loan-schedule-box">
              <div className="schedule-item">
                <Calendar size={16} className="text-amber" />
                <div>
                  <span className="schedule-label">Issue Date (Today):</span>
                  <span className="schedule-val">{formatDisplayDate(todayStr)}</span>
                </div>
              </div>

              <div className="schedule-divider" />

              <div className="schedule-item">
                <Calendar size={16} className="text-gold" />
                <div>
                  <span className="schedule-label">Due Date (14 Days Loan):</span>
                  <strong className="schedule-val highlight-gold">
                    {formatDisplayDate(dueStr)}
                  </strong>
                </div>
              </div>
            </div>

            {}
            <div className="form-group mt-4">
              <label htmlFor="borrower-name" className="form-label required">
                Patron / Borrower Full Name
              </label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  id="borrower-name"
                  type="text"
                  autoFocus
                  className={`form-input pl-10 ${error ? 'form-input--error' : ''}`}
                  placeholder="e.g. Jonathan Edwards"
                  value={borrowerName}
                  onChange={(e) => {
                    setBorrowerName(e.target.value);
                    if (error) setError('');
                  }}
                />
              </div>
              {error && (
                <div className="form-error-row">
                  <AlertCircle size={14} />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          {}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <BookmarkCheck size={16} />
              <span>Confirm &amp; Issue Loan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowModal;
