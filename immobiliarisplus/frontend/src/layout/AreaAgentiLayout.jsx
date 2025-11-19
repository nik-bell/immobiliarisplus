import { Outlet } from "react-router-dom";
import CasaContextProvider from "../providers/CasaContextProvider";
import CasaModal from "./CasaModal";

export default function AreaAgentiLayout() {
  return (
    <CasaContextProvider>
      <Outlet />
      <CasaModal />
    </CasaContextProvider>
  );
}
