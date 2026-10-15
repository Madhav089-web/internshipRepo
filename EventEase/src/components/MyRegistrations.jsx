import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  AlertCircle,
  ExternalLink,
  Printer,
  Sparkles,
  Search,
  CheckCircle2,
  X
} from 'lucide-react';

export default function MyRegistrations() {
  const { registrations, cancelRegistration, setActiveView } = useEventContext();
  const [cancelingId, setCancelingId] = useState(null);
  const [regSearch, setRegSearch] = useState('');

  const filteredRegistrations = registrations.filter((reg) => {
    if (!regSearch.trim()) return true;
    const q = regSearch.toLowerCase().trim();
    return (
      reg.eventTitle.toLowerCase().includes(q) ||
      reg.referenceId.toLowerCase().includes(q) ||
      reg.eventCity.toLowerCase().includes(q) ||
      reg.fullName.toLowerCase().includes(q)
    );
  });

  const handleConfirmCancel = (id) => {
    cancelRegistration(id);
    setCancelingId(null);
  };

  const handlePrintBooking = (reg) => {
    window.print();
  };

  return (
    <div className="registrations-page-container">
      {}
      <div className="page-header-block">
        <div className="page-header-badge">
          <Ticket size={16} />
          <span>My Passports &amp; Bookings</span>
        </div>
        <h1 className="page-title">My Event Registrations</h1>
        <p className="page-subtitle">
          Manage your registered experiences, download ticket passes, or release seats if your
          schedule changes.
        </p>
      </div>

      {}
      {registrations.length > 0 && (
        <div className="registrations-controls-bar">
          <div className="reg-search-wrap">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Filter by event title, reference ID, or city..."
              value={regSearch}
              onChange={(e) => setRegSearch(e.target.value)}
              className="reg-search-input"
            />
            {regSearch && (
              <button className="clear-search-btn" onClick={() => setRegSearch('')}>
                <X size={16} />
              </button>
            )}
          </div>
          <div className="reg-count-tag">
            Total Bookings: <strong>{registrations.length}</strong>
          </div>
        </div>
      )}

      {}
      {filteredRegistrations.length > 0 ? (
        <div className="registrations-grid">
          {filteredRegistrations.map((reg) => {
            const formattedDate = (() => {
              try {
                return new Date(reg.eventDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
              } catch {
                return reg.eventDate;
              }
            })();

            return (
              <div key={reg.id} className="registration-card">
                {}
                <div className="reg-card-top">
                  <img
                    src={reg.eventImage}
                    alt={reg.eventTitle}
                    className="reg-card-img"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="reg-card-img-overlay"></div>
                  <div className="reg-ref-pill">
                    <span className="ref-tag-label">REF ID:</span>
                    <strong className="ref-tag-code">{reg.referenceId}</strong>
                  </div>
                </div>

                {}
                <div className="reg-card-body">
                  <h3 className="reg-event-title">{reg.eventTitle}</h3>

                  <div className="reg-meta-list">
                    <div className="reg-meta-item">
                      <Calendar size={15} className="teal-icon" />
                      <span>{formattedDate} {reg.eventTime ? `at ${reg.eventTime}` : ''}</span>
                    </div>

                    <div className="reg-meta-item">
                      <MapPin size={15} className="coral-icon" />
                      <span>{reg.eventVenue}, {reg.eventCity}</span>
                    </div>

                    <div className="reg-meta-item">
                      <Ticket size={15} className="purple-icon" />
                      <span>
                        <strong>{reg.tickets} Ticket(s)</strong> • Attendee: {reg.fullName}
                      </span>
                    </div>
                  </div>

                  {}
                  <div className="reg-pricing-strip">
                    <div className="reg-price-info">
                      <span className="reg-price-label">Paid Amount</span>
                      <span className="reg-price-amount">
                        {reg.totalPrice === 0 ? 'FREE' : `₹${reg.totalPrice.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                    <span className="reg-confirmed-chip">
                      <CheckCircle2 size={13} /> Confirmed
                    </span>
                  </div>

                  {}
                  <div className="reg-card-footer">
                    <button
                      type="button"
                      className="reg-print-btn"
                      onClick={() => handlePrintBooking(reg)}
                      title="Print ticket pass"
                    >
                      <Printer size={15} />
                      <span>Print</span>
                    </button>

                    <button
                      type="button"
                      className="reg-cancel-btn"
                      onClick={() => setCancelingId(reg.id)}
                      title="Cancel this registration"
                    >
                      <Trash2 size={15} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : registrations.length === 0 ? (
        
        <div className="empty-registrations-card">
          <div className="empty-reg-icon-box">
            <Ticket size={48} className="empty-ticket-icon" />
          </div>
          <h2 className="empty-reg-title">No Active Registrations</h2>
          <p className="empty-reg-desc">
            You haven't booked any event tickets yet! Explore our trending conferences, concerts,
            food walks, and workshops to secure your first pass.
          </p>
          <button
            className="explore-now-btn"
            onClick={() => setActiveView('events')}
          >
            <Sparkles size={18} />
            <span>Browse All Events</span>
          </button>
        </div>
      ) : (
        /* No filter match state */
        <div className="empty-registrations-card">
          <div className="empty-reg-icon-box">
            <Search size={40} className="empty-ticket-icon" />
          </div>
          <h3 className="empty-reg-title">No Bookings Match "{regSearch}"</h3>
          <p className="empty-reg-desc">Try clearing your search query to see all your registrations.</p>
          <button className="empty-reset-btn" onClick={() => setRegSearch('')}>
            Clear Filter
          </button>
        </div>
      )}

      {/* Confirmation Dialog for Cancellation */}
      {cancelingId && (
        <div className="modal-backdrop" onClick={() => setCancelingId(null)}>
          <div
            className="modal-dialog cancel-confirm-dialog"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
          >
            <div className="confirm-icon-wrap">
              <AlertCircle size={36} className="danger-icon" />
            </div>
            <h3 className="confirm-title">Cancel Registration?</h3>
            <p className="confirm-desc">
              Are you sure you want to cancel this event registration? This will release your reserved
              seats back to the public pool. This action cannot be undone.
            </p>
            <div className="confirm-actions">
              <button
                className="confirm-back-btn"
                onClick={() => setCancelingId(null)}
              >
                Keep Registration
              </button>
              <button
                className="confirm-delete-btn"
                onClick={() => handleConfirmCancel(cancelingId)}
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
