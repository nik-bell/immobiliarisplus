import StatsRow from "../components/CasaTable/StatsRow";
import CasaTable from "../components/CasaTable/CasaTable";
import { useCasa } from "../store/CasaContext";
import CasaContextProvider from "../providers/CasaContextProvider";

export default function AreaAgenti() {
  const { selectedCasa } = useCasa();

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
