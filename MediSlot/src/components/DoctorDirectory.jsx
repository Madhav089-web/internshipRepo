import React from 'react';
import { DoctorCard } from './DoctorCard';
import { Stethoscope, SearchX, RotateCcw } from 'lucide-react';

export const DoctorDirectory = ({ doctors, onResetFilters }) => {
  if (doctors.length === 0) {
    return (
      <div className="empty-directory-card">
        <div className="empty-icon-wrap">
          <SearchX size={44} className="empty-icon" />
        </div>
        <h3 className="empty-title">No specialists found</h3>
        <p className="empty-subtitle">
          We couldn't find any doctors matching your search query or filter criteria. Try adjusting your search keywords or resetting filters.
        </p>
        {onResetFilters && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onResetFilters}
          >
            <RotateCcw size={16} />
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div id="doctor-directory-section" className="doctor-directory-container">
      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
};
