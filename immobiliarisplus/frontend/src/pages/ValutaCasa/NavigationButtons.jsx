import useValutaCasaForm from "./useValutaCasaForm";

export default function NavigationButtons() {
  const { state, nextStep, prevStep } = useValutaCasaForm();

  // Se il form è stato inviato, non mostrare i bottoni di navigazione
  if (state.isSubmitted) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 flex items-center justify-between gap-4">
      {state.step > 1 ? (
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Indietro
        </button>
      ) : (
        <div />
      )}

      {state.step < 3 && (
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Avanti
        </button>
      )}
    </div>
  );
}
