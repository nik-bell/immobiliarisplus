/**
 * @file AreaAgentiLayout.jsx
 * @description Layout for the agents area; enforces auth redirect and provides Casa context with modal.
 */
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CasaContextProvider from "../providers/CasaContextProvider";
import CasaModal from "./CasaModal";
import { useAuth } from "../store/AuthContext";

export default function AreaAgentiLayout() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Redirects to the homepage if the user is not authenticated.
     * Ensures the agents area is only accessible after login.
     */
    if (!isLoggedIn) {
      // if the user is not logged in, redirect to home
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  /**
   * Wraps the agents area with the Casa context and renders the modal portal.
   * @returns {JSX.Element}
   */
  return (
    <CasaContextProvider>
      <Outlet />
      <CasaModal />
    </CasaContextProvider>
  );
}
