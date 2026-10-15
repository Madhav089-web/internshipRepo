import React, { useState, useEffect } from 'react';
import { useEventContext } from '../context/EventContext';
import { CATEGORIES, CITIES } from '../data/events';
import {
  X,
  PlusCircle,
  Edit3,
  Calendar,
  Clock,
  MapPin,
  Image,
  DollarSign,
  Users,
  FileText,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function AddEventForm() {
  const {
    isAddEditModalOpen,
    closeAddEditModal,
    editingEvent,
    addEvent,
    editEvent
  } = useEventContext();

  const isEditing = Boolean(editingEvent);

  const initialFormState = {
    title: '',
    category: 'Tech',
    date: '',
    time: '10:00',
    venue: '',
    city: 'Bangalore',
    description: '',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    capacity: 100,
    price: 0,
    featured: false
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title || '',
        category: editingEvent.category || 'Tech',
        date: editingEvent.date || '',
        time: editingEvent.time || '10:00',
        venue: editingEvent.venue || '',
        city: editingEvent.city || 'Bangalore',
        description: editingEvent.description || '',
        image: editingEvent.image || '',
        capacity: editingEvent.capacity || 100,
        price: editingEvent.price !== undefined ? editingEvent.price : 0,
        featured: Boolean(editingEvent.featured)
      });
      setErrors({});
    } else {
      setFormData(initialFormState);
      setErrors({});
    }
  }, [editingEvent, isAddEditModalOpen]);

  if (!isAddEditModalOpen) return null;

  const validate = () => {
    const errs = {};

    if (!formData.title.trim()) {
      errs.title = 'Event title is required.';
    } else if (formData.title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters.';
    }

    if (!formData.category) {
      errs.category = 'Please choose a category.';
    }

    if (!formData.date) {
      errs.date = 'Event date is required.';
    }

    if (!formData.time) {
      errs.time = 'Event start time is required.';
    }

    if (!formData.venue.trim()) {
      errs.venue = 'Venue name/address is required.';
    }

    if (!formData.city.trim()) {
      errs.city = 'City is required.';
    }

    if (!formData.description.trim()) {
      errs.description = 'Event description is required.';
    } else if (formData.description.trim().length < 15) {
      errs.description = 'Description should be at least 15 characters.';
    }

    if (!formData.image.trim()) {
      errs.image = 'An image URL is required.';
    }

    const cap = parseInt(formData.capacity, 10);
    if (!cap || cap < 5) {
      errs.capacity = 'Capacity must be at least 5 attendees.';
    }

    const pr = parseFloat(formData.price);
    if (isNaN(pr) || pr < 0) {
      errs.price = 'Price must be 0 or greater (enter 0 for Free).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isEditing) {
      editEvent({
        ...editingEvent,
        ...formData,
        capacity: parseInt(formData.capacity, 10),
        price: parseFloat(formData.price)
      });
    } else {
      addEvent({
        ...formData,
        capacity: parseInt(formData.capacity, 10),
        price: parseFloat(formData.price)
      });
    }
  };

  
  const sampleImages = [
    { label: 'Conference / Tech', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80' },
    { label: 'Live Concert / Music', url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=80' },
    { label: 'Culinary / Food', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80' },
    { label: 'Startup / Pitch', url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=80' }
  ];

  return (
    <div className="modal-backdrop" onClick={closeAddEditModal} role="dialog" aria-modal="true">
      <div className="modal-dialog add-event-dialog" onClick={(e) => e.stopPropagation()}>
        {}
        <div className="modal-header">
          <div className="modal-header-icon-wrap">
            {isEditing ? <Edit3 size={22} /> : <PlusCircle size={22} />}
          </div>
          <div>
            <h2 className="modal-header-title">
              {isEditing ? 'Edit Event Details' : 'Create & Publish New Event'}
            </h2>
            <p className="modal-header-subtitle">
              {isEditing
                ? 'Update schedule, venue location, or capacity limit.'
                : 'Fill in event details to list your experience on EventEase.'}
            </p>
          </div>
          <button
            className="modal-close-icon-btn"
            onClick={closeAddEditModal}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {}
        <form onSubmit={handleSubmit} className="add-event-form" noValidate>
          {}
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Event Title <span className="req-star">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g., International AI & Robotics Expo 2025"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              value={formData.title}
              onChange={handleChange}
              autoFocus
            />
            {errors.title && <p className="error-message">{errors.title}</p>}
          </div>

          {}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="category">
                Category <span className="req-star">*</span>
              </label>
              <select
                id="category"
                name="category"
                className={`form-select ${errors.category ? 'input-error' : ''}`}
                value={formData.category}
                onChange={handleChange}
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className="error-message">{errors.category}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="city">
                City <span className="req-star">*</span>
              </label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="e.g., Bangalore, Mumbai, Delhi"
                className={`form-input ${errors.city ? 'input-error' : ''}`}
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>
          </div>

          {}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="date">
                Event Date <span className="req-star">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className={`form-input ${errors.date ? 'input-error' : ''}`}
                value={formData.date}
                onChange={handleChange}
              />
              {errors.date && <p className="error-message">{errors.date}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="time">
                Start Time <span className="req-star">*</span>
              </label>
              <input
                id="time"
                name="time"
                type="time"
                className={`form-input ${errors.time ? 'input-error' : ''}`}
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && <p className="error-message">{errors.time}</p>}
            </div>
          </div>

          {}
          <div className="form-group">
            <label className="form-label" htmlFor="venue">
              Venue / Auditorium / Stadium <span className="req-star">*</span>
            </label>
            <input
              id="venue"
              name="venue"
              type="text"
              placeholder="e.g., BIEC Hall 3, Tumkur Road"
              className={`form-input ${errors.venue ? 'input-error' : ''}`}
              value={formData.venue}
              onChange={handleChange}
            />
            {errors.venue && <p className="error-message">{errors.venue}</p>}
          </div>

          {}
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label" htmlFor="capacity">
                Venue Capacity (Seats) <span className="req-star">*</span>
              </label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                min="5"
                placeholder="e.g., 250"
                className={`form-input ${errors.capacity ? 'input-error' : ''}`}
                value={formData.capacity}
                onChange={handleChange}
              />
              {errors.capacity && <p className="error-message">{errors.capacity}</p>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="price">
                Ticket Price (₹) <span className="req-star">* (0 = Free)</span>
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                placeholder="0"
                className={`form-input ${errors.price ? 'input-error' : ''}`}
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p className="error-message">{errors.price}</p>}
            </div>
          </div>

          {}
          <div className="form-group">
            <label className="form-label" htmlFor="image">
              Cover Image URL <span className="req-star">*</span>
            </label>
            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              className={`form-input ${errors.image ? 'input-error' : ''}`}
              value={formData.image}
              onChange={handleChange}
            />
            {errors.image && <p className="error-message">{errors.image}</p>}

            <div className="image-presets-row">
              <span className="preset-label">Presets:</span>
              {sampleImages.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="preset-btn"
                  onClick={() => setFormData((prev) => ({ ...prev, image: p.url }))}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {}
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Event Description <span className="req-star">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Describe key attractions, guest speakers, food inclusions, and entry guidelines..."
              className={`form-textarea ${errors.description ? 'input-error' : ''}`}
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            {errors.description && <p className="error-message">{errors.description}</p>}
          </div>

          {}
          <div className="form-checkbox-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label">
                Highlight as <strong>Featured Experience</strong> on the homepage
              </span>
            </label>
          </div>

          {}
          <div className="modal-form-actions">
            <button
              type="button"
              className="cancel-form-btn"
              onClick={closeAddEditModal}
            >
              Cancel
            </button>
            <button type="submit" className="confirm-register-btn">
              <CheckCircle2 size={18} />
              <span>{isEditing ? 'Save Changes' : 'Publish Event'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
