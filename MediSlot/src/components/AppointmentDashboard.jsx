import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';
import { AppointmentCard } from './AppointmentCard';
import { ConfirmDialog } from './ConfirmDialog';
import { 
  Calendar, 
  Search, 
  CalendarX, 
  PlusCircle, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Filter
} from 'lucide-react';

export const AppointmentDashboard = () => {
  const { 
    appointments, 
    cancelAppointment, 
    setActiveView, 
    resetDemoData 
  } = useAppointments();

  const [activeTab, setActiveTab] = useState('All'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [cancellingAppointment, setCancellingAppointment] = useState(null);

  
  const filteredAppointments = appointments.filter((app) => {
    
    if (activeTab !== 'All' && app.status !== activeTab) {
      return false;
    }

    
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchDoctor = app.doctorName.toLowerCase().includes(q);
      const matchPatient = app.patientName.toLowerCase().includes(q);
      const matchRef = app.referenceId.toLowerCase().includes(q);
      const matchSpecialty = app.specialty.toLowerCase().includes(q);
      return matchDoctor || matchPatient || matchRef || matchSpecialty;
    }

    return true;
  });

  
  const counts = {
    All: appointments.length,
    Upcoming: appointments.filter((a) => a.status === 'Upcoming').length,
    Completed: appointments.filter((a) => a.status === 'Completed').length,
    Cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
  };

  const handleConfirmCancel = () => {
    if (cancellingAppointment) {
      cancelAppointment(cancellingAppointment.id);
      setCancellingAppointment(null);
    }
  };

  return (
    <div className="dashboard-container">
      {}
      <div className="dashboard-header">
        <div>
          <div className="dashboard-subtitle">MediSlot Patient Portal</div>
          <h2 className="dashboard-title">My Scheduled Appointments</h2>
        </div>

        <div className="dashboard-top-actions">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={resetDemoData}
            title="Restore sample appointments for demonstration"
          >
            <RotateCcw size={15} />
            Reset Demo Data
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setActiveView('doctors')}
          >
            <PlusCircle size={15} />
            Book New Slot
          </button>
        </div>
      </div>

      {}
      <div className="dashboard-controls">
        <div className="status-tabs">
          {['All', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`status-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Upcoming' && <Clock size={14} />}
              {tab === 'Completed' && <CheckCircle2 size={14} />}
              {tab === 'Cancelled' && <XCircle size={14} />}
              <span>{tab}</span>
              <span className="tab-count-badge">{counts[tab]}</span>
            </button>
          ))}
        </div>

        <div className="dashboard-search-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="dashboard-search-input"
            placeholder="Search by Patient, Doctor, or Ref ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {}
      {filteredAppointments.length === 0 ? (
        <div className="empty-appointments-card">
          <div className="empty-icon-wrap">
            <CalendarX size={44} className="empty-icon" />
          </div>
          <h3 className="empty-title">
            {appointments.length === 0
              ? 'No appointments booked yet'
              : `No ${activeTab.toLowerCase()} appointments found`}
          </h3>
          <p className="empty-subtitle">
            {appointments.length === 0
              ? 'You have not reserved any consultations yet. Explore our network of certified specialists and schedule your appointment today.'
              : 'Try selecting a different filter tab or clearing your search term.'}
          </p>
          <div className="empty-actions">
            {appointments.length === 0 ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setActiveView('doctors')}
              >
                <PlusCircle size={16} />
                Find Doctors & Book Now
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setActiveTab('All');
                  setSearchQuery('');
                }}
              >
                Show All Appointments
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="appointments-grid">
          {filteredAppointments.map((app) => (
            <AppointmentCard
              key={app.id}
              appointment={app}
              onRequestCancel={(appointment) => setCancellingAppointment(appointment)}
            />
          ))}
        </div>
      )}

      {}
      <ConfirmDialog
        isOpen={Boolean(cancellingAppointment)}
        title="Cancel Appointment?"
        message={
          cancellingAppointment
            ? `Are you sure you want to cancel appointment (${cancellingAppointment.referenceId}) with ${cancellingAppointment.doctorName} on ${cancellingAppointment.date} at ${cancellingAppointment.slot}? This action cannot be reversed.`
            : ''
        }
        confirmText="Yes, Cancel Appointment"
        cancelText="Keep Appointment"
        variant="danger"
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancellingAppointment(null)}
      />
    </div>
  );
};
