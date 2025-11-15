import useValutaCasaForm from "../useValutaCasaForm";

export default function ValutaCasaStep2() {
  const { state, dispatch } = useValutaCasaForm();
  const d = state.details;

  function toggleFeature(name) {
    dispatch({
      type: "UPDATE_FEATURES",
      payload: { [name]: !d.features[name] },
    });
  }

  return (
    <div>
      <h2>Step 2 — Caratteristiche</h2>

      <div>
        <label>Numero di camere</label>
        <input
          type="number"
          value={d.rooms}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DETAILS",
              payload: { rooms: e.target.value },
            })
          }
        />
        {state.errors.rooms && <p>{state.errors.rooms}</p>}
      </div>

      <div>
        <label>Numero di bagni</label>
        <input
          type="number"
          value={d.bathrooms}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DETAILS",
              payload: { bathrooms: e.target.value },
            })
          }
        />
        {state.errors.bathrooms && <p>{state.errors.bathrooms}</p>}
      </div>

      <div>
        <label>Piano</label>
        <input
          type="number"
          value={d.floor}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DETAILS",
              payload: { floor: e.target.value },
            })
          }
        />
        {state.errors.floor && <p>{state.errors.floor}</p>}
      </div>

      <div>
        <label>Dotazioni</label>

        {Object.keys(d.features).map((feature) => (
          <div key={feature}>
            <input
              type="checkbox"
              checked={d.features[feature]}
              onChange={() => toggleFeature(feature)}
            />
            <label>{feature}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
