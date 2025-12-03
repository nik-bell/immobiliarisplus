import MainNavbar from "../components/MainNavbar";
import TopNavbar from "../components/TopNavbar";

/**
 * Header
 *
 * Application header component that combines top and main navigation bars.
 * Positioned as a sticky header that remains visible when scrolling.
 *
 * @component
 * @returns {JSX.Element} Header section with sticky positioning containing TopNavbar and MainNavbar
 */
function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <TopNavbar></TopNavbar>
      <MainNavbar></MainNavbar>
    </header>
  );
}

export default Header;
