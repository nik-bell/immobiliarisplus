import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import Blog from "../pages/Blog";
import Contattaci from "../pages/Contattaci";
import ValutaCasa from "../pages/ValutaCasa/ValutaCasa";
import VendiCasa from "../pages/VendiCasa";
import MiglioraCasa from "../pages/MiglioraCasa";
import NotFoundPage from "../pages/NotFoundPage";
import Test from "../pages/test";

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
        path: "blog",
        Component: Blog,
        showInNav: true,
        title: "Blog",
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

      // Route Test 
      {
        path: "test",
        Component: Test,
        showInNav: false,
        title: "Test API",
      },

      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
];

export default appRoutes;
