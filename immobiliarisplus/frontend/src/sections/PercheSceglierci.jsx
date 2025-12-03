import Card from "../components/Card";

// Icone SVG
import IconMoving from "../assets/icone/moving/moving_verde/moving_verde.svg";
import IconSchedule from "../assets/icone/schedule_orologio/schedule_giallo/schedule_giallo.svg";
import IconCheckContract from "../assets/icone/contrattocheck/contrattocheck_verde/contrattocheck_verde.svg";
import IconHome from "../assets/icone/Home/Home_blu/Home_blu.png";
import IconStar from "../assets/icone/star/star_gialla/star_gialla.svg";
import IconShield from "../assets/icone/shield/shield_blu/shield_blu.png";

const featuresData = [
    { 
      icon: IconMoving,  
      title: "Valutazione precisa", 
      description: "Algoritmo AVM basato su dati reali di mercato. Range accurato basato su zona e condizioni."
     },
    { 
      icon: IconShield,  
      title: "Massima trasparenza", 
      description: "Controlla ogni fase della vendita dalla tua dashboard personale." 
    },
    { 
        icon: IconSchedule, 
        title: "Velocità garantita", 
        description: "Valutazione in 72 ore. Lead prioritari in 24h." 
    },
    {
        icon: IconCheckContract, 
        title: "Contratto digitale", 
        description: "Clausole chiare, conformi alla normativa vigente." 
    },
    { 
        icon: IconHome, 
        title: "Migliora il valore", 
        description: "Consigli mirati per aumentare il valore del tuo immobile con stima ROI." 
    },
    {
        icon: IconStar, 
        title: "Assistenza dedicata", 
        description: "Agente personale, supporto chat e telefono." 
    },
];

//  Top border color for each card
const topBorderColors = [
    "border-t-4 border-[#2CC6A3]", 
    "border-t-4 border-indigo-900",      
    "border-t-4 border-[#F4C542]",  
    "border-t-4 border-[#2CC6A3]",  
    "border-t-4 border-indigo-900",      
    "border-t-4 border-[#F4C542]"   
];


const PercheSceglierci = () => {
    const cardWrapperClasses =
        "bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1";

    const cardContentClasses =
        "p-6 text-center flex flex-col items-center h-full";

    const iconClasses = "w-10 h-10 mb-3";
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

            <section className="py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
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
        </>
    );
};

export default PercheSceglierci;
