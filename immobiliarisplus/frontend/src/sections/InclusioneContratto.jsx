import Card from '../components/Card';
import { ContractItem } from '../components/ContractItem';

/**
 * InclusioneContratto Component
 *
 * Mostra un elenco strutturato di voci che compongono il contratto
 * di vendita in esclusiva. Ogni elemento viene renderizzato tramite
 * `ContractItem`, che include un'icona check e il testo descrittivo.
 *
 * Utilizzato nella pagina "Contratto Esclusiva".
 *
 * @component
 * @returns {JSX.Element} Una card contenente le sezioni del contratto.
 */
const InclusioneContratto = () => {
    return (
        <div className="p-8 ">
            <Card className="bg-white rounded-xl shadow-lg p-8 mx-auto border-l-4 border-l-indigo-900">

                <div className="flex items-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-indigo-900 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Cosa include il contratto
                    </h2>
                </div>

                <div className="pl-4">
                    <ContractItem text="Durata del mandato (tipicamente 6-12 mesi, rinnovabile)" />
                    <ContractItem text="Prezzo di vendita e modalità di determinazione" />
                    <ContractItem text="Percentuale di provvigione (solo a vendita conclusa)" />
                    <ContractItem text="Servizi inclusi: marketing, foto professionali, visite, reportistica" />
                    <ContractItem text="Clausole di recesso anticipato in casi specifici" />
                    <ContractItem text="Modalità di comunicazione e aggiornamenti" />
                </div>
            </Card>
        </div>
    );
};

export default InclusioneContratto;
