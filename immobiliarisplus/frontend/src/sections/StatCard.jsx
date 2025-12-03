import Card from "../components/Card";

/**
 * StatCard Component
 *
 * Mostra una panoramica dei principali indicatori economici relativi
 * al servizio "Migliora Casa": investimento totale, aumento del valore
 * stimato e ROI medio.
 *
 * Utilizzato nella pagina dedicata ai miglioramenti immobiliari per
 * comunicare in modo immediato l’impatto economico degli interventi.
 *
 * @component
 * @returns {JSX.Element} Una card con tre statistiche principali visualizzate in griglia.
 */
const StatCard = () => {
    const cardClasses = "border border-teal-500 bg-white p-6 rounded-lg shadow-md";
    const gridClasses = "grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 text-center";
    const labelClasses = "text-xl text-gray-600 mb-1";
    const valueClasses = "text-xl font-semibold";
    const investmentValueColor = "text-gray-900";
    const increaseValueColor = "text-teal-800";
    const roiValueColor = "text-indigo-900";

    return (
        <Card className={cardClasses}>
            <div className={gridClasses}>
                <div className="py-2 md:py-0">
                    <div className={labelClasses}>
                        <span className="px-2 py-0.5 inline-block">
                            Investimento totale
                        </span>
                    </div>
                    <div className={`${valueClasses} ${investmentValueColor}`}>
                        28.000 € - 46.000 €
                    </div>
                </div>
                <div className="py-2 md:py-0 border-t md:border-t-0 md:border-l border-gray-200">
                    <div className={labelClasses}>
                        Aumento valore stimato
                    </div>
                    <div className={`${valueClasses} ${increaseValueColor}`}>
                        +47.000 € - 68.000 €
                    </div>
                </div>
                <div className="py-2 md:py-0 border-t md:border-t-0 md:border-l border-gray-200">
                    <div className={labelClasses}>
                        ROI medio
                    </div>
                    <div className={`${valueClasses} ${roiValueColor}`}>
                        +140%
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default StatCard;
