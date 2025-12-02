# Immobiliaris Plus - Frontend

> Piattaforma web moderna per la gestione e valutazione immobiliare con dashboard agenti e form multi-step per valutazioni online.

## 📋 Indice

- [Descrizione](#-descrizione)
- [Tecnologie](#️-tecnologie-utilizzate)
- [Prerequisiti](#-prerequisiti)
- [Installazione](#-installazione)
- [Configurazione](#️-configurazione)
- [Avvio Progetto](#-avvio-progetto)
- [Struttura Progetto](#-struttura-progetto)
- [API Documentation](#-api-documentation)
- [Scelte Tecniche](#-scelte-tecniche)
- [Problemi Noti](#-problemi-noti-e-limitazioni)
- [Scripts Disponibili](#-scripts-disponibili)

---

## 📝 Descrizione

**Immobiliaris Plus** è un'applicazione web full-stack per la gestione di valutazioni immobiliari. Il frontend offre:

- **Landing pages** responsive per vendita, valutazione e miglioramento immobili
- **Form multi-step** guidato per richiesta valutazione con validazione avanzata
- **Dashboard agenti** protetta con autenticazione JWT per gestione pratiche
- **Sistema modale** per visualizzazione/modifica dettagli valutazioni
- **Gestione stato** centralizzata con Context API
- **Integrazione Mapbox** per autocompletamento indirizzi

**Link Backend**: [Vedi README Backend](../backend/README.md)

---

## 🛠️ Tecnologie Utilizzate

### Core
| Tecnologia | Versione | Scopo |
|-----------|----------|-------|
| **React** | ^19.1.1 | Library UI component-based |
| **React Router DOM** | ^7.9.5 | Routing client-side con lazy loading |
| **Vite** | ^7.1.7 | Build tool e dev server HMR |

### Styling
| Tecnologia | Versione | Scopo |
|-----------|----------|-------|
| **Tailwind CSS** | ^4.1.17 | Utility-first CSS framework |
| **PostCSS** | ^8.5.6 | CSS processing |
| **Autoprefixer** | ^10.4.22 | Vendor prefixes automatici |

### External Libraries
| Tecnologia | Versione | Scopo |
|-----------|----------|-------|
| **Mapbox GL JS** | ^3.16.0 | Integrazione mappe e geocoding |

### Development Tools
| Tecnologia | Versione | Scopo |
|-----------|----------|-------|
| **ESLint** | ^9.36.0 | Linting JavaScript/JSX |
| **@vitejs/plugin-react** | ^5.0.4 | Fast Refresh HMR per React |

---

## ✅ Prerequisiti

- **Node.js**: >= 18.x
- **npm** o **yarn**: Gestione dipendenze
- **Backend attivo**: API REST su `http://localhost:8081` (default)

---

## 📦 Installazione

```bash
# Clone repository (se non già fatto)
git clone https://github.com/nik-bell/immobiliarisplus.git
cd immobiliarisplus/frontend

# Installa dipendenze
npm install
```

---

## ⚙️ Configurazione

### Variabili d'Ambiente

Crea un file `.env` nella root `frontend/`:

```env
# URL base API backend (opzionale, default: http://localhost:8081/api)
VITE_API_BASE_URL=http://localhost:8081/api

# Mapbox Access Token (necessario per autocompletamento indirizzi)
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

**Nota**: Ottieni il token Mapbox gratuitamente su [mapbox.com](https://account.mapbox.com/access-tokens/)

---

## 🚀 Avvio Progetto

### Development

```bash
npm run dev
```

Apri [http://localhost:5173](http://localhost:5173) nel browser.

### Production Build

```bash
npm run build
npm run preview  # Preview build locale
```

Output in `dist/`

### Linting

```bash
npm run lint
```

---

## 📁 Struttura Progetto

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

### Convenzioni Naming

- **Components**: PascalCase (`Button.jsx`, `CasaModal.jsx`)
- **Hooks**: camelCase con prefisso `use` (`useValutaCasaForm.js`)
- **Utils**: camelCase (`mappers.js`)
- **Contexts**: PascalCase + `Context` suffix (`AuthContext.jsx`)

---

## 🌐 API Documentation

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

### Endpoints Principali

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

Tutte le richieste ritornano un oggetto standardizzato:

```javascript
{
  ok: boolean,        // Successo (true) o errore (false)
  status: number,     // HTTP status code
  data: object|null,  // Response body (null se errore)
  error: object|null  // Dettagli errore se ok=false
}
```

### Mapping Backend ↔ Frontend

Le funzioni in `src/utils/mappers.js` convertono DTO backend in strutture frontend:

```javascript
// Backend enum → Frontend UI key
mapStatus("IN_PROGRESS") // → "in_corso"

// Frontend UI key → Backend enum
mapUIStatusToEnum("in_corso") // → "IN_PROGRESS"

// Backend enum → Label leggibile
mapValuationStatusLabel("IN_PROGRESS") // → "In corso"
```

---

## 🧠 Scelte Tecniche

### Perché Context API invece di Redux?

**Motivazioni:**
1. **Semplicità**: Applicazione di media complessità, 3 context sufficienti
2. **No boilerplate**: Context API nativa React, zero dipendenze aggiuntive
3. **Performance**: Ottimizzazione con `useMemo`, `useCallback` dove serve
4. **Type safety**: Con PropTypes o TypeScript futuro è equivalente

**Context utilizzati:**
- `AuthContext`: Gestione login, user, token (sessionStorage)
- `CasaContext`: Stato dashboard, filtri, sorting, modal
- `FormContext`: Stato form multi-step ValutaCasa con validazione

**Quando considerare Redux:**
- State molto complesso con nested updates frequenti
- Time-travel debugging necessario
- DevTools avanzati richiesti

---

### Perché Mapbox invece di Google Maps?

**Motivazioni:**
1. **Pricing**: 50k richieste/mese gratuite vs 28k Google
2. **Geocoding API**: Più accurato per indirizzi italiani
3. **Customizzazione**: Stili mappe personalizzabili facilmente
4. **Performance**: Libreria più leggera (180KB vs 300KB Google)

**Uso nel progetto:**
- Autocompletamento indirizzi in `AddressInputValutaCasa.jsx`
- Endpoint: `https://api.mapbox.com/geocoding/v5/mapbox.places/`

---

### Perché sessionStorage invece di localStorage?

**Motivazioni:**
1. **Sicurezza**: Token cancellato automaticamente alla chiusura tab
2. **Privacy**: Nessuna persistenza cross-session
3. **UX**: Utente deve rifare login dopo chiusura, appropriato per dashboard agenti

Implementato in `src/api/request.js`:

```javascript
// Salva token
sessionStorage.setItem("auth_token", token);

// Recupero automatico al reload pagina
const stored = sessionStorage.getItem("auth_token");
```

---

### Lazy Loading Route con React.lazy()

**Motivazioni:**
1. **Code splitting**: Bundle iniziale ridotto da ~800KB a ~300KB
2. **Performance**: Caricamento on-demand solo quando utente naviga
3. **UX**: Spinner centralizzato mentre carica chunk

Implementato in `src/routes/AppRoutes.jsx`:

```javascript
const AreaAgenti = lazy(() => import("../pages/AreaAgenti"));
// Chunk separato caricato solo quando accedi a /area-agenti
```

**Risultato misurato:**
- Initial bundle: 312 KB
- AreaAgenti chunk: 45 KB (caricato solo quando serve)

---

### Validazione Form Centralizzata

**Problema**: Form multi-step con 15+ campi, validazione complessa per CAP, email, phone.

**Soluzione**: Validator functions per step in `src/pages/ValutaCasa/validators/`

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

**Vantaggi:**
- Testabilità: Funzioni pure facilmente unit-testabili
- Riusabilità: Validatori condivisi tra componenti
- Manutenibilità: Logica business separata da UI

---

### Dropdown con Portal Pattern

**Problema**: Dropdown in tabella tagliati da `overflow: hidden` del container.

**Soluzione**: `ReactDOM.createPortal()` per renderizzare dropdown fuori dall'albero DOM.

Implementato in `StatusDropdown.jsx` e `AgentSelector.jsx`:

```javascript
{open && createPortal(
  <div style={popupStyle} ref={popupRef}>
    {/* Dropdown content */}
  </div>,
  document.body // Renderizza a livello body
)}
```

**Benefici:**
- Z-index isolato da parent containers
- Positioning assoluto calcolato dinamicamente
- Chiusura automatica click-outside con event listener

---

## ⚠️ Problemi Noti e Limitazioni

### 1. Mapbox Token Hardcoded in Client

**Problema**: Token Mapbox visibile nel bundle JavaScript.

**Impatto**: Basso (rate limiting Mapbox per origin, non critico)

**Mitigazione attuale**: Restrizioni dominio su Mapbox dashboard

**Soluzione futura**: Proxy backend `/api/geocoding` per nascondere token

---

### 2. Nessun Error Boundary Globale

**Problema**: Errori React non catturati crashano l'intera app.

**Impatto**: Medio (UX negativa in caso di bug runtime)

**Workaround**: Gestione errori a livello API con return values strutturati

**Soluzione pianificata**: Implementare `ErrorBoundary` component con fallback UI

---

### 3. Mancanza PropTypes/TypeScript

**Problema**: Nessuna validazione runtime dei props, errori solo in console.

**Impatto**: Medio (developer experience, debugging più lento)

**Motivazione ritardo**: Priorità MVP veloce, refactor futuro

**Soluzione pianificata**: Migrazione graduale a TypeScript

---

### 4. Performance Tabella con 100+ Righe

**Problema**: Rendering lento con molte valutazioni in dashboard.

**Impatto**: Basso (casi d'uso reali < 50 righe visibili)

**Workaround**: Filtri e sorting client-side

**Soluzione futura**: Virtualizzazione (react-window) o paginazione backend

---

### 5. Gestione Immagini non Ottimizzata

**Problema**: Asset `.avif` caricati senza lazy loading o srcset.

**Impatto**: Basso-Medio (LCP subottimale su mobile)

**Workaround**: Formato AVIF già compresso (50% rispetto a JPEG)

**Soluzione futura**: Implementare `loading="lazy"` e responsive images

---

### 6. Testing Assente

**Problema**: Zero test automatizzati (unit/integration/e2e).

**Impatto**: Alto (rischio regressioni su refactoring)

**Motivazione**: Priorità consegna MVP

**Soluzione pianificata**: 
- Unit tests con Vitest per utils/mappers
- Component tests con React Testing Library
- E2E con Playwright per flussi critici

---

## 📜 Scripts Disponibili

```bash
# Development server con HMR
npm run dev

# Build production (output in dist/)
npm run build

# Preview build locale
npm run preview

# Lint JavaScript/JSX
npm run lint

# Build CSS manuale (se serve)
npm run build:css

# Watch CSS changes (sviluppo Tailwind)
npm run watch:css
```

---

## 🔗 Link Utili

- **Repository**: [github.com/nik-bell/immobiliarisplus](https://github.com/nik-bell/immobiliarisplus)
- **Backend README**: [../backend/README.md](../backend/README.md)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev)
- **React Docs**: [react.dev](https://react.dev)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Mapbox GL JS**: [docs.mapbox.com/mapbox-gl-js](https://docs.mapbox.com/mapbox-gl-js/)

---

## 👥 Contributors

- **Luca Montanaro** - Frontend Development
- **Team ITS ICT Piemonte** - Project Supervision

---

## 📄 License

Questo progetto è sviluppato per scopi didattici - ITS ICT Piemonte © 2025
