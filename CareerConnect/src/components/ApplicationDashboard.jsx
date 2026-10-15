import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import { 
  FileText, Calendar, Building2, User, Mail, Phone, Link2, 
  Trash2, ChevronDown, ChevronUp, AlertCircle, ArrowRight, CheckCircle2, Clock 
} from 'lucide-react';

export const ApplicationDashboard = () => {
  const { applications, updateApplicationStatus, deleteApplication, setActiveView } = useJobs();
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const statusOptions = ['Applied', 'In Review', 'Interview', 'Offer', 'Rejected'];

  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Applied':
        return 'status-badge-applied'; 
      case 'In Review':
        return 'status-badge-review'; 
      case 'Interview':
        return 'status-badge-interview'; 
      case 'Offer':
        return 'status-badge-offer'; 
      case 'Rejected':
        return 'status-badge-rejected'; 
      default:
        return 'status-badge-applied';
    }
  };

  
  const counts = {
    total: applications.length,
    applied: applications.filter((a) => a.status === 'Applied').length,
    inReview: applications.filter((a) => a.status === 'In Review').length,
    interview: applications.filter((a) => a.status === 'Interview').length,
    offer: applications.filter((a) => a.status === 'Offer').length,
    rejected: applications.filter((a) => a.status === 'Rejected').length
  };

  const filteredApplications = applications.filter((app) => {
    if (statusFilter === 'All') return true;
    return app.status === statusFilter;
  });

  const toggleExpand = (appId) => {
    setExpandedId((prev) => (prev === appId ? null : appId));
  };

  return (
    <div className="applications-page">
      {}
      <div className="section-header-banner">
        <div>
          <div className="badge-subtitle">
            <FileText size={14} className="text-primary" />
            <span>Recruitment Pipeline</span>
          </div>
          <h1 className="page-heading">My Job Applications</h1>
          <p className="page-subheading">
            Track your submitted applications, simulate recruiter stage transitions, and manage active candidacies.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary-action"
          onClick={() => setActiveView('listings')}
        >
          <span>Find More Jobs</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {}
      <div className="app-stats-row">
        <div 
          className={`app-stat-box ${statusFilter === 'All' ? 'stat-box-active' : ''}`}
          onClick={() => setStatusFilter('All')}
        >
          <span className="app-stat-num">{counts.total}</span>
          <span className="app-stat-title">Total Applications</span>
        </div>

        <div 
          className={`app-stat-box ${statusFilter === 'Applied' ? 'stat-box-active' : ''}`}
          onClick={() => setStatusFilter('Applied')}
        >
          <span className="app-stat-num text-blue-400">{counts.applied}</span>
          <span className="app-stat-title">Applied</span>
        </div>

        <div 
          className={`app-stat-box ${statusFilter === 'In Review' ? 'stat-box-active' : ''}`}
          onClick={() => setStatusFilter('In Review')}
        >
          <span className="app-stat-num text-amber-400">{counts.inReview}</span>
          <span className="app-stat-title">In Review</span>
        </div>

        <div 
          className={`app-stat-box ${statusFilter === 'Interview' ? 'stat-box-active' : ''}`}
          onClick={() => setStatusFilter('Interview')}
        >
          <span className="app-stat-num text-purple-400">{counts.interview}</span>
          <span className="app-stat-title">Interview</span>
        </div>

        <div 
          className={`app-stat-box ${statusFilter === 'Offer' ? 'stat-box-active' : ''}`}
          onClick={() => setStatusFilter('Offer')}
        >
          <span className="app-stat-num text-emerald-400">{counts.offer}</span>
          <span className="app-stat-title">Offer</span>
        </div>

        <div 
          className={`app-stat-box ${statusFilter === 'Rejected' ? 'stat-box-active' : ''}`}
          onClick={() => setStatusFilter('Rejected')}
        >
          <span className="app-stat-num text-rose-400">{counts.rejected}</span>
          <span className="app-stat-title">Rejected</span>
        </div>
      </div>

      {}
      {filteredApplications.length > 0 ? (
        <div className="applications-list">
          {filteredApplications.map((app) => {
            const isExpanded = expandedId === app.applicationId;
            const appliedDate = new Date(app.appliedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div key={app.applicationId || app.id} className="application-card">
                {}
                <div className="app-card-main">
                  <div className="app-card-info">
                    <div className="app-card-top-line">
                      <span className="app-id-pill">{app.applicationId}</span>
                      <span className="app-date-meta">
                        <Clock size={13} />
                        <span>Submitted {appliedDate}</span>
                      </span>
                    </div>

                    <h3 className="app-job-title">{app.jobTitle}</h3>

                    <div className="app-company-line">
                      <Building2 size={14} className="text-accent" />
                      <span>{app.company}</span>
                    </div>

                    <div className="applicant-quick-info">
                      <span><strong>Applicant:</strong> {app.applicantName}</span>
                      <span>•</span>
                      <span><strong>Exp:</strong> {app.experience} years</span>
                      <span>•</span>
                      <span><strong>Email:</strong> {app.email}</span>
                    </div>
                  </div>

                  {}
                  <div className="app-card-controls">
                    <div className="status-control-group">
                      <label htmlFor={`status-${app.applicationId}`} className="status-select-label">
                        Pipeline Stage:
                      </label>
                      <div className="status-select-wrapper">
                        <span className={`status-badge-indicator ${getStatusColorClass(app.status)}`}>
                          {app.status}
                        </span>
                        <select
                          id={`status-${app.applicationId}`}
                          className="status-dropdown"
                          value={app.status}
                          onChange={(e) => updateApplicationStatus(app.applicationId, e.target.value)}
                        >
                          {statusOptions.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="app-action-buttons">
                      <button
                        type="button"
                        className="btn-expand-details"
                        onClick={() => toggleExpand(app.applicationId)}
                      >
                        <span>{isExpanded ? 'Hide Details' : 'View Submission'}</span>
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </button>

                      <button
                        type="button"
                        className="btn-delete-app"
                        onClick={() => {
                          if (window.confirm(`Withdraw application for ${app.jobTitle}?`)) {
                            deleteApplication(app.applicationId);
                          }
                        }}
                        title="Withdraw / Delete application"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {}
                {isExpanded && (
                  <div className="app-card-expanded animate-fade-in">
                    <div className="expanded-details-grid">
                      <div className="detail-item">
                        <span className="detail-label">
                          <User size={13} /> Full Name:
                        </span>
                        <span className="detail-value">{app.applicantName}</span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">
                          <Mail size={13} /> Email:
                        </span>
                        <a href={`mailto:${app.email}`} className="detail-value detail-link">
                          {app.email}
                        </a>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">
                          <Phone size={13} /> Phone:
                        </span>
                        <span className="detail-value">{app.phone}</span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">
                          <Link2 size={13} /> LinkedIn:
                        </span>
                        <a 
                          href={app.linkedIn} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="detail-value detail-link"
                        >
                          {app.linkedIn}
                        </a>
                      </div>
                    </div>

                    <div className="cover-letter-section">
                      <span className="cover-letter-label">Cover Letter Statement:</span>
                      <div className="cover-letter-content">
                        "{app.coverLetter}"
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-icon-wrapper">
            <FileText size={44} className="text-slate-400" />
          </div>
          <h3 className="empty-title">
            {statusFilter === 'All' ? 'No Applications Submitted Yet' : `No Applications in '${statusFilter}' Stage`}
          </h3>
          <p className="empty-desc">
            {statusFilter === 'All' 
              ? 'You have not submitted any applications yet. Explore openings and apply to start tracking your recruitment status.' 
              : `You do not have any applications currently marked as ${statusFilter}. Try choosing "Total Applications" to view all.`}
          </p>
          <button
            type="button"
            className="btn-primary-action"
            onClick={() => setActiveView('listings')}
          >
            <span>Browse Job Listings</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationDashboard;
