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

// helper: extract/format valuation range and final from different possible API shapes
const fmtCurrency = (v) => {
  if (v == null || v === "") return null;
  const n = Number(v);
  if (Number.isFinite(n)) return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n);
  return String(v);
};

const extractRangeString = (obj) => {
  if (!obj) return null;

  // direct string
  if (typeof obj === "string" && obj.trim() !== "") return obj;

  // number
  if (typeof obj === "number") return fmtCurrency(obj);

  // array [min,max]
  if (Array.isArray(obj) && obj.length >= 2) {
    const a = fmtCurrency(obj[0]);
    const b = fmtCurrency(obj[1]);
    if (a && b) return `${a} - ${b}`;
  }

  // object with possible keys
  const candidates = [];
  if (obj.min != null || obj.max != null) {
    const a = obj.min ?? obj.low ?? obj.from ?? obj[0];
    const b = obj.max ?? obj.high ?? obj.to ?? obj[1];
    if (a != null && b != null) return `${fmtCurrency(a)} - ${fmtCurrency(b)}`;
  }

  if (obj.range != null) return extractRangeString(obj.range);
  if (obj.final != null) return fmtCurrency(obj.final);
  if (obj.value != null) return fmtCurrency(obj.value);

  return null;
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
  // support multiple possible shapes from different API responses
  valuationRange:
    // prefer explicit flat fields first
    it.valuationRange ?? it.valuation_range ??
    // then nested valuation object possibilities
    (() => {
      const r = it.valuation ?? it.valuation_data ?? it;
      const direct = it.valuationRange ?? it.valuation_range ?? it.range ?? null;
      if (direct) return typeof direct === "string" ? direct : extractRangeString(direct);
      // check nested fields
      const cand = it.valuation ?? it.valuation_data;
      const fromNested = extractRangeString(cand?.range ?? cand?.valuationRange ?? cand ?? null);
      return fromNested ?? null;
    })(),
  valuationFinal:
    it.valuationFinal ?? it.valuation_final ??
    (() => {
      const cand = it.valuation ?? it.valuation_data ?? it;
      return (
        (cand?.final != null && fmtCurrency(cand.final)) ||
        (cand?.valuationFinal != null && fmtCurrency(cand.valuationFinal)) ||
        (cand?.value != null && fmtCurrency(cand.value)) ||
        null
      );
    })(),
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
  valuationFinal:
    it.valuationFinal ?? it.valuation_final ?? it.valuation?.final ?? it.valuation?.valuationFinal ?? null,
  valuationRange:
    it.valuationRange ?? it.valuation_range ?? it.valuation?.range ?? it.valuation?.valuationRange ?? null,
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
