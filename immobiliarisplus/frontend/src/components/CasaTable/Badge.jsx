/**
 * @file Badge.jsx
 * @description Small status badge used in the Casa table. Chooses a color class
 *              based on a status key or on the label text.
 */

/**
 * Allowed status keys (used to map to Tailwind color classes).
 * @typedef {('non_assegnati'|'in_corso'|'attesa_cliente'|'terminati'|string)} StatusKey
 */

/**
 * Props for the Badge component.
 * @typedef {Object} BadgeProps
 * @property {StatusKey} [status] - Enum-like status key to determine default color.
 * @property {string} [label] - Optional display label; label text may override color choice.
 */

/**
 * Badge component
 *
 * Renders a small pill badge with a color variant selected from status or label.
 *
 * @param {BadgeProps} props
 * @param {StatusKey} [props.status]
 * @param {string} [props.label]
 * @returns {JSX.Element} Rendered badge element.
 */
export default function Badge({ status, label }) {
  // color mapping (you can add variants)
  const colors = {
    non_assegnati: "bg-red-100 text-red-700",
    in_corso: "bg-yellow-100 text-yellow-800",
    attesa_cliente: "bg-blue-100 text-blue-800",
    terminati: "bg-green-100 text-green-700",
  };

  // generic fallback
  // prefer label-based color choices to allow per-enum coloring
  const normalize = (v) => (v || "").toString().toLowerCase();
  const lbl = normalize(label);
  let cls = colors[status] || "bg-gray-100 text-gray-800";

  if (lbl.includes("nuov")) {
    cls = "bg-emerald-100 text-emerald-800";
  } else if (lbl.includes("attesa") || lbl.includes("in attesa")) {
    cls = "bg-orange-100 text-orange-800";
  } else if (lbl.includes("conferm") || lbl.includes("rifiut")) {
    cls = "bg-sky-100 text-sky-800";
  }

  const text = label ?? (status ? String(status).replace(/_/g, " ") : "");

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
      {text}
    </span>
  );
}
