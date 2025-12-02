import CasaTableHeader from "./CasaTableHeader";
import CasaTableRow from "./CasaTableRow";
import Badge from "./Badge";
import { useCasa } from "../../store/CasaContext";
import AgentSelector from "./AgentSelector";
import { useAuth } from "../../store/AuthContext";

export default function CasaTable() {
  // cases è già filtrato e ordinato dal provider
  const { cases } = useCasa();
  const { userType } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Desktop / tablet: regular table (md and up) */}
      <div className="p-0 hidden md:block">
        <table className="min-w-full text-sm">
          <CasaTableHeader />
          <tbody className="divide-y divide-gray-100">
            {cases.map((casa) => (
              <CasaTableRow key={casa.id} casa={casa} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards */}
      <div className="block md:hidden">
        {cases.map((casa) => (
          <div key={casa.id} className="p-4 border-b last:border-b-0">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{casa.property?.address ?? ''}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {casa.property?.sizeMq ?? ''} m² • {casa.valuationRange ?? ''}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge status={casa.status} />
                  {casa.assignedAgent && (
                    <div className="text-xs text-gray-600">Assegnato a {typeof casa.assignedAgent === 'string' ? casa.assignedAgent : `${casa.assignedAgent.name || ''} ${casa.assignedAgent.surname || ''}`.trim()}</div>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                {/* on mobile admin can assign agent inline */}
                {/** render AgentSelector for admins **/}
                {/** useAuth provides userType **/}
                {/** note: AgentSelector will fetch employees and call assign API **/}
                {/** show selector if admin */}
                {/** useAuth hook below */}
                
                {/** render AgentSelector if admin */}
                {userType === 'admin' && <div className="mb-2"><AgentSelector casa={casa} /></div>}
                <button
                  onClick={() => {
                    // open modal via context
                    // import hook here to avoid circular issues
                    // We'll call window.__openCasaModal if provider exposed it, otherwise user can tap row to open.
                    const ev = new CustomEvent('openCasaModal', { detail: { casaId: casa.id } });
                    window.dispatchEvent(ev);
                  }}
                  className="text-sm text-teal-600 hover:underline"
                >
                  Dettagli
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
