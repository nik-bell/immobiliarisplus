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
      <div className="bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Valuta la tua casa</h1>

          <StepsRenderer />

          <NavigationButtons />
        </div>
      </div>
    </FormContextProvider>
  );
}
