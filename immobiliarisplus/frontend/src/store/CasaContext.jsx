import { createContext, useContext } from "react";

const CasaContext = createContext(null);

export const useCasa = () => {
  const ctx = useContext(CasaContext);
  if (!ctx)
    throw new Error("useCasa deve essere usato dentro CasaContextProvider");
  return ctx;
};

export default CasaContext;
