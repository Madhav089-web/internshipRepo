import React, { useState } from 'react';
import { useEventContext } from '../context/EventContext';
import {
  X,
  Ticket,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  User,
  Mail,
  Phone,
  Minus,
  Plus,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export default function RegistrationForm() {
  const {
    selectedEvent,
    isRegisterModalOpen,
    closeRegisterModal,
    registerForEvent
  } = useEventContext();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    tickets: 1
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isRegisterModalOpen || !selectedEvent) return null;

  const remainingSeats = Math.max(0, (selectedEvent.capacity || 0) - (selectedEvent.registered || 0));
  const maxAllowedTickets = Math.min(5, Math.max(1, remainingSeats));

  const validate = () => {
    const errs = {};

    
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 3) {
      errs.fullName = 'Name must be at least 3 characters.';
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g., user@example.com).';
    }

    
    const phoneClean = formData.phone.replace(/[\s-]/g, '');
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneClean) {
      errs.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(phoneClean)) {
      errs.phone = 'Phone number must be exactly 10 digits.';
    }

    
    const tCount = parseInt(formData.tickets, 10);
    if (!tCount || tCount < 1) {
      errs.tickets = 'Must select at least 1 ticket.';
    } else if (tCount > maxAllowedTickets) {
      errs.tickets = `Cannot exceed ${maxAllowedTickets} ticket(s) (remaining limit).`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleTicketChange = (delta) => {
    const nextVal = Math.max(1, Math.min(maxAllowedTickets, formData.tickets + delta));
    setFormData((prev) => ({ ...prev, tickets: nextVal }));
    if (errors.tickets) {
      setErrors((prev) => ({ ...prev, tickets: undefined }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    setTimeout(() => {
      const created = registerForEvent(selectedEvent.id, formData);
      setIsSubmitting(false);
      if (created) {
        
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          tickets: 1
        });
      }
    }, 400);
  };

  const totalPrice = formData.tickets * (selectedEvent.price || 0);

  return (
    <div className="modal-backdrop" onClick={closeRegisterModal} role="dialog" aria-modal="true">
      <div className="modal-dialog reg-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {}
        <div className="modal-header">
          <div className="modal-header-icon-wrap">
            <Ticket size={22} className="modal-header-icon" />
          </div>
          <div>
            <h2 className="modal-header-title">Event Registration</h2>
            <p className="modal-header-subtitle">Secure your passes for {selectedEvent.title}</p>
          </div>
          <button
            className="modal-close-icon-btn"
            onClick={closeRegisterModal}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {}
        <div className="demo-warning-banner">
          <AlertTriangle size={18} className="warning-icon" />
          <div>
            <strong>Notice:</strong> Sample event for demonstration. No real payment is processed.
          </div>
        </div>

        {}
        <div className="event-snapshot-card">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="snapshot-img"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="snapshot-details">
            <span className="snapshot-badge">{selectedEvent.category}</span>
            <h4 className="snapshot-title">{selectedEvent.title}</h4>
            <div className="snapshot-meta">
              <span>📅 {selectedEvent.date} ({selectedEvent.time})</span>
              <span>📍 {selectedEvent.venue}, {selectedEvent.city}</span>
            </div>
          </div>
        </div>

        {}
        <form onSubmit={handleSubmit} className="registration-form" noValidate>
          {}
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Full Name <span className="req-star">*</span>
            </label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="e.g., Chandan Kumar"
                className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                value={formData.fullName}
                onChange={handleChange}
                autoFocus
              />
            </div>
            {errors.fullName && <p className="error-message">{errors.fullName}</p>}
          </div>

          {}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email Address <span className="req-star">*</span>
            </label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g., chandan.dev@example.com"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {}
          <div className="form-group">
            <label className="form-label" htmlFor="phone">
              Phone Number (10 Digits) <span className="req-star">*</span>
            </label>
            <div className="input-with-icon">
              <Phone size={18} className="field-icon" />
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                className={`form-input ${errors.phone ? 'input-error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          {}
          <div className="form-group">
            <label className="form-label">
              Number of Tickets (1 - {maxAllowedTickets} max) <span className="req-star">*</span>
            </label>
            <div className="ticket-spinner-wrapper">
              <div className="ticket-spinner">
                <button
                  type="button"
                  className="spinner-btn"
                  onClick={() => handleTicketChange(-1)}
                  disabled={formData.tickets <= 1}
                  aria-label="Decrease tickets"
                >
                  <Minus size={16} />
                </button>
                <span className="spinner-value">{formData.tickets}</span>
                <button
                  type="button"
                  className="spinner-btn"
                  onClick={() => handleTicketChange(1)}
                  disabled={formData.tickets >= maxAllowedTickets}
                  aria-label="Increase tickets"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="spinner-hint">
                Seats left: <strong>{remainingSeats}</strong>
              </span>
            </div>
            {errors.tickets && <p className="error-message">{errors.tickets}</p>}
          </div>

          {}
          <div className="pricing-summary-box">
            <div className="pricing-row">
              <span>Price per attendee:</span>
              <span className="pricing-val">
                {selectedEvent.price === 0 ? 'FREE' : `₹${selectedEvent.price}`}
              </span>
            </div>
            <div className="pricing-row">
              <span>Quantity:</span>
              <span className="pricing-val">{formData.tickets} ticket(s)</span>
            </div>
            <div className="pricing-divider"></div>
            <div className="pricing-row grand-total-row">
              <span>Grand Total:</span>
              <span className="grand-total-val">
                {selectedEvent.price === 0 ? 'FREE' : `₹${totalPrice.toLocaleString('en-IN')}`}
              </span>
            </div>
          </div>

          {}
          <div className="modal-form-actions">
            <button
              type="button"
              className="cancel-form-btn"
              onClick={closeRegisterModal}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="confirm-register-btn"
              disabled={isSubmitting || remainingSeats <= 0}
            >
              {isSubmitting ? (
                <span>Generating Ticket Pass...</span>
              ) : (
                <>
                  <CheckCircle size={18} />
                  <span>
                    Confirm Registration {selectedEvent.price > 0 && `(₹${totalPrice})`}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
