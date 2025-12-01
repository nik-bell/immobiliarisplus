import { useCasa } from "../../store/CasaContext";
import { useState } from "react";

export default function StatsRow() {
  const { rawCases, filter, setFilter, refreshCases } = useCasa();
  const [loading, setLoading] = useState(false);

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
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {/* refresh button placed before the status filters */}
        <div>
          <RefreshButton
            onRefresh={async () => {
              if (typeof refreshCases === "function") {
                setLoading(true);
                try {
                  await refreshCases();
                } finally {
                  setLoading(false);
                }
              }
            }}
            loading={loading}
          />
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-3 whitespace-nowrap">
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => setFilter(it.key)}
                className={`flex-shrink-0 px-4 py-2 rounded-full border text-sm transition ${
                  filter === it.key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RefreshButton({ onRefresh, loading }) {
  return (
    <button
      onClick={onRefresh}
      title="Aggiorna"
      aria-label="Aggiorna"
      className="p-2 rounded-md hover:bg-gray-100 flex items-center justify-center"
    >
      {loading ? (
        <svg className="w-5 h-5 animate-spin text-gray-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z" />
        </svg>
      ) : (
        // provided open circular-arrow path
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.146 4.854l-1.489 1.489A8 8 0 1 0 12 20a8.094 8.094 0 0 0 7.371-4.886 1 1 0 1 0-1.842-.779A6.071 6.071 0 0 1 12 18a6 6 0 1 1 4.243-10.243l-1.39 1.39a.5.5 0 0 0 .354.854H19.5A.5.5 0 0 0 20 9.5V5.207a.5.5 0 0 0-.854-.353z" />
        </svg>
      )}
    </button>
  );
}
