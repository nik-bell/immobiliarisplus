import Card from "../components/Card";

import IconShield2 from "../assets/icone/shield/shield_verde/shield_verde.png";
import IconTarget from "../assets/icone/target-icon/target_verde/target_verde.png";
import IconMoving from "../assets/icone/moving/moving_verde/moving_verde.svg";
import IconPerson from "../assets/icone/Home/Home_verde/Home_verde.png";

const valoriData = [
    {
        icon: IconShield2,
        titolo: "Trasparenza",
        testo: "Ogni fase del processo è tracciabile. Nessuna sorpresa, solo chiarezza e documentazione completa."
    },
    {
        icon: IconTarget,
        titolo: "Precisione",
        testo: "Valutazioni basate su dati reali di mercato con algoritmi AVM certificati e revisione manuale."
    },
    {
        icon: IconMoving,
        titolo: "Risultati",
        testo: "Il nostro obiettivo è vendere al miglior prezzo nel minor tempo possibile. Dati alla mano."
    },
    {
        icon: IconPerson,
        titolo: "Assistenza",
        testo: "Un agente dedicato ti segue dall'inizio alla fine. Sempre disponibile, sempre professionale."
    }
];

const NostriValori = () => {
    // Added transform hover:-translate-y-1 for the lift-on-hover effect
    const cardWrapperClasses = "bg-white rounded-xl shadow-sm border-t-4 border-teal-500 flex items-start gap-4 min-h-[160px] p-6 transition shadow-sm transform hover:shadow-md hover:-translate-y-1";
    const iconWrapperClasses = "bg-teal-50 w-12 h-12 rounded-lg flex items-center justify-center text-teal-600 flex-shrink-0 text-2xl";
    const titleClasses = "text-lg font-semibold text-gray-800";
    const textClasses = "text-gray-600 text-sm mt-1";

    return (
        <section className="w-full py-16 bg-gray-50">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
                I nostri valori
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mt-2 mb-10">
                In un mercato complesso, fondiamo il nostro lavoro su
                <strong className="font-semibold text-indigo-900"> trasparenza assoluta</strong> ed
                <strong className="font-semibold text-indigo-900"> etica professionale</strong>.
                Per noi, garantirti zero costi occulti e una gestione della
                <strong className="font-semibold text-indigo-900"> compravendita immobiliare</strong> onesta
                è la priorità. Costruiamo un rapporto di <strong className="font-semibold text-indigo-900">fiducia </strong>
                solido, accompagnandoti in ogni fase con chiarezza e competenza.
            </p>
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {valoriData.map((valore, i) => (
                    <Card key={i} className={cardWrapperClasses}>
    <div className={iconWrapperClasses}>
        <img src={valore.icon} alt={valore.titolo} className="w-7 h-7" />
    </div>
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
