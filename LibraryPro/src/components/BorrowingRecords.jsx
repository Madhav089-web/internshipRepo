import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  BookOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

const BorrowingRecords = () => {
  const { borrowingRecords, returnBook, openModal, setActiveView } = useLibrary();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); 

  
  const filteredRecords = useMemo(() => {
    return borrowingRecords.filter((rec) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        rec.bookTitle?.toLowerCase().includes(q) ||
        rec.borrowerName?.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'All' || rec.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [borrowingRecords, searchQuery, statusFilter]);

  
  const counts = useMemo(() => {
    return {
      all: borrowingRecords.length,
      active: borrowingRecords.filter((r) => r.status === 'active').length,
      overdue: borrowingRecords.filter((r) => r.status === 'overdue').length,
      returned: borrowingRecords.filter((r) => r.status === 'returned').length
    };
  }, [borrowingRecords]);

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '—';
    try {
      const parts = dateStr.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <section className="records-section" aria-label="Borrowing Records">
      {}
      <div className="records-header-bar">
        <div>
          <h2 className="section-title">
            <span>Circulation &amp; Borrowing Log</span>
          </h2>
          <p className="section-subtitle">
            Audited history of book checkouts, patron assignments, due dates, and return statuses.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setActiveView('catalog')}
        >
          <Layers size={16} />
          <span>Back to Catalog</span>
        </button>
      </div>

      {}
      <div className="records-filter-toolbar">
        <div className="records-status-pills">
          <button
            type="button"
            className={`status-pill ${statusFilter === 'All' ? 'status-pill--active' : ''}`}
            onClick={() => setStatusFilter('All')}
          >
            All Logs ({counts.all})
          </button>
          <button
            type="button"
            className={`status-pill status-pill--active-loan ${statusFilter === 'active' ? 'status-pill--active' : ''}`}
            onClick={() => setStatusFilter('active')}
          >
            <Clock size={14} />
            <span>Active ({counts.active})</span>
          </button>
          <button
            type="button"
            className={`status-pill status-pill--overdue-loan ${statusFilter === 'overdue' ? 'status-pill--active' : ''}`}
            onClick={() => setStatusFilter('overdue')}
          >
            <AlertTriangle size={14} />
            <span>Overdue ({counts.overdue})</span>
          </button>
          <button
            type="button"
            className={`status-pill status-pill--returned-loan ${statusFilter === 'returned' ? 'status-pill--active' : ''}`}
            onClick={() => setStatusFilter('returned')}
          >
            <CheckCircle2 size={14} />
            <span>Returned ({counts.returned})</span>
          </button>
        </div>

        {}
        <div className="records-search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search patron or book title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {}
      <div className="table-responsive-container">
        <table className="library-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Borrower / Patron</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => {
                const isOverdue = record.status === 'overdue';
                const isReturned = record.status === 'returned';

                return (
                  <tr
                    key={record.id}
                    className={`table-row ${isOverdue ? 'table-row--overdue' : ''}`}
                  >
                    {}
                    <td className="cell-book-title">
                      <div className="cell-book-wrap">
                        <BookOpen size={16} className="cell-book-icon" />
                        <div>
                          <strong className="book-title-text">{record.bookTitle}</strong>
                          <span className="record-id-sub mono">Ref: #{record.id}</span>
                        </div>
                      </div>
                    </td>

                    {}
                    <td className="cell-borrower">
                      <div className="cell-user-wrap">
                        <User size={15} className="cell-user-icon" />
                        <span className="borrower-name-text">{record.borrowerName}</span>
                      </div>
                    </td>

                    {}
                    <td className="cell-date">
                      <span className="date-text">
                        {formatDateDisplay(record.borrowDate)}
                      </span>
                    </td>

                    {}
                    <td className="cell-date">
                      <div className="due-date-wrap">
                        <span className={`date-text ${isOverdue ? 'text-danger font-semibold' : ''}`}>
                          {formatDateDisplay(record.dueDate)}
                        </span>
                        {isOverdue && (
                          <span className="overdue-sub-label">Past Due Date</span>
                        )}
                        {isReturned && record.returnDate && (
                          <span className="returned-sub-label">
                            Returned on {formatDateDisplay(record.returnDate)}
                          </span>
                        )}
                      </div>
                    </td>

                    {}
                    <td className="cell-status">
                      {isOverdue && (
                        <span className="badge-status badge-status--overdue">
                          <AlertTriangle size={13} />
                          <span>Overdue</span>
                        </span>
                      )}
                      {record.status === 'active' && (
                        <span className="badge-status badge-status--borrowed">
                          <Clock size={13} />
                          <span>Active Loan</span>
                        </span>
                      )}
                      {isReturned && (
                        <span className="badge-status badge-status--available">
                          <CheckCircle2 size={13} />
                          <span>Returned</span>
                        </span>
                      )}
                    </td>

                    {}
                    <td className="cell-actions text-right">
                      {!isReturned ? (
                        <button
                          type="button"
                          className="btn btn-return btn-sm"
                          onClick={() =>
                            openModal('confirmReturn', {
                              recordId: record.id,
                              bookTitle: record.bookTitle,
                              borrowerName: record.borrowerName
                            })
                          }
                          title="Record book return from patron"
                        >
                          <RotateCcw size={14} />
                          <span>Return Book</span>
                        </button>
                      ) : (
                        <span className="completed-badge">
                          <CheckCircle2 size={14} /> Completed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="empty-table-cell">
                  <div className="empty-table-state">
                    <p className="empty-title">No Borrowing Records Found</p>
                    <p className="empty-sub">
                      No circulation logs match "{searchQuery}" under status "{statusFilter}".
                    </p>
                    {(searchQuery || statusFilter !== 'All') && (
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm mt-2"
                        onClick={() => {
                          setSearchQuery('');
                          setStatusFilter('All');
                        }}
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default BorrowingRecords;
