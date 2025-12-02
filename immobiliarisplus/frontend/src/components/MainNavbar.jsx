import { useState } from "react";
import { NavLink } from "react-router-dom";
import LogoSVG from '../assets/Logo.svg'

const MainNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navLinkClasses = "block text-2xl py-4 px-6 text-gray-800 hover:bg-gray-100 transition duration-300";
  return (
    <>
      <nav className="w-full bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left - Logo */}
          <NavLink to="/" className="flex items-center group">
            <img
              src={LogoSVG}
              alt="Logo"
              className="h-11 w-auto transition-transform duration-200 group-hover:scale-105"
            />
          </NavLink>

          {/* Center - navigation links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className="text-gray-600 hover:text-gray-900 hover:underline">
              Home
            </NavLink>
            <NavLink to="/vendi-casa" className="text-gray-600 hover:text-gray-900 hover:underline">
              Vendi casa
            </NavLink>
            <NavLink to="/migliora-casa" className="text-gray-600 hover:text-gray-900 hover:underline">
              Migliora casa
            </NavLink>
            <NavLink to="/valuta-casa" onClick={() => setIsMenuOpen(false)}>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
                Valuta casa
              </button>
            </NavLink>
          </div>

          {/* Right - Button menu*/}
          <div className="flex items-center md:hidden">
            <button
              className="p-2 relative z-50 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div
                  className={`
                                    h-0.5 bg-gray-800 rounded transition-all duration-300 absolute w-5 
                                    ${isMenuOpen
                      ? 'rotate-45 translate-y-0'
                      : '-translate-y-1'}
                                `}
                ></div>
                <div
                  className={`
                              h-0.5 bg-gray-800 rounded transition-all duration-300 absolute w-5 
                             ${isMenuOpen
                      ? '-rotate-45 translate-y-0'
                      : 'translate-y-1'}
                       `}
                ></div>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Menu Drawer Mobile */}
      <div
        className={`
                    fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 
                    md:hidden 
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
      >
        <div className="pt-20 flex flex-col">

          <NavLink to="/" className={navLinkClasses} onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="/vendi-casa" className={navLinkClasses} onClick={toggleMenu}>
            Vendi casa
          </NavLink>
          <NavLink to="/migliora-casa" className={navLinkClasses} onClick={toggleMenu}>
            Migliora casa
          </NavLink>

          <div className="p-6">
            <NavLink to="/valuta-casa" className="block" onClick={toggleMenu}>
              <button className="w-full bg-yellow-400 text-gray-800 px-4 py-3 text-lg rounded hover:bg-yellow-500 font-bold shadow-lg">
                Valuta casa
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default MainNavbar;