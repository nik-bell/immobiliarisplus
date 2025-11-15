import { NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const TopNavbar = () => {
  const { isLoggedIn, userType } = useAuth();

  return (
    <div className="w-full bg-gray-900 text-gray-100 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-end justify-end">
        <div className="flex items-end gap-4">
          <NavLink to="/contattaci" className="hover:underline">
            Assistenza
          </NavLink>

          {!isLoggedIn ? (
            <NavLink to="/login" className="hover:underline">
              Login
            </NavLink>
          ) : userType === "agente" ? (
            <NavLink to="/area-agenti" className="hover:underline">
              Area Agenti
            </NavLink>
          ) : (
            <NavLink to="/area-personale" className="hover:underline">
              Area Personale
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
