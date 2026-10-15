import React from 'react';
import { useEventContext } from '../context/EventContext';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function EventCard({ event }) {
  const { openEventModal, openRegisterModal } = useEventContext();

  const isSoldOut = event.registered >= event.capacity;
  const capacityPercent = Math.min(
    100,
    Math.round(((event.registered || 0) / (event.capacity || 1)) * 100)
  );

  const formattedDate = (() => {
    try {
      const d = new Date(event.date);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return event.date;
    }
  })();

  const formatPrice = (price) => {
    if (price === 0 || price === '0') return 'FREE';
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };

  const getCategoryClass = (cat) => {
    switch (cat?.toLowerCase()) {
      case 'tech':
        return 'cat-tech';
      case 'music':
        return 'cat-music';
      case 'food & drink':
        return 'cat-food';
      case 'business':
        return 'cat-business';
      case 'art':
        return 'cat-art';
      case 'sports':
        return 'cat-sports';
      case 'comedy':
        return 'cat-comedy';
      default:
        return 'cat-default';
    }
  };

  return (
    <article
      className="event-card group"
      onClick={() => openEventModal(event)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openEventModal(event);
        }
      }}
    >
      {}
      <div className="event-card-media">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="event-card-img"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
          }}
        />
        <div className="media-overlay"></div>

        {}
        <div className="event-badges-container">
          <span className={`category-badge ${getCategoryClass(event.category)}`}>
            {event.category}
          </span>
          {event.featured && (
            <span className="featured-badge">
              <Sparkles size={12} /> Featured
            </span>
          )}
        </div>

        {}
        <div className={`price-tag-overlay ${event.price === 0 ? 'free-tag' : ''}`}>
          {formatPrice(event.price)}
        </div>

        {isSoldOut && <div className="sold-out-overlay">SOLD OUT</div>}
      </div>

      {}
      <div className="event-card-body">
        {}
        <div className="event-meta-row">
          <div className="meta-item">
            <Calendar size={14} className="meta-icon teal-icon" />
            <span>{formattedDate}</span>
          </div>
          <div className="meta-item">
            <Clock size={14} className="meta-icon coral-icon" />
            <span>{event.time}</span>
          </div>
        </div>

        {}
        <h3 className="event-card-title" title={event.title}>
          {event.title}
        </h3>

        {}
        <div className="event-location-row" title={`${event.venue}, ${event.city}`}>
          <MapPin size={14} className="location-icon" />
          <span className="location-text">
            {event.venue}, {event.city}
          </span>
        </div>

        {}
        <p className="event-card-snippet">
          {event.description}
        </p>

        {}
        <div className="capacity-container">
          <div className="capacity-label-row">
            <span className="capacity-label">
              <Users size={13} className="capacity-icon" />
              {isSoldOut ? (
                <strong className="sold-out-text">Full Capacity</strong>
              ) : (
                <span>
                  <strong>{event.capacity - event.registered}</strong> seats left
                </span>
              )}
            </span>
            <span className="capacity-numbers">
              {event.registered}/{event.capacity} ({capacityPercent}%)
            </span>
          </div>
          <div className="progress-bar-track">
            <div
              className={`progress-bar-fill ${capacityPercent > 85 ? 'fill-warning' : ''}`}
              style={{ width: `${capacityPercent}%` }}
            ></div>
          </div>
        </div>

        {}
        <div className="event-card-footer">
          <button
            type="button"
            className="details-btn"
            onClick={(e) => {
              e.stopPropagation();
              openEventModal(event);
            }}
          >
            <span>View Details</span>
            <ChevronRight size={15} />
          </button>

          <button
            type="button"
            className={`register-action-btn ${isSoldOut ? 'disabled-btn' : ''}`}
            disabled={isSoldOut}
            onClick={(e) => {
              e.stopPropagation();
              if (!isSoldOut) {
                openRegisterModal(event);
              }
            }}
          >
            <Ticket size={16} />
            <span>{isSoldOut ? 'Sold Out' : 'Register'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
