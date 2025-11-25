export default function Badge({ status }) {
  // mapping colori (puoi aggiungere varianti)
  const colors = {
    non_assegnati: "bg-red-100 text-red-700",
    in_corso: "bg-yellow-100 text-yellow-800",
    attesa_cliente: "bg-blue-100 text-blue-800",
    terminati: "bg-green-100 text-green-700",
  };

  // fallback generico
  const cls = colors[status] || "bg-gray-100 text-gray-800";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
      {/* rendi più leggibile lo status */}
      {String(status).replace("_", " ")}
    </span>
  );
}
