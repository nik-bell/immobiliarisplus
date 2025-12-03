/**
 * @file employees.js
 * @description Employee API functions.
 * 
 * Provides operations for fetching and managing employee data.
 * 
 * @module api/employees
 */

import { request } from "./request";

/**
 * Fetches the list of all employees.
 * 
 * @async
 * @returns {Promise<Array|null>} Array of employee objects, or null on failure
 */
export async function getEmployees() {
  const res = await request("/employees");
  if (res.ok) return res.data;
  return null;
}
