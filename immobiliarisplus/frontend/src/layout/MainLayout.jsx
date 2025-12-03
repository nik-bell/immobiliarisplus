import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "../components/ScrollToTop";

/**
 * MainLayout
 * 
 * Main application layout wrapper.
 * Renders the global header, footer, scroll restoration,
 * and the currently active route via <Outlet />.
 *
 * @component
 * @returns {JSX.Element} The main layout structure.
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
