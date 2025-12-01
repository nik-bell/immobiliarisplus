import { useMemo, useState, useEffect, useCallback } from "react";
import CasaContext from "../store/CasaContext";
import { getValuationsDashboard, getValuationDetail } from "../api/api";
import { useAuth } from "../store/AuthContext";
import { mapListItem, mapDetailItem, mapStatus, mapValuationStatusLabel, mapPropertyType, mapPropertyCondition } from "../utils/mappers";

export default function CasaContextProvider({ children }) {
  // dati iniziali (caricati dall'API)
  const [allCases, setAllCases] = useState([]);

  // stato filtro (tutti, non_assegnati, in_corso, attesa_cliente, terminati)
  const [filter, setFilter] = useState("tutti");

  // sorting: key è una stringa che può essere nested (es: "property.address")
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  // modale e selezione
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCasa, setSelectedCasa] = useState(null);

  // mappa utilità per etichette piu leggibili (opzionale)
  const statusLabels = {
    non_assegnati: "non assegnati",
    in_corso: "in corso",
    attesa_cliente: "in attesa cliente",
    terminati: "terminati",
  };

  // funzione helper per leggere chiavi nested (es: "property.sizeMq")
  const getByPath = (obj, path) => {
    if (!path) return undefined;
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  };

  // applica filtro ai dati
  const filtered = useMemo(() => {
    if (filter === "tutti") return allCases;
    return allCases.filter((c) => c.status === filter);
  }, [allCases, filter]);

  // --- fetch dashboard list on mount ---
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!isLoggedIn) return;
      const list = await getValuationsDashboard();
      if (!mounted) return;
      if (!Array.isArray(list)) return; // keep empty

      const mapped = list.map((it) => mapListItem(it));
      setAllCases(mapped);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [isLoggedIn]);

  // use mapping helpers from `utils/mappers` (imported above)

  // mapListItem and mapDetailItem moved to utils/mappers

  // applica sorting ai dati filtrati
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const copy = [...filtered];
    copy.sort((a, b) => {
      const va = getByPath(a, sortKey);
      const vb = getByPath(b, sortKey);

      // tratta numeri e stringhe in modo semplice
      if (va == null && vb == null) return 0;
      if (va == null) return sortDir === "asc" ? -1 : 1;
      if (vb == null) return sortDir === "asc" ? 1 : -1;

      // se sono numeri
      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }

      // confronto stringhe (case-insensitive)
      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return sortDir === "asc" ? -1 : 1;
      if (sa > sb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [filtered, sortKey, sortDir]);

  // apri la modale e seleziona casa: se disponibile, carica i dettagli dall'API
  const openCasaModal = useCallback(async (casa) => {
    if (!casa || !casa.id) {
      setSelectedCasa(casa);
      setModalOpen(true);
      return;
    }

    try {
      const detail = await getValuationDetail(casa.id);
      if (detail) {
        setSelectedCasa(mapDetailItem(detail));
      } else {
        setSelectedCasa(casa);
      }
    } catch (e) {
      setSelectedCasa(casa);
    }
    setModalOpen(true);
  }, []);

  // chiudi modale e deseleziona
  const closeCasaModal = () => {
    setSelectedCasa(null);
    setModalOpen(false);
  };

  // support open from global event (used by mobile cards)
  useEffect(() => {
    function onOpen(e) {
      const id = e?.detail?.casaId;
      if (id) openCasaModal({ id });
    }
    window.addEventListener("openCasaModal", onOpen);
    return () => window.removeEventListener("openCasaModal", onOpen);
  }, [openCasaModal]);

  // toggle sort: se clicchi stessa chiave inverte direzione
  const toggleSort = useCallback((key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }, [sortKey]);

  // esporta tutto nel context
  const value = {
    cases: sorted, // lista già filtrata e ordinata
    rawCases: allCases, // lista originale se serve
    setAllCases,
    refreshCases: async () => {
      if (!isLoggedIn) return;
      const list = await getValuationsDashboard();
      if (!Array.isArray(list)) return;
      setAllCases(list.map((it) => mapListItem(it)));
    },
    filter,
    setFilter,
    sortKey,
    sortDir,
    toggleSort,
    modalOpen,
    openCasaModal,
    closeCasaModal,
    selectedCasa,
    statusLabels,
  };

  return <CasaContext.Provider value={value}>{children}</CasaContext.Provider>;
}
