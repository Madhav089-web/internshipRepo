import React from 'react';
import { useEventContext } from '../context/EventContext';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  User,
  Phone,
  Mail,
  Printer,
  X,
  Sparkles,
  QrCode
} from 'lucide-react';

export default function RegistrationSuccessModal() {
  const { confirmedTicket, closeConfirmedTicket, setActiveView } = useEventContext();

  if (!confirmedTicket) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleGoToRegistrations = () => {
    closeConfirmedTicket();
    setActiveView('my-registrations');
  };

  const formattedDate = (() => {
    try {
      const d = new Date(confirmedTicket.eventDate);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return confirmedTicket.eventDate;
    }
  })();

  return (
    <div className="modal-backdrop" onClick={closeConfirmedTicket} role="dialog" aria-modal="true">
      <div className="modal-dialog success-ticket-dialog" onClick={(e) => e.stopPropagation()}>
        {}
        <button
          className="modal-close-icon-btn"
          onClick={closeConfirmedTicket}
          aria-label="Close ticket"
        >
          <X size={20} />
        </button>

        {}
        <div className="success-header">
          <div className="success-check-badge">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="success-title">Booking Confirmed!</h2>
          <p className="success-subtitle">
            Your registration is locked in. Present your reference ID or digital ticket at venue check-in.
          </p>
        </div>

        {}
        <div className="ticket-pass-card" id="printable-ticket">
          {}
          <div className="ticket-header">
            <div className="ticket-brand">
              <span className="ticket-brand-emoji">🎪</span>
              <span className="ticket-brand-name">EventEase Pass</span>
            </div>
            <div className="ticket-ref-pill">
              <span className="ref-label">REF ID:</span>
              <strong className="ref-val">{confirmedTicket.referenceId}</strong>
            </div>
          </div>

          {}
          <div className="ticket-body">
            <h3 className="ticket-event-title">{confirmedTicket.eventTitle}</h3>

            <div className="ticket-grid">
              <div className="ticket-col">
                <span className="ticket-col-label">ATTENDEE</span>
                <span className="ticket-col-val">{confirmedTicket.fullName}</span>
              </div>
              <div className="ticket-col">
                <span className="ticket-col-label">TICKETS</span>
                <span className="ticket-col-val">{confirmedTicket.tickets} Pass(es)</span>
              </div>
              <div className="ticket-col">
                <span className="ticket-col-label">DATE &amp; TIME</span>
                <span className="ticket-col-val">
                  {formattedDate} • {confirmedTicket.eventTime}
                </span>
              </div>
              <div className="ticket-col">
                <span className="ticket-col-label">LOCATION</span>
                <span className="ticket-col-val">
                  {confirmedTicket.eventVenue}, {confirmedTicket.eventCity}
                </span>
              </div>
              <div className="ticket-col">
                <span className="ticket-col-label">AMOUNT PAID</span>
                <span className="ticket-col-val">
                  {confirmedTicket.totalPrice === 0
                    ? 'FREE PASS'
                    : `₹${confirmedTicket.totalPrice.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="ticket-col">
                <span className="ticket-col-label">STATUS</span>
                <span className="ticket-status-verified">CONFIRMED ✓</span>
              </div>
            </div>
          </div>

          {}
          <div className="ticket-perforation">
            <div className="notch notch-left"></div>
            <div className="dashed-line"></div>
            <div className="notch notch-right"></div>
          </div>

          {}
          <div className="ticket-stub">
            <div className="stub-qr-mock">
              {}
              <div className="qr-box">
                <div className="qr-pixel-grid">
                  <div className="qr-corner tl"></div>
                  <div className="qr-corner tr"></div>
                  <div className="qr-corner bl"></div>
                  <div className="qr-center-dot"></div>
                </div>
              </div>
            </div>
            <div className="stub-info">
              <span className="stub-scan-text">SCAN FOR ENTRY</span>
              <span className="stub-code">{confirmedTicket.referenceId}</span>
              <span className="stub-terms">Non-transferable • Government ID required</span>
            </div>
          </div>
        </div>

        {}
        <div className="ticket-actions-row">
          <button className="print-ticket-btn" onClick={handlePrint}>
            <Printer size={17} />
            <span>Print Ticket</span>
          </button>
          <button className="view-my-bookings-btn" onClick={handleGoToRegistrations}>
            <Ticket size={17} />
            <span>Go to My Registrations</span>
          </button>
        </div>
      </div>
    </div>
  );
}
