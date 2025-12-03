/**
 * @file StatusChip.jsx
 * @description Reusable status chip component.
 * 
 * Dual-purpose component that renders as either:
 * - Interactive filter button (when onClick provided)
 * - Static status badge (when onClick omitted)
 * 
 * @module components/CasaTable/StatusChip
 */

import React from "react";

/**
 * Versatile status chip for filters and badges.
 * 
 * Renders with context-appropriate styling:
 * - Filter mode: Teal active state, white inactive, shows count
 * - Badge mode: Color-coded by status type (emerald, orange, sky, etc.)
 * 
 * @param {Object} props - Component props
 * @param {string} [props.statusKey] - Status key for color mapping
 * @param {string} props.label - Display label text
 * @param {number} [props.count] - Optional count to display (filter mode)
 * @param {boolean} [props.active] - Active state for filter mode
 * @param {Function} [props.onClick] - Click handler (if provided, renders as filter button)
 * @returns {JSX.Element} Status chip button or badge
 */
export default function StatusChip({ statusKey, label, count, active, onClick }) {
  const normalize = (v) => (v || "").toString().toLowerCase();

  const getClasses = (lbl, key) => {
    const t = normalize(lbl);
    // Priority based on label keywords
    if (t.includes("nuov")) return { bg: "bg-emerald-100", text: "text-emerald-800", activeBg: "bg-emerald-600", activeText: "text-white" };
    if (t.includes("attesa") || t.includes("in attesa")) return { bg: "bg-orange-100", text: "text-orange-800", activeBg: "bg-orange-600", activeText: "text-white" };
    if (t.includes("conferm") || t.includes("confermato") || t.includes("rifiut")) return { bg: "bg-sky-100", text: "text-sky-800", activeBg: "bg-sky-600", activeText: "text-white" };

    // Fallback to group key colors
    switch (key) {
      case "non_assegnati":
        return { bg: "bg-red-100", text: "text-red-700", activeBg: "bg-red-600", activeText: "text-white" };
      case "in_corso":
        return { bg: "bg-yellow-100", text: "text-yellow-800", activeBg: "bg-yellow-600", activeText: "text-white" };
      case "attesa_cliente":
        return { bg: "bg-blue-100", text: "text-blue-800", activeBg: "bg-blue-600", activeText: "text-white" };
      case "terminati":
        return { bg: "bg-green-100", text: "text-green-700", activeBg: "bg-green-600", activeText: "text-white" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", activeBg: "bg-gray-600", activeText: "text-white" };
    }
  };

  const classes = getClasses(label, statusKey);

  if (typeof onClick === "function") {
    // Interactive filter chip: preserve original filter styling (teal active) — do not color based on tag
    const cls = active ? "bg-teal-700 text-white border-teal-700" : "bg-white text-gray-700 border-gray-200";
    return (
      <button
        onClick={onClick}
        className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm transition ${cls}`}
      >
        {label}{count !== undefined ? ` (${count})` : ""}
      </button>
    );
  }

  // Static badge variant (small)
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes.bg} ${classes.text}`}>
      {label}
    </span>
  );
}
