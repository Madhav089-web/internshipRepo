import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialJobs, sampleApplications } from '../data/jobs';

const JobContext = createContext();

const STORAGE_KEYS = {
  JOBS: 'careerconnect_jobs',
  APPLICATIONS: 'careerconnect_applications',
  SAVED_JOBS: 'careerconnect_saved_jobs'
};

export const JobProvider = ({ children }) => {
  
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (err) {
      console.error('Error reading jobs from localStorage:', err);
    }
    return initialJobs;
  });

  
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.error('Error reading applications from localStorage:', err);
    }
    return sampleApplications;
  });

  
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.error('Error reading saved jobs from localStorage:', err);
    }
    return [1, 5];
  });

  
  const [activeView, setActiveView] = useState('listings'); 
  const [selectedJob, setSelectedJob] = useState(null); 
  const [applyModalJob, setApplyModalJob] = useState(null); 
  const [submittedApplication, setSubmittedApplication] = useState(null); 

  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: 'All',
    type: 'All',
    experience: 'All'
  });

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    } catch (err) {
      console.error('Failed to save jobs to localStorage:', err);
    }
  }, [jobs]);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (err) {
      console.error('Failed to save applications to localStorage:', err);
    }
  }, [applications]);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(savedJobs));
    } catch (err) {
      console.error('Failed to save savedJobs to localStorage:', err);
    }
  }, [savedJobs]);

  
  const toggleSaveJob = (jobId) => {
    const numericId = Number(jobId);
    setSavedJobs((prev) => {
      if (prev.includes(numericId)) {
        return prev.filter((id) => id !== numericId);
      } else {
        return [...prev, numericId];
      }
    });
  };

  
  const isJobSaved = (jobId) => {
    return savedJobs.includes(Number(jobId));
  };

  
  const openJobDetail = (job) => {
    setSelectedJob(job);
  };

  const closeJobDetail = () => {
    setSelectedJob(null);
  };

  
  const openApplyForm = (job) => {
    
    setSelectedJob(null);
    setApplyModalJob(job);
    setSubmittedApplication(null);
  };

  const closeApplyForm = () => {
    setApplyModalJob(null);
    setSubmittedApplication(null);
  };

  
  const applyForJob = (jobId, formData) => {
    const job = jobs.find((j) => j.id === Number(jobId)) || applyModalJob;
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const applicationId = `APP-2024-${randomDigits}`;

    const newApplication = {
      id: `app-${Date.now()}-${randomDigits}`,
      jobId: Number(jobId),
      jobTitle: job ? job.title : 'Software Role',
      company: job ? job.company : 'CareerConnect Partner',
      applicantName: formData.applicantName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      linkedIn: formData.linkedIn.trim(),
      experience: formData.experience,
      coverLetter: formData.coverLetter.trim(),
      status: 'Applied',
      appliedAt: new Date().toISOString(),
      applicationId: applicationId
    };

    setApplications((prev) => [newApplication, ...prev]);
    setSubmittedApplication(newApplication);
    return newApplication;
  };

  
  const updateApplicationStatus = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.applicationId === appId || app.id === appId
          ? { ...app, status: newStatus }
          : app
      )
    );
  };

  
  const deleteApplication = (appId) => {
    setApplications((prev) =>
      prev.filter((app) => app.applicationId !== appId && app.id !== appId)
    );
  };

  
  const clearFilters = () => {
    setFilters({
      location: 'All',
      type: 'All',
      experience: 'All'
    });
    setSearchQuery('');
  };

  
  const filteredJobs = jobs.filter((job) => {
    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchSkill = job.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchSkill) {
        return false;
      }
    }

    
    if (filters.location !== 'All') {
      if (filters.location === 'Remote') {
        if (!job.location.toLowerCase().includes('remote') && job.type !== 'Remote') {
          return false;
        }
      } else {
        if (!job.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }
    }

    
    if (filters.type !== 'All') {
      if (job.type.toLowerCase() !== filters.type.toLowerCase()) {
        return false;
      }
    }

    
    if (filters.experience !== 'All') {
      if (job.experience.toLowerCase() !== filters.experience.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  return (
    <JobContext.Provider
      value={{
        jobs,
        filteredJobs,
        applications,
        savedJobs,
        activeView,
        setActiveView,
        selectedJob,
        openJobDetail,
        closeJobDetail,
        applyModalJob,
        openApplyForm,
        closeApplyForm,
        submittedApplication,
        setSubmittedApplication,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        clearFilters,
        applyForJob,
        updateApplicationStatus,
        deleteApplication,
        toggleSaveJob,
        isJobSaved
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};
