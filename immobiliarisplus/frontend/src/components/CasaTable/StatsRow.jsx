import { useCasa } from "../../store/CasaContext";

export default function StatsRow() {
  const { rawCases, filter, setFilter } = useCasa();

  // conta per stato (usiamo rawCases per i numeri globali)
  const counts = {
    tutti: rawCases.length,
    non_assegnati: rawCases.filter((c) => c.status === "non_assegnati").length,
    in_corso: rawCases.filter((c) => c.status === "in_corso").length,
    attesa_cliente: rawCases.filter((c) => c.status === "attesa_cliente")
      .length,
    terminati: rawCases.filter((c) => c.status === "terminati").length,
  };

  const items = [
    { key: "tutti", label: `Tutti (${counts.tutti})` },
    { key: "non_assegnati", label: `Non assegnati (${counts.non_assegnati})` },
    { key: "in_corso", label: `In corso (${counts.in_corso})` },
    {
      key: "attesa_cliente",
      label: `In attesa cliente (${counts.attesa_cliente})`,
    },
    { key: "terminati", label: `Terminati (${counts.terminati})` },
  ];

  return (
    <div className="flex gap-3 mb-6">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => setFilter(it.key)}
          className={`px-4 py-2 rounded-full border text-sm transition ${
            filter === it.key
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-200"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}
