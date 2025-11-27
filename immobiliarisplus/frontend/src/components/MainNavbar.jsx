import { NavLink } from "react-router-dom";
import logoText from "../assets/scritta-logo.png";

const MainNavbar = () => {
  return (
    <nav className="w-full bg-white shadow relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        {/* Left - logo scritto */}
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <img 
              src={logoText} 
              alt="Logo" 
              className="h-11 w-auto object-contain" 
            /> 
          </NavLink>
        </div>

        {/* Right - CTAs */}
        <div className="flex items-center gap-3">
          <NavLink to="/valuta-casa">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500">
              Valuta casa
            </button>
          </NavLink>
          
        </div>
      </div>

      {/* Center - navigation links */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex space-x-6">
        <NavLink to="/" className="text-gray-600 hover:text-gray-900">
          Home
        </NavLink>
        <NavLink to="/vendi-casa" className="text-gray-600 hover:text-gray-900">
          Vendi casa
        </NavLink>
        <NavLink to="/migliora-casa" className="text-gray-600 hover:text-gray-900">
          Migliora casa
        </NavLink>
      </div>
    </nav>
  );
};

export default MainNavbar;
