# 🎪 EventEase — Premier Event Management & Ticketing Web Application

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Lucide](https://img.shields.io/badge/Lucide--React-0.344.0-F97316?style=for-the-badge)](https://lucide.dev/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern_Glassmorphism-14B8A6?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/CSS)

> **EventEase** is a production-quality, responsive single-page web application designed for discovering, registering, and organizing events across metropolitan hubs. Featuring a theme of vibrant **Teal (`#14b8a6`)** and **Coral (`#f97316`)** set against a **Dark Navy (`#0d1b2a`)** backdrop, EventEase delivers smooth glassmorphism aesthetics, live seat tracking, ticket generation, and a real-time organizer dashboard.

---

## 📑 Table of Contents
1. [Overview](#-overview)
2. [Visual Design System](#-visual-design-system)
3. [Key Features & Architecture](#-key-features--architecture)
4. [File & Directory Structure](#-file--directory-structure)
5. [Installation & Setup](#-installation--setup)
6. [Data Schema & Storage](#-data-schema--storage)
7. [Comprehensive Viva Voce & Technical Q&A (20 Questions)](#-comprehensive-viva-voce--technical-qa)

---

## 🌟 Overview

**EventEase** addresses the complexities of event discovery and attendee registration with an intuitive, unified client-side architecture. It provides:
- **For Attendees:** Search and filter hundreds of tech summits, music festivals, culinary gatherings, comedy nights, and sports meets. Book tickets with live capacity validation, get digital ticket passes with unique reference IDs (`EVT-2024-XXXXX`), and manage personal registrations with single-click cancellations.
- **For Organizers:** An interactive KPI management console featuring real-time attendance figures, venue capacity utilization metrics, revenue tracking, and full CRUD operations (Create, Edit, Delete) over the event inventory.

---

## 🎨 Visual Design System

- **Background Palette:** `#0d1b2a` (Primary Dark Navy) & `#08111b` (Deep Void)
- **Card Surfaces:** `#1a2a3a` (Translucent Slate Navy with `backdrop-filter: blur(16px)`)
- **Primary Brand Color:** `#14b8a6` (Vibrant Cyan Teal)
- **Accent Brand Color:** `#f97316` (High-Energy Coral Orange)
- **Typography:** Google Font **Outfit** (`300`, `400`, `500`, `600`, `700`, `800`)
- **Effects:**
  - Radial ambient background glow orbs with keyframe pulsing.
  - Floating CSS particle animations.
  - Glassmorphic navigation bar with blurred backdrop and badge counters.
  - Smooth card lift transitions (`transform: translateY(-8px)`).
  - Print stylesheet optimizations for hard-copy ticket passes.

---

## 🚀 Key Features & Architecture

### 1. Global State Management (`src/context/EventContext.jsx`)
- Powered by React Context API and custom hook `useEventContext()`.
- Synchronizes both `events` and `registrations` to browser `localStorage` with fail-safe fallbacks.
- Manages navigation views (`'home'`, `'events'`, `'my-registrations'`, `'organizer'`).
- Controls modals for event details, registration forms, digital ticket passes, and organizer add/edit dialogs.

### 2. Event Discovery & Live Filtering (`src/components/EventGrid.jsx`)
- **Multi-Factor Search:** Searches across title, category, venue, city, and full description.
- **Category Filter Pills:** All, Tech, Music, Food & Drink, Business, Art, Sports, Comedy.
- **Price Filter:** Instant toggle between All, Free (₹0), and Paid tiers.
- **City Selector:** Filter by Bangalore, Mumbai, Delhi, Hyderabad, Pune, Rishikesh, Dehradun, etc.
- **Sorting Engine:** Date (Earliest / Latest), Price (Low-to-High / High-to-Low), and Popularity.

### 3. Interactive Event Cards & Modal Detail (`src/components/EventCard.jsx`, `src/components/EventModal.jsx`)
- Dynamic badges (Category, Featured, Free / Price tag, Sold Out overlay).
- Visual progress bar measuring booked capacity against venue limits (`registered / capacity`).
- Detailed modal preview with full venue specifications, host highlights, shareable URL generator, and one-click registration CTA.

### 4. Registration & Ticket Pass Engine (`src/components/RegistrationForm.jsx`, `src/components/RegistrationSuccessModal.jsx`)
- Client-side validation:
  - **Full Name:** Required, minimum 3 characters.
  - **Email:** Strict regex syntax check (`user@example.com`).
  - **Phone:** Exact 10-digit numeric validation.
  - **Ticket Counter:** Interactive spinner (1 to 5 seats or remaining capacity).
- Real-time total price calculation (`tickets × event.price` or `FREE`).
- **Confirmation Pass:** Generates a perforated boarding-pass-style digital ticket featuring:
  - Unique Reference ID: `EVT-2024-` + 5 random digits.
  - Simulated QR code matrix.
  - Verification chip and print ticket functionality.

### 5. My Registrations Management (`src/components/MyRegistrations.jsx`)
- Full roster of attendee bookings with dates, venue addresses, reference IDs, and ticket quantities.
- Accessible search filter within user bookings.
- Cancellation dialog that releases reserved seats back into the event capacity pool.

### 6. Organizer Control Center (`src/components/OrganizerDashboard.jsx`, `src/components/AddEventForm.jsx`)
- **KPI Metrics:** Total Events, Total Registrations, Capacity Utilization Percentage, and Gross Volume turnover.
- **Inventory Table:** Responsive table with event thumbnails, category badges, dates, occupancy bars, and actions.
- **Create & Edit Modals:** Pre-filled forms with image presets, capacity controls, pricing, and validation.
- **Reset Demo Data:** One-click restoration of the default 22+ event dataset.

---

## 📂 File & Directory Structure

```
EventEase/
├── index.html                   # HTML5 Entry Point with Outfit Google Font
├── package.json                 # Dependencies & Build Scripts
├── vite.config.js               # Vite + React Configuration
├── README.md                    # Comprehensive Documentation & Viva Q&A
└── src/
    ├── main.jsx                 # React 18 Root Render
    ├── App.jsx                  # Main Shell, Layout, Router & Global Modals
    ├── index.css                # Pure CSS Theme (Glassmorphism, Animations)
    ├── data/
    │   └── events.js            # Realistic Initial Dataset (22+ events, categories)
    ├── context/
    │   └── EventContext.jsx     # Centralized State, Actions, LocalStorage
    └── components/
        ├── Navbar.jsx           # Glassmorphic Header with Badges & Mobile Menu
        ├── HeroSection.jsx      # Animated Hero with Glowing Orbs & Metrics
        ├── EventCard.jsx        # Individual Event Card with Progress Bar
        ├── EventGrid.jsx        # Filterable & Searchable Event Grid
        ├── EventModal.jsx       # Event Details Modal
        ├── RegistrationForm.jsx # Registration Modal with Ticket Spinner & Validation
        ├── RegistrationSuccessModal.jsx # Ticket Pass with QR & Print Mode
        ├── MyRegistrations.jsx  # Attendee Bookings List & Cancellation
        ├── OrganizerDashboard.jsx # Analytics KPIs & Events Table
        ├── AddEventForm.jsx     # Add/Edit Event Modal with Validation
        ├── Toast.jsx            # Animated System Notifications
        └── Footer.jsx           # Platform Links, Categories & Legal
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Step-by-Step Execution

1. **Navigate to the project root:**
   ```bash
   cd e:\internshipProjects\Chandan_Web_Development_Projects\EventEase
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 📊 Data Schema & Storage

### Event Object
```javascript
{
  id: 1,
  title: 'Global Tech Summit 2024',
  category: 'Tech',
  date: '2024-11-15',
  time: '09:00',
  venue: 'Bangalore International Exhibition Centre',
  city: 'Bangalore',
  description: 'Annual gathering of tech leaders, developers, and innovators.',
  image: 'https://images.unsplash.com/...',
  capacity: 500,
  registered: 342,
  price: 2500,
  featured: true
}
```

### Registration Object
```javascript
{
  id: 'reg-1729000000000-abc12',
  eventId: 1,
  eventTitle: 'Global Tech Summit 2024',
  eventDate: '2024-11-15',
  eventTime: '09:00',
  eventVenue: 'Bangalore International Exhibition Centre',
  eventCity: 'Bangalore',
  eventImage: 'https://images.unsplash.com/...',
  eventPrice: 2500,
  fullName: 'Chandan Kumar',
  email: 'chandan.dev@example.com',
  phone: '9876543210',
  tickets: 2,
  totalPrice: 5000,
  referenceId: 'EVT-2024-78421',
  registeredAt: '2024-10-15T10:30:00.000Z'
}
```

---

## 🎓 Comprehensive Viva Voce & Technical Q&A

### Q1. What is EventEase and what problem does it solve?
**Answer:** EventEase is a modern, responsive web application for event discovery, ticket reservation, and organizer inventory management. It bridges the gap between attendees looking for curated gatherings and event organizers who need a lightweight management dashboard to track registrations, capacity utilization, and event status in real time.

### Q2. Why was Vite selected as the bundler instead of Create React App (CRA)?
**Answer:** Vite offers significant advantages over CRA:
1. **Lightning-fast Server Start:** Vite leverages native ES Modules (ESM) in modern browsers, avoiding the need to bundle the entire application before serving.
2. **Instant Hot Module Replacement (HMR):** Updates are pushed in milliseconds regardless of project scale.
3. **Optimized Rollup Production Builds:** Provides efficient code splitting, minification, and tree-shaking for lean production assets. CRA is deprecated and relies on Webpack with slower cold starts.

### Q3. How does EventEase manage global application state?
**Answer:** State is centralized using React's **Context API** in `EventContext.jsx`. The `EventProvider` encapsulates state for `events`, `registrations`, `activeView`, modal visibility, filter criteria, and system notifications. Any component can consume this state and dispatch actions via the custom `useEventContext()` hook, preventing prop drilling.

### Q4. How is data persisted across browser reloads?
**Answer:** Local persistence is achieved using the browser's `localStorage` API. The initial state is loaded through lazy initializers in `useState`:
```javascript
const [events, setEvents] = useState(() => {
  const saved = localStorage.getItem('eventease_events_v1');
  return saved ? JSON.parse(saved) : initialEvents;
});
```
Changes to `events` and `registrations` are automatically synced through `useEffect` hooks. If `localStorage` is empty or cleared, safe fallback data is provided.

### Q5. How does capacity management work when an attendee registers or cancels?
**Answer:** 
1. **On Registration:** The system checks if `remainingSeats >= tickets`. If valid, a new registration object is added, and the event's `registered` property is atomically incremented by `ticketCount`.
2. **On Cancellation:** The system locates the registration, decrements the event's `registered` count by the quantity of cancelled tickets (floored at zero), and removes the registration record from state. Both operations automatically persist to `localStorage`.

### Q6. How is the unique Reference ID formatted and generated?
**Answer:** The reference ID follows the specified format `'EVT-2024-' + 5 random digits`:
```javascript
const generateReferenceId = () => {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `EVT-2024-${randomDigits}`;
};
```
This produces unique identifiers such as `EVT-2024-48291`, printed on both the digital ticket and in registration records.

### Q7. How is form validation handled in RegistrationForm without external libraries?
**Answer:** Validation uses controlled component state with custom validation logic:
- **Full Name:** Verified to be non-empty and minimum 3 characters.
- **Email:** Validated against standard regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- **Phone:** Sanitized and checked for exactly 10 digits (`/^[0-9]{10}$/`).
- **Tickets:** Checked to ensure quantity is between 1 and the minimum of (5, remaining venue seats).
Errors are stored in an `errors` object mapped by field name and cleared as the user types.

### Q8. How is the dynamic pricing calculation performed?
**Answer:** Inside `RegistrationForm.jsx`:
```javascript
const totalPrice = formData.tickets * (selectedEvent.price || 0);
```
If `selectedEvent.price === 0`, the UI renders a green `FREE` tag. When positive, it formats the figure with Indian numbering formatting (`₹${totalPrice.toLocaleString('en-IN')}`).

### Q9. How are modal dialogues rendered and managed accessibility-wise?
**Answer:** Modals are rendered as fixed overlays with `role="dialog"` and `aria-modal="true"`. Clicking the backdrop closes the modal, while event propagation on the inner modal dialog is halted via `e.stopPropagation()`. Clean close buttons and keyboard accessibility (`Enter`/`Space`) are supported.

### Q10. What is Glassmorphism and how is it styled in EventEase?
**Answer:** Glassmorphism produces a translucent frosted-glass aesthetic. In EventEase, this is styled using:
```css
background: rgba(26, 42, 58, 0.75);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
```
This allows glowing background particles and ambient orbs to shine through card headers and the sticky navbar.

### Q11. How does the multi-criteria search and filter pipeline operate?
**Answer:** In `EventGrid.jsx`, filtering is optimized using `useMemo`:
1. Search query evaluates text in `title`, `description`, `venue`, `city`, and `category`.
2. Category filter matches selected pill (`All` or specific category).
3. City selector isolates events matching the dropdown value.
4. Price filter filters for `Free` (`price === 0`) or `Paid` (`price > 0`).
5. Sorter reorders the array by Date, Price, or Popularity (`registered` attendee count).
The memoized result only recalculates when dependency values change.

### Q12. How is print capability achieved for the digital ticket pass?
**Answer:** EventEase includes custom `@media print` rules in `src/index.css`. When the user clicks "Print Ticket" (`window.print()`):
- Navbars, footers, modal backdrops, and close buttons are hidden (`display: none !important`).
- Background colors invert to clean white, borders shift to solid dark lines, and the digital ticket renders formatted for physical paper or PDF export.

### Q13. How does the Toast notification system handle dismissal?
**Answer:** The `showToast(message, type)` function sets a toast object containing a timestamp ID, message, and category (`'success'`, `'info'`, `'error'`). A `setTimeout` automatically clears the state after 4,000ms, while a CSS keyframe animation drains the progress bar along the bottom of the toast.

### Q14. What are the key performance optimizations in this codebase?
**Answer:**
1. **useMemo:** Used in `EventGrid` and `OrganizerDashboard` to prevent re-filtering and sorting thousands of items on unrelated re-renders.
2. **Lazy State Initializers:** Avoids redundant `localStorage.getItem()` disk reads on every component render.
3. **Lazy Image Loading:** Images include `loading="lazy"` to defer loading off-screen assets.
4. **Fallback Handling:** `onError` handlers prevent broken image UI if remote Unsplash links fail.

### Q15. How does the Organizer Dashboard calculate occupancy and revenue?
**Answer:**
```javascript
const totalCapacity = events.reduce((sum, e) => sum + (e.capacity || 0), 0);
const totalRegistrations = events.reduce((sum, e) => sum + (e.registered || 0), 0);
const overallOccupancy = totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0;
const estimatedRevenue = events.reduce((sum, e) => sum + (e.registered || 0) * (e.price || 0), 0);
```
These values power the real-time KPI overview cards.

### Q16. What prevents overselling beyond an event's venue capacity?
**Answer:** Multiple safeguards exist:
1. Registration card and modal show a `SOLD OUT` overlay when `registered >= capacity`.
2. The registration button is disabled when sold out.
3. Inside `RegistrationForm`, maximum allowable tickets are capped to `Math.min(5, remainingSeats)`.
4. In `EventContext.registerForEvent`, validation verifies `ticketCount <= remainingSeats` before confirming.

### Q17. How does the responsive navigation menu work on mobile viewports?
**Answer:** In `Navbar.jsx`, desktop links are hidden on screens `< 820px` via `@media (max-width: 820px) { .desktop-nav { display: none; } }`. A hamburger toggle button opens a slide-out drawer (`mobile-menu-card`) with blurred backdrop overlay, navigation links with active badges, and a direct "Publish New Event" CTA.

### Q18. How does EventEase handle image error fallbacks?
**Answer:** Every `<img>` tag implements an `onError` fallback:
```javascript
onError={(e) => {
  e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80';
}}
```
This ensures zero broken image placeholders if external network constraints occur.

### Q19. What are React 18 Concurrent features and how does EventEase benefit?
**Answer:** React 18 introduced the Concurrent React runtime, automatic batching of state updates (combining multiple `setState` calls inside timeouts and native events into a single render), and improved `createRoot` rendering semantics. This ensures micro-interactions, modal toggles, and filter updates execute smoothly without UI stutter.

### Q20. How would you scale EventEase to a production enterprise architecture?
**Answer:**
1. **Backend API:** Replace client-side LocalStorage with Node.js/Express, Go, or Python FastAPI services.
2. **Database & Transactions:** Use PostgreSQL with row-level locks (`SELECT ... FOR UPDATE`) to eliminate race conditions during high-concurrency ticket reservations.
3. **Payment Gateway:** Integrate Stripe or Razorpay webhooks for real-time payment capture and refund automation.
4. **Authentication:** Implement JWT or OAuth 2.0 (Google/GitHub) for secure attendee and organizer accounts.
5. **Real-time Updates:** Use WebSockets or Server-Sent Events (SSE) to broadcast live seat availability counter updates to all connected users.

---

## 👨‍💻 Author & Attribution
- **Project:** EventEase Web Application
- **Author:** Chandan Kumar
- **Technologies:** React 18, Vite, Lucide Icons, Pure CSS3
- **License:** MIT License
