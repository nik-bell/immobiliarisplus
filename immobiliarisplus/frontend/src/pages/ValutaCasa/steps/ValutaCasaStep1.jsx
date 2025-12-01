import useValutaCasaForm from "../useValutaCasaForm";
import NavigationButtons from "../NavigationButtons";
import ScrollToTop from "../../../components/ScrollToTop";
import { useState, useRef } from "react";
import allowedCaps from "../../../data/allowedCaps";

function CapAutocomplete({ value, onChange }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = allowedCaps.filter((e) => {
    if (!query) return true;
    const q = String(query).toLowerCase();
    return e.cap.startsWith(q) || e.city.toLowerCase().includes(q);
  }).slice(0, 8);

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
          setQuery(e.target.value);
          setOpen(true);
          if (onChange) onChange(e.target.value, null);
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

export default function ValutaCasaStep1() {
  const { state, dispatch } = useValutaCasaForm();
  const p = state.property;

  return (
    <div className="max-w-3xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-lg">
      <ScrollToTop />
      <h2 className="text-3xl font-semibold pb-2">Dati essenziali della casa</h2>
      <p className="pb-4">Iniziamo con le informazioni di base per una valutazione accurata</p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Indirizzo *</label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
          value={p.address}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_PROPERTY",
              payload: { address: e.target.value },
            })
          }
          placeholder="Inizia a digitare..."
        />
        {state.errors.address && <p className="text-sm text-red-600">{state.errors.address}</p>}
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">CAP *</label>
          <CapAutocomplete
            value={p.zipCode}
            onChange={(val, city) => {
              dispatch({ type: "UPDATE_PROPERTY", payload: { zipCode: val, city: city || p.city } });
            }}
          />
          {state.errors.zipCode && <p className="text-sm text-red-600">{state.errors.zipCode}</p>}
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
          {state.errors.city && <p className="text-sm text-red-600">{state.errors.city}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tipologia immobile *</label>
        <select
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
            Selezioniona tipologia
          </option>
          <option value="appartamento">Appartamento</option>
          <option value="casa">Casa indipendente</option>
          <option value="ufficio">Ufficio</option>
          <option value="altro">Altro</option>
        </select>
        {state.errors.propertyType && <p className="text-sm text-red-600">{state.errors.propertyType}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Condizioni *</label>
        <select
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
            Selezioniona le condizioni
          </option>
          <option value="nuovo">Nuovo</option>
          <option value="ottimo">Ottimo</option>
          <option value="buono">Buono</option>
          <option value="da_ristrutturare">Da ristrutturare</option>
        </select>
        {state.errors.condition && <p className="text-sm text-red-600">{state.errors.condition}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Superficie (m²) *</label>
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
        {state.errors.sizeMq && <p className="text-sm text-red-600">{state.errors.sizeMq}</p>}
      </div>

      <NavigationButtons />
    </div>
  );
}
