import useValutaCasaForm from "../useValutaCasaForm";

export default function ValutaCasaStep3() {
  const { state, dispatch, submitForm } = useValutaCasaForm();
  const c = state.contact;

  // Se il form è stato inviato, mostra solo il messaggio di conferma
  if (state.isSubmitted) {
    return (
      <div>
        <h2>Conferma Invio</h2>
        <p>{state.submitMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Step 3 — Contatti</h2>

      <div>
        <label>Nome</label>
        <input
          value={c.name}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { name: e.target.value },
            })
          }
        />
        {state.errors.name && <p>{state.errors.name}</p>}
      </div>

      <div>
        <label>Cognome</label>
        <input
          value={c.surname}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { surname: e.target.value },
            })
          }
        />
        {state.errors.surname && <p>{state.errors.surname}</p>}
      </div>

      <div>
        <label>Email</label>
        <input
          value={c.email}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { email: e.target.value },
            })
          }
        />
        {state.errors.email && <p>{state.errors.email}</p>}
      </div>

      <div>
        <label>Telefono</label>
        <input
          value={c.phone}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_CONTACT",
              payload: { phone: e.target.value },
            })
          }
        />
        {state.errors.phone && <p>{state.errors.phone}</p>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={c.privacyAccepted}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_CONTACT",
                payload: { privacyAccepted: e.target.checked },
              })
            }
          />
          Accetto privacy e condizioni di servizio
        </label>
        {state.errors.privacyAccepted && <p>{state.errors.privacyAccepted}</p>}
      </div>

      <div>
        <button onClick={submitForm}>Invia Richiesta</button>
      </div>
    </div>
  );
}
