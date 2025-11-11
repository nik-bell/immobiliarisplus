import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/Homepage";
import NotFoundPage from "../pages/NotFoundPage";
// import PrivacyPolicy from "../pages/PrivacyPolicy";
// import CookiePolicy from "../pages/CookiePolicy";

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
      //   {
      //     path: "privacy-policy",
      //     Component: PrivacyPolicy,
      //     showInNav: true,
      //     title: "Privacy Policy",
      //   },
      //   {
      //     path: "cookie-policy",
      //     Component: CookiePolicy,
      //     showInNav: true,
      //     title: "Cookie Policy",
      //   },
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
];

export default appRoutes;
