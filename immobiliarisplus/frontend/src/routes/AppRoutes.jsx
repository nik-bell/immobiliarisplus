import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import Contattaci from "../pages/Contattaci";
import ValutaCasa from "../pages/ValutaCasa/ValutaCasa";
import VendiCasa from "../pages/VendiCasa";
import MiglioraCasa from "../pages/MiglioraCasa";
import ContrattoEsclusiva from "../pages/ContrattoEsclusiva"
import NotFoundPage from "../pages/NotFoundPage";

const appRoutes = [
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Homepage,
        showInNav: true,
        title: "Home",
      },
      {
        path: "contattaci",
        Component: Contattaci,
        showInNav: false,
        title: "Contattaci",
      },
      {
        path: "valuta-casa",
        Component: ValutaCasa,
        showInNav: false,
        title: "Valuta Casa",
      },
      {
        path: "vendi-casa",
        Component: VendiCasa,
        showInNav: true,
        title: "Vendi Casa",
      },
      {
        path: "migliora-casa",
        Component: MiglioraCasa,
        showInNav: true,
        title: "Migliora Casa",
      },
      {
        path: "contratto-esclusiva",
        Component: ContrattoEsclusiva,
        showInNav: false,
        title: "Contratto Esclusiva",
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
];

export default appRoutes;
