import Card from "../components/Card";

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
    const getValueColorClass = (key) => {
        if (key === 'Aumento valore' || key === 'ROI atteso') {
            return 'text-teal-600';
        }
        return 'text-gray-900';
    };

    return (
        <Card className={cardBaseClasses}>
            <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                    <div className="text-2xl p-2 rounded-full bg-gray-100 text-teal-500">
                        {icon}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
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