import { lazy, Suspense } from "react";
import { useAuth } from "../store/AuthContext";
import { Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AreaAgentiLayout from "../layout/AreaAgentiLayout";

/* -------------------------------------------------------------------------- */
/*                               Lazy Imports                                 */
/* -------------------------------------------------------------------------- */

/**
 * Lazy-loaded page components.
 * Queste importazioni riducono il bundle iniziale sfruttando il code-splitting.
 */
const Homepage = lazy(() => import("../pages/Homepage"));
const Contattaci = lazy(() => import("../pages/Contattaci"));
const ValutaCasa = lazy(() => import("../pages/ValutaCasa/ValutaCasa"));
const VendiCasa = lazy(() => import("../pages/VendiCasa"));
const MiglioraCasa = lazy(() => import("../pages/MiglioraCasa"));
const ContrattoEsclusiva = lazy(() => import("../pages/ContrattoEsclusiva"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

/**
 * Workaround per Vite/HMR: import separato per evitare warning
 * quando si usa lazy(() => import()) inline.
 */
const AreaAgentiImport = () => import("../pages/AreaAgenti");
const AreaAgenti = lazy(AreaAgentiImport);

/* -------------------------------------------------------------------------- */
/*                         Protected Route Wrapper                             */
/* -------------------------------------------------------------------------- */

/**
 * Protegge la rotta "Area Agenti".
 * Reindirizza l’utente alla home se non è autenticato.
 *
 * @returns {JSX.Element} Componente protetto o redirect.
 */
function ProtectedAreaAgenti() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <AreaAgenti />
    </Suspense>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Loading Helpers                                */
/* -------------------------------------------------------------------------- */

/**
 * Componente mostrato mentre i componenti lazy vengono caricati.
 *
 * @returns {JSX.Element}
 */
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
  </div>
);

/**
 * Wrapper che avvolge un componente lazy con Suspense.
 *
 * @param {React.LazyExoticComponent} Component - componente da renderizzare.
 * @returns {JSX.Element}
 */
const load = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

/* -------------------------------------------------------------------------- */
/*                                Route Config                                 */
/* -------------------------------------------------------------------------- */

/**
 * Definizione dell’albero delle rotte dell'app.
 *
 * Ogni rotta può definire:
 * - `element` → componente da renderizzare
 * - `children` → rotte nidificate
 * - `showInNav` → se deve apparire nella navigazione
 * - `title` → label della voce di menu
 *
 * @type {import("react-router-dom").RouteObject[]}
 */
const appRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: load(Homepage),
        showInNav: true,
        title: "Home",
      },
      {
        path: "contattaci",
        element: load(Contattaci),
        showInNav: false,
        title: "Contattaci",
      },
      {
        path: "valuta-casa",
        element: load(ValutaCasa),
        showInNav: false,
        title: "Valuta Casa",
      },
      {
        path: "vendi-casa",
        element: load(VendiCasa),
        showInNav: true,
        title: "Vendi Casa",
      },
      {
        path: "migliora-casa",
        element: load(MiglioraCasa),
        showInNav: true,
        title: "Migliora Casa",
      },

      /* ----------------------- Area Agenti Protetta ----------------------- */
      {
        path: "area-agenti",
        element: <AreaAgentiLayout />,
        children: [
          {
            index: true,
            element: <ProtectedAreaAgenti />,
            title: "Area Agenti",
            showInNav: true,
          },
        ],
      },

      {
        path: "contratto-esclusiva",
        element: load(ContrattoEsclusiva),
        showInNav: false,
        title: "Contratto Esclusiva",
      },

      /* ----------------------------- Pagina 404 ---------------------------- */
      {
        path: "*",
        element: load(NotFoundPage),
      },
    ],
  },
];

export default appRoutes;
