import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CasaContextProvider from "../providers/CasaContextProvider";
import CasaModal from "./CasaModal";
import { useAuth } from "../store/AuthContext";

export default function AreaAgentiLayout() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // if the user is not logged in, redirect to home
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <CasaContextProvider>
      <Outlet />
      <CasaModal />
    </CasaContextProvider>
  );
}
