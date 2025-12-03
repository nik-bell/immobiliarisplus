/**
 * @file ValutaCasa.jsx
 * @description Multi-step valuation flow wrapper with error handling and loading states.
 */
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

  /**
   * Renders the top stepper reflecting the current step.
   * @returns {JSX.Element}
   */
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
  const { state, loading, error, submitForm } = useValutaCasaForm();

  if (loading) {
    return <ValutaCasaLoading />;
  }

  if (state.isSubmitted) {
    return <ValutaCasaSuccesso />;
  }

  // Show error banner (if any) above the current step and allow retry
  const errorMessage = error || state.submitMessage;

  return (
    <>
      <ErrorBanner message={errorMessage} onRetry={submitForm} loading={loading} />
      {state.step === 1 && <ValutaCasaStep1 />}
      {state.step === 2 && <ValutaCasaStep2 />}
      {state.step === 3 && <ValutaCasaStep3 />}
    </>
  );
}

function ErrorBanner({ message, onRetry, loading }) {
  /**
   * Inline error banner with a retry action for form submission errors.
   * @param {{message?: string, onRetry: () => void, loading: boolean}} props
   * @returns {null|JSX.Element}
   */
  if (!message) return null;

  return (
    <div className="max-w-6xl mx-auto mb-6 px-4">
      <div className="rounded-md bg-red-50 p-4 border border-red-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-red-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">Si è verificato un errore durante l'invio dei dati.</p>
            <p className="mt-1 text-sm text-red-700">{message}</p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={onRetry}
              disabled={loading}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Riprovo..." : "Riprova"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Main component for the ValutaCasa multi-step form.
 * Wraps all steps inside the global form context provider.
 *
 * @returns {JSX.Element}
 */
export default function ValutaCasa() {
  /**
   * Wraps the valuation stepper with form context and renders the flow.
   * @returns {JSX.Element}
   */
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

  /**
   * Conditionally shows the stepper separators and wrapper.
   * @returns {JSX.Element}
   */
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
