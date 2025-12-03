/**
 * @file StatusChip.jsx
 * @description Reusable status chip component used for filters (clickable) and static badges.
 *              Supports dynamic color variants based on status key or label keywords.
 */

import React from "react";

/**
 * Color variant object for status chips.
 * @typedef {Object} ColorVariant
 * @property {string} bg - Background Tailwind class.
 * @property {string} text - Text color Tailwind class.
 * @property {string} activeBg - Active state background class.
 * @property {string} activeText - Active state text color class.
 */

/**
 * Props for StatusChip component.
 * @typedef {Object} StatusChipProps
 * @property {string} [statusKey] - Status enum key (e.g. "non_assegnati", "in_corso") used for fallback color selection.
 * @property {string} label - Display label text.
 * @property {string|number} [count] - Optional count to display in parentheses (e.g. "(5)").
 * @property {boolean} [active] - Whether the chip is in active/selected state (used for filter chips).
 * @property {Function} [onClick] - Optional click handler. If provided, renders as interactive filter button; otherwise renders as static badge.
 */

/**
 * StatusChip
 *
 * Renders a reusable status chip that can function as either an interactive filter button or a static badge.
 * When onClick is provided, it renders as a teal-themed filter button. Otherwise, it renders as a small
 * colored badge with colors determined by label keywords or statusKey fallback.
 *
 * @param {StatusChipProps} props
 * @param {string} [props.statusKey] - Status key for color fallback.
 * @param {string} props.label - Display label.
 * @param {string|number} [props.count] - Optional count.
 * @param {boolean} [props.active] - Active state for filter chips.
 * @param {Function} [props.onClick] - Click handler; determines chip variant (filter vs badge).
 * @returns {JSX.Element} Interactive filter chip or static badge element.
 */
export default function StatusChip({ statusKey, label, count, active, onClick }) {
  const normalize = (v) => (v || "").toString().toLowerCase();

  /**
   * Get color variant classes based on label keywords or statusKey.
   *
   * @param {string} lbl - Label text to check for keywords.
   * @param {string} key - Status key for fallback color selection.
   * @returns {ColorVariant} Color variant object with bg, text, activeBg, activeText classes.
   */
  const getClasses = (lbl, key) => {
    const t = normalize(lbl);
    // priority based on label keywords
    if (t.includes("nuov")) return { bg: "bg-emerald-100", text: "text-emerald-800", activeBg: "bg-emerald-600", activeText: "text-white" };
    if (t.includes("attesa") || t.includes("in attesa")) return { bg: "bg-orange-100", text: "text-orange-800", activeBg: "bg-orange-600", activeText: "text-white" };
    if (t.includes("conferm") || t.includes("confermato") || t.includes("rifiut")) return { bg: "bg-sky-100", text: "text-sky-800", activeBg: "bg-sky-600", activeText: "text-white" };

    // fallback to group key colors
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
    // interactive filter chip: preserve original filter styling (teal active) — do not color based on tag
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

  // static badge variant (small)
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes.bg} ${classes.text}`}>
      {label}
    </span>
  );
}
