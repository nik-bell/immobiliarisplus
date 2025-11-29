import Card from "../components/Card";

import IconCall from "../assets/icone/call/call_nero/call_nero.svg";
import IconEmail from "../assets/icone/mail/mail_nero/mail_nero.svg";
import IconLocation from "../assets/icone/explore_nearby/explore_nearby_nero/explore_nearby_nero.svg";

const MetodoContatto = ({ icon, title, subtitle, value, valueColor, isButton = false, link }) => {
    const cardClasses = "p-6 rounded-lg shadow-md h-full text-center flex flex-col justify-between items-center";
    const valueBaseClasses = "mt-2 font-semibold";

    return (
        <Card className={cardClasses}>
            <div className="flex flex-col items-center">

                
                <img 
                    src={icon} 
                    alt={title} 
                    className="w-12 h-12 mb-4 opacity-90"
                />

                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
            </div>

            <div className="mt-auto">
                {isButton ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full inline-block transition duration-150"
                    >
                        {value}
                    </a>
                ) : (
                    <p className={`${valueBaseClasses} ${valueColor}`}>
                        {value}
                    </p>
                )}
            </div>
        </Card>
    );
};

const contactData = [
    {
        icon: IconCall,
        title: "Telefono",
        subtitle: "Lun-Ven 9:00-18:00",
        value: "+39 02 1234 5678",
        valueColor: "text-teal-500",
        isButton: false,
    },
    {
        icon: IconEmail,
        title: "Email",
        subtitle: "Risposta in 24h",
        value: "info@immobiliarisplus.it",
        valueColor: "text-gray-700",
        isButton: false,
    },
    {
        icon: IconLocation,
        title: "Vienici a trovare",
        subtitle: "Via Jacopo Durandi 10, Torino",
        value: "Mostra sulla mappa",
        valueColor: "text-yellow-400",
        isButton: true,
        link: "https://maps.app.goo.gl/YourMapLinkHere",
    },
];

const ContattiAssistenza = () => {
    return (
        <section className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactData.map((contact, index) => (
                    <MetodoContatto
                        key={index}
                        icon={contact.icon}
                        title={contact.title}
                        subtitle={contact.subtitle}
                        value={contact.value}
                        valueColor={contact.valueColor}
                        isButton={contact.isButton}
                        link={contact.link}
                    />
                ))}
            </div>
        </section>
    );
};

export default ContattiAssistenza;
