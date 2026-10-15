import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Calendar,
  Building,
  Hash,
  BookmarkCheck,
  Edit2,
  Clock,
  User,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

const BookModal = ({ book, onClose }) => {
  const { openModal, getBookActiveBorrowers, returnBook } = useLibrary();
  const [imgError, setImgError] = useState(false);

  if (!book) return null;

  const fallbackCover = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300';
  const available = Number(book.availableCopies) || 0;
  const total = Number(book.totalCopies) || 1;
  const activeBorrowers = getBookActiveBorrowers(book.id);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-window modal-lg" onClick={(e) => e.stopPropagation()}>
        {}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-eyebrow">{book.category} Archival Record</span>
            <h2 className="modal-title">{book.title}</h2>
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
        <div className="modal-body book-modal-grid">
          {}
          <div className="book-modal-sidebar">
            <div className="book-modal-cover-frame">
              <img
                src={imgError || !book.cover ? fallbackCover : book.cover}
                alt={book.title}
                className="book-modal-cover-img"
                onError={() => setImgError(true)}
              />
            </div>

            <div className="book-modal-stock-box">
              <div className="stock-box-row">
                <span className="stock-box-label">Available Copies:</span>
                <span className={`stock-box-value ${available > 0 ? 'text-amber' : 'text-danger'}`}>
                  {available} of {total}
                </span>
              </div>
              <div className="stock-progress-track">
                <div
                  className="stock-progress-bar"
                  style={{ width: `${Math.round((available / total) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {}
          <div className="book-modal-content">
            <div className="detail-meta-grid">
              <div className="detail-meta-item">
                <User size={16} className="detail-meta-icon" />
                <div>
                  <span className="detail-meta-label">Author</span>
                  <span className="detail-meta-val">{book.author}</span>
                </div>
              </div>

              <div className="detail-meta-item">
                <Hash size={16} className="detail-meta-icon" />
                <div>
                  <span className="detail-meta-label">ISBN Code</span>
                  <span className="detail-meta-val mono">{book.isbn}</span>
                </div>
              </div>

              <div className="detail-meta-item">
                <Building size={16} className="detail-meta-icon" />
                <div>
                  <span className="detail-meta-label">Publisher</span>
                  <span className="detail-meta-val">{book.publisher || 'N/A'}</span>
                </div>
              </div>

              <div className="detail-meta-item">
                <Calendar size={16} className="detail-meta-icon" />
                <div>
                  <span className="detail-meta-label">Publication Year</span>
                  <span className="detail-meta-val">{book.year || 'N/A'}</span>
                </div>
              </div>
            </div>

            {}
            <div className="book-modal-section">
              <h4 className="detail-section-title">
                <BookOpen size={16} /> Synopsis &amp; Overview
              </h4>
              <p className="book-modal-desc">
                {book.description ||
                  'No archival overview provided for this volume in the catalog.'}
              </p>
            </div>

            {}
            <div className="book-modal-section">
              <h4 className="detail-section-title">
                <Clock size={16} /> Current Borrowers ({activeBorrowers.length})
              </h4>
              {activeBorrowers.length > 0 ? (
                <div className="borrowers-list">
                  {activeBorrowers.map((borrower) => (
                    <div
                      key={borrower.id}
                      className={`borrower-item-card ${borrower.status === 'overdue' ? 'borrower-item-card--overdue' : ''}`}
                    >
                      <div className="borrower-info">
                        <span className="borrower-name">
                          <strong>{borrower.borrowerName}</strong>
                          {borrower.status === 'overdue' && (
                            <span className="badge-status badge-status--overdue badge-sm">
                              <AlertTriangle size={12} /> Overdue
                            </span>
                          )}
                        </span>
                        <div className="borrower-dates">
                          <span>Borrowed: {borrower.borrowDate}</span>
                          <span className="date-sep">•</span>
                          <span>Due: {borrower.dueDate}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => returnBook(borrower.id)}
                        title="Mark copy returned from this patron"
                      >
                        <RotateCcw size={14} />
                        <span>Return Copy</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-borrowers-note">
                  All copies of this volume are currently shelved and available for loan.
                </div>
              )}
            </div>
          </div>
        </div>

        {}
        <div className="modal-footer">
          <div className="modal-footer-left">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onClose();
                openModal('edit', book);
              }}
            >
              <Edit2 size={16} />
              <span>Edit Volume</span>
            </button>
          </div>

          <div className="modal-footer-right">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            {available > 0 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  openModal('borrow', book);
                }}
              >
                <BookmarkCheck size={16} />
                <span>Borrow This Book</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
