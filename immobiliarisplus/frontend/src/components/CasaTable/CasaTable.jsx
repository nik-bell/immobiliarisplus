import CasaTableHeader from "./CasaTableHeader";
import CasaTableRow from "./CasaTableRow";
import { useCasa } from "../../store/CasaContext";

export default function CasaTable() {
  // cases è già filtrato e ordinato dal provider
  const { cases } = useCasa();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-0">
        <table className="min-w-full text-sm">
          {/* header */}
          <CasaTableHeader />
          {/* body */}
          <tbody className="divide-y divide-gray-100">
            {cases.map((casa) => (
              <CasaTableRow key={casa.id} casa={casa} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
