/**
 * @file AreaAgenti.jsx
 * @description Agents dashboard page assembling statistics and the valuations table.
 */
import StatsRow from "../components/CasaTable/StatsRow";
import CasaTable from "../components/CasaTable/CasaTable";
import { useCasa } from "../store/CasaContext";
import CasaContextProvider from "../providers/CasaContextProvider";
import { useAuth } from "../store/AuthContext";

export default function AreaAgenti() {
  const { selectedCasa } = useCasa();
  const { userType } = useAuth();

  /**
   * Renders the agents area with a summary row and a table of leads.
   * Selection and detail editing are delegated to context and modal components.
   * @returns {JSX.Element}
   */
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-2xl font-semibold mb-2">Area Agenti</h1>
      <p className="text-gray-600 mb-6">
        Gestisci lead, assegnazioni e pipeline vendite
      </p>

      <StatsRow />
      <CasaTable />
    </div>
  );
}
