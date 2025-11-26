import { useCasa } from "../../store/CasaContext";
import Badge from "./Badge";
import { useAuth } from "../../store/AuthContext";

export default function CasaTableRow({ casa }) {
  const { openCasaModal } = useCasa();
  const { userType } = useAuth();

  // handler click riga: apre modale
  const handleRowClick = () => {
    openCasaModal(casa);
  };

  // handler icona info: ferma la propagation e apre modale
  const handleInfoClick = (e) => {
    e.stopPropagation(); // evita che il click sul bottone attivi tutto il tr due volte
    openCasaModal(casa);
  };

  return (
    <tr
      onClick={handleRowClick}
      className="hover:bg-gray-50 cursor-pointer transition"
    >
      {/* Indirizzo */}
      <td className="px-4 py-3">{casa.property.address}</td>

      {/* Mq */}
      <td className="px-4 py-3">{casa.property.surfaceM2} m²</td>

      {/* Valutazione (stringa) */}
      <td className="px-4 py-3">{casa.valuationRange}</td>

      {/* Stato con badge */}
      <td className="px-4 py-3">
        <Badge status={casa.status} />
      </td>

      {/* Agente assegnato (visibile solo ad admin) */}
      {userType === "admin" && (
        <td className="px-4 py-3">{casa.assignedAgent || "-"}</td>
      )}

      {/* Azioni: icona info che apre modale */}
      <td className="px-4 py-3 text-right">
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
      </td>
    </tr>
  );
}
