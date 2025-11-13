import { NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const TopNavbar = () => {
  const { isLoggedIn, userType } = useAuth();

  return (
    <div>
      <div>
        <NavLink href="/contattaci">Assistenza</NavLink>

        {!isLoggedIn ? (
          <NavLink href="/login">Login</NavLink>
        ) : (
          <>
            {userType === "agente" ? (
              <NavLink href="/area-agenti">Area Agenti</NavLink>
            ) : (
              <NavLink href="/area-personale">Area Personale</NavLink>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
