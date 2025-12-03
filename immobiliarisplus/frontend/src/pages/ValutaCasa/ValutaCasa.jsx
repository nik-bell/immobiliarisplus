import FormContextProvider from "../../providers/FormContextProvider";
import useValutaCasaForm from "./useValutaCasaForm";

import ValutaCasaStep1 from "./steps/ValutaCasaStep1";
import ValutaCasaStep2 from "./steps/ValutaCasaStep2";
import ValutaCasaStep3 from "./steps/ValutaCasaStep3";
import ValutaCasaSuccesso from "./steps/ValutaCasaSuccesso";
import ValutaCasaLoading from "./ValutaCasaLoading";
import BarraStep from "./BarraStep";

/**
 * Displays the stepper component based on the current step.
 *
 * @returns {JSX.Element} Step navigation UI.
 */
function StepperWrapper() {
  const { state } = useValutaCasaForm();
  const currentStep = state.step;

  return (
    <div>
      <BarraStep currentStep={currentStep} />
    </div>
  );
}

/**
 * Renders the correct form step or the loading/success screens
 * depending on form state.
 *
 * @returns {JSX.Element} The active step component.
 */
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

/**
 * Main component for the ValutaCasa multi-step form.
 * Wraps all steps inside the global form context provider.
 *
 * @returns {JSX.Element}
 */
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

/**
 * Controls visibility of the stepper UI based on form submission state.
 *
 * @returns {JSX.Element | null}
 */
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
