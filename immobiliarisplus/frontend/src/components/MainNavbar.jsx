import { NavLink } from "react-router-dom";
import LogoSVG from "../assets/Logo.svg";

const MainNavbar = () => {
  return (
    <nav className="w-full bg-white shadow relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        {/* Left - Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={LogoSVG} alt="Logo" className="h-11 w-auto" />
        </NavLink>

        {/* Right - CTA */}
        <NavLink to="/valuta-casa">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
            Valuta casa
          </button>
        </NavLink>
      </div>

      {/* Center - Navigation Links */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex space-x-6">
        {[
          { path: "/", label: "Home" },
          { path: "/vendi-casa", label: "Vendi casa" },
          { path: "/migliora-casa", label: "Migliora casa" },
        ].map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className="text-gray-600 hover:text-gray-900"
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MainNavbar;
