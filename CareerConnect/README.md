# 💼 CareerConnect — Modern Tech Job Portal

A high-performance, production-grade Tech Job Portal built with **React 18**, **Vite**, **Lucide Icons**, and vanilla CSS design system. CareerConnect features a sleek corporate navy and slate aesthetic tailored for modern technology recruitment.

---

## 🌟 Visual Theme & Design System

- **Background:** `#0f172a` (Slate 900 / Deep Navy)
- **Cards & Surfaces:** `#1e293b` (Slate 800)
- **Card Hover:** `#24344d`
- **Primary Color:** `#3b82f6` (Electric Blue)
- **Accent Color:** `#06b6d4` (Cyan)
- **Body Text:** `#f1f5f9` (Slate 100)
- **Muted Text:** `#94a3b8` (Slate 400)
- **Typography:** Google Font **Inter** (300, 400, 500, 600, 700, 800)
- **Styling Paradigm:** Glassmorphism, subtle linear gradients, responsive CSS Grid/Flexbox, custom scrollbars, and micro-interactions.

---

## 🚀 Key Features

### 1. 🔍 Intelligent Job Search & Multi-Criteria Filtering
- **Keyword Search:** Instant live filtering by job title, company name, or technology tags (e.g., `React`, `AWS`, `Python`).
- **Location Filter:** Filter by key Indian IT hubs (*Bangalore*, *Mumbai*, *Delhi NCR*, *Hyderabad*, *Pune*) as well as *Remote*.
- **Employment Type:** *Full-time*, *Part-time*, *Remote*, *Contract*.
- **Experience Level:** *Entry Level*, *Mid Level*, *Senior Level*.
- **Live Counters:** Dynamic count of matched positions versus total positions.
- **Active Filter Chips & Clear:** Visual chips for active filters with 1-click reset.

### 2. 📋 Comprehensive Job Cards & Sorting
- Dynamic company logo badge generated with unique gradients based on initials.
- Verified employer indicator badge.
- Compensation tags highlighting verified CTC ranges (₹4 LPA to ₹80 LPA).
- Quick tags showing top 3 technical requirements + extra badge counter.
- Interactive bookmark toggle turning vibrant gold when saved.
- Multi-mode sorting: *Latest Posted*, *Highest Compensation*, *Job Title (A-Z)*.

### 3. 📄 Detailed Job Modal
- Deep-dive view with complete job overview, responsibilities checklist, and candidate qualifications.
- Interactive skills cloud highlighting tech stack prerequisites.
- Direct modal transition to apply or bookmark the job without losing context.
- Accessible backdrop blur and keyboard escape listener.

### 4. 📝 Real-Time Form Validation & Application Submission
- Modal application drawer capturing:
  - **Full Name** (minimum 2 characters)
  - **Email Address** (regex format validation)
  - **Phone Number** (10-digit mobile validation)
  - **LinkedIn Profile URL** (valid URL pattern)
  - **Years of Experience** (numeric validation between 0 and 50)
  - **Cover Letter** (minimum 50 characters with live character counter)
- **Platform Disclaimer:** High-visibility banner informing users: *"Applications do not reach real employers. This is a demonstration platform."*
- **Confirmation Screen:** Instant generation of unique Application ID (format: `APP-2024-XXXXX`) with 1-click clipboard copy and direct link to My Applications pipeline.

### 5. 📑 Saved Jobs Management
- Dedicated shortlist view of all bookmarked opportunities.
- 1-click unsave or proceed directly to application.
- Empty state with CTA to explore open roles.

### 6. 📊 Recruiter Pipeline / My Applications Dashboard
- Pipeline tracking dashboard displaying:
  - **Assigned Application ID**
  - **Job Title & Company**
  - **Submission Date & Time**
  - **Applicant Summary**
  - **Expandable submission drawer** showing applicant details and full cover letter statement.
- **Pipeline Stages & Color Coding:**
  - `Applied`: Blue (`#3b82f6`)
  - `In Review`: Amber (`#f59e0b`)
  - `Interview`: Purple (`#a855f7`)
  - `Offer`: Emerald (`#10b981`)
  - `Rejected`: Rose (`#f43f5e`)
- **Interactive Recruiter Simulator:** Dropdown allowing candidate/examiner to simulate pipeline stage progression.
- **Metric Cards:** Quick filter tabs showing count of applications across each recruitment stage.
- **Withdrawal Action:** Option to withdraw/delete submitted applications.

### 7. 💾 LocalStorage Persistence
- Jobs, bookmarks, and applications automatically persist to browser `localStorage`.
- Changes survive browser reloads and tab closures.

---

## 🛠️ Project Structure

```
CareerConnect/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── context/
    │   └── JobContext.jsx
    ├── data/
    │   └── jobs.js
    └── components/
        ├── Navbar.jsx
        ├── HeroSearch.jsx
        ├── FilterPanel.jsx
        ├── JobCard.jsx
        ├── JobGrid.jsx
        ├── JobDetailModal.jsx
        ├── ApplyForm.jsx
        ├── SavedJobs.jsx
        └── ApplicationDashboard.jsx
```

