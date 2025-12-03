/**
 * @file Badge.jsx
 * @description Status badge component with color-coded styling.
 * 
 * Displays status labels with appropriate background colors based on
 * status type. Used for static display (non-interactive).
 * 
 * @module components/CasaTable/Badge
 */

/**
 * Static status badge with color-coded styling.
 * 
 * Determines badge colors based on status key or label text. Supports
 * label-based color matching for flexibility with different status values.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.status] - Status key for color mapping (non_assegnati, in_corso, etc.)
 * @param {string} [props.label] - Display label text (also used for color matching)
 * @returns {JSX.Element} Styled badge element
 */
export default function Badge({ status, label }) {
  // Color mapping (can be extended with more variants)
  const colors = {
    non_assegnati: "bg-red-100 text-red-700",
    in_corso: "bg-yellow-100 text-yellow-800",
    attesa_cliente: "bg-blue-100 text-blue-800",
    terminati: "bg-green-100 text-green-700",
  };

  // fallback generico
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
