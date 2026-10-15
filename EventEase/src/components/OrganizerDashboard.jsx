import React, { useState, useMemo } from 'react';
import { useEventContext } from '../context/EventContext';
import {
  Calendar,
  Users,
  Plus,
  Edit3,
  Trash2,
  TrendingUp,
  Search,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BarChart3,
  DollarSign
} from 'lucide-react';

export default function OrganizerDashboard() {
  const {
    events,
    registrations,
    openAddModal,
    openEditModal,
    removeEvent,
    resetToSampleData
  } = useEventContext();

  const [tableSearch, setTableSearch] = useState('');
  const [deletingEventId, setDeletingEventId] = useState(null);

  
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((sum, e) => sum + (e.registered || 0), 0);
  const totalCapacity = events.reduce((sum, e) => sum + (e.capacity || 0), 0);
  const overallOccupancy = totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;
  const estimatedRevenue = events.reduce((sum, e) => sum + (e.registered || 0) * (e.price || 0), 0);

  
  const filteredEvents = useMemo(() => {
    if (!tableSearch.trim()) return events;
    const q = tableSearch.toLowerCase().trim();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q)
    );
  }, [events, tableSearch]);

  const handleConfirmDelete = (id) => {
    removeEvent(id);
    setDeletingEventId(null);
  };

  return (
    <div className="organizer-container">
      {}
      <div className="organizer-header-row">
        <div>
          <div className="page-header-badge">
            <BarChart3 size={16} />
            <span>Management Console</span>
          </div>
          <h1 className="page-title">Organizer Dashboard</h1>
          <p className="page-subtitle">
            Manage your event inventory, track ticket sales, edit schedule details, and launch new
            experiences.
          </p>
        </div>

        <div className="organizer-header-actions">
          <button
            type="button"
            className="secondary-outline-btn reset-data-btn"
            onClick={resetToSampleData}
            title="Restore initial 22+ events dataset"
          >
            <RotateCcw size={16} />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="button"
            className="organizer-add-btn"
            onClick={openAddModal}
          >
            <Plus size={18} />
            <span>Add New Event</span>
          </button>
        </div>
      </div>

      {}
      <div className="kpi-grid">
        <div className="kpi-card teal-border">
          <div className="kpi-icon-wrap teal-glow">
            <Calendar size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Total Active Events</span>
            <span className="kpi-value">{totalEvents}</span>
            <span className="kpi-sub">Across {new Set(events.map((e) => e.city)).size} cities</span>
          </div>
        </div>

        <div className="kpi-card coral-border">
          <div className="kpi-icon-wrap coral-glow">
            <Users size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Total Registrations</span>
            <span className="kpi-value">{totalRegistrations.toLocaleString()}</span>
            <span className="kpi-sub">Attendees booked</span>
          </div>
        </div>

        <div className="kpi-card emerald-border">
          <div className="kpi-icon-wrap emerald-glow">
            <TrendingUp size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Capacity Utilization</span>
            <span className="kpi-value">{overallOccupancy}%</span>
            <span className="kpi-sub">{totalCapacity.toLocaleString()} total venue seats</span>
          </div>
        </div>

        <div className="kpi-card purple-border">
          <div className="kpi-icon-wrap purple-glow">
            <DollarSign size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-title">Gross Volume</span>
            <span className="kpi-value">₹{estimatedRevenue.toLocaleString('en-IN')}</span>
            <span className="kpi-sub">Simulated ticketing turnover</span>
          </div>
        </div>
      </div>

      {}
      <div className="table-card-wrapper">
        <div className="table-card-header">
          <div className="table-card-title-group">
            <h3 className="table-card-title">Live Event Catalog</h3>
            <span className="table-counter-tag">{filteredEvents.length} Events</span>
          </div>

          <div className="table-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search table by title, category, city..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="table-search-input"
            />
          </div>
        </div>

        {}
        <div className="table-responsive">
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Info</th>
                <th>Category</th>
                <th>Date &amp; Time</th>
                <th>Location</th>
                <th>Pricing</th>
                <th>Capacity &amp; Reg.</th>
                <th>Occupancy</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((ev) => {
                const occupancyPercent = Math.min(
                  100,
                  Math.round(((ev.registered || 0) / (ev.capacity || 1)) * 100)
                );
                return (
                  <tr key={ev.id}>
                    {}
                    <td className="event-info-cell">
                      <div className="table-media-group">
                        <img
                          src={ev.image}
                          alt={ev.title}
                          className="table-thumbnail"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
                          }}
                        />
                        <div>
                          <strong className="table-event-name">{ev.title}</strong>
                          {ev.featured && (
                            <span className="table-featured-pill">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>

                    {}
                    <td>
                      <span className="table-category-badge">{ev.category}</span>
                    </td>

                    {}
                    <td>
                      <div className="table-datetime-cell">
                        <span className="date-main">{ev.date}</span>
                        <span className="time-sub">{ev.time}</span>
                      </div>
                    </td>

                    {}
                    <td>
                      <div className="table-location-cell" title={`${ev.venue}, ${ev.city}`}>
                        <span className="venue-name">{ev.venue}</span>
                        <span className="city-name">{ev.city}</span>
                      </div>
                    </td>

                    {}
                    <td>
                      <strong className="table-price">
                        {ev.price === 0 ? 'FREE' : `₹${ev.price.toLocaleString('en-IN')}`}
                      </strong>
                    </td>

                    {}
                    <td>
                      <div className="table-reg-cell">
                        <strong>{ev.registered}</strong> / {ev.capacity}
                      </div>
                    </td>

                    {}
                    <td>
                      <div className="table-progress-wrap">
                        <div className="table-progress-track">
                          <div
                            className={`table-progress-bar ${occupancyPercent >= 90 ? 'progress-danger' : ''}`}
                            style={{ width: `${occupancyPercent}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{occupancyPercent}%</span>
                      </div>
                    </td>

                    {}
                    <td className="text-right table-actions-cell">
                      <div className="table-action-btns">
                        <button
                          type="button"
                          className="action-btn edit-action-btn"
                          onClick={() => openEditModal(ev)}
                          title="Edit Event"
                        >
                          <Edit3 size={16} />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          type="button"
                          className="action-btn delete-action-btn"
                          onClick={() => setDeletingEventId(ev.id)}
                          title="Delete Event"
                        >
                          <Trash2 size={16} />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredEvents.length === 0 && (
          <div className="empty-table-state">
            <p>No events found matching your search term.</p>
          </div>
        )}
      </div>

      {}
      {deletingEventId && (
        <div className="modal-backdrop" onClick={() => setDeletingEventId(null)}>
          <div
            className="modal-dialog cancel-confirm-dialog"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
          >
            <div className="confirm-icon-wrap">
              <AlertTriangle size={36} className="danger-icon" />
            </div>
            <h3 className="confirm-title">Delete Event?</h3>
            <p className="confirm-desc">
              Are you sure you want to permanently delete this event? This will also remove any
              attendee bookings associated with it. This action cannot be reversed.
            </p>
            <div className="confirm-actions">
              <button
                className="confirm-back-btn"
                onClick={() => setDeletingEventId(null)}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-btn"
                onClick={() => handleConfirmDelete(deletingEventId)}
              >
                Yes, Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
