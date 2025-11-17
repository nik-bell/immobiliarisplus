import useValutaCasaForm from "../useValutaCasaForm";

export default function ValutaCasaStep1() {
  const { state, dispatch } = useValutaCasaForm();
  const p = state.property;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">
        Step 1 — Dettagli dell'immobile
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Via e numero</label>
        <input
          className="w-full px-3 py-2 border rounded"
          value={p.address}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PROPERTY",
              payload: { address: e.target.value },
            })
          }
        />
        {state.errors.address && (
          <p className="text-sm text-red-600">{state.errors.address}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Tipologia immobile
        </label>
        <select
          className="w-full px-3 py-2 border rounded"
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
        {state.errors.propertyType && (
          <p className="text-sm text-red-600">{state.errors.propertyType}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Condizioni</label>
        <select
          className="w-full px-3 py-2 border rounded"
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
        {state.errors.condition && (
          <p className="text-sm text-red-600">{state.errors.condition}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Metri quadrati</label>
        <input
          className="w-full px-3 py-2 border rounded"
          type="number"
          value={p.surfaceM2}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PROPERTY",
              payload: { surfaceM2: e.target.value },
            })
          }
        />
        {state.errors.surfaceM2 && (
          <p className="text-sm text-red-600">{state.errors.surfaceM2}</p>
        )}
      </div>
    </div>
  );
}
