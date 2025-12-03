/**
 * @file mappers.js
 * @description Data mapping utilities for backend-frontend transformation.
 * 
 * Provides bidirectional mapping functions to convert between backend enums/DTOs
 * and frontend-friendly display values. Handles property types, conditions,
 * valuation statuses, and complete DTO transformations.
 * 
 * @module utils/mappers
 */

// ============================================================================
// PROPERTY TYPE MAPPING
// ============================================================================

/**
 * Converts backend property type enum to Italian display label.
 * 
 * @param {string} t - Backend property type enum (APARTMENT, HOUSE, OFFICE, OTHER)
 * @returns {string} Italian label for display, or original value if unknown
 */
export const mapPropertyType = (t) => {
  if (!t) return "";
  switch (String(t).toUpperCase()) {
    case "APARTMENT":
      return "Appartamento";
    case "HOUSE":
      return "Casa";
    case "OFFICE":
      return "Ufficio";
    case "OTHER":
      return "Altro";
    default:
      return t;
  }
};

/**
 * Converts Italian property type label to backend enum.
 * 
 * @param {string} pt - Italian property type label (appartamento, casa, ufficio, altro)
 * @returns {string|null} Backend enum value (APARTMENT, HOUSE, OFFICE, OTHER), or null if empty
 */
export const mapPropertyTypeToEnum = (pt) => {
  if (!pt) return null;
  const valueMap = {
    "appartamento": "APARTMENT",
    "casa": "HOUSE",
    "ufficio": "OFFICE",
    "altro": "OTHER",
  };
  return valueMap[String(pt).toLowerCase()] || "OTHER";
};

// ============================================================================
// PROPERTY CONDITION MAPPING
// ============================================================================

/**
 * Converts backend property condition enum to Italian display label.
 * 
 * @param {string} c - Backend condition enum (NEW, RECENTLY_RENOVATED, GOOD_CONDITION, TO_RENOVATE)
 * @returns {string} Italian label for display, or original value if unknown
 */
export const mapPropertyCondition = (c) => {
  if (!c) return "";
  switch (String(c).toUpperCase()) {
    case "NEW":
      return "Nuovo";
    case "RECENTLY_RENOVATED":
      return "Ristrutturato di recente";
    case "GOOD_CONDITION":
      return "Buono stato";
    case "TO_RENOVATE":
      return "Da ristrutturare";
    default:
      return c;
  }
};

/**
 * Converts Italian property condition label to backend enum.
 * 
 * @param {string} c - Italian condition label (nuovo, ottimo, buono, da ristrutturare)
 * @returns {string|null} Backend enum value, defaults to GOOD_CONDITION if unknown, or null if empty
 */
export const mapPropertyConditionToEnum = (c) => {
  if (!c) return null;
  const valueMap = {
    "nuovo": "NEW",
    "ottimo": "RECENTLY_RENOVATED",
    "buono": "GOOD_CONDITION",
    "da ristrutturare": "TO_RENOVATE",
  };
  return valueMap[String(c).toLowerCase()] || "GOOD_CONDITION";
};

// ============================================================================
// STATUS MAPPING (Centralized & Bidirectional)
// ============================================================================

/**
 * Converts backend status enum to frontend UI filter key.
 * 
 * Used for filtering and grouping valuations in the dashboard. Maps backend
 * granular statuses to frontend filter categories (e.g., CONFIRMED and REJECTED
 * both map to 'terminati').
 * 
 * @param {string} s - Backend status enum (NEW, NOT_ASSIGNED, IN_PROGRESS, AWAITING_CLIENT_RESPONSE, CONFIRMED, REJECTED)
 * @returns {string} Frontend filter key (nuovi, non_assegnati, in_corso, attesa_cliente, terminati)
 */
export const mapStatus = (s) => {
  if (!s) return "in_corso";
  switch (String(s).toUpperCase()) {
    case "NEW":
      return "nuovi";
    case "NOT_ASSIGNED":
      return "non_assegnati";
    case "IN_PROGRESS":
      return "in_corso";
    case "AWAITING_CLIENT_RESPONSE":
      return "attesa_cliente";
    case "CONFIRMED":
    case "REJECTED":
      return "terminati";
    default:
      return "in_corso";
  }
};

/**
 * Converts backend status enum to Italian human-readable label.
 * 
 * Used for displaying status in UI components like badges and dropdowns.
 * 
 * @param {string} s - Backend status enum (NEW, NOT_ASSIGNED, IN_PROGRESS, AWAITING_CLIENT_RESPONSE, CONFIRMED, REJECTED)
 * @returns {string} Italian label for display (Nuovo, Non assegnato, In corso, etc.)
 */
export const mapValuationStatusLabel = (s) => {
  if (!s) return "";
  switch (String(s).toUpperCase()) {
    case "NEW":
      return "Nuovo";
    case "NOT_ASSIGNED":
      return "Non assegnato";
    case "CONFIRMED":
      return "Confermato";
    case "REJECTED":
      return "Rifiutato";
    case "IN_PROGRESS":
      return "In corso";
    case "AWAITING_CLIENT_RESPONSE":
      return "In attesa cliente";
    default:
      return s;
  }
};

