import FormContextProvider from "../../providers/FormContextProvider";

import ValutaCasaStep1 from "./steps/ValutaCasaStep1";
import ValutaCasaStep2 from "./steps/ValutaCasaStep2";
import ValutaCasaStep3 from "./steps/ValutaCasaStep3";
import NavigationButtons from "./NavigationButtons";

import useValutaCasaForm from "./useValutaCasaForm";

function StepsRenderer() {
  const { state } = useValutaCasaForm();

  if (state.step === 1) return <ValutaCasaStep1 />;
  if (state.step === 2) return <ValutaCasaStep2 />;
  return <ValutaCasaStep3 />;
}

export default function ValutaCasa() {
  return (
    <FormContextProvider>
      <StepsRenderer />

      <NavigationButtons />
    </FormContextProvider>
  );
}
