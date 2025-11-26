import Card from "../components/Card";

const featuresData = [
    {
        icon: "📈",
        title: "Valutazione precisa",
        description: "Algoritmo AVM basato su dati reali di mercato. Range accurato basato su zona e condizioni.",
        border: "border-t-4 border-teal-500",
    },
    {
        icon: "🔒",
        title: "Massima trasparenza",
        description: "Controlla ogni fase della vendita dalla tua dashboard personale.",
        border: "border-t-4 border-indigo-900",
    },
    {
        icon: "⏱️",
        title: "Velocità garantita",
        description: "Valutazione in 72 ore. Lead prioritari in 24h.",
        border: "border-t-4 border-yellow-400",
    },
    {
        icon: "📄",
        title: "Contratto digitale",
        description: "Clausole chiare, conformi alla normativa vigente. Firmi di persona o via raccomandata.",
        border: "border-t-4 border-teal-500",
    },
    {
        icon: "🏠",
        title: "Migliora il valore",
        description: "Consigli mirati per aumentare il valore del tuo immobile con stima ROI.",
        border: "border-t-4 border-indigo-900",
    },
    {
        icon: "⭐",
        title: "Assistenza dedicata",
        description: "Agente personale, supporto chat e telefono durante orari lavorativi.",
        border: "border-t-4 border-yellow-400",
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
                Perché scegliere ImmobiliarisPlus
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mt-2 mb-10">
                Scegliere Immobiliaris Plus significa scegliere un metodo di
                <strong className="font-semibold text-teal-700"> vendita immobiliare</strong> garantito che supera l'approccio tradizionale...
                <strong className="font-semibold text-teal-700"> prezzo finale ottimizzato</strong>.
            </p>
            <section className="pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                    {featuresData.map((feature, index) => (
                        <Card key={index} className={`${cardWrapperClasses} ${feature.border}`}>
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