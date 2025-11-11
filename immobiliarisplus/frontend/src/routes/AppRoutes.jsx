import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import NotFoundPage from "../pages/NotFoundPage";
const appRoutes = [
  {
    path: "/",
    Component: MainLayout, // 👈 React Router 7: usa Component, non element
    children: [
      {
        index: true,
        Component: Homepage,
        showInNav: true,
        title: "Home",
      },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
];

export default appRoutes;
