import Card from '../components/Card';

import IconMoving from "../assets/icone/moving/moving_verde/moving_verde.svg";
import IconSchedule from "../assets/icone/schedule_orologio/schedule_blu/schedule_blu.png";
import IconPerson from '../assets/icone/Person/Person_verde/Person_verde.svg'
import IconPrice from '../assets/icone/best_price/best_price_giallo/best-price-giallo.png'

const featuresData = [
    { 
      icon: IconMoving,  
      title: "Maggiore visibilità", 
      description: "Investiamo risorse dedicate su marketing, foto professionali e promozione mirata del tuo immobile."
     },
    { 
      icon: IconSchedule,  
      title: "Vendita più rapida", 
      description: "Strategia coordinata e follow-up costante riducono i tempi di vendita fino al 40%." 
    },
    { 
        icon: IconPrice, 
        title: "Prezzi migliori", 
        description: "Valutazione accurata e negoziazione professionale garantiscono il miglior prezzo di mercato." 
    },
    {
        icon: IconPerson, 
        title: "Agente dedicato", 
        description: "Un solo punto di riferimento che conosce a fondo il tuo immobile e le tue esigenze." 
    },
];

const topBorderColors = [
    "border-t-4 border-[#2CC6A3]",
    "border-t-4 border-indigo-900",  
    "border-t-4 border-[#F4C542]", 
    "border-t-4 border-[#2CC6A3]", 
];

/**
 * PercheScegliereEsclusiva Component
 *
 * Sezione informativa che illustra i principali vantaggi
 * del **contratto di vendita in esclusiva**.
 *
 * Presenta una serie di card, ognuna con:
 * - icona illustrativa
 * - titolo del beneficio
 * - breve descrizione
 *
 * Utilizzato nella pagina dedicata all'esclusiva per comunicare
 * al cliente i vantaggi concreti di questa modalità contrattuale.
 *
 * @component
 * @returns {JSX.Element} Una sezione con i motivi principali per scegliere l’esclusiva immobiliare.
 */
const PercheScegliereEsclusiva = () => {
    const cardWrapperClasses =
        "bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1";

    const cardContentClasses =
        "p-6 text-center flex flex-col items-center h-full";

    const iconClasses = "w-10 h-10 mb-3";
    const titleClasses = "text-lg font-semibold text-gray-900 mb-2";
    const descriptionClasses = "text-gray-600 text-sm";
    return (
        <div className="p-8">
            <h2 className="text-3xl text-center mb-10 text-gray-800">
                Perché scegliere l'esclusiva?
            </h2>
            <section className="pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
                    {featuresData.map((feature, index) => (
                        <Card
                            key={index}
                            className={`${cardWrapperClasses} ${topBorderColors[index]}`}
                        >
                            <div className={cardContentClasses}>
                                <img src={feature.icon} alt="icon" className={iconClasses} />
                                <h3 className={titleClasses}>{feature.title}</h3>
                                <p className={descriptionClasses}>{feature.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PercheScegliereEsclusiva;
