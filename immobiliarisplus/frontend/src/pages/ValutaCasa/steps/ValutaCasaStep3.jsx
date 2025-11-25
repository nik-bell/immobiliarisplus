import useValutaCasaForm from "../useValutaCasaForm";
import NavigationButtons from "../NavigationButtons";

export default function ValutaCasaStep3() {
  const { state, dispatch, submitForm } = useValutaCasaForm();
  const c = state.contact;

  // Se il form è stato inviato, mostra solo il messaggio di conferma
  if (state.isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow text-center">
        <h2 className="text-lg font-semibold mb-2">Conferma Invio</h2>
        <p className="text-green-600">{state.submitMessage}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Step 3 — Contatti</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={c.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { name: e.target.value },
            })
          }
        />
        {state.errors.name && (
          <p className="text-sm text-red-600">{state.errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Cognome</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={c.surname}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { surname: e.target.value },
            })
          }
        />
        {state.errors.surname && (
          <p className="text-sm text-red-600">{state.errors.surname}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={c.email}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { email: e.target.value },
            })
          }
        />
        {state.errors.email && (
          <p className="text-sm text-red-600">{state.errors.email}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Telefono</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={c.phone}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { phone: e.target.value },
            })
          }
        />
        {state.errors.phone && (
          <p className="text-sm text-red-600">{state.errors.phone}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={c.privacyAccepted}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_CONTACT",
                payload: { privacyAccepted: e.target.checked },
              })
            }
            className="w-4 h-4"
          />
          Accetto privacy e condizioni di servizio
        </label>
        {state.errors.privacyAccepted && (
          <p className="text-sm text-red-600">{state.errors.privacyAccepted}</p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={submitForm}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Invia Richiesta
        </button>
      </div>
      <NavigationButtons />
    </div>
  );
}
