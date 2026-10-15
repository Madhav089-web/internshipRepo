import React, { useEffect } from 'react';
import { useJobs } from '../context/JobContext';
import { 
  X, Bookmark, MapPin, Briefcase, Award, Calendar, 
  CheckCircle2, ArrowRight, Share2, Sparkles, Building2, Check 
} from 'lucide-react';

const getLogoGradient = (logo) => {
  const gradients = [
    'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    'linear-gradient(135deg, #06b6d4 0%, #0e7490 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
    'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
  ];
  let sum = 0;
  for (let i = 0; i < logo.length; i++) sum += logo.charCodeAt(i);
  return gradients[sum % gradients.length];
};

export const JobDetailModal = () => {
  const { selectedJob, closeJobDetail, openApplyForm, toggleSaveJob, isJobSaved } = useJobs();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeJobDetail();
      }
    };
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedJob, closeJobDetail]);

  if (!selectedJob) return null;

  const saved = isJobSaved(selectedJob.id);
  const formattedDate = new Date(selectedJob.postedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="modal-backdrop" onClick={closeJobDetail}>
      <div 
        className="modal-container modal-detail animate-scale-up" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-detail-title"
      >
        {}
        <div className="modal-header">
          <div className="modal-header-brand">
            <div 
              className="modal-logo-badge" 
              style={{ background: getLogoGradient(selectedJob.companyLogo) }}
            >
              <span>{selectedJob.companyLogo}</span>
            </div>
            <div>
              <div className="modal-company-title">
                <span>{selectedJob.company}</span>
                <CheckCircle2 size={16} className="text-accent" />
              </div>
              <h2 id="job-detail-title" className="modal-job-title">
                {selectedJob.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={closeJobDetail}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {}
        <div className="modal-body custom-scrollbar">
          {}
          <div className="modal-badges-grid">
            <div className="modal-badge-item">
              <MapPin size={16} className="text-accent" />
              <span>{selectedJob.location}</span>
            </div>
            <div className="modal-badge-item">
              <Briefcase size={16} className="text-primary" />
              <span>{selectedJob.type}</span>
            </div>
            <div className="modal-badge-item">
              <Award size={16} className="text-yellow-400" />
              <span>{selectedJob.experience} Level</span>
            </div>
            <div className="modal-badge-item highlight-salary">
              <span className="salary-pill-text">{selectedJob.salary}</span>
            </div>
            <div className="modal-badge-item">
              <Calendar size={16} className="text-slate-400" />
              <span>Posted {formattedDate}</span>
            </div>
          </div>

          {}
          <div className="modal-content-section">
            <h3 className="section-title">
              <Sparkles size={18} className="text-primary" />
              <span>Role Overview</span>
            </h3>
            <p className="section-text">{selectedJob.description}</p>
          </div>

          {}
          {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
            <div className="modal-content-section">
              <h3 className="section-title">
                <Briefcase size={18} className="text-accent" />
                <span>Key Responsibilities</span>
              </h3>
              <ul className="modal-feature-list">
                {selectedJob.responsibilities.map((resp, idx) => (
                  <li key={idx} className="feature-list-item">
                    <span className="bullet-circle"></span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {}
          {selectedJob.requirements && selectedJob.requirements.length > 0 && (
            <div className="modal-content-section">
              <h3 className="section-title">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span>Requirements & Qualifications</span>
              </h3>
              <ul className="modal-feature-list">
                {selectedJob.requirements.map((req, idx) => (
                  <li key={idx} className="feature-list-item">
                    <Check size={16} className="check-bullet text-emerald-400" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {}
          {selectedJob.skills && selectedJob.skills.length > 0 && (
            <div className="modal-content-section">
              <h3 className="section-title">
                <Award size={18} className="text-primary" />
                <span>Required Skills & Technologies</span>
              </h3>
              <div className="modal-skills-cloud">
                {selectedJob.skills.map((skill) => (
                  <span key={skill} className="skill-cloud-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {}
        <div className="modal-footer">
          <button
            type="button"
            className={`btn-modal-save ${saved ? 'is-saved' : ''}`}
            onClick={() => toggleSaveJob(selectedJob.id)}
          >
            <Bookmark size={18} fill={saved ? '#f59e0b' : 'none'} color={saved ? '#f59e0b' : '#94a3b8'} />
            <span>{saved ? 'Saved to Bookmarks' : 'Save Job'}</span>
          </button>

          <div className="modal-footer-actions">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={closeJobDetail}
            >
              Close
            </button>
            <button
              type="button"
              className="btn-modal-apply"
              onClick={() => openApplyForm(selectedJob)}
            >
              <span>Apply for this Position</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
