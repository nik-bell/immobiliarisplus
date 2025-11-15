import { useContext } from "react";
import FormContext from "../../store/FormContext";

export default function useValutaCasaForm() {
  return useContext(FormContext);
}