/**
 * Converts frontend UI filter key to backend status enum.
 * 
 * Used when sending status updates to the API. Note: 'terminati' defaults to
 * CONFIRMED since it's a grouped category that includes both CONFIRMED and REJECTED.
 * 
 * @param {string} uiKey - Frontend filter key (nuovi, non_assegnati, in_corso, attesa_cliente, terminati)
 * @returns {string|null} Backend enum value, or null if unknown
 */
export const mapUIStatusToEnum = (uiKey) => {
  if (!uiKey) return null;
  switch (uiKey) {
    case "nuovi":
      return "NEW";
    case "non_assegnati":
      return "NOT_ASSIGNED";
    case "in_corso":
      return "IN_PROGRESS";
    case "attesa_cliente":
      return "AWAITING_CLIENT_RESPONSE";
    case "terminati":
      return "CONFIRMED"; // default to CONFIRMED when mapping back from grouped 'terminati'
    default:
      return null;
  }
};

/**
 * Complete list of backend status enums in preferred display order.
 * 
 * Used for rendering status dropdowns and filters. Order matters for UI consistency.
 * 
 * @constant {string[]}
 */
export const ALL_STATUS_ENUMS = [
  "NEW",
  "NOT_ASSIGNED",
  "IN_PROGRESS",
  "AWAITING_CLIENT_RESPONSE",
  "CONFIRMED",
  "REJECTED",
];

// ============================================================================
// DTO MAPPING
// ============================================================================

/**
 * Maps backend valuation DTO to frontend list item shape.
 * 
 * Transforms API response data into a consistent frontend format with enriched
 * labels and fallback values. Used for dashboard list/table views.
 * 
 * @param {Object} it - Backend valuation DTO from API
 * @param {number|string} it.id - Valuation ID
 * @param {Object} it.property - Property details
 * @param {Object} it.contact - Contact information
 * @param {Object} [it.details] - Additional property details
 * @param {Object} [it.assignedAgent] - Assigned employee/agent
 * @param {string} it.status - Backend status enum
 * @param {string} [it.valuationRange] - Calculated valuation range
 * @param {number} [it.valuationFinal] - Final valuation amount
 * @param {Array} [it.documents] - Attached documents
 * @param {string} [it.notes] - Additional notes
 * @returns {Object} Frontend list item with mapped statuses and labels
 */
export const mapListItem = (it) => ({
  id: String(it.id),
  property: {
    address: it.property?.address ?? "",
    sizeMq: it.property?.sizeMq ?? null,
    propertyType: it.property?.propertyType ?? null,
    propertyTypeLabel: mapPropertyType(it.property?.propertyType),
    condition: it.property?.condition ?? null,
    conditionLabel: mapPropertyCondition(it.property?.condition),
  },
  details: {
    rooms: it.details?.rooms ?? null,
    bathrooms: it.details?.bathrooms ?? null,
    floor: it.details?.floor ?? null,
    features: it.details?.features ?? {},
  },
  contact: it.contact ?? {},
  assignedAgent: it.assignedAgent ?? null,
  valuationRange: it.valuationRange ?? null,
  valuationFinal: it.valuationFinal ?? null,
  status: mapStatus(it.status),
  statusLabel: mapValuationStatusLabel(it.status),
  documents: it.documents ?? [],
  notes: it.notes ?? null,
});

/**
 * Maps backend valuation DTO to frontend detail item shape.
 * 
 * Similar to mapListItem but optimized for detail/modal views. Includes all
 * available fields with proper fallbacks and label enrichment.
 * 
 * @param {Object} it - Backend valuation DTO from API
 * @param {number|string} it.id - Valuation ID
 * @param {Object} it.property - Property details
 * @param {Object} it.contact - Contact information
 * @param {Object} [it.details] - Additional property details
 * @param {Object} [it.assignedAgent] - Assigned employee/agent
 * @param {string} it.status - Backend status enum
 * @param {string} [it.valuationRange] - Calculated valuation range
 * @param {number} [it.valuationFinal] - Final valuation amount
 * @param {Array} [it.documents] - Attached documents
 * @param {string} [it.notes] - Additional notes
 * @returns {Object} Frontend detail item with mapped statuses and labels
 */
export const mapDetailItem = (it) => ({
  id: String(it.id),
  assignedAgent: it.assignedAgent ?? null,
  notes: it.notes ?? null,
  documents: it.documents ?? [],
  contact: it.contact ?? {},
  property: {
    address: it.property?.address ?? "",
    sizeMq: it.property?.sizeMq ?? null,
    propertyType: it.property?.propertyType ?? null,
    propertyTypeLabel: mapPropertyType(it.property?.propertyType),
    condition: it.property?.condition ?? null,
    conditionLabel: mapPropertyCondition(it.property?.condition),
  },
  details: {
    rooms: it.details?.rooms ?? null,
    bathrooms: it.details?.bathrooms ?? null,
    floor: it.details?.floor ?? null,
    features: it.details?.features ?? {},
  },
  valuationFinal: it.valuationFinal ?? null,
  valuationRange: it.valuationRange ?? null,
  status: mapStatus(it.status),
  statusLabel: mapValuationStatusLabel(it.status),
});
