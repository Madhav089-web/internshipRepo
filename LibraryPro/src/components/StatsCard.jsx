import React from 'react';

const StatsCard = ({ icon: Icon, label, value, subtext, variant = 'amber', onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`stats-card stats-card--${variant} ${isActive ? 'stats-card--active' : ''} ${onClick ? 'cursor-pointer' : ''}`}
      role={onClick ? 'button' : 'region'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="stats-card-icon-wrap">
        {Icon && <Icon className="stats-card-icon" size={24} />}
      </div>
      <div className="stats-card-content">
        <span className="stats-card-label">{label}</span>
        <div className="stats-card-value-row">
          <span className="stats-card-value">{value}</span>
          {subtext && <span className="stats-card-subtext">{subtext}</span>}
        </div>
      </div>
      <div className="stats-card-glow" />
    </div>
  );
};

export default StatsCard;
