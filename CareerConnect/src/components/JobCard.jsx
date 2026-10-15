import React from 'react';
import { useJobs } from '../context/JobContext';
import { Bookmark, MapPin, Briefcase, Award, IndianRupee, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

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
  for (let i = 0; i < logo.length; i++) {
    sum += logo.charCodeAt(i);
  }
  return gradients[sum % gradients.length];
};

export const JobCard = ({ job }) => {
  const { toggleSaveJob, isJobSaved, openJobDetail, openApplyForm } = useJobs();
  const saved = isJobSaved(job.id);

  const formattedDate = new Date(job.postedDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="job-card">
      {}
      <div className="job-card-header">
        <div className="company-logo-badge" style={{ background: getLogoGradient(job.companyLogo) }}>
          <span>{job.companyLogo}</span>
        </div>

        <div className="job-card-title-group">
          <div className="company-name-row">
            <span className="company-name">{job.company}</span>
            <CheckCircle2 size={14} className="verified-icon text-accent" title="Verified Employer" />
          </div>
          <h3 
            className="job-card-title" 
            onClick={() => openJobDetail(job)}
            title={job.title}
          >
            {job.title}
          </h3>
        </div>

        {}
        <button
          type="button"
          className={`job-save-btn ${saved ? 'saved' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveJob(job.id);
          }}
          title={saved ? 'Remove from saved' : 'Save job'}
          aria-label={saved ? 'Saved job' : 'Save job'}
        >
          <Bookmark size={18} fill={saved ? '#f59e0b' : 'none'} color={saved ? '#f59e0b' : '#94a3b8'} />
        </button>
      </div>

      {}
      <div className="job-meta-row">
        <div className="meta-item">
          <MapPin size={14} className="meta-icon text-slate-400" />
          <span>{job.location}</span>
        </div>

        <div className="meta-item">
          <Briefcase size={14} className="meta-icon text-slate-400" />
          <span className={`pill-badge ${job.type === 'Remote' ? 'pill-remote' : 'pill-type'}`}>
            {job.type}
          </span>
        </div>

        <div className="meta-item">
          <Award size={14} className="meta-icon text-slate-400" />
          <span className="pill-badge pill-exp">{job.experience}</span>
        </div>
      </div>

      {}
      <div className="job-compensation-row">
        <div className="salary-tag">
          <span className="salary-label">Compensation:</span>
          <span className="salary-val">{job.salary}</span>
        </div>

        <div className="posted-date-tag">
          <Calendar size={13} />
          <span>{formattedDate}</span>
        </div>
      </div>

      {}
      <p className="job-card-desc">
        {job.description.length > 130 
          ? `${job.description.substring(0, 130)}...` 
          : job.description}
      </p>

      {}
      <div className="job-skills-row">
        {job.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="skill-pill">
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="skill-pill-extra">+{job.skills.length - 3}</span>
        )}
      </div>

      {}
      <div className="job-card-actions">
        <button
          type="button"
          className="btn-card-outline"
          onClick={() => openJobDetail(job)}
        >
          View Details
        </button>

        <button
          type="button"
          className="btn-card-primary"
          onClick={() => openApplyForm(job)}
        >
          <span>Apply Now</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
