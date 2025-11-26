import MainNavbar from "../components/MainNavbar";
import TopNavbar from "../components/TopNavbar";

function Header() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <TopNavbar></TopNavbar>
      <MainNavbar></MainNavbar>
    </header>
  );
}

export default Header;
