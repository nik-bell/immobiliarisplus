/**
 * @file ValutaCasaStep1.jsx
 * @description Step 1: Essential property information and address capture with CAP autocomplete and map preview.
 */
import useValutaCasaForm from "../useValutaCasaForm";
import NavigationButtons from "../NavigationButtons";
import ScrollToTop from "../../../components/ScrollToTop";
import { useState, useRef, useEffect } from "react";
import allowedCaps from "../../../data/allowedCaps";
import AddressInputValutaCasa from "../../../components/AddressInputValutaCasa";
import MapboxMap from "../../../components/MapboxMap";

/**
 * Autocomplete input for Italian ZIP codes (CAP).
 *
 * @component
 * @param {Object} props
 * @param {string} props.value - Current CAP value from parent state.
 * @param {(cap: string, city: string|null) => void} props.onChange - Callback to notify parent of CAP or city updates.
 * @returns {JSX.Element}
 */
function CapAutocomplete({ value, onChange }) {
  /**
   * Lightweight autocomplete for selecting a CAP with city hint.
   * @param {{value?: string|number, onChange?: (cap: string, city: string|null) => void}} props
   * @returns {JSX.Element}
   */
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  /** Sync the local input with the parent state when it updates. */
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  /** Filter the CAP list based on the user query. */
  const filtered = allowedCaps
    .filter((e) => {
      if (!query) return true;
      const q = String(query).toLowerCase();
      return e.cap.startsWith(q) || e.city.toLowerCase().includes(q);
    })
    .slice(0, 8);

  /**
   * Handle selection of a CAP from the dropdown.
   * @param {{cap: string, city: string}} entry
   */
  const handleSelect = (entry) => {
    setQuery(entry.cap);
    setOpen(false);
    if (onChange) onChange(entry.cap, entry.city);
  };

  return (
    <div className="relative" ref={ref}>
      <input
        className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
        value={query}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          setOpen(true);

          if (onChange) {
            const match = allowedCaps.find((c) => c.cap === String(val).trim());
            onChange(match ? match.cap : val, match ? match.city : null);
          }
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        placeholder="Es: 10100"
      />

      {open && filtered.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 bg-white border border-gray-200 rounded mt-1 max-h-48 overflow-auto shadow-sm">
          {filtered.map((entry) => (
            <li
              key={entry.cap}
              className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(entry)}
            >
              <span className="font-medium">{entry.cap}</span>
              <span className="text-sm text-gray-500">{entry.city}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Step 1 of the "Valuta Casa" multi-step form.
 * Handles address, CAP, city, property type, condition, and size.
 *
 * Integrates:
 * - Address autocomplete
 * - CAP autocomplete
 * - Map display via Mapbox
 * - Centralized form state (useValutaCasaForm)
 *
 * @component
 * @returns {JSX.Element}
 */
export default function ValutaCasaStep1() {
  /**
   * Renders the first step collecting address, CAP, type, condition, size.
   * Also shows a Mapbox preview when coordinates are available.
   * @returns {JSX.Element}
   */
  const { state, dispatch } = useValutaCasaForm();
  const p = state.property;
  const [mapCoordinates, setMapCoordinates] = useState(null);

  /**
   * Handles address updates and syncs ZIP code, city, and coordinates.
   *
   * @param {Object} newAddressData
   * @param {string} newAddressData.address
   * @param {string} [newAddressData.zipCode]
   * @param {string} [newAddressData.city]
   * @param {number[]} [newAddressData.coordinates] - [lng, lat]
   */
  const handleAddressChange = (newAddressData) => {
    const payload = {
      address: newAddressData.address,
    };
    if (newAddressData.zipCode) {
      payload.zipCode = newAddressData.zipCode;
    }
    if (newAddressData.city) {
      payload.city = newAddressData.city;
    } else if (newAddressData.zipCode) {
      const match = allowedCaps.find(
        (c) => c.cap === String(newAddressData.zipCode).trim()
      );
      if (match) payload.city = match.city;
    }

    // If coordinates provided, update map
    if (newAddressData.coordinates?.length) {
      setMapCoordinates(newAddressData.coordinates);
    }

    dispatch({ type: "UPDATE_PROPERTY", payload });
  };

  return (
    <div className="max-w-3xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-lg">
      <ScrollToTop />
      <h2 className="text-3xl font-semibold pb-2">Dati essenziali della casa</h2>
      <p className="pb-4">
        Iniziamo con le informazioni di base per una valutazione accurata
      </p>

      {/* Address autocomplete */}
      <div className="mb-4">
        <AddressInputValutaCasa
          address={p.address}
          onChange={handleAddressChange}
          error={state.errors.address}
        />
      </div>

      {/* CAP + City */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CAP *</label>
          <CapAutocomplete
            value={p.zipCode}
            onChange={(val, city) =>
              dispatch({
                type: "UPDATE_PROPERTY",
                payload: { zipCode: val, city: city || p.city },
              })
            }
          />
          {state.errors.zipCode && (
            <p className="text-sm text-red-600">{state.errors.zipCode}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Città</label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
            value={p.city}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PROPERTY",
                payload: { city: e.target.value },
              })
            }
            placeholder="Torino"
          />
          {state.errors.city && (
            <p className="text-sm text-red-600">{state.errors.city}</p>
          )}
        </div>
      </div>

      {/* Map preview */}
      {mapCoordinates && (
        <MapboxMap address={p.address} coordinates={mapCoordinates} />
      )}

      {/* Property type */}
      <div className="mb-4">
        <label
          htmlFor="property-type"
          className="block text-sm font-medium mb-1"
        >
          Tipologia immobile *
        </label>
        <select
          id="property-type"
          className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          value={p.propertyType}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PROPERTY",
              payload: { propertyType: e.target.value },
            })
          }
        >
          <option value="" disabled hidden>
            Seleziona tipologia
          </option>
          <option value="appartamento">Appartamento</option>
          <option value="casa">Casa indipendente</option>
          <option value="ufficio">Ufficio</option>
          <option value="altro">Altro</option>
        </select>
        {state.errors.propertyType && (
          <p className="text-sm text-red-600">{state.errors.propertyType}</p>
        )}
      </div>

      {/* Condition */}
      <div className="mb-4">
        <label
          htmlFor="property-condition"
          className="block text-sm font-medium mb-1"
        >
          Condizioni *
        </label>
        <select
          id="property-condition"
          className="w-full px-3 py-2 border rounded border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          value={p.condition}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PROPERTY",
              payload: { condition: e.target.value },
            })
          }
        >
          <option value="" disabled hidden>
            Seleziona le condizioni
          </option>
          <option value="nuovo">Nuovo</option>
          <option value="ottimo">Ottimo</option>
          <option value="buono">Buono</option>
          <option value="da_ristrutturare">Da ristrutturare</option>
        </select>
        {state.errors.condition && (
          <p className="text-sm text-red-600">{state.errors.condition}</p>
        )}
      </div>

      {/* Size */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Superficie (m²) *
        </label>
        <input
          className="w-full px-3 py-2 border rounded border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          type="number"
          min={0}
          value={p.sizeMq}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PROPERTY",
              payload: { sizeMq: e.target.value },
            })
          }
          placeholder="Es. 85"
        />
        {state.errors.sizeMq && (
          <p className="text-sm text-red-600">{state.errors.sizeMq}</p>
        )}
      </div>
      

      <NavigationButtons />
    </div>
  );
}
