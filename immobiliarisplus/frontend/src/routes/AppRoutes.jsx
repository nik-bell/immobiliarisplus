import { lazy, Suspense } from "react";
import MainLayout from "../layout/MainLayout";
import AreaAgentiLayout from "../layout/AreaAgentiLayout";

// 1. IMPORT LAZY DELLE PAGINE
const Homepage = lazy(() => import("../pages/Homepage"));
const Contattaci = lazy(() => import("../pages/Contattaci"));
const ValutaCasa = lazy(() => import("../pages/ValutaCasa/ValutaCasa"));
const VendiCasa = lazy(() => import("../pages/VendiCasa"));
const MiglioraCasa = lazy(() => import("../pages/MiglioraCasa"));
const ContrattoEsclusiva = lazy(() => import("../pages/ContrattoEsclusiva"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const Test = lazy(() => import("../pages/test"));
const AreaAgenti = lazy(() => import("../pages/AreaAgenti"));

// 2. COMPONENTE DI CARICAMENTO E HELPER
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
  </div>
);
const load = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

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
      {
        path: "test",
        element: load(Test),
        showInNav: false,
        title: "Test API",
      },

      // 🔐 AREA AGENTI PROTETTA
      {
        path: "area-agenti",
        element: <AreaAgentiLayout />,
        children: [
          {
            index: true,
            element: load(AreaAgenti),
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
      {
        path: "*",
        element: load(NotFoundPage),
      },
    ],
  },
];

export default appRoutes;