import Card from "../components/Card";

import IconCall from "../assets/icone/call/call_verde/call_verde.svg";
import IconEmail from "../assets/icone/mail/mail_blu/mail_blu.png";
import IconLocation from "../assets/icone/explore_nearby/explore_nearby_giallo/explore_nearby_giallo.png";

const MetodoContatto = ({ icon, title, subtitle, value, link, color }) => {
        let buttoColor=''
    switch (color) {
        case 'yellow':
            buttoColor = "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-gray-900";
            break;
        case 'green':
            buttoColor = "bg-teal-700 hover:bg-teal-600 focus:ring-teal-700 text-white";
            break;
        case 'blue':
            buttoColor = "bg-indigo-900 hover:bg-indigo-700 focus:ring-indigo-900 text-white";
            break;
        default:
            buttoColor = "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500";
    }
    const cardClasses = "p-6 rounded-lg shadow-md h-full text-center flex flex-col justify-between items-center";
    const baseButton = "font-semibold py-2 px-6 rounded-full inline-block transition duration-150 mt-3"
    const valueBaseClasses = "mt-2 font-semibold";

    return (
        <Card className={cardClasses}>
            <div className="flex flex-col items-center">

                
                <img 
                    src={icon} 
                    alt={title} 
                    className="w-12 h-12 mb-4 opacity-90"
                />

                <h2 className="h3 text-lg font-semibold text-gray-800">{title}</h2>
                <p className="text-sm text-gray-700 mb-4">{subtitle}</p>
            </div>

            <div className="mt-auto">
                <a
                    href={link}
                    target={link.startsWith('http') ? "_blank" : "_self"}
                    rel={link.startsWith('http') ? "noopener noreferrer" : ""}
                    className={`${baseButton} ${buttoColor}`}
                >
                    {value}
                </a>
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
        valueColor: "text-teal-700",
        link: 'tel:+390212345678',
        color: 'green'
    },
    {
        icon: IconEmail,
        title: "Email",
        subtitle: "Risposta in 24h",
        value: "Informazioni",
        valueColor: "text-gray-700",
        link: 'mailto:info@immobiliarisplus.com',
        color: 'blue'
    },
    {
        icon: IconLocation,
        title: "Vienici a trovare",
        subtitle: "Via Jacopo Durandi 10, Torino",
        value: "Mostra sulla mappa",
        valueColor: "text-yellow-400",
        link: "https://www.google.com/maps/search/Via+Jacopo+Durandi+10,+Torino",
        color: 'yellow'
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
                        color={contact.color}
                    />
                ))}
            </div>
        </section>
    );
};

export default ContattiAssistenza;
