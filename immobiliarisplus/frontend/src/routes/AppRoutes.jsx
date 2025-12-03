/**
 * App route configuration with lazy-loaded pages and protected routes.
 * Uses React Router + Suspense for code-splitting.
 */

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
 * This allows code-splitting and faster initial page load.
 */
const Homepage = lazy(() => import("../pages/Homepage"));
const Contattaci = lazy(() => import("../pages/Contattaci"));
const ValutaCasa = lazy(() => import("../pages/ValutaCasa/ValutaCasa"));
const VendiCasa = lazy(() => import("../pages/VendiCasa"));
const MiglioraCasa = lazy(() => import("../pages/MiglioraCasa"));
const ContrattoEsclusiva = lazy(() => import("../pages/ContrattoEsclusiva"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

/**
 * Workaround for Vite/HMR: wrapped dynamic import for AreaAgenti
 * to avoid inline lazy(() => import()) warnings.
 */
const AreaAgentiImport = () => import("../pages/AreaAgenti");
const AreaAgenti = lazy(AreaAgentiImport);

/* -------------------------------------------------------------------------- */
/*                        Protected Route Wrapper                             */
/* -------------------------------------------------------------------------- */

/**
 * Protects the "Area Agenti" route.
 * Redirects to "/" if the user is not logged in.
 *
 * @returns {JSX.Element}
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
/*                           Suspense Helpers                                 */
/* -------------------------------------------------------------------------- */

/**
 * Fallback loading spinner displayed while lazy components load.
 *
 * @returns {JSX.Element}
 */
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
  </div>
);

/**
 * Wraps a lazy-loaded component into a Suspense boundary.
 *
 * @param {React.LazyExoticComponent} Component - React component to load.
 * @returns {JSX.Element}
 */
const load = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

/* -------------------------------------------------------------------------- */
/*                               App Routes                                   */
/* -------------------------------------------------------------------------- */

/**
 * Route tree used by React Router throughout the application.
 * Contains:
 * - public pages
 * - lazy-loaded pages
 * - protected "Area Agenti"
 * - 404 fallback
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

      /* ----------------------- Protected Area Agenti ---------------------- */
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

      /* ----------------------------- 404 Page ----------------------------- */
      {
        path: "*",
        element: load(NotFoundPage),
      },
    ],
  },
];

export default appRoutes;
