import React from 'react';
import { useEventContext } from '../context/EventContext';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  Sparkles,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

export default function EventModal() {
  const {
    selectedEvent,
    isEventModalOpen,
    closeEventModal,
    openRegisterModal,
    showToast
  } = useEventContext();

  if (!isEventModalOpen || !selectedEvent) return null;

  const isSoldOut = (selectedEvent.registered || 0) >= (selectedEvent.capacity || 1);
  const remainingSeats = Math.max(0, (selectedEvent.capacity || 0) - (selectedEvent.registered || 0));
  const capacityPercent = Math.min(
    100,
    Math.round(((selectedEvent.registered || 0) / (selectedEvent.capacity || 1)) * 100)
  );

  const formattedDate = (() => {
    try {
      const d = new Date(selectedEvent.date);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return selectedEvent.date;
    }
  })();

  const formatPrice = (price) => {
    if (price === 0 || price === '0') return 'FREE EVENT';
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeEventModal} role="dialog" aria-modal="true">
      <div className="modal-dialog event-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {}
        <button
          className="modal-close-icon-btn"
          onClick={closeEventModal}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {}
        <div className="event-modal-media">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="event-modal-img"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="event-modal-media-overlay"></div>

          <div className="modal-top-badges">
            <span className="category-badge-lg">{selectedEvent.category}</span>
            {selectedEvent.featured && (
              <span className="featured-badge-lg">
                <Sparkles size={14} /> Featured Experience
              </span>
            )}
          </div>

          <div className="modal-price-badge">
            {formatPrice(selectedEvent.price)}
          </div>
        </div>

        {}
        <div className="event-modal-content">
          {}
          <div className="modal-title-row">
            <h2 className="modal-event-title">{selectedEvent.title}</h2>
            <button className="share-btn" onClick={handleShare} title="Share event link">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>

          {}
          <div className="modal-specs-grid">
            <div className="spec-card">
              <Calendar size={18} className="spec-icon teal-icon" />
              <div>
                <span className="spec-label">Date</span>
                <span className="spec-val">{formattedDate}</span>
              </div>
            </div>

            <div className="spec-card">
              <Clock size={18} className="spec-icon coral-icon" />
              <div>
                <span className="spec-label">Time</span>
                <span className="spec-val">{selectedEvent.time} onwards</span>
              </div>
            </div>

            <div className="spec-card">
              <MapPin size={18} className="spec-icon purple-icon" />
              <div>
                <span className="spec-label">Venue</span>
                <span className="spec-val">
                  {selectedEvent.venue}, {selectedEvent.city}
                </span>
              </div>
            </div>

            <div className="spec-card">
              <Ticket size={18} className="spec-icon emerald-icon" />
              <div>
                <span className="spec-label">Ticket Admission</span>
                <span className="spec-val font-semibold">
                  {selectedEvent.price === 0 ? 'Complimentary (Free)' : `₹${selectedEvent.price} / person`}
                </span>
              </div>
            </div>
          </div>

          {}
          <div className="modal-capacity-card">
            <div className="capacity-card-header">
              <div className="capacity-title-wrap">
                <Users size={18} className="capacity-main-icon" />
                <span className="capacity-title">Attendance &amp; Live Availability</span>
              </div>
              <span className="capacity-stat">
                <strong>{selectedEvent.registered}</strong> registered of <strong>{selectedEvent.capacity}</strong> capacity ({capacityPercent}%)
              </span>
            </div>

            <div className="modal-progress-track">
              <div
                className={`modal-progress-fill ${capacityPercent > 85 ? 'fill-warning' : ''}`}
                style={{ width: `${capacityPercent}%` }}
              ></div>
            </div>

            <div className="capacity-card-subtext">
              {isSoldOut ? (
                <span className="sold-out-badge-text">
                  ⛔ Registration has reached full venue capacity.
                </span>
              ) : (
                <span className="seats-left-text">
                  ⚡ <strong>{remainingSeats} seats remaining!</strong> Instant confirmation with booking pass.
                </span>
              )}
            </div>
          </div>

          {}
          <div className="modal-section-block">
            <h3 className="modal-section-heading">About This Event</h3>
            <p className="modal-description-text">{selectedEvent.description}</p>
          </div>

          {}
          <div className="modal-section-block">
            <h3 className="modal-section-heading">Event Highlights &amp; Inclusions</h3>
            <div className="modal-perks-grid">
              <div className="perk-item">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>Instant Digital Ticket with QR verification</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>Complimentary event badge &amp; materials at venue</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>Direct networking with speakers &amp; performers</span>
              </div>
              <div className="perk-item">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>Easy hassle-free cancellation available anytime</span>
              </div>
            </div>
          </div>

          {}
          <div className="modal-actions-footer">
            <div className="modal-footer-price">
              <span className="footer-price-label">Price per ticket</span>
              <span className="footer-price-value">
                {selectedEvent.price === 0 ? 'FREE' : `₹${selectedEvent.price}`}
              </span>
            </div>

            <div className="modal-footer-btns">
              <button className="secondary-outline-btn" onClick={closeEventModal}>
                Close
              </button>
              <button
                className={`primary-register-btn ${isSoldOut ? 'disabled-btn' : ''}`}
                disabled={isSoldOut}
                onClick={() => openRegisterModal(selectedEvent)}
              >
                <Ticket size={18} />
                <span>{isSoldOut ? 'Sold Out' : 'Register Now'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