---

## 💻 Installation & Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd e:\internshipProjects\Chandan_Web_Development_Projects\CareerConnect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 📚 20 Comprehensive Viva Q&As for Project Defense

### Q1: What is CareerConnect and what core problem does it solve?
**Answer:** CareerConnect is a single-page web application built with React 18 and Vite that provides an end-to-end recruitment interface for tech professionals. It simplifies job discovery through multi-parameter filtering (role, location, experience, compensation), allows bookmarking roles for later review, features real-time client-validated job application forms, and includes an interactive application tracking pipeline with stage transitions (Applied, In Review, Interview, Offer, Rejected).

### Q2: Why did you choose Vite over Create React App (CRA)?
**Answer:** Vite offers significantly faster development server start times and instantaneous Hot Module Replacement (HMR). It achieves this by leveraging native ES modules (ESM) in the browser during development and using `esbuild` (written in Go) for pre-bundling dependencies. In contrast, CRA uses Webpack, which bundles the entire application code and dependencies before starting the server, resulting in slower startup times as the project expands. For production, Vite uses Rollup for highly optimized tree-shaking and chunking.

### Q3: How is state managed across CareerConnect?
**Answer:** CareerConnect utilizes React's native **Context API** via `JobContext.jsx` paired with the `useContext` custom hook (`useJobs()`). This avoids prop drilling across nested components such as `JobCard`, `JobGrid`, `FilterPanel`, `JobDetailModal`, `ApplyForm`, and `ApplicationDashboard`. The context manages job listings, active view navigation, bookmarks, submitted applications, search queries, active filters, and modal states.

### Q4: How is data persisted in CareerConnect without an external database?
**Answer:** State persistence is achieved through the browser's `localStorage` Web API. Upon mounting, state initialization functions read from `localStorage` keys (`careerconnect_jobs`, `careerconnect_applications`, `careerconnect_saved_jobs`). If no cached data exists, default seed records are loaded. Whenever relevant state updates occur, `useEffect` hooks serialize and commit the updated data into `localStorage` as JSON strings.

### Q5: Explain the structure of an Application record and how unique IDs are generated.
**Answer:** Each application record contains:
```javascript
{
  id: 'app-timestamp-random',
  jobId: 1,
  jobTitle: 'Senior React Developer',
  company: 'TechNova Solutions',
  applicantName: 'Chandan Kumar',
  email: 'chandan@example.com',
  phone: '9876543210',
  linkedIn: 'https://linkedin.com/in/...',
  experience: '4',
  coverLetter: '...',
  status: 'Applied',
  appliedAt: '2024-10-24T12:00:00.000Z',
  applicationId: 'APP-2024-XXXXX'
}
```
The user-facing `applicationId` is generated using `'APP-2024-' + Math.floor(10000 + Math.random() * 90000)`, providing a professional recruitment tracking code.

### Q6: How does client-side form validation work in the `ApplyForm` component?
**Answer:** The form validation executes in two phases:
1. **Interactive validation:** As the user types into inputs, the corresponding error is cleared from the `errors` state object.
2. **Pre-submission validation:** On form submission, a `validate()` function checks:
   - Full Name length ($\ge 2$ characters)
   - Email format against standard email regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
   - Phone number against a 10-13 digit mobile pattern
   - LinkedIn URL validating format containing `linkedin.com/`
   - Years of experience as a non-negative number within 0-50
   - Cover letter length requiring at least 50 characters with a live character count indicator.
If any check fails, the submission halts and descriptive error labels appear.

### Q7: What are React Hooks, and which hooks did you use in this project?
**Answer:** Hooks are functions that let functional components hook into React state and lifecycle features. In CareerConnect:
- `useState`: Manages dynamic component state (inputs, modal visibility, filter options, active tabs).
- `useEffect`: Handles side effects (persisting state to `localStorage`, registering/cleaning up window event listeners like `keydown` for Escape key modal dismissal, and locking `document.body` scroll).
- `useContext`: Consumes the `JobContext` without nested consumer wrappers.

### Q8: What is lazy initial state in `useState` and why did you use it?
**Answer:** When initializing state with an expensive computation, such as reading and parsing from `localStorage`:
```javascript
const [jobs, setJobs] = useState(() => {
  const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
  return saved ? JSON.parse(saved) : initialJobs;
});
```
Passing a callback function ensures that the `localStorage.getItem` and `JSON.parse` logic runs **only once** when the component first mounts, rather than on every subsequent render, maximizing rendering performance.

### Q9: How are the filtered and searched jobs computed in `JobContext`?
**Answer:** Rather than storing duplicated lists in state, `filteredJobs` is derived synchronously during each render from the source `jobs` state. It filters positions where:
1. The search query matches the job title, company name, or any skill tag.
2. The location filter matches the job location or handles "Remote" logic.
3. The job type filter matches the employment type.
4. The experience level matches the candidate requirements.
This guarantees single-source-of-truth consistency.

