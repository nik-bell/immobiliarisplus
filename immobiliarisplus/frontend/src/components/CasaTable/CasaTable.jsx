/**
 * @file CasaTable.jsx
 * @description Table / list view for "case" (properties) used in the dashboard.
 *
 * Renders a responsive table for desktop and stacked cards for mobile.
 * Uses CasaContext to read the list of cases and AuthContext to conditionally
 * render admin-only controls (AgentSelector).
 */

/**
 * Employee shape used in casa objects.
 * @typedef {Object} Employee
 * @property {string|number} id - Employee identifier.
 * @property {string} [name] - First name.
 * @property {string} [surname] - Last name.
 * @property {string} [email] - Email.
 */

/**
 * Casa (case/property) shape.
 * @typedef {Object} Casa
 * @property {string|number} id - Casa identifier.
 * @property {Object} [property] - Property details.
 * @property {string} [property.address] - Property address.
 * @property {number} [property.sizeMq] - Size in square meters.
 * @property {number|string|null} [valuationFinal] - Final valuation or placeholder.
 * @property {string} [status] - Internal status key.
 * @property {string} [statusLabel] - Human readable status label.
 * @property {Employee|string|null} [assignedAgent] - Assigned agent (object, label or null).
 */

/**
 * Props for CasaTable component (none at the moment).
 * @typedef {Object} CasaTableProps
 */

/**
 * CasaTable
 *
 * Responsive list/table of casas. Desktop shows a table; mobile shows stacked cards.
 * Admin users see the AgentSelector control inline on mobile cards.
 *
 * @param {CasaTableProps} props
 * @returns {JSX.Element} Rendered casa table component.
 */
import CasaTableHeader from "./CasaTableHeader";
import CasaTableRow from "./CasaTableRow";
import Badge from "./Badge";
import { useCasa } from "../../store/CasaContext";
import AgentSelector from "./AgentSelector";
import { useAuth } from "../../store/AuthContext";

export default function CasaTable() {
  // get cases from context
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
                  {casa.property?.sizeMq ?? ''} m²
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <span className="font-medium">Finale:</span> {typeof casa.valuationFinal === 'number' ? new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(casa.valuationFinal) : (casa.valuationFinal ?? '-')}
                </div>
                {/* status is shown as badge only */}
                <div className="mt-2 flex items-center gap-2">
                    <Badge status={casa.status} label={casa.statusLabel} />
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
