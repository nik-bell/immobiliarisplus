import { useMemo, useState } from "react";
import CasaContext from "../store/CasaContext";
import dummyCaseData from "../data/dummyCaseData";

export default function CasaContextProvider({ children }) {
  // dati iniziali (dummy)
  const [allCases, setAllCases] = useState(dummyCaseData);

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

  // funzione helper per leggere chiavi nested (es: "property.surfaceM2")
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

  // apri la modale e seleziona casa
  const openCasaModal = (casa) => {
    setSelectedCasa(casa);
    setModalOpen(true);
  };

  // chiudi modale e deseleziona
  const closeCasaModal = () => {
    setSelectedCasa(null);
    setModalOpen(false);
  };

  // toggle sort: se clicchi stessa chiave inverte direzione
  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  // esporta tutto nel context
  const value = {
    cases: sorted, // lista già filtrata e ordinata
    rawCases: allCases, // lista originale se serve
    setAllCases,
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
