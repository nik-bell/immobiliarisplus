import { useState } from "react";
import { useCasa } from "../../store/CasaContext";
import Badge from "./Badge";
import StatusDropdown from "./StatusDropdown";
import { useAuth } from "../../store/AuthContext";
import AgentSelector from "./AgentSelector";
import DeleteConfirmationModal from "../../layout/DeleteConfirmationModal";
import { deleteValuation } from "../../api/api";

export default function CasaTableRow({ casa }) {
  const { openCasaModal, setAllCases } = useCasa();
  const { userType } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // handler click riga: apre modale
  const handleRowClick = () => {
    openCasaModal(casa);
  };

  // handler icona info: ferma la propagation e apre modale
  const handleInfoClick = (e) => {
    e.stopPropagation(); // evita che il click sul bottone attivi tutto il tr due volte
    openCasaModal(casa);
  };

  // handler delete button
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!casa?.id) return;
    
    const success = await deleteValuation(casa.id);
    
    if (success) {
      // Remove from local state
      setAllCases((prev) => prev.filter((x) => x.id !== casa.id));
      setShowDeleteConfirm(false);
    } else {
      // Handle error
      setShowDeleteConfirm(false);
      alert('Errore durante l\'eliminazione del record');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const fmtCurrency = (v) => {
    if (v == null || v === "") return null;
    const n = Number(v);
    if (Number.isFinite(n)) return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n);
    return String(v);
  };

  const extractRange = (c) => {
    if (!c) return null;
    // prefer already-computed string
    if (c.valuationRange) return c.valuationRange;
    if (c.valuation_range) return c.valuation_range;
    // nested valuation object
    const v = c.valuation ?? c.valuation_data ?? null;
    if (!v) return null;
    if (typeof v === 'string' && v.trim() !== '') return v;
    if (Array.isArray(v.range)) {
      const a = fmtCurrency(v.range[0]);
      const b = fmtCurrency(v.range[1]);
      if (a && b) return `${a} - ${b}`;
    }
    if (v.range && typeof v.range === 'string') return v.range;
    if (v.min != null && v.max != null) return `${fmtCurrency(v.min)} - ${fmtCurrency(v.max)}`;
    if (v.from != null && v.to != null) return `${fmtCurrency(v.from)} - ${fmtCurrency(v.to)}`;
    // fallback to final if present
    if (v.final != null) return fmtCurrency(v.final);
    return null;
  };

  

  // helper removed: AgentSelector handles label formatting

  return (
    <>
    <tr
      onClick={handleRowClick}
      className="hover:bg-gray-50 cursor-pointer transition"
    >
      {/* Indirizzo */}
      <td className="px-4 py-3">{casa.property?.address ?? ''}</td>

      {/* Mq */}
      <td className="px-4 py-3">{casa.property?.sizeMq ?? ''} m²</td>

      {/* Valutazione finale */}
      <td className="px-4 py-3">{typeof casa.valuationFinal === 'number' ? new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(casa.valuationFinal) : (casa.valuationFinal ?? '-')}</td>

      {/* Stato con badge */}
      <td className="px-4 py-3">
        <StatusDropdown casa={casa} />
      </td>

      {/* Agente assegnato (visibile solo ad admin) */}
      {userType === "admin" && (
        <td className="px-4 py-3 relative" onClick={(e) => e.stopPropagation()}>
          <AgentSelector casa={casa} />
        </td>
      )}
      {/* Azioni: icona info che apre modale */}
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleInfoClick}
            aria-label={`Info ${casa.id}`}
            className="p-1 rounded hover:bg-gray-100"
          >
            {/* semplice icona info SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 3a9 9 0 110 18 9 9 0 010-18z"
              />
            </svg>
          </button>
          {userType === "admin" && (
            <button
              onClick={handleDeleteClick}
              aria-label={`Elimina ${casa.id}`}
              className="p-1 rounded hover:bg-red-50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </td>
    </tr>
    {/* Modal di conferma eliminazione */}
    <DeleteConfirmationModal
      isOpen={showDeleteConfirm}
      onCancel={handleDeleteCancel}
      onConfirm={handleDeleteConfirm}
      leadAddress={casa.property?.address}
    />
    </>
  );
}
