import FormContextProvider from "../../providers/FormContextProvider";
import useValutaCasaForm from "./useValutaCasaForm";

import ValutaCasaStep1 from "./steps/ValutaCasaStep1";
import ValutaCasaStep2 from "./steps/ValutaCasaStep2";
import ValutaCasaStep3 from "./steps/ValutaCasaStep3";
import ValutaCasaSuccesso from "./steps/ValutaCasaSuccesso";
import ValutaCasaLoading from "./ValutaCasaLoading";
import BarraStep from "./BarraStep";

function StepperWrapper() {
  const { state } = useValutaCasaForm();
  const currentStep = state.step;

  return (
    <div>
      <BarraStep currentStep={currentStep} />
    </div>
  );
}
function StepsRenderer() {
  const { state, loading } = useValutaCasaForm();

  if (loading) {
    return <ValutaCasaLoading />;
  }

  if (state.isSubmitted) {
    return <ValutaCasaSuccesso />;
  }

  if (state.step === 1) return <ValutaCasaStep1 />;
  if (state.step === 2) return <ValutaCasaStep2 />;
  return <ValutaCasaStep3 />;
}

export default function ValutaCasa() {
  return (
    <FormContextProvider>
      <div className="flex-1 min-w-10 px-2">
        <div className="h-0.5 w-full bg-gray-200"></div>
      </div>
      <div className=" bg-gray-100">
        <StepperContent />
        <div className="max-w-6xl mx-auto px-4">
          <StepsRenderer />
        </div>
      </div>
    </FormContextProvider>
  );
}

function StepperContent() {
  const { state } = useValutaCasaForm();
  const showStepper = !state.isSubmitted;

  return (
    <>
      {showStepper && (
        <div className="max-w-4xl mx-auto px-4">
          <StepperWrapper />
        </div>
      )}

      {showStepper && (
        <div className="flex-1 min-w-10 px-2 mb-8">
          <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
      )}
    </>
  );
}