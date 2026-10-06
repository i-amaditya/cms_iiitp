# Indian Institute of Information Technology Pune (IIITP) Website

A modern, responsive, and highly aesthetic web application built for IIIT Pune—an Institute of National Importance. Designed with a focus on performance, accessibility, and a professional UI/UX that truly represents the institute.

## 🚀 Technologies Used

- **React** (v19)
- **Vite** (Next Generation Frontend Tooling)
- **Tailwind CSS v3** (Utility-first CSS framework with full Dark Mode support)
- **React Router v6** (Declarative routing)
- **Framer Motion** (Production-ready animation library)
- **Lucide React** (Beautiful and consistent icons)
- **Recharts** (Composable charting library)

## ✨ Key Features

- **Dark Mode Support**: Seamless toggle between Light and Dark modes with persistent `localStorage` integration.
- **Extensive Routing**: Over 15 distinct pages perfectly structured to represent university departments including Academics, Placement, Research, Administration, and Life @ IIITP.
- **Interactive UI Components**: Includes a 70vh Hero Carousel, animated viewport counters, a scrolling news ticker, tabbed important links, and an interactive Information Desk.
- **Data Visualizations**: Integrated Recharts for rendering rich placement trends over the years.
- **Fully Responsive**: A mobile-first design that adapts elegantly to any screen size, complete with an animated slide-down mobile navigation menu.

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hardikjha09/iiitp-website.git
   cd iiitp-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local server URL provided in the terminal (typically `http://localhost:5173`).

### Faculty CMS API

The faculty directory and profile pages use the CMS public API. Copy `.env.example` to `.env.local` and set:

```env
VITE_FACULTY_API_BASE_URL=http://localhost:3000
```

Set this to the deployed HTTPS CMS backend origin for production, then rebuild the website. The CMS backend must allow the website's exact origin in its `CORS_ORIGIN` setting (for local development, `http://localhost:5173`). Keep this separate from `VITE_API_BASE_URL`, which is used by the website's existing notices/news content API.

Faculty directory and profile data is fetched from `/api/public/faculty` and `/api/public/faculty/:slug`; profile photos and CVs are served from the CMS backend.

### Building for Production
To create a production-ready build, run:
```bash
npm run build
```
This will compile, minify, and optimize the application into the `dist` folder.

## 📁 Project Structure

```
src/
├── components/
│   ├── home/       # Homepage specific components (HeroCarousel, StatsBar, etc.)
│   ├── layout/     # Structural layout wrappers (Navbar, TopBar, Footer)
│   └── shared/     # Reusable UI elements (PageHeader, Breadcrumb, ScrollToTop)
├── data/           # Mock JSON data for notices and news
├── pages/          # All individual React Router page components
├── App.jsx         # Main application routing and core entry point
└── index.css       # Global styles, fonts, and Tailwind directives
```

## 🤝 Contribution
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is developed as a demonstration for the Indian Institute of Information Technology Pune.
