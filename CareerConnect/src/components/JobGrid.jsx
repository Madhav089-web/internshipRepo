import React, { useState } from 'react';
import { useJobs } from '../context/JobContext';
import JobCard from './JobCard';
import { SearchX, RotateCcw, ArrowUpDown } from 'lucide-react';

export const JobGrid = () => {
  const { filteredJobs, clearFilters } = useJobs();
  const [sortBy, setSortBy] = useState('newest'); 

  
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'salary') {
      
      const extractNum = (str) => {
        const match = str.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };
      return extractNum(b.salary) - extractNum(a.salary);
    }
    return 0;
  });

  return (
    <section id="jobs-section" className="job-grid-section">
      <div className="job-grid-top-bar">
        <h2 className="job-grid-heading">
          Available Positions <span className="job-grid-count">({filteredJobs.length})</span>
        </h2>

        {filteredJobs.length > 0 && (
          <div className="sort-controls">
            <ArrowUpDown size={15} className="text-slate-400" />
            <label htmlFor="sort-select" className="sort-label">Sort by:</label>
            <select
              id="sort-select"
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Latest Posted</option>
              <option value="salary">Highest Compensation</option>
              <option value="title">Job Title (A-Z)</option>
            </select>
          </div>
        )}
      </div>

      {sortedJobs.length > 0 ? (
        <div className="job-grid">
          {sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="empty-state-card">
          <div className="empty-icon-wrapper">
            <SearchX size={44} className="text-slate-400" />
          </div>
          <h3 className="empty-title">No Matching Positions Found</h3>
          <p className="empty-desc">
            We couldn't find any job openings matching your current filter criteria or keywords. Try expanding your location or clearing filters.
          </p>
          <button
            type="button"
            className="btn-primary-action"
            onClick={clearFilters}
          >
            <RotateCcw size={16} />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default JobGrid;
