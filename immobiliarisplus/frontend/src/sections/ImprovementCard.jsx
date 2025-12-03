import Card from "../components/Card";

/**
 * ImprovementCard Component
 *
 * Mostra una card con icona, titolo, sottotitolo, statistiche in griglia
 * e una barra di impatto percentuale sul valore dell’immobile.
 *
 * Utilizzato nella pagina “Migliora Casa” per presentare interventi
 * che aumentano il valore dell’immobile (es: ristrutturazioni, home staging).
 *
 * @component
 *
 * @param {Object} props - Proprietà del componente.
 * @param {JSX.Element} props.icon - Icona illustrativa da mostrare nella card.
 * @param {string} props.title - Titolo dell’intervento di miglioramento.
 * @param {string} props.subtitle - Breve descrizione dell’intervento.
 * @param {Object.<string, string|number>} props.stats - Valori statistici/metriche da mostrare (es: costo medio, tempo, ROI).
 * @param {number} props.impactValue - Valore percentuale dell’impatto sul valore dell’immobile.
 *
 * @returns {JSX.Element} Una card visiva con informazioni sull'intervento di miglioramento.
 */
const ImprovementCard = ({
    icon,
    title,
    subtitle,
    stats,
    impactValue
}) => {

    const cardBaseClasses = "p-6 rounded-lg shadow-md mb-6 border border-gray-100 bg-white";
    const statsGridClasses = "grid grid-cols-2 gap-y-4 md:grid-cols-4 md:gap-4 mt-6";
    const labelClasses = "text-sm text-gray-500";
    const valueClasses = "text-base font-medium text-gray-900";

    // Function to determine value color based on key
    const getValueColorClass = (key) => {
        if (key === 'Aumento valore' || key === 'ROI atteso') {
            return 'text-teal-800';
        }
        return 'text-gray-900';
    };

    return (
        <Card className={cardBaseClasses}>
            <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                    <div className="text-2xl p-2 rounded-full bg-gray-100 text-teal-800">
                        {icon}
                    </div>

                    <div>
                        <h2 className="h3 text-lg font-semibold text-gray-800">{title}</h2>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    </div>
                </div>
            </div>

            <div className={statsGridClasses}>
                {Object.entries(stats).map(([key, value]) => (
                    <div key={key}>
                        <div className={labelClasses}>{key}</div>
                        <div className={`${valueClasses} ${getValueColorClass(key)}`}>
                            {value}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Impatto sul valore</span>
                    <span className="font-semibold text-gray-900">{impactValue}%</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                    <div
                        className="absolute top-0 left-0 h-2 bg-teal-500 rounded-full w-1/1"
                    ></div>
                </div>
            </div>

        </Card>
    );
};

export default ImprovementCard;
