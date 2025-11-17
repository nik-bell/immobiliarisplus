import { NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { useState } from "react";
import LoginModal from "./LoginModal";

const TopNavbar = () => {
  const { isLoggedIn, userType } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-gray-900 text-gray-100 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-end justify-end">
          <div className="flex items-end gap-4">
            <NavLink to="/contattaci" className="hover:underline">
              Assistenza
            </NavLink>

            {!isLoggedIn ? (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="hover:underline"
              >
                Login
              </button>
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

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default TopNavbar;
