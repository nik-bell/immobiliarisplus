// Utilities to map backend enums/DTOs to frontend-friendly shapes/labels

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

// helper: map UI status key back to backend enum where possible
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
      return "CONFIRMED"; // default to CONFIRMED when mapping back from the grouped 'terminati'
    default:
      return null;
  }
};

// helper: list of backend enums used by the app in preferred order
export const ALL_STATUS_ENUMS = [
  "NEW",
  "NOT_ASSIGNED",
  "IN_PROGRESS",
  "AWAITING_CLIENT_RESPONSE",
  "CONFIRMED",
  "REJECTED",
];

// map frontend/free-text values to backend enums for sending payloads
export const mapPropertyTypeToEnum = (pt) => {
  if (!pt) return null;
  const v = String(pt).toLowerCase();
  if (v.includes("apart")) return "APARTMENT";
  if (v.includes("casa") || v.includes("house") || v.includes("ind")) return "HOUSE";
  if (v.includes("uff") || v.includes("office")) return "OFFICE";
  return "OTHER";
};

export const mapPropertyConditionToEnum = (c) => {
  if (!c) return null;
  const v = String(c).toLowerCase();
  if (v.includes("nuov") || v.includes("new")) return "NEW";
  if (v.includes("ristr") || v.includes("recent")) return "RECENTLY_RENOVATED";
  if (v.includes("ottim") || v.includes("buon") || v.includes("good")) return "GOOD_CONDITION";
  if (v.includes("da ristr") || v.includes("to reno") || v.includes("to_reno") || v.includes("to_re")) return "TO_RENOVATE";
  return "GOOD_CONDITION";
};
