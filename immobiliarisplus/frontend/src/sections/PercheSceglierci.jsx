import Card from "../components/Card";

const featuresData = [
    {
        icon: "📈",
        title: "Valutazione precisa",
        description: "Algoritmo AVM basato su dati reali di mercato. Range accurato basato su zona e condizioni.",
    },
    {
        icon: "🔒",
        title: "Massima trasparenza",
        description: "Controlla ogni fase della vendita dalla tua dashboard personale.",
    },
    {
        icon: "⏱️",
        title: "Velocità garantita",
        description: "Valutazione in 72 ore. Lead prioritari in 24h.",
    },
    {
        icon: "📄",
        title: "Contratto digitale",
        description: "Clausole chiare, conformi alla normativa vigente. Firmi di persona o via raccomandata.",
    },
    {
        icon: "🏠",
        title: "Migliora il valore",
        description: "Consigli mirati per aumentare il valore del tuo immobile con stima ROI.",
    },
    {
        icon: "⭐",
        title: "Assistenza dedicata",
        description: "Agente personale, supporto chat e telefono durante orari lavorativi.",
    },
];

const PercheSceglierci = () => {
    const cardWrapperClasses = "bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1";
    const cardContentClasses = "p-6 text-center flex flex-col items-center h-full";
    const iconClasses = "text-4xl mb-3 text-teal-600";
    const titleClasses = "text-lg font-semibold text-gray-900 mb-2";
    const descriptionClasses = "text-gray-600 text-sm";


    return (
        <>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mt-8">
                Perché scegliere ImmobiliarisPLUS
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2">
                Un approccio innovativo per vendere casa senza stress
            </p>
            <section className="py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                    {featuresData.map((feature, index) => (

                        <Card key={index} className={cardWrapperClasses}>
                            <div className={cardContentClasses}>
                                <div className={iconClasses}>{feature.icon}</div>
                                <h3 className={titleClasses}>{feature.title}</h3>
                                <p className={descriptionClasses}>{feature.description}</p>
                            </div>
                        </Card>

                    ))}
                </div>
            </section>
        </>
    );
};

export default PercheSceglierci;