/**
 * @file CasaContext.jsx
 * @description Casa (valuations) context and hook.
 *
 * Provides the `CasaContext` and `useCasa` hook used across the dashboard
 * to access valuations, filters, sorting, and modal state.
 *
 * @module store/CasaContext
 */

import { createContext, useContext } from "react";

const CasaContext = createContext(null);

/**
 * Accessor hook for the Casa (valuations) context.
 *
 * @throws {Error} If used outside of `CasaContextProvider`
 * @returns {{
 *  cases: Array,
 *  rawCases: Array,
 *  setAllCases: Function,
 *  refreshCases: Function,
 *  filter: string,
 *  setFilter: Function,
 *  sortKey: (string|null),
 *  sortDir: 'asc'|'desc',
 *  toggleSort: Function,
 *  modalOpen: boolean,
 *  openCasaModal: Function,
 *  closeCasaModal: Function,
 *  selectedCasa: (Object|null),
 *  statusLabels: Object
 * }} Casa context value
 */
export const useCasa = () => {
  const ctx = useContext(CasaContext);
  if (!ctx)
    throw new Error("useCasa deve essere usato dentro CasaContextProvider");
  return ctx;
};

export default CasaContext;