### Q10: How does sorting work in `JobGrid`?
**Answer:** The `JobGrid` component maintains a `sortBy` state (`'newest' | 'salary' | 'title'`). It creates a shallow copy of `filteredJobs` using `[...filteredJobs]` to avoid mutating the original array, and applies array sorting:
- `'newest'`: Compares `Date.parse(b.postedDate) - Date.parse(a.postedDate)`.
- `'title'`: Uses `a.title.localeCompare(b.title)` for alphabetical ordering.
- `'salary'`: Extracts the leading integer from the salary string (e.g. `₹18-28 LPA` -> `18`) and sorts descending.

### Q11: How do you prevent modal backdrop scroll propagation?
**Answer:** In `JobDetailModal` and `ApplyForm`, an `useEffect` hook sets `document.body.style.overflow = 'hidden'` when the modal opens and restores `document.body.style.overflow = 'unset'` during the cleanup function when the modal unmounts. Furthermore, `e.stopPropagation()` is applied to the modal container click handler to prevent closing the modal when clicking inside the content box.

### Q12: Why are company avatar logo badges colored with deterministic gradients?
**Answer:** Rather than loading external image assets that might fail to resolve or produce 404s, CareerConnect uses an algorithm (`getLogoGradient`) that sums the ASCII character codes of the company initials and picks from a curated list of modern gradients using modulo arithmetic (`sum % gradients.length`). This ensures consistent, distinct, and vibrant branding for every company.

### Q13: What is the purpose of the key prop in React lists?
**Answer:** The `key` prop provides a stable identity for each element in an array rendered via `.map()`. It enables React’s reconciliation algorithm (Virtual DOM diffing) to determine which items have been added, modified, or removed, avoiding unnecessary re-renders of unchanged DOM nodes. We use stable unique identifiers like `job.id` and `app.applicationId`.

### Q14: How does the application handle responsive web design?
**Answer:** CareerConnect uses modern CSS Media Queries and flexible layouts:
- Mobile-first CSS Grid for job listings (`1fr` on mobile, `repeat(2, 1fr)` on tablets, `repeat(3, 1fr)` on desktops).
- Responsive navigation with a collapsible mobile drawer hamburger menu.
- Fluid typography utilizing `clamp()` (e.g., `clamp(2.2rem, 5vw, 3.6rem)` for hero titles).
- Responsive modal containers constrained by `max-height: 90vh` and internal custom scrollbars.

### Q15: How does CareerConnect handle empty states?
**Answer:** Whenever a filter or search produces zero results, or when the user has no saved jobs or submitted applications, a styled empty state card renders. It includes an illustrative icon, clear explanatory messaging, and a primary action button (such as "Reset All Filters" or "Browse Job Listings") to guide the user back into active browsing without dead ends.

### Q16: What is Glassmorphism and how is it implemented here?
**Answer:** Glassmorphism is a modern UI design pattern that simulates translucent frosted glass. It is implemented in CareerConnect using:
- Semi-transparent background colors: e.g., `background-color: rgba(15, 23, 42, 0.85);`
- Backdrop blur filters: `backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);`
- Subtle translucent borders: `border: 1px solid rgba(51, 65, 85, 0.6);`
- Soft shadows: `box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.45);`

### Q17: What is the difference between controlled and uncontrolled components in React?
**Answer:** A **controlled component** has its input value bound to React state and updated via an `onChange` handler (e.g., `<input value={formData.email} onChange={handleChange} />`). React serves as the single source of truth. An **uncontrolled component** stores its own internal DOM state accessed via a `ref`. CareerConnect uses controlled components for all form elements to enable live validation, character counting, and state synchronisation.

### Q18: What is the virtual DOM and how does React update the user interface?
**Answer:** The Virtual DOM is a lightweight JavaScript object representation of the real DOM. When component state changes, React creates a new Virtual DOM tree, diffs it against the previous tree using its reconciliation algorithm, calculates the minimal set of changes (patches), and batches those updates directly to the browser DOM, ensuring high performance.

### Q19: How are recruiter status transitions simulated in CareerConnect?
**Answer:** In the `ApplicationDashboard` component, each application card renders a stage select dropdown bound to `updateApplicationStatus(applicationId, newStatus)`. When a candidate or evaluator chooses a new stage (e.g. moving from `Applied` to `Interview` or `Offer`), the status badge color updates instantly, the pipeline stage counter updates in the metrics grid, and the change is persisted to `localStorage`.

### Q20: How does CareerConnect ensure high visual accessibility and contrast?
**Answer:** The design system strictly pairs high-contrast text shades (`#f1f5f9` and `#cbd5e1`) against dark navy surfaces (`#0f172a` and `#1e293b`), satisfying WCAG AA contrast standards. Status pills feature both distinct iconography and unique pastel background fills (`rgba(...)`) alongside colored text, ensuring information is conveyed through both typography and color. All interactive elements have visible `:focus` and `:hover` indicators.

---

## 📄 License & Attribution

Developed as a modern web development internship portfolio project.
- **Framework:** React 18 & Vite
- **Icons:** Lucide React
- **Typography:** Google Fonts Inter
