/**
 * @file NavigationButtons.jsx
 * @description Next/Previous/Submit controls for the valuation wizard.
 */
import useValutaCasaForm from "./useValutaCasaForm";

export default function NavigationButtons() {
  const { state, nextStep, prevStep, submitForm, loading } = useValutaCasaForm();

  // Do not render buttons if form is already submitted
  if (state.isSubmitted) {
    return null;
  }

  /**
   * Renders contextual navigation buttons:
   * - Back when step > 1
   * - Continue when step < 3
   * - Submit on last step
   * @returns {JSX.Element}
   */
  return (
    <div className="max-w-3xl mx-auto mt-6 flex items-center justify-between gap-4">
      {state.step > 1 ? (
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-white rounded-lg hover:bg-gray-300 border border-gray-200"
        >
          Indietro
        </button>
      ) : (
        <div />
      )}

      {state.step < 3 ? (
        <button
          onClick={nextStep}
          disabled={loading}
          className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continua
        </button>
      ) : (
        <button
          onClick={submitForm}
          disabled={loading}
          className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></div>
          )}
          {loading ? "Invio in corso..." : "Invia Richiesta"}
        </button>
      )}
    </div>
  );
}
