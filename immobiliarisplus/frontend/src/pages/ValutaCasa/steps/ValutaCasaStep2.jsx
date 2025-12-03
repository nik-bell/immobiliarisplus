/**
 * @file ValutaCasaStep2.jsx
 * @description Step 2: Detailed property characteristics and features toggles.
 */
import useValutaCasaForm from "../useValutaCasaForm";
import NavigationButtons from "../NavigationButtons";
import ScrollToTop from "../../../components/ScrollToTop";

/**
 * Step 2 of the "Valuta Casa" form.
 * Handles house details such as rooms, bathrooms, floor, and available features.
 *
 * Uses centralized state from `useValutaCasaForm`.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function ValutaCasaStep2() {
  const { state, dispatch } = useValutaCasaForm();
  const d = state.details;

  /**
   * Toggles a feature inside the `details.features` object.
   *
   * @param {string} name - Feature key to toggle.
   */
  function toggleFeature(name) {
    /**
     * Toggles a boolean feature flag inside the form state.
     * @param {string} name - Feature key to toggle.
     * @returns {void}
     */
    dispatch({
      type: "UPDATE_FEATURES",
      payload: { [name]: !d.features[name] },
    });
  }

  return (
    <div className="max-w-3xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-lg">
      <ScrollToTop />

      <h2 className="text-3xl font-semibold pb-2">Dettagli dell'immobile</h2>
      <p className="pb-4">Più dettagli fornisci, più accurata sarà la valutazione</p>

      {/* Number of rooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Numero di camere *</label>
        <input
          className="w-full px-3 py-2 border rounded border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          type="number"
          min={0}
          value={d.rooms}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DETAILS",
              payload: { rooms: e.target.value },
            })
          }
          placeholder="Es. 4"
        />
        {state.errors.rooms && (
          <p className="text-sm text-red-600">{state.errors.rooms}</p>
        )}
      </div>

      {/* Number of bathrooms */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Numero di bagni *</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          type="number"
          min={0}
          value={d.bathrooms}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DETAILS",
              payload: { bathrooms: e.target.value },
            })
          }
          placeholder="Es. 2"
        />
        {state.errors.bathrooms && (
          <p className="text-sm text-red-600">{state.errors.bathrooms}</p>
        )}
      </div>

      {/* Floor */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Piano *</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          type="number"
          min={0}
          value={d.floor}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DETAILS",
              payload: { floor: e.target.value },
            })
          }
          placeholder="Es: 0"
        />
        {state.errors.floor && (
          <p className="text-sm text-red-600">{state.errors.floor}</p>
        )}
      </div>

      {/* Features list */}
      <div>
        <label className="block text-sm font-medium mb-2">Dotazioni</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(d.features).map((feature) => (
            <label key={feature} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={d.features[feature]}
                onChange={() => toggleFeature(feature)}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="capitalize">
                {feature.replace(/_/g, " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <NavigationButtons />
    </div>
  );
}
