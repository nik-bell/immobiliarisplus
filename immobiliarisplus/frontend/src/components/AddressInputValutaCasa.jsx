import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import capData from '../data/allowedCaps'

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoicGFnbGllIiwiYSI6ImNtaW9sd25xMjAyZTczZnM5a3k4bjFxYTgifQ.TDL9kEFOXdbQDr91_YB2UA";
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

function AddressInputValutaCasa({ address, onChange, error }) {
    const ALLOWED_CAPS = useMemo(() => {
        return new Set(capData.map(item => item.cap));
    }, []);
    const [inputValue, setInputValue] = useState(address || "");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [awaitingSuggestion, setAwaitingSuggestion] = useState(false);

    const extractCapFromContext = (suggestion) => {
        if (!suggestion.context || !Array.isArray(suggestion.context)) {
            return null;
        }

        const postcodeContext = suggestion.context.find(
            (context) => context.id && context.id.startsWith('postcode')
        );
        return postcodeContext ? postcodeContext.text : null;
    };

    const fetchSuggestions = async (text) => {
        if (text.length < 3) {
            setSuggestions([]);
            setAwaitingSuggestion(false);
            return;
        }

        setIsLoading(true);
        setAwaitingSuggestion(true);
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    text
                )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&language=it&country=it`
            );
            const data = await response.json();

            let receivedSuggestions = data.features || [];
            const filteredSuggestions = receivedSuggestions.filter(suggestion => {
                const cap = extractCapFromContext(suggestion);
                if (cap && ALLOWED_CAPS.has(cap)) {
                    return true;
                }

                return false;
            });

            setSuggestions(filteredSuggestions);
            if (filteredSuggestions.length > 0) {
                setAwaitingSuggestion(false);
            }
        } catch (error) {
            console.error("Errore nel recupero dei suggerimenti Mapbox:", error);
            setAwaitingSuggestion(false);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedFetch = useCallback(debounce(fetchSuggestions, 500), []);

    const handleInputChange = (e) => {
        const newText = e.target.value;
        setInputValue(newText);
        onChange({
            address: newText
        });
        if (newText.length < 3) {
            setAwaitingSuggestion(false);
        }
        debouncedFetch(newText);
    };

    const handleSelectSuggestion = (suggestion) => {
        const cap = extractCapFromContext(suggestion);
        let city = null;
        if (suggestion.context && Array.isArray(suggestion.context)) {
            const cityContext = suggestion.context.find(
                (context) => context.place_type && context.place_type.includes('place')
            );
            city = cityContext ? cityContext.text : null;
        }
        const civico = suggestion.address ? `, ${suggestion.address}` : '';
        const cleanAddress = `${suggestion.text}${civico}`;
        setInputValue(cleanAddress);
        onChange({
            address: cleanAddress,
            zipCode: cap,
            city: city,
            coordinates: suggestion.geometry ? suggestion.geometry.coordinates : null,
        });
        setSuggestions([]);
    };

    useEffect(() => {
        setInputValue(address || "");
    }, [address]);

    const containerRef = useRef(null);

    useEffect(() => {
        const handleOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setAwaitingSuggestion(false);
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleOutside);
        document.addEventListener('touchstart', handleOutside);
        document.addEventListener('focusin', handleOutside);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
            document.removeEventListener('touchstart', handleOutside);
            document.removeEventListener('focusin', handleOutside);
        };
    }, []);

    return (
        <div className="mb-4 relative" ref={containerRef}>
            <label className="block text-sm font-medium mb-1">Indirizzo *</label>
            <input
                className="w-full px-3 py-2 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Inizia a digitare..."
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            className="px-3 py-2 cursor-pointer hover:bg-teal-100"
                            onClick={() => handleSelectSuggestion(suggestion)}
                        >
                            {suggestion.place_name}
                        </li>
                    ))}
                </ul>
            )}
            {(awaitingSuggestion && inputValue.length >= 3) && (
                <div className="text-xs text-gray-500 mt-1">

                    <div className="flex items-start justify-start">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-teal-700 mr-2"></div>
                        Cercando l'indirizzo... Prova a inserire anche la città
                    </div>
                    <div className="mt-2 p-3 bg-blue-50 border border-indigo-900 rounded text-sm text-black">
                        <strong>Nota:</strong> I suggerimenti degli indirizzi appariranno solo per Torino, Alessandria, Cuneo e Asti.
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddressInputValutaCasa;