# Chandan Kumar — Web Development Projects Portfolio

**Student:** Chandan Kumar
**Company:** INTERNIVO TECHNOLOGIES
**Role:** Web Developer Intern
**Purpose:** Practical demonstration, portfolio development, and internship examination preparation.

---

> ⚠️ **Disclaimer:** All five projects are **demonstration applications** built for internship portfolio and examination purposes. Sample data, fictional employers, fictional doctors, fictional events, and fictional products are used throughout. No real payments, appointments, job applications, or orders are processed. LocalStorage is used for client-side persistence only and is not a secure shared database.

---

## 📁 Projects Overview

| # | Project | Type | Theme | Port |
|---|---------|------|-------|------|
| 1 | [ShopSphere](#1-shopsphere--e-commerce-storefront) | E-Commerce Storefront | Dark Purple Glassmorphism | 5173 |
| 2 | [LibraryPro](#2-librarypro--library-management-system) | Library Management | Warm Amber/Sepia | 5174 |
| 3 | [EventEase](#3-eventease--event-management-platform) | Event Booking | Vibrant Teal & Coral | 5175 |
| 4 | [CareerConnect](#4-careerconnect--job-portal) | Job Portal | Professional Navy/Slate | 5176 |
| 5 | [MediSlot](#5-medislot--clinic-appointment-booking) | Clinic Appointments | Clinical Dark Navy/Mint | 5177 |

---

## 🚀 Quick Start (All Projects)

### Prerequisites
- Node.js 18+ and npm installed
- Any modern browser (Chrome, Firefox, Edge)

### Run All Projects

Open 5 separate terminal windows and run one command in each:

```bash
# Terminal 1 — ShopSphere
cd "e:\internshipProjects\Chandan_Web_Development_Projects\ShopSphere"
npm install && npm run dev

# Terminal 2 — LibraryPro
cd "e:\internshipProjects\Chandan_Web_Development_Projects\LibraryPro"
npm install && npm run dev

# Terminal 3 — EventEase
cd "e:\internshipProjects\Chandan_Web_Development_Projects\EventEase"
npm install && npm run dev

# Terminal 4 — CareerConnect
cd "e:\internshipProjects\Chandan_Web_Development_Projects\CareerConnect"
npm install && npm run dev

# Terminal 5 — MediSlot
cd "e:\internshipProjects\Chandan_Web_Development_Projects\MediSlot"
npm install && npm run dev
```

Each app opens at `http://localhost:517X` (Vite auto-assigns ports).

---

## 1. ShopSphere — E-Commerce Storefront

📁 `./ShopSphere/` | 🎨 Dark Purple Glassmorphism

### About
A premium e-commerce demonstration featuring a luxury product catalog, persistent shopping cart, simulated checkout flow, and order confirmation system.

### Key Features
- 12 premium products across Electronics, Fashion, Sports, Home, Books
- Real-time search, category filter pills, price/rating sort
- Product detail modal with reviews
- Slide-out cart drawer with free shipping progress bar
- Animated virtual card preview on checkout
- Order confirmation with `ORD-2024-XXXX` reference
- 100% LocalStorage cart persistence

### Run
```bash
cd ShopSphere
npm install
npm run dev
```

### Tech Stack
React 18, Vite 5, Lucide React, Vanilla CSS (glassmorphism), LocalStorage

---

## 2. LibraryPro — Library Management System

📁 `./LibraryPro/` | 🎨 Warm Amber/Sepia Classic

### About
A full-featured library management system for cataloguing books, tracking borrow/return cycles, detecting overdue items, and maintaining circulation records.

### Key Features
- 20 books across 6 categories (Fiction, Non-Fiction, Science, History, Technology, Biography)
- Dashboard: Total, Available, Borrowed, Overdue stats
- Search by title, author, or ISBN; filter by category & availability
- Add, Edit, Delete books with confirmation dialogs
- Borrow book (records borrower + 14-day due date)
- Return book with automatic overdue detection
- Full circulation records table
- Toast notifications, stock gauge bars
- LocalStorage persistence

### Run
```bash
cd LibraryPro
npm install
npm run dev
```

### Tech Stack
React 18, Vite 5, Lucide React, Playfair Display + Inter (Google Fonts), LocalStorage

---

## 3. EventEase — Event Management & Booking Platform

📁 `./EventEase/` | 🎨 Vibrant Teal & Coral on Dark Navy

### About
A complete event discovery and registration platform with an organizer control center, real-time seat tracking, and digital boarding pass generation.

### Key Features
- 22 sample events across 7 categories (Tech, Music, Food & Drink, Business, Art, Sports, Comedy)
- Multi-factor search: title, venue, city, category, price filter, sort
- Event detail modal with capacity progress bar
- Registration with ticket quantity (1–5), price calculation
- Digital boarding pass with simulated QR code + `EVT-2024-XXXXX` reference
- Print/PDF support for boarding pass
- My Registrations view with cancellation (releases seats)
- Organizer Dashboard: KPI metrics, full CRUD for events
- LocalStorage persistence

### Run
```bash
cd EventEase
npm install
npm run dev
```

### Tech Stack
React 18, Vite 5, Lucide React, Outfit (Google Font), LocalStorage

---

## 4. CareerConnect — Job Portal

📁 `./CareerConnect/` | 🎨 Professional Navy/Slate Corporate

### About
A professional job search and application tracking platform with fictional employer listings, bookmark management, application pipeline tracking, and status progression.

### Key Features
- 15 fictional tech job listings with full descriptions, requirements, responsibilities
- Search by title, company, or skills
- Multi-filter: Location, Job Type, Experience Level
- Job detail modal
- Bookmark/save jobs with gold toggle
- Apply form: Name, Email, Phone, LinkedIn, Experience, Cover Letter (min 50 chars)
- Application ID: `APP-2024-XXXXX`
- Application dashboard with status pipeline: Applied → In Review → Interview → Offer/Rejected
- Manual status update per application
- LocalStorage persistence

### Run
```bash
cd CareerConnect
npm install
npm run dev
```

### Tech Stack
React 18, Vite 5, Lucide React, Inter (Google Font), LocalStorage

---

## 5. MediSlot — Clinic Appointment Booking System

📁 `./MediSlot/` | 🎨 Clinical Dark Navy/Mint

### About
A clinic appointment booking demonstration for MediSlot Clinic Network, featuring 8 specialist doctors, intelligent duplicate slot detection, and booking confirmation receipts.

### Key Features
- 8 specialist doctors: Cardiologist, Neurologist, Pediatrician, Orthopedic, Dermatologist, Psychiatrist, Gynecologist, Ophthalmologist
- Doctor directory with search/filter by name or specialty
- Doctor detail modal with bio, qualifications, available days
- Booking form: patient details, date picker, time slot selection
- Duplicate booking prevention (same doctor + date + slot blocked)
- Booking confirmation: `MED-2024-XXXXX` reference ID
- Printable consultation slip
- Upcoming appointments dashboard with cancellation
- LocalStorage persistence

### Run
```bash
cd MediSlot
npm install
npm run dev
```

### Tech Stack
React 18, Vite 5, Lucide React, Inter (Google Font), LocalStorage

---

## 🗂️ Workspace Structure

```
Chandan_Web_Development_Projects/
├── README.md                  ← This file
├── ShopSphere/
│   ├── src/
│   │   ├── components/        (Navbar, Hero, ProductGrid, Cart, Checkout, OrderConfirmation...)
│   │   ├── context/           (CartContext.jsx)
│   │   └── data/              (products.js)
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── LibraryPro/
│   ├── src/
│   │   ├── components/        (Dashboard, BookCatalog, BorrowModal, BorrowingRecords...)
│   │   ├── context/           (LibraryContext.jsx)
│   │   └── data/              (books.js)
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── EventEase/
│   ├── src/
│   │   ├── components/        (HeroSection, EventGrid, RegistrationForm, OrganizerDashboard...)
│   │   ├── context/           (EventContext.jsx)
│   │   └── data/              (events.js)
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── CareerConnect/
│   ├── src/
│   │   ├── components/        (HeroSearch, JobGrid, FilterPanel, ApplyForm, ApplicationDashboard...)
│   │   ├── context/           (JobContext.jsx)
│   │   └── data/              (jobs.js)
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── MediSlot/
    ├── src/
    │   ├── components/        (DoctorDirectory, BookingForm, AppointmentDashboard...)
    │   ├── context/           (AppointmentContext.jsx)
    │   └── data/              (doctors.js)
    ├── package.json
    ├── vite.config.js
    └── README.md
```

---

## 🛠️ Common Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI framework with hooks & Context API |
| Vite | 5.4.2 | Lightning-fast dev server & bundler |
| JavaScript (ES2022) | — | Language |
| Lucide React | 0.344.0 | Icon library |
| Vanilla CSS | — | Custom styling per project |
| LocalStorage API | — | Client-side data persistence |
| Google Fonts | — | Inter, Playfair Display, Outfit |

---

## 📋 Documentation

Each project contains a comprehensive `README.md` with:
- Abstract & Problem Statement
- Objectives & Scope
- Features & Module Descriptions
- Tech Stack & Rationale
- Folder Structure & Architecture
- Application Workflow
- Installation & Execution Steps
- Test Cases (Expected vs Actual)
- Limitations & Future Enhancements
- 5-Minute Presentation Script
- **20 Viva Questions & Answers**
- Step-by-Step Live Demo Guide

---

*Built by Chandan Kumar | Web Developer Intern | INTERNIVO TECHNOLOGIES*
*All data is fictional and for demonstration purposes only.*
