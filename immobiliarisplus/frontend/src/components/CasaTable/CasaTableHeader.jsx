/**
 * @file CasaTableHeader.jsx
 * @description Table header with sortable columns.
 * 
 * Renders table header with clickable column headers for sorting.
 * Conditionally shows/hides columns based on user permissions.
 * 
 * @module components/CasaTable/CasaTableHeader
 */

import { useCasa } from "../../store/CasaContext";
import { useAuth } from "../../store/AuthContext";

/**
 * Sortable table header component.
 * 
 * Renders column headers with sort indicators. Clicking a header toggles
 * sort direction. The "Agente" column is only visible to admin users.
 * 
 * @returns {JSX.Element} Table header with sortable columns
 */
export default function CasaTableHeader() {
  const { toggleSort, sortKey, sortDir } = useCasa();

  const { userType } = useAuth();

  // Columns with key paths used for sorting
  const allColumns = [
    { key: "property.address", label: "Indirizzo" },
    { key: "property.sizeMq", label: "Mq" },
    { key: "valuationFinal", label: "Valutazione finale" },
    { key: "status", label: "Stato" },
    { key: "assignedAgent", label: "Agente" },
    { key: "actions", label: "" }, // Icons/actions column
  ];

  // Show Agent column only to admins
  const columns = allColumns.filter((c) => {
    if (c.key === "assignedAgent" && userType !== "admin") return false;
    return true;
  });

  // aria-sort value helper
  const ariaSort = (key) => {
    if (sortKey !== key) return "none";
    return sortDir === "asc" ? "ascending" : "descending";
  };

  return (
    <thead className="bg-gray-50">
      <tr className="text-left text-gray-600">
        {columns.map((col) => (
          <th key={col.key} scope="col" className="px-4 py-3 font-medium">
            {/* Don't activate sort for actions column */}
            {col.key !== "actions" ? (
              <button
                onClick={() => toggleSort(col.key)}
                title={`Ordina per ${col.label}`}
                aria-sort={ariaSort(col.key)}
                className="w-full text-left flex items-center justify-between gap-2 px-2 py-1 rounded hover:bg-gray-100 hover:text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-200"
              >
                <span className="flex items-center gap-2">
                  <span>{col.label}</span>
                </span>

                <span className="flex items-center">
                  {/* Sort icon: when sorted show direction, otherwise subtle up/down */}
                  {sortKey === col.key ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-700 transform ${sortDir === 'asc' ? '' : 'rotate-180'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3l6 6H4l6-6z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 opacity-60" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7 7l3-3 3 3M7 13l3 3 3-3" />
                    </svg>
                  )}
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
