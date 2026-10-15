import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialEvents } from '../data/events';

const EventContext = createContext();

const STORAGE_KEYS = {
  EVENTS: 'eventease_events_v1',
  REGISTRATIONS: 'eventease_registrations_v1',
  ACTIVE_VIEW: 'eventease_active_view_v1'
};

const initialSampleRegistrations = [
  {
    id: 'reg-sample-1',
    eventId: 1,
    eventTitle: 'Global Tech Summit 2024',
    eventDate: '2024-11-15',
    eventTime: '09:00',
    eventVenue: 'Bangalore International Exhibition Centre',
    eventCity: 'Bangalore',
    eventImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
    eventPrice: 2500,
    fullName: 'Chandan Sharma',
    email: 'chandan.sharma@example.com',
    phone: '9876543210',
    tickets: 2,
    totalPrice: 5000,
    referenceId: 'EVT-2024-78421',
    registeredAt: '2024-10-14T10:30:00.000Z'
  },
  {
    id: 'reg-sample-2',
    eventId: 3,
    eventTitle: 'Street Food Festival',
    eventDate: '2024-11-25',
    eventTime: '12:00',
    eventVenue: 'Lodhi Garden',
    eventCity: 'Delhi',
    eventImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    eventPrice: 0,
    fullName: 'Chandan Sharma',
    email: 'chandan.sharma@example.com',
    phone: '9876543210',
    tickets: 3,
    totalPrice: 0,
    referenceId: 'EVT-2024-93108',
    registeredAt: '2024-10-15T14:15:00.000Z'
  }
];

export function EventProvider({ children }) {
  
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading events from localStorage:', e);
    }
    return initialEvents;
  });

  
  const [registrations, setRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading registrations from localStorage:', e);
    }
    return initialSampleRegistrations;
  });

  
  const [activeView, setActiveView] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_VIEW);
      if (saved && ['home', 'events', 'my-registrations', 'organizer'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.error('Error loading active view:', e);
    }
    return 'home';
  });

  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [confirmedTicket, setConfirmedTicket] = useState(null);

  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('All'); 
  const [selectedCity, setSelectedCity] = useState('All Cities');

  
  const [toast, setToast] = useState(null);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.error('Error saving events to localStorage:', e);
    }
  }, [events]);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.error('Error saving registrations to localStorage:', e);
    }
  }, [registrations]);

  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_VIEW, activeView);
    } catch (e) {
      console.error('Error saving active view:', e);
    }
  }, [activeView]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const closeToast = () => setToast(null);

  
  const generateReferenceId = () => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    return `EVT-2024-${randomDigits}`;
  };

  
  const registerForEvent = (eventId, formData) => {
    const event = events.find((ev) => ev.id === eventId);
    if (!event) {
      showToast('Event not found', 'error');
      return null;
    }

    const ticketCount = parseInt(formData.tickets, 10) || 1;
    const remainingSeats = event.capacity - event.registered;

    if (ticketCount > remainingSeats) {
      showToast(`Only ${remainingSeats} seat(s) remaining for this event!`, 'error');
      return null;
    }

    const referenceId = generateReferenceId();
    const newRegistration = {
      id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventCity: event.city,
      eventImage: event.image,
      eventPrice: event.price,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      tickets: ticketCount,
      totalPrice: ticketCount * event.price,
      referenceId: referenceId,
      registeredAt: new Date().toISOString()
    };

    
    setRegistrations((prev) => [newRegistration, ...prev]);

    
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId ? { ...ev, registered: ev.registered + ticketCount } : ev
      )
    );

    
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent((prev) => ({
        ...prev,
        registered: prev.registered + ticketCount
      }));
    }

    
    setConfirmedTicket(newRegistration);
    setIsRegisterModalOpen(false);

    showToast(`Registered successfully! Reference ID: ${referenceId}`, 'success');
    return newRegistration;
  };

  
  const cancelRegistration = (registrationId) => {
    const regToCancel = registrations.find((r) => r.id === registrationId);
    if (!regToCancel) {
      showToast('Registration record not found', 'error');
      return false;
    }

    
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === regToCancel.eventId) {
          const updatedCount = Math.max(0, ev.registered - regToCancel.tickets);
          return { ...ev, registered: updatedCount };
        }
        return ev;
      })
    );

    
    setRegistrations((prev) => prev.filter((r) => r.id !== registrationId));

    showToast(`Booking cancelled for ${regToCancel.eventTitle}. Seats released.`, 'info');
    return true;
  };

  
  const addEvent = (eventData) => {
    const newId = events.length > 0 ? Math.max(...events.map((e) => Number(e.id) || 0)) + 1 : 1;
    const newEvent = {
      ...eventData,
      id: newId,
      capacity: parseInt(eventData.capacity, 10) || 100,
      price: parseFloat(eventData.price) || 0,
      registered: 0,
      featured: Boolean(eventData.featured)
    };

    setEvents((prev) => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" published successfully!`, 'success');
    setIsAddEditModalOpen(false);
    return newEvent;
  };

  
  const editEvent = (eventData) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventData.id) {
          return {
            ...ev,
            ...eventData,
            capacity: parseInt(eventData.capacity, 10) || ev.capacity,
            price: parseFloat(eventData.price) >= 0 ? parseFloat(eventData.price) : ev.price,
            featured: Boolean(eventData.featured)
          };
        }
        return ev;
      })
    );

    
    if (selectedEvent && selectedEvent.id === eventData.id) {
      setSelectedEvent((prev) => ({ ...prev, ...eventData }));
    }

    showToast(`Event "${eventData.title}" updated successfully!`, 'success');
    setIsAddEditModalOpen(false);
    setEditingEvent(null);
  };

  
  const removeEvent = (eventId) => {
    const eventToRemove = events.find((e) => e.id === eventId);
    if (!eventToRemove) return;

    setEvents((prev) => prev.filter((e) => e.id !== eventId));

    
    setRegistrations((prev) => prev.filter((r) => r.eventId !== eventId));

    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent(null);
      setIsEventModalOpen(false);
    }

    showToast(`Event "${eventToRemove.title}" has been deleted.`, 'info');
  };

  
  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => {
    setIsEventModalOpen(false);
  };

  const openRegisterModal = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setIsAddEditModalOpen(false);
    setEditingEvent(null);
  };

  const closeConfirmedTicket = () => {
    setConfirmedTicket(null);
  };

  
  const resetToSampleData = () => {
    setEvents(initialEvents);
    setRegistrations(initialSampleRegistrations);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
    showToast('Reset all events and registrations to default demo dataset!', 'info');
  };

  return (
    <EventContext.Provider
      value={{
        events,
        registrations,
        activeView,
        setActiveView,
        selectedEvent,
        setSelectedEvent,
        isEventModalOpen,
        isRegisterModalOpen,
        isAddEditModalOpen,
        editingEvent,
        confirmedTicket,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedPriceFilter,
        setSelectedPriceFilter,
        selectedCity,
        setSelectedCity,
        toast,
        showToast,
        closeToast,
        registerForEvent,
        cancelRegistration,
        addEvent,
        editEvent,
        removeEvent,
        openEventModal,
        closeEventModal,
        openRegisterModal,
        closeRegisterModal,
        openAddModal,
        openEditModal,
        closeAddEditModal,
        closeConfirmedTicket,
        resetToSampleData
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
}
