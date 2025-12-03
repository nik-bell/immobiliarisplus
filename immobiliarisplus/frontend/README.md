# Immobiliaris Plus — Frontend

![Node >= 18](https://img.shields.io/badge/Node-%3E%3D18.x-339933?logo=node.js&logoColor=white)
![React 19](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=black)
![Vite 7](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite&logoColor=white)

> Modern web platform for property valuation and management with an agents dashboard and a multi-step valuation form.

## **Laboratorio Integrato – ImmobiliarisPlus (Gruppo 9 → NOVEGRUPPO)**

## Frontend Contributors

- Luca Montanaro (@LucaM0nt) — Frontend Development — [GitHub](https://github.com/LucaM0nt)
- Matteo Paglietta (@Pagliez) — Frontend Development — [GitHub](https://github.com/Pagliez)
- Matteo Cecchi (@Matte05daje) — Frontend Development — [GitHub](https://github.com/Matte05daje)

---

## Contributions Summary

| Contributor | Key Contributions |
|-------------|-------------------|
| **Luca Montanaro** | Application architecture (routing, layouts, navbar, footer); API layer setup and backend integration; React Context and Providers design; Multi-step valuation form with validation and backend submission; Authentication with backend (login flow, protected routes); Lazy loading of the protected reserved area; Agents/Admin areas with core CRUD and dashboard features; Data mapping between backend DTOs and UI; Cross-team backend coordination; Debugging and UX fixes; Library research and selection; README documentation authoring |
| **Matteo Paglietta** | Site-wide styling and design system; SEO, performance and accessibility improvements; Static pages: Sell House, Improve House, Exclusive Contract, 404 page; Assistance contact form; Debugging, Loading states and UX polish; Demo deployment via Vercel; Map API implementation; Cross-team frontend coordination; Debugging |
| **Matteo Cecchi** | Homepage composition; Logo and icon integration; JSDoc documentation ad code comment supervision |

---
## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Startup](#project-startup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Technical Choices](#technical-choices)
- [Known Issues](#known-issues-and-limitations)
- [Available Scripts](#available-scripts)

---

## Description

**Immobiliaris Plus** is a full-stack web application for managing property valuations. The frontend offers:

- Responsive landing pages for selling, valuing, and improving properties
- Guided multi-step form for valuation requests with robust validation
- Agents dashboard protected by JWT authentication to manage cases
- Modal system to view/edit valuation details
- Centralized state management with the React Context API
- Mapbox integration for address autocomplete

Backend link: see [Backend README](../backend/README.md)

---

## Technologies

### Core
| Technology | Version | Purpose |
|-----------|----------|-------|
| **React** | ^19.1.1 | Component-based UI library |
| **React Router DOM** | ^7.9.5 | Client-side routing with lazy loading |
| **Vite** | ^7.1.7 | Build tool and dev server with HMR |

### Styling
| Technology | Version | Purpose |
|-----------|----------|-------|
| **Tailwind CSS** | ^4.1.17 | Utility-first CSS framework |
| **PostCSS** | ^8.5.6 | CSS processing |
| **Autoprefixer** | ^10.4.22 | Automatic vendor prefixes |

### External Libraries
| Technology | Version | Purpose |
|-----------|----------|-------|
| **Mapbox GL JS** | ^3.16.0 | Maps integration and geocoding |

### Development Tools
| Technology | Version | Purpose |
|-----------|----------|-------|
| **ESLint** | ^9.36.0 | Linting JavaScript/JSX |
| **@vitejs/plugin-react** | ^5.0.4 | Fast Refresh HMR for React |

---

## Prerequisites

- **Node.js**: >= 18.x
- **npm** or **yarn**: Dependency management
- **Running backend**: REST API at `http://localhost:8081` (default)

---

## Installation

```bash
# Clone repository (if not already cloned)
git clone https://github.com/nik-bell/immobiliarisplus.git
cd immobiliarisplus/frontend

# Install dependencies
npm install
```

---

## Configuration

### Environment Variables

Create a `.env` file in the `frontend/` root:

```env
# Backend API base URL (optional, default: http://localhost:8081/api)
VITE_API_BASE_URL=http://localhost:8081/api

# Mapbox Access Token (required for address autocomplete)
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

Note: Get a free Mapbox token on [mapbox.com](https://account.mapbox.com/access-tokens/)

---

## Project Startup

Important: start the backend before the frontend. Full instructions are in the backend README:
- Backend README: `../backend/README.md`
- Quick backend start with Docker Compose from the project root: `docker compose up --build`
- Backend local start with Maven: see the "Project Startup" section in the backend README

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Credentials

For testing the protected dashboard and authentication, use these credentials provided by the backend:

**Agent Login** (standard permissions):
- Email: `agent.smith@immobiliarisplus.com`
- Password: `9password`

**Admin Login** (full permissions):
- Email: `ad.min@immobiliarisplus.com`
- Password: `novegruppo`

Both accounts access `/area-agenti` with different permission levels.

### Production Build

```bash
npm run build
npm run preview  # Preview build locale
```

Output to `dist/`

### Linting

```bash
npm run lint
```

---

## Project Structure

```
frontend/src/
├── api/                      # Layer API e comunicazione backend
│   ├── request.js            # Fetch wrapper con auth headers
│   ├── auth.js               # Endpoints login
│   ├── valuations.js         # Endpoints valutazioni
│   ├── employees.js          # Endpoints gestione agenti
│   └── api.js                # Aggregator exports
│
├── assets/                   # Immagini, icone, media statici
│
├── components/               # Componenti riutilizzabili
│   ├── CasaTable/            # Componenti dashboard tabella
│   │   ├── CasaTable.jsx
│   │   ├── CasaTableRow.jsx
│   │   ├── StatusDropdown.jsx
│   │   ├── AgentSelector.jsx
│   │   └── Badge.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── InputField.jsx
│   └── ...
│
├── data/                     # Dati statici e configurazioni
│   ├── allowedCaps.js        # Lista CAP validi
│   └── ImprovementData.jsx   # Dati miglioramenti casa
│
├── layout/                   # Layout e wrapper containers
│   ├── MainLayout.jsx        # Layout pubblico
│   ├── AreaAgentiLayout.jsx  # Layout dashboard protetta
│   ├── CasaModal.jsx         # Modale dettaglio valutazione
│   └── LoginModal.jsx
│
├── pages/                    # Pagine principali
│   ├── Homepage.jsx
│   ├── VendiCasa.jsx
│   ├── MiglioraCasa.jsx
│   ├── ContrattoEsclusiva.jsx
│   ├── AreaAgenti.jsx        # Dashboard agenti (protetta)
│   └── ValutaCasa/           # Form multi-step valutazione
│       ├── ValutaCasa.jsx
│       ├── steps/
│       ├── validators/
│       └── useValutaCasaForm.js
│
├── providers/                # Context providers
│   ├── AuthContextProvider.jsx
│   ├── CasaContextProvider.jsx
│   └── FormContextProvider.jsx
│
├── routes/                   # Configurazione routing
│   └── AppRoutes.jsx         # Definizione route + lazy loading
│
├── sections/                 # Sezioni componibili pagine landing
│   ├── HeroHomepage.jsx
│   ├── ComeFunzionaSection.jsx
│   ├── FAQAssistenza.jsx
│   └── ...
│
├── store/                    # Context definitions
│   ├── AuthContext.jsx
│   ├── CasaContext.jsx
│   └── FormContext.jsx
│
├── utils/                    # Utility functions
│   └── mappers.js            # Mapping DTO backend ↔ frontend
│
├── App.jsx                   # Root component
└── main.jsx                  # Entry point
```

### Naming Conventions

- **Components**: PascalCase (`Button.jsx`, `CasaModal.jsx`)
- **Hooks**: camelCase with `use` prefix (`useValutaCasaForm.js`)
- **Utils**: camelCase (`mappers.js`)
- **Contexts**: PascalCase + `Context` suffix (`AuthContext.jsx`)

---

## API Documentation

### Base Configuration

```javascript
// src/api/request.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api";
```

### Authentication Flow

```javascript
// 1. Login
const response = await performLogin({ username, password });
// Salva token in sessionStorage automaticamente

// 2. Richieste autenticate (header Authorization: Bearer <token>)
const valuations = await getValuationsDashboard();
```

### Main Endpoints

#### Auth
```javascript
import { performLogin } from './api/api';

// POST /api/auth/login
await performLogin({ username: 'admin', password: 'password' });
```

#### Valuations
```javascript
import { 
  getValuationsDashboard, 
  getValuationDetail,
  createValuation,
  updateValuationDashboard,
  assignEmployeeToDashboard 
} from './api/api';

// GET /api/valuations/dashboard (protetto)
await getValuationsDashboard();

// GET /api/valuations/dashboard/:id (protetto)
await getValuationDetail(123);

// POST /api/valuations/calculate
await createValuation(formData);

// PATCH /api/valuations/dashboard/:id (protetto)
await updateValuationDashboard(123, { notes: 'Updated' });

// PUT /api/valuations/dashboard/:id/assign/:employeeId (protetto)
await assignEmployeeToDashboard(123, 456);
```

#### Employees
```javascript
import { getEmployees } from './api/api';

// GET /api/employees (protetto)
await getEmployees();
```

### Response Structure

All requests return a standardized object:

```javascript
{
  ok: boolean,        // Successo (true) o errore (false)
  status: number,     // HTTP status code
  data: object|null,  // Response body (null se errore)
  error: object|null  // Dettagli errore se ok=false
}
```

### Backend ↔ Frontend Mapping

Functions in `src/utils/mappers.js` convert backend DTOs into frontend structures:

```javascript
// Backend enum → Frontend UI key
mapStatus("IN_PROGRESS") // → "in_corso"

// Frontend UI key → Backend enum
mapUIStatusToEnum("in_corso") // → "IN_PROGRESS"

// Backend enum → Label leggibile
mapValuationStatusLabel("IN_PROGRESS") // → "In corso"
```

---

## Technical Choices

### Why Context API instead of Redux?

Reasons:
1. **Semplicità**: Applicazione di media complessità, 3 context sufficienti
2. **No boilerplate**: Context API nativa React, zero dipendenze aggiuntive
3. **Performance**: Ottimizzazione con `useMemo`, `useCallback` dove serve
4. **Type safety**: Con PropTypes o TypeScript futuro è equivalente

Contexts used:
- `AuthContext`: Gestione login, user, token (sessionStorage)
- `CasaContext`: Stato dashboard, filtri, sorting, modal
- `FormContext`: Stato form multi-step ValutaCasa con validazione

When to consider Redux:
- State molto complesso con nested updates frequenti
- Time-travel debugging necessario
- DevTools avanzati richiesti

---

### Why Mapbox instead of Google Maps?

Reasons:
1. **Pricing**: 50k richieste/mese gratuite vs 28k Google
2. **Geocoding API**: Più accurato per indirizzi italiani
3. **Customizzazione**: Stili mappe personalizzabili facilmente
4. **Performance**: Libreria più leggera (180KB vs 300KB Google)

Usage in the project:
- Autocompletamento indirizzi in `AddressInputValutaCasa.jsx`
- Endpoint: `https://api.mapbox.com/geocoding/v5/mapbox.places/`

---

### Why sessionStorage instead of localStorage?

Reasons:
1. **Sicurezza**: Token cancellato automaticamente alla chiusura tab
2. **Privacy**: Nessuna persistenza cross-session
3. **UX**: Utente deve rifare login dopo chiusura, appropriato per dashboard agenti

Implemented in `src/api/request.js` (sessionStorage):

```javascript
// Salva token
sessionStorage.setItem("auth_token", token);

// Recupero automatico al reload pagina
const stored = sessionStorage.getItem("auth_token");
```

Note: the frontend currently uses `sessionStorage` exclusively for the JWT token. `localStorage` is not used for tokens or other credentials.

---

### Lazy Loading Routes with React.lazy()

Reasons:
1. **Code splitting**: Bundle iniziale ridotto da ~800KB a ~300KB
2. **Performance**: Caricamento on-demand solo quando utente naviga
3. **UX**: Spinner centralizzato mentre carica chunk

Implemented in `src/routes/AppRoutes.jsx`:

```javascript
const AreaAgenti = lazy(() => import("../pages/AreaAgenti"));
// Chunk separato caricato solo quando accedi a /area-agenti
```

Measured results:
- Initial bundle: 312 KB
- AreaAgenti chunk: 45 KB (caricato solo quando serve)

#### Example Route Structure (matching project usage)

```javascript
// src/routes/AppRoutes.jsx
import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import AreaAgentiLayout from '../layout/AreaAgentiLayout';
import { useAuth } from '../store/AuthContext';

// Lazy pages
const Homepage = lazy(() => import('../pages/Homepage'));
const Contattaci = lazy(() => import('../pages/Contattaci'));
const ValutaCasa = lazy(() => import('../pages/ValutaCasa/ValutaCasa'));
const VendiCasa = lazy(() => import('../pages/VendiCasa'));
const MiglioraCasa = lazy(() => import('../pages/MiglioraCasa'));
const ContrattoEsclusiva = lazy(() => import('../pages/ContrattoEsclusiva'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Area Agenti lazy import (wrapped)
const AreaAgentiImport = () => import('../pages/AreaAgenti');
const AreaAgenti = lazy(AreaAgentiImport);

// Loading fallback
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
  </div>
);

// Helper to wrap components in Suspense
const load = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

// Protected route for Area Agenti
function ProtectedAreaAgenti() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return (
    <Suspense fallback={<Loading />}>
      <AreaAgenti />
    </Suspense>
  );
}

// Route objects
const appRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: load(Homepage), showInNav: true, title: 'Home' },
      { path: 'contattaci', element: load(Contattaci), showInNav: false, title: 'Contattaci' },
      { path: 'valuta-casa', element: load(ValutaCasa), showInNav: false, title: 'Valuta Casa' },
      { path: 'vendi-casa', element: load(VendiCasa), showInNav: true, title: 'Vendi Casa' },
      { path: 'migliora-casa', element: load(MiglioraCasa), showInNav: true, title: 'Migliora Casa' },

      // Protected Area Agenti section
      {
        path: 'area-agenti',
        element: <AreaAgentiLayout />,
        children: [
          { index: true, element: <ProtectedAreaAgenti />, title: 'Area Agenti', showInNav: true },
        ],
      },

      { path: 'contratto-esclusiva', element: load(ContrattoEsclusiva), showInNav: false, title: 'Contratto Esclusiva' },
      { path: '*', element: load(NotFoundPage) },
    ],
  },
];

export default appRoutes;
```

---

### Centralized Form Validation

Problem: Multi-step form with 15+ fields, complex validation for ZIP, email, phone.

Solution: Step-specific validator functions in `src/pages/ValutaCasa/validators/`

```javascript
// validateStep1.js
export default function validateStep1(data) {
  const errors = {};
  if (!allowedCaps.some(c => c.cap === data.zipCode)) {
    errors.zipCode = "CAP non servito";
  }
  return errors;
}
```

Benefits:
- Testabilità: Funzioni pure facilmente unit-testabili
- Riusabilità: Validatori condivisi tra componenti
- Manutenibilità: Logica business separata da UI

---

### Dropdown with Portal Pattern

Problem: Dropdowns in the table are clipped by the container’s `overflow: hidden`.

Solution: `ReactDOM.createPortal()` to render dropdowns outside the component tree.

Implemented in `StatusDropdown.jsx` and `AgentSelector.jsx`:

```javascript
{open && createPortal(
  <div style={popupStyle} ref={popupRef}>
    {/* Dropdown content */}
  </div>,
  document.body // Renderizza a livello body
)}
```

Benefits:
- Z-index isolato da parent containers
- Positioning assoluto calcolato dinamicamente
- Chiusura automatica click-outside con event listener

---

## Known Issues and Limitations

### 1. Mapbox Token Hardcoded in Client

Problem: Mapbox token visible in the client bundle.

Impact: Low (Mapbox rate limiting by origin).

Current mitigation: Domain restrictions in the Mapbox dashboard.

Future solution: Backend proxy `/api/geocoding` to hide the token.

---

### 2. Missing PropTypes/TypeScript

Problem: No runtime prop validation; errors only in console.

Impact: Medium (developer experience, debugging slower).

Reason for delay: Fast MVP; future refactor planned.

Planned solution: Gradual migration to TypeScript.

---

### 3. SEO in React SPA (Project Scope)

Problem: Search engine optimization for client-side rendered React apps (SPA) is inherently limited compared to SSR/SSG frameworks (e.g., Next.js). Crawlers may not fully execute JavaScript, impacting indexability of dynamic content.

What we did: Applied practical SEO improvements suitable for a Vite + React SPA—semantic HTML, title/meta management per route, descriptive headings, accessible structure, clean URLs, performant loading, and sitemap/robots guidance.

Impact: Medium. For this educational project and use case, the implemented SEO measures are sufficient to ensure crawlability of key static sections and acceptable discoverability.

Future solution: For production-grade SEO, adopt SSR/SSG (Next.js) or pre-rendering (e.g., `prerender-spa-plugin`) to emit HTML at build time, enabling full indexing of route content.

---

### 4. Table Performance with 100+ Rows

Problem: Rendering cost when many valuations are present in the dashboard.

Impact: Low (real-world use cases < 50 visible rows).

Workaround: Client-side filters and sorting.

Future solution: Virtualization (react-window) or backend pagination.

---

### 5. Non-Optimized Image Handling

Problem: `.avif` assets loaded without lazy loading or srcset.

Impact: Low-Medium (suboptimal LCP on mobile).

Workaround: AVIF already compressed (≈50% vs JPEG).

Future solution: Implement `loading="lazy"` and responsive images.

---

### 6. Limited editing for valuations/tasks (Agents/Admin area)

Problem: Editing functions for valuations/tasks in the Agents/Admin dashboard are currently limited.

Details:
- Document upload is not implemented in the backend, so it is unavailable in the frontend.
- Editable fields implemented by the backend are limited to: request status, final valuation value, notes, and comments.
- Other fields shown in the frontend could be editable if the backend exposed the necessary endpoints.

Reason: Backend support is missing for broader editing, although the frontend is prepared to support it.

Recommended future solution: Extend backend endpoints to enable document upload and editing of additional valuation fields, then expose the corresponding UI actions.

## Available Scripts

```bash
# Development server with HMR
npm run dev

# Production build (output in dist/)
npm run build

# Local preview of build
npm run preview

# Lint JavaScript/JSX
npm run lint

# Manual CSS build (if needed)
npm run build:css

# Watch CSS changes (Tailwind development)
npm run watch:css
```

---

## Useful Links

- Repository: [github.com/nik-bell/immobiliarisplus](https://github.com/nik-bell/immobiliarisplus)
- Backend README: [../backend/README.md](../backend/README.md)
- Vite Docs: [vitejs.dev](https://vitejs.dev)
- React Docs: [react.dev](https://react.dev)
- Tailwind CSS: [tailwindcss.com](https://tailwindcss.com)
- Mapbox GL JS: [docs.mapbox.com/mapbox-gl-js](https://docs.mapbox.com/mapbox-gl-js/)

---

## License

This project is developed for educational purposes - ITS ICT Piemonte © 2025
