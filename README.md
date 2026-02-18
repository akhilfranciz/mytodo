# TO-DO App

A modern, responsive task management application built with **React 19**, **TypeScript**, and **Vite**. Designed from Figma mockups with pixel-perfect styling, smooth animations, and localStorage persistence.

![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.3-646cff?logo=vite)

## Features

- **Task Management** — Create, edit, and delete tasks with title, description, and status
- **Status Tracking** — Organize tasks into three statuses: In Progress, Pending, Completed
- **Status Filters** — Filter tasks by status with count badges (All / In Progress / Pending / Completed)
- **Search** — Real-time search across task titles and descriptions
- **Persistent Storage** — Tasks survive page reloads via `localStorage`
- **Smooth Animations** — Entry/exit animations for tasks, page transitions, and section expand effects
- **Edit Page** — Full-page edit form with a custom status dropdown (colored status dots)
- **Hover Actions** — Edit (pencil) and Delete (trash) icons appear on task hover
- **Responsive Design** — Mobile-first layout, max-width 500px centered
- **Accessibility** — ARIA roles on filter bar (`tablist`/`tab`), labeled buttons

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7.3 |
| Styling | Plain CSS (no library) |
| Font | [Jost](https://fonts.google.com/specimen/Jost) (Google Fonts) |
| Persistence | localStorage (custom `useLocalStorage` hook) |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Clone the repository
git clone https://github.com/akhilfranciz/mytodo.git
cd mytodo

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

## Project Structure

```
src/
├── types/
│   └── Task.ts              # TaskStatus union type & Task interface
├── hooks/
│   └── useLocalStorage.ts   # Generic localStorage persistence hook
├── components/
│   ├── Header.tsx/.css       # Blue header bar with optional back navigation
│   ├── SearchBar.tsx/.css    # Search input with magnifying glass icon
│   ├── FilterBar.tsx/.css    # Pill-button status filter bar with count badges
│   ├── TaskSection.tsx/.css  # Collapsible section grouping tasks by status
│   ├── TaskItem.tsx/.css     # Task card with hover edit/delete actions
│   ├── AddTaskForm.tsx/.css  # Full-page add task form
│   └── EditTaskForm.tsx/.css # Full-page edit form with status dropdown
├── App.tsx                   # Root component — state, routing, event handlers
├── App.css                   # App layout, FAB button, page transitions
├── index.css                 # Global styles (font, background, reset)
└── main.tsx                  # Entry point
```

## Design Decisions

### No Router Library
Page-level views (list, add, edit) are managed with simple React state (`showAddForm`, `editingTask`) instead of React Router. This keeps the bundle small and avoids unnecessary complexity for a single-page task list.

### CSS-Only Animations
All animations (`taskSlideIn`, `taskSlideOut`, `pageSlideIn`, `sectionExpand`) are pure CSS `@keyframes` — no animation library required. Delete animations are triggered by adding a CSS class via DOM ref before removing the task from state after a timeout.

### Custom `useLocalStorage` Hook
A generic hook that wraps `useState` with automatic `localStorage` sync. It handles JSON serialization/deserialization and fails silently on quota errors, keeping the app functional even when storage is full.

### Typography Specifications
All text uses the **Jost** font family loaded from Google Fonts:
- **Task title**: Jost SemiBold (600), 14px, color `#034EA2`
- **Task description**: Jost Regular (400), 12px, color `#231F20`
- **Section header**: Jost Regular (400), 12px; count badge: Jost Bold (700), 12px

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Deployment

The project includes a `vercel.json` for zero-config deployment on [Vercel](https://vercel.com). Push to the connected GitHub repo to trigger automatic deployments.

## License

MIT
