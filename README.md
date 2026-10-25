# ATELIER — Interior Architecture & Design Studio

> **Brand Ethos:** A refined, editorial interior architecture and spatial design studio website inspired by high-end architectural publications (Kinfolk, Cereal, Ark Journal). Designed with generous whitespace, organic warm palettes, serif typography, high-resolution architectural imagery, and an integrated Studio Admin Portal.

---

## 🎨 Visual Identity & Design Tokens

- **Ivory Base:** `#FBF9F5` (Warm natural paper & stone background)
- **Cream / Warm Beige:** `#F7F4EE` & `#EFECE6` (Secondary panels & cards)
- **Charcoal Black:** `#1A1918` (High-contrast typography)
- **Muted Olive:** `#5A6351` (Restrained architectural accents)
- **Typography:**
  - Headlines & Editorial Voice: `Playfair Display` (Serif, italic accents)
  - Body & Specifications: `Plus Jakarta Sans` (Crisp modern sans-serif)

---

## 🏛️ Public Pages & User Flow

1. **Home (`/`)**
   - Immersive architectural hero (*"Spaces shaped around the way you live."*)
   - Studio manifesto & philosophical pillars
   - Selected projects (Asymmetric editorial grid with landscape & portrait rhythm)
   - Studio disciplines & services preview
   - 4-phase design methodology (*01. Dialogue → 02. Concept → 03. Materiality → 04. Realization*)
   - Closing consultation invitation

2. **Projects (`/projects`)**
   - Curated architectural catalog with discipline filters (*All, Residential, Commercial, Renovation*)
   - Dynamic project counts, metadata, and high-resolution imagery

3. **Project Detail / Case Study (`/projects/:slug`)**
   - Full-bleed hero image
   - Detailed project metadata (*Location, Year, Gross Floor Area, Discipline*)
   - Spatial overview & design narrative
   - Tactile material palette breakdown (e.g. *Hinoki Cedar, Lime Plaster, Honed Basalt*)
   - Asymmetric multi-image editorial gallery
   - Direct link to next case study & consultation inquiry

4. **Services (`/services`)**
   - Residential Architecture, Commercial & Hospitality, Historic Renovation, Spatial Consultation
   - Detailed scope of engagement for each discipline

5. **Studio (`/studio`)**
   - Architectural philosophy and commitment to natural patina
   - Studio founders and principal architects

6. **Contact (`/contact`)**
   - High-touch consultation inquiry form (Client Name, Email, Phone, Project Type, Area, Budget Range, Notes)
   - Saves directly to the studio's backend database in real time
   - Studio physical locations (Milan, London, Kyoto) & direct press contacts

---

## 🛡️ Studio Admin Portal (`/admin`)

- **Secure Login:**
  - Route: `/admin/login`
  - Demo Username: `admin`
  - Demo Password: `atelier2026`
- **Dashboard Overview:**
  - Live metric counters (Active Projects, Client Inquiries, Database Status)
- **Portfolio Project Management (CRUD):**
  - Add new architectural projects with title, slug, subtitle, hero image URL, gallery images, floor area, and material tags
  - Edit existing case studies
  - Toggle *"Featured on Homepage"*
  - Delete case studies
- **Client Inquiries & Leads Management:**
  - Real-time review of all incoming consultation requests from the contact page
  - Client contact info, project scope, budget range, and vision note
  - Update inquiry workflow status (*New* → *Reviewing* → *Contacted* → *Completed*)
  - One-click email reply links

---

## ⚡ Quick Start Instructions

In the project root directory (`c:\laragon\www\Atelier`):

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Launch both Backend API (Port 5000) and Frontend (Port 3000)
npm run dev

# Or launch independently:
npm run dev:server   # Starts Express API at http://localhost:5000
npm run dev:client   # Starts Vite React App at http://localhost:3000
```

### Production Build:
```bash
npm run build
```
*(Successfully builds production bundle in `dist/`)*
