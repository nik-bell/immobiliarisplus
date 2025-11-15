import useValutaCasaForm from "./useValutaCasaForm";

export default function NavigationButtons() {
  const { state, nextStep, prevStep } = useValutaCasaForm();

  // Se il form è stato inviato, non mostrare i bottoni di navigazione
  if (state.isSubmitted) {
    return null;
  }

  return (
    <div>
      {state.step > 1 && <button onClick={prevStep}>Indietro</button>}
      {state.step < 3 && <button onClick={nextStep}>Avanti</button>}
    </div>
  );
}
