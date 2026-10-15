import React, { useState, useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import { 
  X, AlertTriangle, CheckCircle2, Copy, Check, ArrowRight, 
  Briefcase, Building2, User, Mail, Phone, Link2, FileText, Send 
} from 'lucide-react';

export const ApplyForm = () => {
  const { 
    applyModalJob, 
    closeApplyForm, 
    applyForJob, 
    submittedApplication, 
    setActiveView 
  } = useJobs();

  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    linkedIn: '',
    experience: '',
    coverLetter: ''
  });

  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeApplyForm();
      }
    };
    if (applyModalJob) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [applyModalJob, closeApplyForm]);

  if (!applyModalJob) return null;

  const validate = () => {
    const errs = {};
    if (!formData.applicantName.trim()) {
      errs.applicantName = 'Full Name is required.';
    } else if (formData.applicantName.trim().length < 2) {
      errs.applicantName = 'Full Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    const phoneClean = formData.phone.replace(/[\s-]/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (!/^\+?[0-9]{10,13}$/.test(phoneClean)) {
      errs.phone = 'Please provide a valid 10-digit mobile number.';
    }

    if (!formData.linkedIn.trim()) {
      errs.linkedIn = 'LinkedIn profile URL is required.';
    } else if (!/^https?:\/\/(www\.)?linkedin\.com\/.+/i.test(formData.linkedIn.trim())) {
      errs.linkedIn = 'Must be a valid LinkedIn profile URL (https://linkedin.com/in/...).';
    }

    if (formData.experience === '' || isNaN(formData.experience)) {
      errs.experience = 'Years of experience is required.';
    } else if (Number(formData.experience) < 0 || Number(formData.experience) > 50) {
      errs.experience = 'Please enter realistic years of experience (0-50).';
    }

    if (!formData.coverLetter.trim()) {
      errs.coverLetter = 'Cover letter statement is required.';
    } else if (formData.coverLetter.trim().length < 50) {
      errs.coverLetter = `Cover letter must be at least 50 characters (${formData.coverLetter.trim().length}/50).`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
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

    setSubmitting(true);
    setTimeout(() => {
      applyForJob(applyModalJob.id, formData);
      setSubmitting(false);
    }, 400);
  };

  const handleCopyId = () => {
    if (submittedApplication?.applicationId) {
      navigator.clipboard.writeText(submittedApplication.applicationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleGoToApplications = () => {
    closeApplyForm();
    setActiveView('applications');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="modal-backdrop" onClick={closeApplyForm}>
      <div 
        className="modal-container modal-apply animate-scale-up" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-modal-title"
      >
        {}
        {submittedApplication ? (
          <div className="apply-success-view">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} className="text-emerald-400" />
            </div>

            <h2 className="success-heading">Application Submitted!</h2>
            <p className="success-subtitle">
              Your application for <strong>{submittedApplication.jobTitle}</strong> at{' '}
              <strong>{submittedApplication.company}</strong> has been registered.
            </p>

            <div className="application-id-box">
              <span className="app-id-label">Assigned Application ID</span>
              <div className="app-id-display">
                <span className="app-id-code">{submittedApplication.applicationId}</span>
                <button
                  type="button"
                  className="btn-copy-id"
                  onClick={handleCopyId}
                  title="Copy Application ID"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="demo-disclaimer-card">
              <AlertTriangle size={18} className="text-amber-400 flex-shrink-0" />
              <div className="disclaimer-text">
                <strong>Platform Notice:</strong> Applications do not reach real employers. 
                This is a demonstration platform. You can monitor and simulate recruitment status in <strong>My Applications</strong>.
              </div>
            </div>

            <div className="success-actions">
              <button
                type="button"
                className="btn-secondary-action"
                onClick={closeApplyForm}
              >
                Close
              </button>
              <button
                type="button"
                className="btn-primary-action"
                onClick={handleGoToApplications}
              >
                <span>View in My Applications</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          <>
            {}
            <div className="modal-header">
              <div>
                <span className="apply-modal-tagline">Job Application Portal</span>
                <h2 id="apply-modal-title" className="modal-job-title">
                  {applyModalJob.title}
                </h2>
                <div className="modal-apply-company">
                  <Building2 size={15} className="text-accent" />
                  <span>{applyModalJob.company} • {applyModalJob.location}</span>
                </div>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={closeApplyForm}
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            {}
            <div className="demo-warning-banner">
              <AlertTriangle size={18} className="text-amber-400 flex-shrink-0" />
              <p>
                <strong>Notice:</strong> Applications do not reach real employers. This is a demonstration platform.
              </p>
            </div>

            {}
            <form onSubmit={handleSubmit} className="apply-form-body custom-scrollbar" noValidate>
              <div className="form-grid">
                {}
                <div className="form-field">
                  <label htmlFor="applicantName" className="field-label">
                    <User size={14} className="field-icon" />
                    <span>Full Name <strong className="text-rose-400">*</strong></span>
                  </label>
                  <input
                    id="applicantName"
                    name="applicantName"
                    type="text"
                    className={`form-input ${errors.applicantName ? 'input-error' : ''}`}
                    placeholder="e.g. Chandan Kumar"
                    value={formData.applicantName}
                    onChange={handleChange}
                  />
                  {errors.applicantName && (
                    <span className="field-error-msg">{errors.applicantName}</span>
                  )}
                </div>

                {}
                <div className="form-field">
                  <label htmlFor="email" className="field-label">
                    <Mail size={14} className="field-icon" />
                    <span>Email Address <strong className="text-rose-400">*</strong></span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="chandan@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="field-error-msg">{errors.email}</span>
                  )}
                </div>

                {}
                <div className="form-field">
                  <label htmlFor="phone" className="field-label">
                    <Phone size={14} className="field-icon" />
                    <span>Phone Number <strong className="text-rose-400">*</strong></span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`form-input ${errors.phone ? 'input-error' : ''}`}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className="field-error-msg">{errors.phone}</span>
                  )}
                </div>

                {}
                <div className="form-field">
                  <label htmlFor="linkedIn" className="field-label">
                    <Link2 size={14} className="field-icon" />
                    <span>LinkedIn Profile URL <strong className="text-rose-400">*</strong></span>
                  </label>
                  <input
                    id="linkedIn"
                    name="linkedIn"
                    type="url"
                    className={`form-input ${errors.linkedIn ? 'input-error' : ''}`}
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedIn}
                    onChange={handleChange}
                  />
                  {errors.linkedIn && (
                    <span className="field-error-msg">{errors.linkedIn}</span>
                  )}
                </div>

                {}
                <div className="form-field form-field-full">
                  <label htmlFor="experience" className="field-label">
                    <Briefcase size={14} className="field-icon" />
                    <span>Years of Relevant Experience <strong className="text-rose-400">*</strong></span>
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    max="50"
                    step="0.5"
                    className={`form-input ${errors.experience ? 'input-error' : ''}`}
                    placeholder="e.g. 3.5"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                  {errors.experience && (
                    <span className="field-error-msg">{errors.experience}</span>
                  )}
                </div>

                {}
                <div className="form-field form-field-full">
                  <div className="field-label-between">
                    <label htmlFor="coverLetter" className="field-label">
                      <FileText size={14} className="field-icon" />
                      <span>Why are you a great fit? (Cover Letter) <strong className="text-rose-400">*</strong></span>
                    </label>
                    <span className={`char-count ${formData.coverLetter.trim().length >= 50 ? 'valid-chars' : ''}`}>
                      {formData.coverLetter.trim().length} / min 50 chars
                    </span>
                  </div>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={4}
                    className={`form-textarea ${errors.coverLetter ? 'input-error' : ''}`}
                    placeholder="Detail your relevant achievements, tech stack proficiency, and motivation for this role..."
                    value={formData.coverLetter}
                    onChange={handleChange}
                  />
                  {errors.coverLetter && (
                    <span className="field-error-msg">{errors.coverLetter}</span>
                  )}
                </div>
              </div>

              {}
              <div className="modal-footer-form">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={closeApplyForm}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit-app"
                  disabled={submitting}
                >
                  <Send size={16} />
                  <span>{submitting ? 'Submitting Application...' : 'Submit Application'}</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyForm;
