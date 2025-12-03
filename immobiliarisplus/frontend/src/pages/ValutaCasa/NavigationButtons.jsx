import useValutaCasaForm from "./useValutaCasaForm";

/**
 * NavigationButtons component
 *
 * Renders the navigation buttons for the multi-step “Valuta Casa” form.
 * Handles:
 * - "Indietro" button (hidden on step 1)
 * - "Continua" button (visible on steps 1–2)
 * - "Invia Richiesta" button (only on step 3)
 * - Auto-hides all controls after form submission
 *
 * @component
 * @returns {JSX.Element|null} The navigation bar or null if the form is already submitted.
 */
export default function NavigationButtons() {
  const { state, nextStep, prevStep, submitForm, loading } = useValutaCasaForm();

  // Do not render buttons if form is already submitted
  if (state.isSubmitted) {
    return null;
  }

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
