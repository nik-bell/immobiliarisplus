import { useCasa } from "../../store/CasaContext";
import { useAuth } from "../../store/AuthContext";

export default function CasaTableHeader() {
  const { toggleSort, sortKey, sortDir } = useCasa();

  const { userType } = useAuth();

  // colonne con key path usate per sort
  const allColumns = [
    { key: "property.address", label: "Indirizzo" },
    { key: "property.sizeMq", label: "Mq" },
    { key: "valuationRange", label: "Valutazione attuale" },
    { key: "status", label: "Stato" },
    { key: "assignedAgent", label: "Agente" },
    { key: "actions", label: "" }, // colonna icons/azioni
  ];

  // mostra la colonna Agente solo agli admin
  const columns = allColumns.filter((c) => {
    if (c.key === "assignedAgent" && userType !== "admin") return false;
    return true;
  });

  // icona freccia per indicare sorting
  const sortIndicator = (key) => {
    if (sortKey !== key) return null;
    return sortDir === "asc" ? " ▲" : " ▼";
  };

  return (
    <thead className="bg-gray-50">
      <tr className="text-left text-gray-600">
        {columns.map((col) => (
          <th key={col.key} scope="col" className="px-4 py-3 font-medium">
            {/* se è colonna azioni non attiviamo sort */}
            {col.key !== "actions" ? (
              <button
                onClick={() => toggleSort(col.key)}
                className="flex items-center gap-2"
              >
                <span>{col.label}</span>
                <span className="text-xs text-gray-400">
                  {sortIndicator(col.key)}
                </span>
              </button>
            ) : (
              <span>{col.label}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}
