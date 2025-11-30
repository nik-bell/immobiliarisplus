import { NavLink } from "react-router-dom";
import { useState } from "react";
import LogoSVG from "../assets/Logo.svg";

// Lista centralizzata dei link di navigazione
const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/vendi-casa", label: "Vendi casa" },
  { path: "/migliora-casa", label: "Migliora casa" },
];

// Classe base per rendere lo stile dei link coerente
const baseLinkClass =
  "text-gray-600 hover:text-gray-900 transition-colors duration-200";

// Funzione helper per renderizzare i link
const renderNavLinks = () =>
  NAV_LINKS.map(({ path, label }) => (
    <NavLink key={path} to={path} className={baseLinkClass}>
      {label}
    </NavLink>
  ));

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navLinkClasses = "block text-2xl py-4 px-6 text-gray-800 hover:bg-gray-100 transition duration-300";
  return (
    <nav className="w-full bg-white shadow relative">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">

        {/* Left - Logo */}
        <NavLink to="/" className="flex items-center group">
          <img
            src={LogoSVG}
            alt="Logo"
            className="h-11 w-auto transition-transform duration-200 group-hover:scale-105"
          />
        </NavLink>

        {/* Right - CTA */}
        <NavLink to="/valuta-casa">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors duration-200">
            Valuta casa
          </button>
        </NavLink>
      </div>

      {/* Center Navigation */}
      <div
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          hidden md:flex space-x-6
        "
      >
        {renderNavLinks()}
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </nav>
  );
};

export default MainNavbar;
