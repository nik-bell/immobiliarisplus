import { useMemo, useState, useEffect, useCallback } from "react";
import CasaContext from "../store/CasaContext";
import { getValuationsDashboard, getValuationDetail } from "../api/api";
import { useAuth } from "../store/AuthContext";
import {
  mapListItem,
  mapDetailItem,
  mapStatus,
  mapValuationStatusLabel,
  mapPropertyType,
  mapPropertyCondition
} from "../utils/mappers";

/**
 * CasaContextProvider
 *
 * Provides global state for the “Area Agenti” section:
 * - Stores and manages property valuations (cases)
 * - Supports filtering, sorting, modal details, and API reload
 * - Exposes helper methods for UI components (CasaTable, StatsRow, detail modals)
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components wrapped by this context provider.
 * @returns {JSX.Element} Context provider for CasaContext.
 */
export default function CasaContextProvider({ children }) {
  /** @type {[Array, Function]} Initial data loaded from API */
  const [allCases, setAllCases] = useState([]);

  /** @type {[string, Function]} Filter state (tutti, non_assegnati, in_corso, attesa_cliente, terminati) */
  const [filter, setFilter] = useState("tutti");

  /** @type {[string|null, Function]} Sorting key (can be nested path, e.g., "property.address") */
  const [sortKey, setSortKey] = useState(null);

  /** @type {[("asc"|"desc"), Function]} Sorting direction */
  const [sortDir, setSortDir] = useState("asc");

  /** Modal and selected casa */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCasa, setSelectedCasa] = useState(null);

  /** Human-readable statuses */
  const statusLabels = {
    non_assegnati: "non assegnati",
    nuovi: "nuovi",
    in_corso: "in corso",
    attesa_cliente: "in attesa cliente",
    terminati: "terminati",
  };

  /**
   * Reads nested properties from an object.
   *
   * @param {Object} obj - Target object
   * @param {string} path - Dot-notation path (e.g. "property.sizeMq")
   * @returns {*} Retrieved value or undefined
   */
  const getByPath = (obj, path) => {
    if (!path) return undefined;
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  };

  /**
   * Filter cases based on the selected status filter.
   *
   * @returns {Array} Filtered array of cases
   */
  const filtered = useMemo(() => {
    if (filter === "tutti") return allCases;
    return allCases.filter((c) => c.status === filter);
  }, [allCases, filter]);

  const { isLoggedIn } = useAuth();

  /**
   * Fetch dashboard list when user is logged in.
   */
  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!isLoggedIn) return;
      const list = await getValuationsDashboard();
      if (!mounted || !Array.isArray(list)) return;
      setAllCases(list.map(mapListItem));
    }
    load();
    return () => { mounted = false; };
  }, [isLoggedIn]);

  /**
   * Applies sorting to the filtered dataset.
   *
   * @returns {Array} Sorted list of cases.
   */
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const copy = [...filtered];

    copy.sort((a, b) => {
      const va = getByPath(a, sortKey);
      const vb = getByPath(b, sortKey);

      if (va == null && vb == null) return 0;
      if (va == null) return sortDir === "asc" ? -1 : 1;
      if (vb == null) return sortDir === "asc" ? 1 : -1;

      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }

      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return sortDir === "asc" ? -1 : 1;
      if (sa > sb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return copy;
  }, [filtered, sortKey, sortDir]);

  /**
   * Opens modal and loads detailed valuation info.
   *
   * @param {Object} casa - The selected case summary
   */
  const openCasaModal = useCallback(async (casa) => {
    if (!casa?.id) {
      setSelectedCasa(casa);
      setModalOpen(true);
      return;
    }

    try {
      const detail = await getValuationDetail(casa.id);
      setSelectedCasa(detail ? mapDetailItem(detail) : casa);
    } catch {
      setSelectedCasa(casa);
    }
    setModalOpen(true);
  }, []);

  /** Close modal and reset selection */
  const closeCasaModal = () => {
    setSelectedCasa(null);
    setModalOpen(false);
  };

  /**
   * Global listener for opening modals externally (used by mobile card clicks).
   */
  useEffect(() => {
    function onOpen(e) {
      const id = e?.detail?.casaId;
      if (id) openCasaModal({ id });
    }
    window.addEventListener("openCasaModal", onOpen);
    return () => window.removeEventListener("openCasaModal", onOpen);
  }, [openCasaModal]);

  /**
   * Toggles sorting on a given key. Same key reverses direction.
   *
   * @param {string} key - Dot-path to sort by
   */
  const toggleSort = useCallback((key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }, [sortKey]);

  /** Values exposed to all consumers of CasaContext */
  const value = {
    cases: sorted,
    rawCases: allCases,
    setAllCases,
    /**
     * Reloads dashboard cases from API.
     */
    refreshCases: async () => {
      if (!isLoggedIn) return;
      const list = await getValuationsDashboard();
      if (!Array.isArray(list)) return;
      setAllCases(list.map(mapListItem));
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
