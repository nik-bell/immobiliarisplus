import Card from "../components/Card";

const valoriData = [
    {
        icon: "🔍",
        titolo: "Trasparenza",
        testo: "Ogni fase del processo è tracciabile. Nessuna sorpresa, solo chiarezza e documentazione completa."
    },
    {
        icon: "🎯",
        titolo: "Precisione",
        testo: "Valutazioni basate su dati reali di mercato con algoritmi AVM certificati e revisione manuale."
    },
    {
        icon: "📈",
        titolo: "Risultati",
        testo: "Il nostro obiettivo è vendere al miglior prezzo nel minor tempo possibile. Dati alla mano."
    },
    {
        icon: "🤝",
        titolo: "Assistenza",
        testo: "Un agente dedicato ti segue dall'inizio alla fine. Sempre disponibile, sempre professionale."
    }
];

const NostriValori = () => {
    // Aggiunto `transform hover:-translate-y-1` per l'effetto sollevamento
    const cardWrapperClasses = "bg-white rounded-xl shadow-sm border-t-4 border-teal-500 flex items-start gap-4 min-h-[160px] p-6 transition shadow-sm transform hover:shadow-md hover:-translate-y-1";
    const iconWrapperClasses = "bg-teal-50 w-12 h-12 rounded-lg flex items-center justify-center text-teal-600 flex-shrink-0 text-2xl";
    const titleClasses = "text-lg font-semibold text-gray-800";
    const textClasses = "text-gray-600 text-sm mt-1";

    return (
        <section className="w-full py-16 bg-white">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
                I nostri valori
            </h2>
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {valoriData.map((valore, i) => (
                    <Card key={i} className={cardWrapperClasses}>
                        <div className={iconWrapperClasses}>{valore.icon}</div>
                        <div className="flex-1">
                            <h3 className={titleClasses}>{valore.titolo}</h3>
                            <p className={textClasses}>{valore.testo}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default NostriValori;
