import React, { useState, useEffect } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { 
  X, 
  User, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  AlertTriangle, 
  CheckCircle, 
  IndianRupee, 
  AlertCircle,
  Stethoscope,
  Info
} from 'lucide-react';

export const BookingForm = () => {
  const { 
    selectedDoctor, 
    showBookingForm, 
    closeBookingForm, 
    bookAppointment, 
    isDuplicateBooking,
    getBookedSlotsForDoctor 
  } = useAppointments();

  
  const getMinDate = () => {
    const today = new Date();
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: 'Male',
    contact: '',
    email: '',
    date: '',
    slot: ''
  });

  const [errors, setErrors] = useState({});
  const [duplicateError, setDuplicateError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    if (showBookingForm && selectedDoctor) {
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      const defaultDate = `${yyyy}-${mm}-${dd}`;

      setFormData({
        patientName: '',
        age: '',
        gender: 'Male',
        contact: '',
        email: '',
        date: defaultDate,
        slot: selectedDoctor.slots && selectedDoctor.slots.length > 0 ? selectedDoctor.slots[0] : ''
      });
      setErrors({});
      setDuplicateError('');
    }
  }, [showBookingForm, selectedDoctor]);

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showBookingForm) {
        closeBookingForm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showBookingForm, closeBookingForm]);

  if (!showBookingForm || !selectedDoctor) return null;

  
  const bookedSlotsOnDate = formData.date 
    ? getBookedSlotsForDoctor(selectedDoctor.id, formData.date) 
    : [];

  
  const getDayOfWeekName = (dateStr) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr + 'T00:00:00');
    return dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const selectedDayName = getDayOfWeekName(formData.date);
  const isDoctorAvailableOnDay = selectedDoctor.availableDays.includes(selectedDayName);

  const validate = () => {
    const newErrors = {};

    
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient Name is required';
    } else if (formData.patientName.trim().length < 2) {
      newErrors.patientName = 'Name must be at least 2 characters';
    }

    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = 'Age must be between 1 and 120';
      }
    }

    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    
    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!phoneRegex.test(formData.contact.trim())) {
      newErrors.contact = 'Contact must be a valid 10-digit number';
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    
    if (!formData.date) {
      newErrors.date = 'Appointment date is required';
    } else {
      const selectedTime = new Date(formData.date + 'T23:59:59').getTime();
      const todayTime = new Date().setHours(0, 0, 0, 0);
      if (selectedTime < todayTime) {
        newErrors.date = 'Appointment date must be today or a future date';
      }
    }

    
    if (!formData.slot) {
      newErrors.slot = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    
    if (name === 'date' || name === 'slot') {
      setDuplicateError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDuplicateError('');

    if (!validate()) {
      return;
    }

    
    if (isDuplicateBooking(selectedDoctor.id, formData.date, formData.slot)) {
      setDuplicateError('This slot is already booked. Please select a different time.');
      return;
    }

    setIsSubmitting(true);
    const result = bookAppointment(selectedDoctor.id, formData);
    setIsSubmitting(false);

    if (!result.success) {
      setDuplicateError(result.message || 'This slot is already booked. Please select a different time.');
    }
  };

  return (
    <div className="modal-backdrop" onClick={closeBookingForm}>
      <div 
        className="modal-content booking-modal-content" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-form-title"
      >
        {}
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={closeBookingForm}
          aria-label="Close Booking Form"
        >
          <X size={20} />
        </button>

        {}
        <div className="booking-modal-header">
          <div className="header-badge">
            <Calendar size={15} />
            <span>Schedule Appointment</span>
          </div>
          <h2 id="booking-form-title" className="booking-modal-title">
            Book Appointment with <span className="highlight-doctor">{selectedDoctor.name}</span>
          </h2>
          <p className="booking-modal-sub">
            Fill in the patient details below to reserve your consultation slot.
          </p>
        </div>

        {}
        <div className="booking-warning-banner">
          <AlertTriangle size={18} className="warning-icon" />
          <div className="warning-text">
            <strong>WARNING:</strong> This is a simulated booking. No real appointments are confirmed.
          </div>
        </div>

        {}
        {duplicateError && (
          <div className="booking-error-alert" role="alert">
            <AlertCircle size={20} className="error-icon" />
            <div className="error-text">{duplicateError}</div>
          </div>
        )}

        {}
        <form onSubmit={handleSubmit} className="booking-form" noValidate>
          {}
          <div className="form-summary-card">
            <div className="summary-col">
              <span className="summary-label">Selected Doctor</span>
              <span className="summary-value doctor-val">
                <Stethoscope size={15} className="mint" />
                {selectedDoctor.name} ({selectedDoctor.specialty})
              </span>
            </div>
            <div className="summary-col">
              <span className="summary-label">Consultation Fee</span>
              <span className="summary-value fee-val">
                ₹{selectedDoctor.fee}
              </span>
            </div>
          </div>

          <div className="form-grid">
            {}
            <div className="form-group">
              <label htmlFor="patientName" className="form-label">
                Patient Full Name <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <User size={16} className="field-icon" />
                <input
                  id="patientName"
                  name="patientName"
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  className={`form-input ${errors.patientName ? 'input-error' : ''}`}
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.patientName && (
                <span className="field-error">{errors.patientName}</span>
              )}
            </div>

            {}
            <div className="form-row-2">
              {}
              <div className="form-group">
                <label htmlFor="age" className="form-label">
                  Age <span className="required-star">*</span>
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Age (1-120)"
                  className={`form-input ${errors.age ? 'input-error' : ''}`}
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
                {errors.age && (
                  <span className="field-error">{errors.age}</span>
                )}
              </div>

              {}
              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  Gender <span className="required-star">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  className={`form-select ${errors.gender ? 'input-error' : ''}`}
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <span className="field-error">{errors.gender}</span>
                )}
              </div>
            </div>

            {}
            <div className="form-group">
              <label htmlFor="contact" className="form-label">
                Contact Number (10 Digits) <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <Phone size={16} className="field-icon" />
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  maxLength="10"
                  placeholder="e.g. 9876543210"
                  className={`form-input ${errors.contact ? 'input-error' : ''}`}
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.contact && (
                <span className="field-error">{errors.contact}</span>
              )}
            </div>

            {}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <Mail size={16} className="field-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. patient@example.com"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            {}
            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Appointment Date <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <Calendar size={16} className="field-icon" />
                <input
                  id="date"
                  name="date"
                  type="date"
                  min={getMinDate()}
                  className={`form-input ${errors.date ? 'input-error' : ''}`}
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.date && (
                <span className="field-error">{errors.date}</span>
              )}

              {}
              {formData.date && (
                <div className={`day-hint ${isDoctorAvailableOnDay ? 'available' : 'notice'}`}>
                  <Info size={13} />
                  <span>
                    {selectedDayName}: Dr. {selectedDoctor.name.split(' ').slice(1).join(' ')} is{' '}
                    {isDoctorAvailableOnDay ? 'regularly available on this day.' : `available on: ${selectedDoctor.availableDays.join(', ')}.`}
                  </span>
                </div>
              )}
            </div>

            {}
            <div className="form-group">
              <label htmlFor="slot" className="form-label">
                Select Time Slot <span className="required-star">*</span>
              </label>
              <div className="input-with-icon">
                <Clock size={16} className="field-icon" />
                <select
                  id="slot"
                  name="slot"
                  className={`form-select ${errors.slot ? 'input-error' : ''}`}
                  value={formData.slot}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>-- Select an available time slot --</option>
                  {selectedDoctor.slots.map((slot) => {
                    const isBooked = bookedSlotsOnDate.includes(slot);
                    return (
                      <option 
                        key={slot} 
                        value={slot} 
                        disabled={isBooked}
                        className={isBooked ? 'slot-option-booked' : 'slot-option-available'}
                      >
                        {slot} {isBooked ? '(Booked - Unavailable)' : '✓ Available'}
                      </option>
                    );
                  })}
                </select>
              </div>
              {errors.slot && (
                <span className="field-error">{errors.slot}</span>
              )}
              {bookedSlotsOnDate.length > 0 && (
                <span className="slots-note">
                  {bookedSlotsOnDate.length} slot(s) already reserved on this date.
                </span>
              )}
            </div>
          </div>

          {}
          <div className="booking-form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeBookingForm}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Confirming Booking...' : `Confirm Booking • ₹${selectedDoctor.fee}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
