import useValutaCasaForm from "../useValutaCasaForm";

export default function ValutaCasaStep1() {
  const { state, dispatch } = useValutaCasaForm();
  const p = state.property;

  return (
    <div>
      <h2>Step 1 — Dettagli dell'immobile</h2>

      <div>
        <label>Via e numero</label>
        <input
          value={p.address}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PROPERTY",
              payload: { address: e.target.value },
            })
          }
        />
        {state.errors.address && <p>{state.errors.address}</p>}
      </div>

      <div>
        <label>Tipologia immobile</label>
        <select
          value={p.propertyType}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PROPERTY",
              payload: { propertyType: e.target.value },
            })
          }
        >
          <option value="">—</option>
          <option value="appartamento">Appartamento</option>
          <option value="casa">Casa indipendente</option>
          <option value="ufficio">Ufficio</option>
          <option value="altro">Altro</option>
        </select>
        {state.errors.propertyType && <p>{state.errors.propertyType}</p>}
      </div>

      <div>
        <label>Condizioni</label>
        <select
          value={p.condition}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PROPERTY",
              payload: { condition: e.target.value },
            })
          }
        >
          <option value="">—</option>
          <option value="nuovo">Nuovo</option>
          <option value="ottimo">Ottimo</option>
          <option value="buono">Buono</option>
          <option value="da_ristrutturare">Da ristrutturare</option>
        </select>
        {state.errors.condition && <p>{state.errors.condition}</p>}
      </div>

      <div>
        <label>Metri quadrati</label>
        <input
          type="number"
          value={p.surfaceM2}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PROPERTY",
              payload: { surfaceM2: e.target.value },
            })
          }
        />
        {state.errors.surfaceM2 && <p>{state.errors.surfaceM2}</p>}
      </div>
    </div>
  );
}
