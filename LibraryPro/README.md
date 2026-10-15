# LibraryPro - Smart Library Management System

> **A classic archival & circulation management web application crafted with React 18, Vite, and modern CSS.**
> Featuring a warm amber, sepia, and gilded library aesthetic with real-time borrowing controls, overdue tracking, and persistent browser storage.

---

## 📖 Table of Contents
1. [Project Overview](#project-overview)
2. [Visual Design & Theme](#visual-design--theme)
3. [Key Features](#key-features)
4. [Tech Stack](#tech-stack)
5. [Project Architecture & Directory Structure](#project-architecture--directory-structure)
6. [Component Reference](#component-reference)
7. [Data Architecture & LocalStorage](#data-architecture--localstorage)
8. [Installation & Setup](#installation--setup)
9. [Build & Deployment](#build--deployment)
10. [20 Viva Voce Questions & Answers](#20-viva-voce-questions--answers)

---

## 🏛️ Project Overview

**LibraryPro** is a comprehensive, production-grade single-page application (SPA) tailored for institutional and archival book collections. It combines an inviting, warm library aesthetic with practical circulation management: real-time copy tracking, patron borrowing records, automatic 14-day loan schedules, overdue detection, and instant search & filtering across categories and shelf availability.

All modifications (adding books, updating book metadata, deleting volumes, loaning copies, and returning copies) immediately synchronize with the browser's `localStorage`, providing reliable offline persistence without requiring an external backend database.

---

## 🎨 Visual Design & Theme

LibraryPro uses a classic archival library visual language characterized by warm ambient lighting, deep wood finishes, and gilded accents:

- **Background Palette**: `#1c1408` (deep vintage walnut) and `#261b0d` (leather tone).
- **Primary Color**: `#d97706` (warm glowing amber).
- **Accent Color**: `#f59e0b` / `#fbbf24` (gilded gold).
- **Text & Foreground**: `#fef3c7` (warm cream parchment) and `#fde68a` (soft sepia).
- **Typography**:
  - Headings & Accents: **'Playfair Display'** (classic editorial serif).
  - Body & UI: **'Inter'** (clean, crisp sans-serif readability).
  - Identifiers (ISBNs, IDs): Monospace font.
- **Micro-Interactions**: Glassmorphism translucent backdrops, glowing amber card borders, stock availability gauge bars, and smooth modal transitions.

---

## ✨ Key Features

1. **Circulation Dashboard**:
   - **Total Books**: Real-time count of titles and total volume copies.
   - **Available Books**: Count of titles currently in stock with available shelf copies.
   - **Borrowed Books**: Real-time count of active loans across patrons.
   - **Overdue Books**: Alert counter detecting items past their 14-day checkout deadline.
   - Interactive stats cards double as one-click quick filters.

2. **Curated Catalog (20 Built-in Volumes)**:
   - Initialized with 20 diverse, classic, and contemporary books spanning Fiction, Non-Fiction, Science, History, Technology, and Biography.
   - Complete metadata: Title, Author, ISBN, Category, Publisher, Publication Year, Total Copies, Available Copies, Description, and High-Resolution Cover Art.

3. **Multi-Faceted Search & Filtering**:
   - Live full-text search by title, author name, or ISBN code.
   - Dropdown filter by literary category (Fiction, Non-Fiction, Science, History, Technology, Biography, All).
   - Availability status filter (All, Available Only, Borrowed, Overdue).
   - Active filter chips with one-click clear.

4. **Book Detail Modal (Quick View)**:
   - Comprehensive overview showing synopsis, publisher, publication year, ISBN, and stock gauge.
   - Active patrons list: lists all individuals who currently have a copy checked out, their issue date, due date, and a direct "Return Copy" action.

5. **Circulation Management (Borrow & Return)**:
   - **Borrow Book**: Validates available stock, records patron's full name, and automatically computes a 14-day due date from checkout.
   - **Return Book**: Instantly returns volume to shelf stock, logs return timestamp, and updates record status to "Returned".
   - Supports returns from the book card, detail modal, or circulation audit log.

6. **Overdue Detection Engine**:
   - Dynamically evaluates issue and due dates against current midnight time.
   - Automatically flags overdue items with a bright ruby red badge (`badge-status--overdue`) and emits notification indicators on the navigation bar.

7. **Circulation & Borrowing Log Table**:
   - Dedicated audit table showing reference ID, title, borrower, issue date, due date, return date, and color-coded status.
   - Filter tabs: All Logs, Active Loans, Overdue Items, and Completed Returns.
   - Dedicated patron search within the log.

8. **Full Catalog CRUD Operations**:
   - **Add New Book**: Rich modal with client-side form validation (title, author, ISBN formatting, category dropdown, year, publisher, copies, and optional image URL with quick presets).
   - **Edit Book**: Edit any book metadata with automatic stock recalculation.
   - **Delete Book**: Guarded deletion with confirmation modal (prevents accidental deletion of books currently checked out).

9. **Robust LocalStorage Engine**:
   - Persists all catalog books and borrowing logs across browser sessions.
   - Includes a "Reset Data" option in the dashboard to restore the pristine sample catalog at any time.

10. **Responsive Design**:
    - Mobile-first approach scaling seamlessly from smartphones to ultra-wide desktop monitors.

---

## 🛠️ Tech Stack

- **React 18**: Function components, custom hooks, `createContext`, `useContext`, `useMemo`, `useEffect`, `useState`.
- **Vite 5**: Blazing-fast build tool and local development server.
- **Lucide React**: Clean, modern iconography (books, clocks, shields, filters, quills, warning icons).
- **CSS3**: Custom design system with CSS custom properties (variables), grid, flexbox, glassmorphism, and keyframe animations.
- **Web Storage API**: `localStorage` data persistence with automatic JSON serialization and deserialization.

---

## 📁 Project Architecture & Directory Structure

```text
LibraryPro/
├── index.html                  # HTML entry point with Google Fonts preconnections
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite React configuration
├── README.md                   # Complete documentation and viva guide
└── src/
    ├── main.jsx                # React DOM mount point
    ├── App.jsx                 # App shell, context consumer, modal manager, and toast engine
    ├── index.css               # Complete warm amber/sepia design system & layout styles
    ├── data/
    │   └── books.js            # Initial 20 sample books and sample borrowing records
    ├── context/
    │   └── LibraryContext.jsx  # Central state management, CRUD, loans, overdue calculations
    └── components/
        ├── Dashboard.jsx       # Header, stats summary, view switcher, and circulation notice
        ├── StatsCard.jsx       # Amber stats widget with glow hover and value row
        ├── BookCatalog.jsx     # Catalog section with header, search filters, and grid
        ├── BookCard.jsx        # Book card with cover, stock bar, badges, and action buttons
        ├── SearchFilter.jsx    # Real-time search input, category select, and availability select
        ├── BookModal.jsx       # Detail modal with book metadata, synopsis, and patron list
        ├── AddBookForm.jsx     # Dual-mode modal form for Adding and Editing volumes
        ├── BorrowModal.jsx     # Checkout modal with 14-day schedule and patron input
        ├── BorrowingRecords.jsx# Circulation table with filter pills and return actions
        └── ConfirmDialog.jsx   # Reusable confirmation dialog for deletion & returns
```

---

## 🧩 Component Reference

### `LibraryContext.jsx`
Manages application-wide state:
- `books`: Array of catalog items.
- `borrowingRecords`: Array of circulation loans.
- `activeView`: Current view (`'catalog'` or `'records'`).
- `searchTerm`, `selectedCategory`, `availabilityFilter`: Active filtering parameters.
- `modalState`: Controls open modal type (`'add'`, `'edit'`, `'detail'`, `'borrow'`, `'delete'`, `'confirmReturn'`) and associated payload.
- `stats`: Memoized statistics object (`totalBooks`, `availableBooks`, `borrowedBooks`, `overdueBooks`, `totalCopiesSum`, `availableCopiesSum`).
- Exported actions: `addBook`, `editBook`, `deleteBook`, `borrowBook`, `returnBook`, `openModal`, `closeModal`, `resetToSampleData`.

### `Dashboard.jsx`
Displays the library banner, quick action buttons, four `StatsCard` widgets, view navigation tabs with live badge counters, and circulation advisory notes.

### `BookCard.jsx`
Renders individual books as gilded archival cards with:
- Hoverable cover image with fallback error recovery.
- Category badge and Overdue flag overlay.
- Title, author, formatted ISBN, publisher, and publication year.
- Visual stock progress bar (copies available vs. total copies).
- Context-sensitive action buttons: Borrow, Quick Return, View, Edit, and Delete.

### `BorrowingRecords.jsx`
Presents a responsive circulation ledger:
- Reference ID, book title, patron name, issue date, due date, return date.
- Status badges: **Active Loan** (Amber), **Overdue** (Red with warning icon), and **Returned** (Emerald).
- Direct "Return Book" action with confirmation.

---

## 💾 Data Architecture & LocalStorage

### 1. Book Schema (`books`)
```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: 'Fiction' | 'Non-Fiction' | 'Science' | 'History' | 'Technology' | 'Biography';
  publisher: string;
  year: number;
  totalCopies: number;
  availableCopies: number;
  cover: string;
  description: string;
}
```

### 2. Borrowing Record Schema (`borrowingRecords`)
```typescript
interface BorrowingRecord {
  id: string;              // e.g. 'rec-101' or 'rec-171829392'
  bookId: number;          // Foreign key referencing Book.id
  bookTitle: string;
  borrowerName: string;
  borrowDate: string;      // 'YYYY-MM-DD'
  dueDate: string;         // 'YYYY-MM-DD' (issue date + 14 days)
  returnDate: string|null; // 'YYYY-MM-DD' when returned
  status: 'active' | 'overdue' | 'returned';
}
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (version 16.0 or higher recommended)
- npm (comes with Node.js)

### Step-by-Step Instructions

1. Navigate to the project directory:
   ```bash
   cd e:\internshipProjects\Chandan_Web_Development_Projects\LibraryPro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch local Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 📦 Build & Deployment

To create an optimized production build:

```bash
npm run build
```

This compiles optimized HTML, bundled JavaScript chunks, and minified CSS assets into the `dist/` directory.

To test the production build locally:
```bash
npm run preview
```

---

## 🎓 20 Viva Voce Questions & Answers

### Q1: What is the primary purpose of LibraryPro?
**Answer:** LibraryPro is an institutional library management system designed to track book inventories, manage patron loans, calculate automatic 14-day return deadlines, detect overdue items, and maintain persistent archival records using React and LocalStorage.

### Q2: Why is Vite preferred over Create React App (CRA) for this project?
**Answer:** Vite uses native ES Modules (ESM) in the browser during development and compiles with esbuild, providing instantaneous server start times and sub-second Hot Module Replacement (HMR). In production, it creates highly optimized bundles via Rollup.

### Q3: How is state managed across the different components in LibraryPro?
**Answer:** State is centrally managed using React's **Context API** via `LibraryContext.jsx` and a custom hook `useLibrary()`. This avoids "prop drilling" by making book lists, borrowing records, active modals, and action dispatchers accessible to any nested component.

### Q4: How does LibraryPro detect if a borrowed book is overdue?
**Answer:** The system compares the record's `dueDate` against the current midnight timestamp (`new Date()`). If `returnDate` is `null` and the due date has passed, the record's status is evaluated as `'overdue'`, applying red alert styling and incrementing the overdue count in the dashboard.

### Q5: How does LocalStorage persistence work in this application?
**Answer:** State is initialized using lazy initializer functions in `useState` that parse JSON strings from `localStorage.getItem()`. Whenever `books` or `borrowingRecords` state updates, `useEffect` hooks automatically serialize and persist the updated data using `localStorage.setItem()`.

### Q6: What happens when a user clicks "Borrow" on a book?
**Answer:** 
1. The system verifies that `availableCopies > 0`.
2. A `BorrowModal` prompts for the patron's name.
3. Upon confirmation, a new record is created with today's date and a due date set 14 days in the future.
4. The book's `availableCopies` is decremented by 1.
5. Both state arrays (`books` and `borrowingRecords`) update and persist to LocalStorage.

### Q7: What safeguards are implemented when deleting a book?
**Answer:** The `deleteBook` handler checks whether any active loans exist for that book (`availableCopies < totalCopies` or active borrowing records). If copies are currently borrowed, deletion is blocked, and an error toast notification informs the librarian.

### Q8: What is the purpose of `useMemo` in `LibraryContext.jsx`?
**Answer:** `useMemo` is used to memoize expensive computations like the dashboard statistics (`stats`) and the multi-criteria search and filter results (`filteredBooks`). This prevents recalculating lists on unrelated re-renders, optimizing runtime performance.

### Q9: How is client-side form validation handled in `AddBookForm.jsx`?
**Answer:** A dedicated `validate()` function checks that required fields (Title, Author, ISBN, Publisher) are non-empty and satisfy length constraints, that the publication year falls within a realistic historical range (500 to current year + 2), and that total copies are at least 1. Error messages are stored in an `errors` state object and mapped to individual inputs.

### Q10: How does the application prevent broken images when rendering book covers?
**Answer:** The `BookCard` and `BookModal` components maintain an `imgError` state. An `onError` handler on the `<img>` tag detects network or URL failures and swaps in a high-quality fallback library cover image.

### Q11: Explain the difference between controlled and uncontrolled components in React.
**Answer:** In controlled components (used throughout LibraryPro's modals and search inputs), form data is handled by the React component state via `value` and `onChange`. In uncontrolled components, form data is handled directly by the DOM via `useRef`. Controlled components allow instant validation, conditional rendering, and programmatic resets.

### Q12: How does LibraryPro maintain responsiveness across mobile and desktop devices?
**Answer:** The CSS utilizes responsive CSS Grid with `repeat(auto-fit, ...)` or breakpoint queries (`@media`), flexible box (`flexbox`) alignments, percentage and relative units (`rem`, `vh`, `%`), and horizontal scrolling wrappers for data tables (`table-responsive-container`).

### Q13: What are React portals and when might you use them for modals?
**Answer:** React Portals (`ReactDOM.createPortal`) allow rendering components into a DOM node outside the root hierarchy. In LibraryPro, modals are rendered at the root `App.jsx` level with high `z-index` and fixed positioning, achieving clean stacking contexts and modal layering.

### Q14: How does the "Return Book" feature handle multiple copies of the same title?
**Answer:** Each loan is tracked as an independent `borrowingRecord` with a unique ID and patron name. When a patron returns a book, that specific loan record receives a `returnDate` and its status changes to `'returned'`, while the corresponding book's `availableCopies` increments by 1.

### Q15: Why are keys important when rendering lists in React (e.g. in `BookCatalog.jsx`)?
**Answer:** React uses the `key` prop during reconciliation to identify which items have changed, been added, or been removed. Using unique identifiers (like `book.id` or `record.id`) ensures efficient DOM updates and prevents UI glitching when sorting or filtering.

### Q16: How does the custom toast notification system work?
**Answer:** When an action succeeds or fails, `showToast(message, type)` sets a `toast` state object in context. A `useEffect` hook in context sets a 4-second timeout to automatically clear the toast, while CSS keyframe animations handle smooth sliding and fading.

### Q17: What is the advantage of using Lucide React over static SVG images?
**Answer:** Lucide React provides modular, tree-shakeable SVG icon components. They accept React props such as `size`, `color`, and `className`, enabling seamless styling, responsive scaling, and low bundle size overhead.

### Q18: What is lazy state initialization in React?
**Answer:** Passing a function to `useState(() => getInitialData())` ensures that expensive operations (like reading and parsing data from `localStorage`) only execute once during the initial mount, rather than on every component render.

### Q19: How are the amber and sepia visual aesthetics implemented in CSS?
**Answer:** Through CSS custom properties (`:root`), defining semantic variables for primary amber (`#d97706`), accent gold (`#f59e0b`), dark walnut backdrops (`#1c1408`), cream text (`#fef3c7`), and translucent surfaces with `backdrop-filter: blur()`. Headings utilize the Google serif font **Playfair Display** while text bodies use **Inter**.

### Q20: How would you expand LibraryPro for enterprise production use?
**Answer:** Future enhancements could include:
1. Connecting to a persistent REST or GraphQL backend (e.g., Node.js/Express or Supabase) with PostgreSQL.
2. User authentication (Role-Based Access Control for Librarians vs. Students/Patrons).
3. Barcode / QR-code scanning via camera input for instant ISBN cataloging.
4. Automated email notifications sent to patrons 48 hours prior to the 14-day due date.
5. Integration with the Open Library / Google Books API for automatic metadata fetching.

---

*LibraryPro — Crafted with care for book collectors, archivists, and modern libraries.*
