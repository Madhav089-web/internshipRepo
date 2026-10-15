import React, { useState, useMemo } from 'react';
import { AppointmentProvider, useAppointments } from './context/AppointmentContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SearchFilter } from './components/SearchFilter';
import { DoctorDirectory } from './components/DoctorDirectory';
import { DoctorModal } from './components/DoctorModal';
import { BookingForm } from './components/BookingForm';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { AppointmentDashboard } from './components/AppointmentDashboard';
import { Footer } from './components/Footer';
import { 
  ShieldCheck, 
  CalendarClock, 
  Clock, 
  Award, 
  HeartHandshake, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const MainContent = () => {
  const { activeView, setActiveView, doctors } = useAppointments();

  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [selectedDay, setSelectedDay] = useState('All Days');
  const [sortBy, setSortBy] = useState('default');

  
  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doctor) => {
        
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = doctor.name.toLowerCase().includes(q);
          const matchSpecialty = doctor.specialty.toLowerCase().includes(q);
          const matchBio = doctor.bio.toLowerCase().includes(q);
          if (!matchName && !matchSpecialty && !matchBio) {
            return false;
          }
        }

        
        if (selectedSpecialty !== 'All Specialties' && doctor.specialty !== selectedSpecialty) {
          return false;
        }

        
        if (selectedDay !== 'All Days' && !doctor.availableDays.includes(selectedDay)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'exp-desc') {
          return b.experience - a.experience;
        }
        if (sortBy === 'fee-asc') {
          return a.fee - b.fee;
        }
        if (sortBy === 'fee-desc') {
          return b.fee - a.fee;
        }
        if (sortBy === 'name-asc') {
          return a.name.localeCompare(b.name);
        }
        return 0; 
      });
  }, [doctors, searchQuery, selectedSpecialty, selectedDay, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('All Specialties');
    setSelectedDay('All Days');
    setSortBy('default');
  };

  const handleSelectSpecialtyFromHero = (specialty) => {
    setSelectedSpecialty(specialty);
    setActiveView('doctors');
  };

  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        {activeView === 'home' && (
          <>
            <HeroSection onSelectSpecialty={handleSelectSpecialtyFromHero} />

            {}
            <section className="features-section">
              <div className="section-container">
                <div className="section-header text-center">
                  <span className="section-pill">Why MediSlot?</span>
                  <h2 className="section-title">Healthcare Scheduling Reimagined</h2>
                  <p className="section-subtitle">
                    Designed to eliminate waiting anxiety with guaranteed slots and complete doctor transparency.
                  </p>
                </div>

                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon mint">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="feature-title">Verified Specialists</h3>
                    <p className="feature-desc">
                      Every doctor on MediSlot is council-accredited with proven clinical track records across premier institutions.
                    </p>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon sky">
                      <CalendarClock size={28} />
                    </div>
                    <h3 className="feature-title">Real-Time Slot Locking</h3>
                    <p className="feature-desc">
                      Our system prevents double-booking in real time, ensuring your chosen consultation time is exclusively yours.
                    </p>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon mint">
                      <Clock size={28} />
                    </div>
                    <h3 className="feature-title">Zero Waiting Queue</h3>
                    <p className="feature-desc">
                      Arrive at your assigned slot time. Minimize clinic lobby delays with synchronized slot management.
                    </p>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon sky">
                      <HeartHandshake size={28} />
                    </div>
                    <h3 className="feature-title">Transparent Pricing</h3>
                    <p className="feature-desc">
                      Clear consultation fees upfront with zero hidden administrative charges or surprise add-ons.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {}
            <section className="featured-doctors-section">
              <div className="section-container">
                <div className="section-header-row">
                  <div>
                    <span className="section-pill">Top Specialists</span>
                    <h2 className="section-title">Our Medical Experts</h2>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => {
                      setActiveView('doctors');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    View All Doctors
                    <ArrowRight size={16} />
                  </button>
                </div>

                <DoctorDirectory
                  doctors={doctors.slice(0, 4)}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </section>
          </>
        )}

        {activeView === 'doctors' && (
          <div className="directory-view-container section-container">
            <div className="view-header">
              <div>
                <span className="section-pill">Specialist Directory</span>
                <h1 className="view-title">Find & Book a Specialist</h1>
                <p className="view-subtitle">
                  Browse doctors by clinical specialty, check consulting days, and secure your slot instantly.
                </p>
              </div>
            </div>

            <SearchFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedSpecialty={selectedSpecialty}
              setSelectedSpecialty={setSelectedSpecialty}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalResults={filteredDoctors.length}
            />

            <DoctorDirectory
              doctors={filteredDoctors}
              onResetFilters={handleResetFilters}
            />
          </div>
        )}

        {activeView === 'my-appointments' && (
          <div className="section-container">
            <AppointmentDashboard />
          </div>
        )}
      </main>

      {}
      <DoctorModal />
      <BookingForm />
      <BookingConfirmationModal />

      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppointmentProvider>
      <MainContent />
    </AppointmentProvider>
  );
}

export default App;
