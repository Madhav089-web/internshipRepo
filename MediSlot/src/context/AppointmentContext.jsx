import React, { createContext, useContext, useState, useEffect } from 'react';
import { doctors } from '../data/doctors';

const AppointmentContext = createContext();

const STORAGE_KEY = 'medislot_appointments_data';

const INITIAL_APPOINTMENTS = [
  {
    id: 'app-seed-1',
    doctorId: 1,
    doctorName: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    patientName: 'Aarav Sharma',
    age: 42,
    gender: 'Male',
    contact: '9876543210',
    email: 'aarav.sharma@example.com',
    date: '2026-10-20',
    slot: '10:00 AM',
    fee: 1500,
    referenceId: 'MED-2024-84921',
    status: 'Upcoming',
    bookedAt: '2026-10-14T10:15:00.000Z'
  },
  {
    id: 'app-seed-2',
    doctorId: 3,
    doctorName: 'Dr. Anita Patel',
    specialty: 'Pediatrician',
    patientName: 'Ananya Iyer',
    age: 6,
    gender: 'Female',
    contact: '9123456780',
    email: 'priya.iyer@example.com',
    date: '2026-10-22',
    slot: '11:00 AM',
    fee: 1000,
    referenceId: 'MED-2024-39482',
    status: 'Upcoming',
    bookedAt: '2026-10-15T08:30:00.000Z'
  },
  {
    id: 'app-seed-3',
    doctorId: 5,
    doctorName: 'Dr. Meera Nair',
    specialty: 'Dermatologist',
    patientName: 'Rohit Kulkarni',
    age: 29,
    gender: 'Male',
    contact: '9811223344',
    email: 'rohit.k@example.com',
    date: '2026-10-08',
    slot: '04:30 PM',
    fee: 1200,
    referenceId: 'MED-2024-19284',
    status: 'Completed',
    bookedAt: '2026-10-01T14:20:00.000Z'
  },
  {
    id: 'app-seed-4',
    doctorId: 2,
    doctorName: 'Dr. Rahul Verma',
    specialty: 'Neurologist',
    patientName: 'Sunita Menon',
    age: 55,
    gender: 'Female',
    contact: '9765432109',
    email: 'sunita.m@example.com',
    date: '2026-10-05',
    slot: '09:30 AM',
    fee: 1800,
    referenceId: 'MED-2024-57382',
    status: 'Cancelled',
    bookedAt: '2026-10-02T11:45:00.000Z'
  },
  {
    id: 'app-seed-5',
    doctorId: 4,
    doctorName: 'Dr. Sanjay Kumar',
    specialty: 'Orthopedic Surgeon',
    patientName: 'Vikramaditya Roy',
    age: 38,
    gender: 'Male',
    contact: '9988776655',
    email: 'vicky.roy@example.com',
    date: '2026-10-24',
    slot: '09:00 AM',
    fee: 2000,
    referenceId: 'MED-2024-74629',
    status: 'Upcoming',
    bookedAt: '2026-10-15T12:00:00.000Z'
  }
];

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load appointments from localStorage', e);
    }
    return INITIAL_APPOINTMENTS;
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeView, setActiveView] = useState('home'); 
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [lastBookedAppointment, setLastBookedAppointment] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (e) {
      console.error('Failed to save appointments to localStorage', e);
    }
  }, [appointments]);

  
  const isDuplicateBooking = (doctorId, date, slot) => {
    return appointments.some(
      (app) =>
        app.doctorId === Number(doctorId) &&
        app.date === date &&
        app.slot === slot &&
        app.status !== 'Cancelled'
    );
  };

  
  const generateReferenceId = () => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    return `MED-2024-${randomDigits}`;
  };

  
  const bookAppointment = (doctorId, formData) => {
    const doctor = doctors.find((d) => d.id === Number(doctorId));
    if (!doctor) {
      return { success: false, message: 'Doctor not found.' };
    }

    if (isDuplicateBooking(doctorId, formData.date, formData.slot)) {
      return {
        success: false,
        message: 'This slot is already booked. Please select a different time.'
      };
    }

    const newAppointment = {
      id: 'app-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      patientName: formData.patientName.trim(),
      age: Number(formData.age),
      gender: formData.gender,
      contact: formData.contact.trim(),
      email: formData.email.trim(),
      date: formData.date,
      slot: formData.slot,
      fee: doctor.fee,
      referenceId: generateReferenceId(),
      status: 'Upcoming',
      bookedAt: new Date().toISOString()
    };

    setAppointments((prev) => [newAppointment, ...prev]);
    setLastBookedAppointment(newAppointment);
    setShowBookingForm(false);
    setShowConfirmationModal(true);

    return { success: true, appointment: newAppointment };
  };

  
  const cancelAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((app) =>
        app.id === appointmentId ? { ...app, status: 'Cancelled' } : app
      )
    );
  };

  
  const openDoctorModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const closeDoctorModal = () => {
    setShowDoctorModal(false);
  };

  const openBookingForm = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(false);
    setShowBookingForm(true);
  };

  const closeBookingForm = () => {
    setShowBookingForm(false);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  
  const resetDemoData = () => {
    setAppointments(INITIAL_APPOINTMENTS);
  };

  
  const getBookedSlotsForDoctor = (doctorId, date) => {
    if (!doctorId || !date) return [];
    return appointments
      .filter(
        (app) =>
          app.doctorId === Number(doctorId) &&
          app.date === date &&
          app.status !== 'Cancelled'
      )
      .map((app) => app.slot);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        doctors,
        selectedDoctor,
        setSelectedDoctor,
        activeView,
        setActiveView,
        showBookingForm,
        showDoctorModal,
        openDoctorModal,
        closeDoctorModal,
        openBookingForm,
        closeBookingForm,
        bookAppointment,
        cancelAppointment,
        isDuplicateBooking,
        lastBookedAppointment,
        showConfirmationModal,
        closeConfirmationModal,
        resetDemoData,
        getBookedSlotsForDoctor
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
