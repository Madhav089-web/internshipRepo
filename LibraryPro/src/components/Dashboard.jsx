import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PlusCircle,
  RotateCcw,
  Library,
  BookMarked,
  Layers
} from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import StatsCard from './StatsCard';

const Dashboard = () => {
  const {
    stats,
    activeView,
    setActiveView,
    openModal,
    resetToSampleData,
    setAvailabilityFilter,
    books
  } = useLibrary();

  const handleStatsFilter = (filterName, targetView = 'catalog') => {
    setActiveView(targetView);
    if (filterName) {
      setAvailabilityFilter(filterName);
    }
  };

  return (
    <header className="dashboard-header">
      {}
      <div className="dashboard-topbar">
        <div className="branding-container">
          <div className="logo-badge">
            <Library className="logo-icon" size={32} />
          </div>
          <div>
            <div className="brand-title-wrap">
              <h1 className="brand-title">LibraryPro</h1>
              <span className="brand-pill">v1.0 Edition</span>
            </div>
            <p className="brand-tagline">
              Curated Archival &amp; Circulation Management System
            </p>
          </div>
        </div>

        {}
        <div className="dashboard-actions">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={resetToSampleData}
            title="Reset catalog and records to original 20 sample books"
          >
            <RotateCcw size={16} />
            <span>Reset Data</span>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => openModal('add')}
          >
            <PlusCircle size={18} />
            <span>Add New Book</span>
          </button>
        </div>
      </div>

      {}
      <div className="stats-grid">
        <StatsCard
          icon={BookOpen}
          label="Total Books"
          value={stats.totalBooks}
          subtext={`${stats.totalCopiesSum} total volume copies`}
          variant="amber"
          onClick={() => handleStatsFilter('All', 'catalog')}
        />
        <StatsCard
          icon={CheckCircle2}
          label="Available Books"
          value={stats.availableBooks}
          subtext={`${stats.availableCopiesSum} copies on shelf`}
          variant="available"
          onClick={() => handleStatsFilter('Available', 'catalog')}
        />
        <StatsCard
          icon={Clock}
          label="Borrowed Books"
          value={stats.borrowedBooks}
          subtext={`${stats.borrowedBooks} active patrons`}
          variant="borrowed"
          onClick={() => handleStatsFilter('Borrowed', 'records')}
        />
        <StatsCard
          icon={AlertTriangle}
          label="Overdue Books"
          value={stats.overdueBooks}
          subtext={stats.overdueBooks > 0 ? "Requires patron follow-up" : "No overdue items"}
          variant="overdue"
          onClick={() => handleStatsFilter('Overdue', 'records')}
        />
      </div>

      {}
      <div className="navigation-bar">
        <nav className="nav-tabs" aria-label="Main Navigation">
          <button
            type="button"
            className={`nav-tab ${activeView === 'catalog' ? 'nav-tab--active' : ''}`}
            onClick={() => setActiveView('catalog')}
          >
            <Layers size={18} />
            <span>Book Catalog</span>
            <span className="nav-tab-badge">{books.length}</span>
          </button>

          <button
            type="button"
            className={`nav-tab ${activeView === 'records' ? 'nav-tab--active' : ''}`}
            onClick={() => setActiveView('records')}
          >
            <BookMarked size={18} />
            <span>Borrowing Records</span>
            <span className={`nav-tab-badge ${stats.overdueBooks > 0 ? 'badge--alert' : ''}`}>
              {stats.borrowedBooks} active
            </span>
          </button>
        </nav>

        {stats.overdueBooks > 0 && (
          <div className="overdue-banner-pill" onClick={() => setActiveView('records')}>
            <AlertTriangle size={15} />
            <span>{stats.overdueBooks} book{stats.overdueBooks > 1 ? 's' : ''} past 14-day due date</span>
          </div>
        )}
      </div>

      {}
      <div className="dashboard-notice">
        <span className="notice-icon">📜</span>
        <p className="notice-text">
          <strong>Circulation Notice:</strong> Standard borrowing period is strictly 14 days from issue date. Books overdue are flagged automatically in red. All updates automatically persist in browser storage.
        </p>
      </div>
    </header>
  );
};

export default Dashboard;
