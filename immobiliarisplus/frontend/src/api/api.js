/**
 * @file api.js
 * @description API aggregator module.
 * 
 * Central export point for all API-related functions. This module explicitly
 * re-exports selected functions from individual API modules to avoid duplicate
 * or conflicting star exports.
 * 
 * @module api
 */

export { login } from "./auth";

export { getValuationsDashboard, getValuationDetail, createValuation, assignEmployeeToDashboard, updateValuationDashboard, deleteValuation } from "./valuations";

export { getEmployees } from "./employees";

export { request, setAuthToken, clearAuthToken, getPersistedAuthToken, API_BASE_URL } from "./request";
export { performLogin } from "./authService";
