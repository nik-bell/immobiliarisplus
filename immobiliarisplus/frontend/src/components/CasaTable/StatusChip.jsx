import React from "react";

// Reusable status chip used for filters (clickable) and static badges
export default function StatusChip({ statusKey, label, count, active, onClick }) {
  const normalize = (v) => (v || "").toString().toLowerCase();

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
    // interactive filter chip: preserve original filter styling (blue active) — do not color based on tag
    const cls = active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-200";
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
