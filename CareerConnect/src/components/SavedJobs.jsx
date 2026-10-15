import React from 'react';
import { useJobs } from '../context/JobContext';
import { 
  Bookmark, BookmarkX, ArrowRight, MapPin, Briefcase, 
  Award, IndianRupee, Calendar, Sparkles, CheckCircle2 
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

export const SavedJobs = () => {
  const { jobs, savedJobs, toggleSaveJob, openJobDetail, openApplyForm, setActiveView } = useJobs();

  
  const bookmarkedJobs = jobs.filter((job) => savedJobs.includes(job.id));

  return (
    <div className="saved-jobs-page">
      <div className="section-header-banner">
        <div>
          <div className="badge-subtitle">
            <Bookmark size={14} className="text-amber-400" />
            <span>Personal Bookmarks</span>
          </div>
          <h1 className="page-heading">Saved Job Opportunities</h1>
          <p className="page-subheading">
            Review your shortlisted roles, compare compensation, and apply directly when ready.
          </p>
        </div>

        <div className="saved-stats-pill">
          <Bookmark size={18} className="text-amber-400" />
          <span>{bookmarkedJobs.length} Positions Bookmarked</span>
        </div>
      </div>

      {bookmarkedJobs.length > 0 ? (
        <div className="saved-grid">
          {bookmarkedJobs.map((job) => (
            <div key={job.id} className="saved-job-card animate-fade-in">
              <div className="saved-card-header">
                <div 
                  className="company-logo-badge" 
                  style={{ background: getLogoGradient(job.companyLogo) }}
                >
                  <span>{job.companyLogo}</span>
                </div>

                <div className="saved-title-wrap">
                  <div className="company-name-row">
                    <span className="company-name">{job.company}</span>
                    <CheckCircle2 size={13} className="text-accent" />
                  </div>
                  <h3 
                    className="job-card-title" 
                    onClick={() => openJobDetail(job)}
                  >
                    {job.title}
                  </h3>
                </div>

                <button
                  type="button"
                  className="btn-unsave-icon"
                  onClick={() => toggleSaveJob(job.id)}
                  title="Remove from saved jobs"
                >
                  <BookmarkX size={18} />
                </button>
              </div>

              <div className="job-meta-row">
                <div className="meta-item">
                  <MapPin size={13} className="text-slate-400" />
                  <span>{job.location}</span>
                </div>
                <div className="meta-item">
                  <span className="pill-badge pill-type">{job.type}</span>
                </div>
                <div className="meta-item">
                  <span className="pill-badge pill-exp">{job.experience}</span>
                </div>
              </div>

              <div className="job-compensation-row">
                <div className="salary-tag">
                  <span className="salary-label">Compensation:</span>
                  <span className="salary-val">{job.salary}</span>
                </div>
                <div className="posted-date-tag">
                  <Calendar size={13} />
                  <span>{new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </div>

              <p className="job-card-desc">
                {job.description.length > 110 
                  ? `${job.description.substring(0, 110)}...` 
                  : job.description}
              </p>

              <div className="job-skills-row">
                {job.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="saved-card-actions">
                <button
                  type="button"
                  className="btn-unsave-text"
                  onClick={() => toggleSaveJob(job.id)}
                >
                  Unsave
                </button>

                <div className="saved-actions-right">
                  <button
                    type="button"
                    className="btn-card-outline"
                    onClick={() => openJobDetail(job)}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="btn-card-primary"
                    onClick={() => openApplyForm(job)}
                  >
                    <span>Apply</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-icon-wrapper">
            <Bookmark size={44} className="text-slate-400" />
          </div>
          <h3 className="empty-title">No Saved Jobs Yet</h3>
          <p className="empty-desc">
            You haven't bookmarked any jobs yet. Browse our open positions and click the bookmark icon on any role to save it for later.
          </p>
          <button
            type="button"
            className="btn-primary-action"
            onClick={() => setActiveView('listings')}
          >
            <span>Explore Job Openings</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
