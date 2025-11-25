import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  return (
    <nav className="w-full bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left - logo */}
        <div className="flex items-center">
          <NavLink to="/" className="text-xl font-bold text-gray-800">
            {/* <img src="/logo.png" alt="Logo" /> */}
            ImmobiliarisPlus
          </NavLink>
        </div>

        {/* Center - navigation links */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </NavLink>
          <NavLink
            to="/vendi-casa"
            className="text-gray-600 hover:text-gray-900"
          >
            Vendi casa
          </NavLink>
          <NavLink
            to="/migliora-casa"
            className="text-gray-600 hover:text-gray-900"
          >
            Migliora casa
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
    </nav>
  );
};

export default MainNavbar;
