import useValutaCasaForm from "../useValutaCasaForm";
import NavigationButtons from "../NavigationButtons";

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
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Step 2 — Caratteristiche</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Numero di camere
        </label>
        <input
          className="w-full px-3 py-2 border rounded"
          type="number"
          value={d.rooms}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DETAILS",
              payload: { rooms: e.target.value },
            })
          }
        />
        {state.errors.rooms && (
          <p className="text-sm text-red-600">{state.errors.rooms}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Numero di bagni
        </label>
        <input
          className="w-full px-3 py-2 border rounded"
          type="number"
          value={d.bathrooms}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DETAILS",
              payload: { bathrooms: e.target.value },
            })
          }
        />
        {state.errors.bathrooms && (
          <p className="text-sm text-red-600">{state.errors.bathrooms}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Piano</label>
        <input
          className="w-full px-3 py-2 border rounded"
          type="number"
          value={d.floor}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DETAILS",
              payload: { floor: e.target.value },
            })
          }
        />
        {state.errors.floor && (
          <p className="text-sm text-red-600">{state.errors.floor}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Dotazioni</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(d.features).map((feature) => (
            <label key={feature} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={d.features[feature]}
                onChange={() => toggleFeature(feature)}
                className="w-4 h-4"
              />
              <span className="capitalize">{feature.replace(/_/g, " ")}</span>
            </label>
          ))}
        </div>
      </div>
      <NavigationButtons />
    </div>
  );
}
