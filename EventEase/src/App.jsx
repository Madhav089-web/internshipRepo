import React from 'react';
import { EventProvider, useEventContext } from './context/EventContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EventGrid from './components/EventGrid';
import MyRegistrations from './components/MyRegistrations';
import OrganizerDashboard from './components/OrganizerDashboard';
import EventModal from './components/EventModal';
import RegistrationForm from './components/RegistrationForm';
import RegistrationSuccessModal from './components/RegistrationSuccessModal';
import AddEventForm from './components/AddEventForm';
import Toast from './components/Toast';
import Footer from './components/Footer';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  Ticket,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

function MainAppContent() {
  const { activeView, setActiveView } = useEventContext();

  return (
    <div className="app-layout">
      {}
      <Navbar />

      {}
      <main className="main-content">
        {activeView === 'home' && (
          <div className="home-view-container">
            {}
            <HeroSection />

            {}
            <section className="featured-strip-section">
              <div className="strip-header">
                <div>
                  <div className="section-pill">
                    <Sparkles size={14} />
                    <span>Handpicked Highlights</span>
                  </div>
                  <h2 className="section-title">Trending &amp; Featured Events</h2>
                  <p className="section-subtitle">
                    Top-rated conferences, concerts, and festivals filling up rapidly.
                  </p>
                </div>
                <button
                  className="view-all-link-btn"
                  onClick={() => {
                    setActiveView('events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <span>View All Events</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <EventGrid
                title="Featured Experiences"
                showOnlyFeatured={true}
              />
            </section>

            {}
            <section className="features-value-section">
              <div className="text-center-wrapper">
                <div className="section-pill centered-pill">
                  <ShieldCheck size={14} />
                  <span>The EventEase Advantage</span>
                </div>
                <h2 className="section-title">Built for Seamless Experiences</h2>
                <p className="section-subtitle">
                  Everything you need to discover, register, and organize unforgettable events.
                </p>
              </div>

              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon-box teal-box">
                    <Zap size={24} />
                  </div>
                  <h3 className="feature-title">Instant Digital Passports</h3>
                  <p className="feature-desc">
                    Get immediate booking confirmation with unique reference IDs and digital ticket
                    stubs ready for smartphone entry.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon-box coral-box">
                    <Clock size={24} />
                  </div>
                  <h3 className="feature-title">Real-Time Seat Tracking</h3>
                  <p className="feature-desc">
                    Live capacity indicators ensure you never miss out on fast-selling tickets. Know
                    exact seat counts at a glance.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon-box purple-box">
                    <Compass size={24} />
                  </div>
                  <h3 className="feature-title">Effortless Filtering</h3>
                  <p className="feature-desc">
                    Explore curated categories, filter by free versus paid, toggle cities, or sort by
                    date and popularity in milliseconds.
                  </p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon-box emerald-box">
                    <Users size={24} />
                  </div>
                  <h3 className="feature-title">Organizer Control Center</h3>
                  <p className="feature-desc">
                    Empowering event creators with real-time KPI metrics, registration oversight, and
                    intuitive catalog publishing.
                  </p>
                </div>
              </div>
            </section>

            {}
            <section className="home-catalog-section">
              <EventGrid
                title="Explore All Gatherings"
                subtitle="Browse through our complete catalog of summits, music, food walks, and workshops."
              />
            </section>
          </div>
        )}

        {activeView === 'events' && (
          <div className="events-view-container">
            <EventGrid
              title="All Upcoming Events"
              subtitle="Filter through verified events, browse venues, and secure your admission."
            />
          </div>
        )}

        {activeView === 'my-registrations' && <MyRegistrations />}

        {activeView === 'organizer' && <OrganizerDashboard />}
      </main>

      {}
      <EventModal />
      <RegistrationForm />
      <RegistrationSuccessModal />
      <AddEventForm />
      <Toast />

      {}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <EventProvider>
      <MainAppContent />
    </EventProvider>
  );
}
