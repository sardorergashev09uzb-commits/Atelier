# ATELIER — Interior Architecture & Design Studio

<div align="center">

  [![Live Demo](https://img.shields.io/badge/Live%20Demo-atelier--studio--x1.vercel.app-1A1918?style=for-the-badge&logo=vercel&logoColor=white)](https://atelier-studio-x1.vercel.app/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-5A6351?style=for-the-badge)](LICENSE)

  <p align="center">
    <strong>A refined, editorial interior architecture and spatial design studio platform.</strong><br/>
    Inspired by high-end architectural publications (<em>Cereal</em>, <em>Ark Journal</em>, <em>Kinfolk</em>), featuring tactile materiality, asymmetric layouts, fluid interactions, and a comprehensive Studio Admin CMS.
  </p>

  <p align="center">
    <a href="https://atelier-studio-x1.vercel.app/"><strong>Explore Live Site »</strong></a>
    &nbsp;•&nbsp;
    <a href="https://atelier-studio-x1.vercel.app/admin"><strong>Admin Portal »</strong></a>
    &nbsp;•&nbsp;
    <a href="https://atelier-studio-x1.vercel.app/projects"><strong>Portfolio Archive »</strong></a>
  </p>

</div>

---

## 🏛️ Project Overview

**ATELIER** is a high-end web experience crafted for an interior architecture and spatial design studio. It bridges the gap between high-fashion architectural editorial design and modern full-stack web engineering.

The platform includes both a public-facing magazine-style portfolio and an integrated **Studio Management Suite (Admin Portal)** allowing creative directors and studio managers to update portfolio works, review incoming consultation leads, curate materials, manage team members, and fine-tune editorial copy in real time.

### 🌐 Live Demo & Credentials

| Environment | URL | Access / Credentials |
| :--- | :--- | :--- |
| **Public Website** | [https://atelier-studio-x1.vercel.app/](https://atelier-studio-x1.vercel.app/) | Open to public |
| **Admin Portal** | [https://atelier-studio-x1.vercel.app/admin](https://atelier-studio-x1.vercel.app/admin) | **User:** `admin` <br/> **Pass:** `atelier2026` |

*(Note: Credentials can be changed directly from the Admin Security tab at any time).*

---

## ✨ Key Features & User Experience

### 1. Editorial Public Experience
- **Hero & Spatial Narrative:** Immersive architectural framing with dynamic studio parameters (*Locations*, *Discipline*, *Materiality*, *Ethos*).
- **Curated Projects Archive (`/projects`):** Filterable architectural catalog (Residential, Commercial, Renovation) with case study metrics (Floor area, completion year, architectural focus).
- **Editorial Case Studies (`/projects/:slug`):** Full-bleed photography, tactile material specimen breakdown, design narrative, asymmetric layout galleries, and seamless next-project navigation.
- **Interactive Material Specimens Board:** Modal library showcasing tactile architectural materials (Santanyí Limestone, Hinoki Cedar, Hand-applied Lime Plaster, Unlacquered Bronze, Honed Basalt).
- **Disciplines & Services (`/services`):** Comprehensive scope of work across residential, commercial, historic renovation, and spatial consultation.
- **Studio Story & Team (`/studio`):** Studio manifesto, architectural philosophy (*Tactile Austerity* & *Spatial Honesty*), and leadership roster.
- **Consultation Inquiries (`/contact`):** Real-time project inquiry form capturing client vision, budget tiers, and property specifications.

### 2. Comprehensive Admin Suite (`/admin`)
- **Projects Management (CRUD):** Create, update, reorder, or archive architectural case studies with high-resolution gallery URLs and material tags.
- **Client Inquiries & CRM:** Live feed of incoming inquiries with real-time status management (*New* → *Reviewing* → *Contacted* → *Completed*) and one-click email replies.
- **Disciplines & Services Management (CRUD):** Live editor for studio service offerings and deliverables.
- **Team Roster Management (CRUD):** Manage architects and directors with portrait photos, titles, and biographies.
- **Materials Library (CRUD):** Curate the studio’s material specimens library with tactile descriptions, origins, and finishes.
- **Studio Master Settings:** Total dynamic control over hero copy, studio manifesto, the 4-phase design methodology, closing CTA, and international office coordinates (Tokyo, Milan).
- **Security & Password Management:** Update admin credentials on the fly.
- **Database Backup & Export:** One-click JSON backup of all studio data.

### 3. Zero-Failure Hybrid Architecture
- **Dual Mode (Serverless & Full-Stack):**
  - **Local Development:** Runs with a companion Node.js / Express backend with JSON persistence.
  - **Vercel Production:** Seamlessly runs 100% serverless as an SPA. The built-in client-side data layer transparently falls back to `localStorage`, enabling full CRUD, editing, and state persistence with zero external database configuration required.

---

## 🎨 Visual Identity & Design Tokens

Designed around natural stone, linen, lime plaster, and aged timber:

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Ivory Canvas** | `#FBF9F5` | Primary background, clean paper aesthetic |
| **Warm Sand** | `#F7F4EE` | Secondary panel backgrounds, subtle dividers |
| **Linen Neutral** | `#EFECE6` | Cards, borders, and input surfaces |
| **Charcoal Black** | `#1A1918` | High-contrast editorial typography and accents |
| **Muted Olive** | `#5A6351` | Subtle botanical & architectural accents |
| **Warm White** | `#FFFFFF` | Cards and modals |

### Typography
- **Headlines & Editorial Voice:** `Playfair Display` (Serif with graceful italic accents)
- **Body & Technical Metadata:** `Plus Jakarta Sans` (Clean, balanced modern sans-serif)

---

## 🛠️ Tech Stack & Dependencies

- **Frontend Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Optional Backend:** [Node.js](https://nodejs.org/) + [Express 4](https://expressjs.com/) + [CORS](https://github.com/expressjs/cors)
- **Deployment & Hosting:** [Vercel](https://vercel.com/) with native SPA routing rewrite rules

---

## 📂 Project Structure

```text
Atelier/
├── public/                 # Static public assets
├── server/                 # Optional companion Node.js backend
│   ├── data/               # Seed data for projects, services, settings, team, materials
│   └── index.js            # Express REST API routes
├── src/
│   ├── components/
│   │   ├── common/         # MaterialBoardModal, StatusBadge, Button, etc.
│   │   └── layout/         # Header, Footer, StudioNavigation
│   ├── context/            # Language & Application State Contexts
│   ├── data/               # Fallback initial data & CMS defaults
│   ├── pages/
│   │   ├── admin/          # AdminDashboard (7 Tabs) & AdminLoginPage
│   │   ├── ContactPage.tsx # Consultation inquiry form
│   │   ├── HomePage.tsx    # Editorial landing page
│   │   ├── ProjectDetailPage.tsx # Editorial case study template
│   │   ├── ProjectsPage.tsx# Filterable architectural archive
│   │   ├── ServicesPage.tsx# Disciplines & scope
│   │   └── StudioPage.tsx  # Manifesto & team
│   ├── services/
│   │   └── api.ts          # Unified hybrid API service (REST + localStorage fallback)
│   ├── types/
│   │   └── index.ts        # Comprehensive TypeScript definitions
│   ├── App.tsx             # Route declarations
│   ├── index.css           # Custom typography & Tailwind utilities
│   └── main.tsx            # Application entry point
├── scripts/
│   └── start-all.js        # Concurrent client & server local launcher
├── vercel.json             # Vercel SPA rewrite rules
├── tailwind.config.js      # Architectural color palette & font definitions
└── package.json            # Project dependencies & scripts
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sardorergashev09uzb-commits/Atelier.git
   cd Atelier
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development environment:**
   - **Full stack (Client + Node Backend concurrently):**
     ```bash
     npm run dev
     ```
   - **Frontend only (Client-only with auto-storage fallback):**
     ```bash
     npm run dev:client
     ```

4. **Open in browser:**
   - Client: `http://localhost:5173`
   - Backend API: `http://localhost:5000/api`

---

## 📦 Production Build & Deployment

To generate an optimized production bundle:

```bash
npm run build
```

This runs TypeScript type checking (`tsc`) followed by Vite's production bundling. Output files will be generated in `/dist`.

### Deploying to Vercel
The repository includes a ready-to-use [`vercel.json`](./vercel.json) configured for Single Page Application client routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Simply connect this GitHub repository to [Vercel](https://vercel.com/) and click **Deploy**. No custom environment variables or external database setup are required.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use for personal, educational, and commercial portfolio showcases.

---

<div align="center">
  <sub>Crafted with precision for <strong>ATELIER</strong> Interior Architecture & Design Studio.</sub>
</div>
