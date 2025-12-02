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
      return "non_assegnati";
    case "ASSIGNED":
    case "IN_PROGRESS":
      return "in_corso";
    case "WAITING_CUSTOMER":
    case "AWAITING_CUSTOMER":
      return "attesa_cliente";
    case "COMPLETED":
    case "DONE":
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
    case "ASSIGNED":
      return "Assegnato";
    case "IN_PROGRESS":
      return "In corso";
    case "WAITING_CUSTOMER":
    case "AWAITING_CUSTOMER":
      return "In attesa cliente";
    case "COMPLETED":
    case "DONE":
      return "Completato";
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
