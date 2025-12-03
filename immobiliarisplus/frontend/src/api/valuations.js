/**
 * @file valuations.js
 * @description Valuation API functions.
 * 
 * Provides operations for managing property valuations including listing,
 * creating, updating, assigning agents, and deleting valuations.
 * 
 * @module api/valuations
 */

import { request } from "./request";

/**
 * Fetches all valuations for the dashboard view.
 * 
 * @async
 * @returns {Promise<Array|null>} Array of valuation objects, or null on failure
 */
export async function getValuationsDashboard() {
  const res = await request("/valuations/dashboard");
  if (res.ok) return res.data;
  return null;
}

/**
 * Fetches detailed information for a specific valuation.
 * 
 * @async
 * @param {string|number} id - Valuation ID
 * @returns {Promise<Object|null>} Valuation detail object, or null on failure
 */
export async function getValuationDetail(id) {
  const res = await request(`/valuations/dashboard/${id}`);
  if (res.ok) return res.data;
  return null;
}

/**
 * Creates a new property valuation.
 * 
 * @async
 * @param {Object} valuationData - Valuation form data
 * @param {Object} valuationData.property - Property details (address, type, condition, size)
 * @param {Object} valuationData.contact - Contact information (name, email, phone)
 * @param {Object} [valuationData.details] - Additional property details (rooms, bathrooms, floor)
 * @returns {Promise<Object|null>} Created valuation object with calculated range, or null on failure
 */
export async function createValuation(valuationData) {
  const res = await request(`/valuations/calculate`, { method: "POST", body: valuationData });
  if (res.ok) return res.data;
  return null;
}

/**
 * Assigns an employee (agent) to a valuation.
 * 
 * @async
 * @param {string|number} valuationId - Valuation ID
 * @param {string|number} employeeId - Employee ID to assign
 * @returns {Promise<Object|null>} Updated valuation object, or null on failure
 */
export async function assignEmployeeToDashboard(valuationId, employeeId) {
  const res = await request(`/valuations/dashboard/${valuationId}/assign/${employeeId}`, { method: "PUT", expectJson: false });
  if (res.ok) return res.data;
  return null;
}

/**
 * Updates a valuation with partial data (PATCH).
 * 
 * @async
 * @param {string|number} id - Valuation ID
 * @param {Object} patchBody - Partial update data
 * @param {string} [patchBody.status] - Valuation status enum (NEW, IN_PROGRESS, etc.)
 * @param {number} [patchBody.valuationFinal] - Final valuation amount
 * @param {Object} [patchBody.property] - Property fields to update
 * @param {Object} [patchBody.contact] - Contact fields to update
 * @param {string} [patchBody.notes] - Additional notes
 * @returns {Promise<Object|null>} Updated valuation object, or null on failure
 */
export async function updateValuationDashboard(id, patchBody) {
  if (!id) {
    return null;
  }
  const res = await request(`/valuations/dashboard/${id}`, { method: "PATCH", body: patchBody });
  if (res.ok) return res.data;
  return null;
}

/**
 * Deletes a valuation by ID.
 * 
 * @async
 * @param {string|number} id - Valuation ID
 * @returns {Promise<boolean>} True if deletion succeeded, false otherwise
 */
export async function deleteValuation(id) {
  if (!id) {
    return null;
  }
  const res = await request(`/valuations/${id}`, { method: "DELETE", expectJson: false });
  return res.ok;
}
