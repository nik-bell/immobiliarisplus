import useValutaCasaForm from "./useValutaCasaForm";

export default function NavigationButtons() {
  const { state, nextStep, prevStep, submitForm } = useValutaCasaForm();

  // Se il form è stato inviato, non mostrare i bottoni di navigazione
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
          className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-500"
        >
          Continua
        </button>
      ) : (
        <button
          onClick={submitForm}
          className="bg-yellow-400 text-gary-900 px-4 py-2 rounded hover:bg-yellow-500"
        >
          Invia Richiesta
        </button>
      )}
    </div>
  );
}
