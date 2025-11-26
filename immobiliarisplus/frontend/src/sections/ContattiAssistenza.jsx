import Card from "../components/Card";

const MetodoContatto = ({ icon, title, subtitle, value, valueColor, isButton, link, color}) => {
    let buttoColor=''
    switch (color) {
        case 'yellow':
            buttoColor = "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500 text-gray-900";
            break;
        case 'green':
            buttoColor = "bg-teal-500 hover:bg-teal-600 focus:ring-teal-500 text-white";
            break;
        case 'blue':
            buttoColor = "bg-indigo-900 hover:bg-indigo-700 focus:ring-indigo-900 text-white";
            break;
        default:
            buttoColor = "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500";
    }
    const cardClasses = "p-6 rounded-lg shadow-md h-full text-center flex flex-col justify-between items-center bg-white";
    const baseButton = "font-semibold py-2 px-6 rounded-full inline-block transition duration-150 mt-3"
    return (
        <Card className={cardClasses}>
            <div className="flex flex-col items-center">
                <div className={`${valueColor} text-4xl mb-4`}>
                    {icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
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
        icon: '📞',
        title: 'Telefono',
        subtitle: 'Lun-Ven 9:00-18:00',
        value: '+39 02 1234 5678',
        valueColor: 'text-teal-500',
        link: 'tel:+390212345678',
        color: 'green'
    },
    {
        icon: '✉️',
        title: 'Email',
        subtitle: 'Risposta in 24h',
        value: 'Informazioni',
        valueColor: 'text-gray-700',
        link: 'mailto:info@immobiliarisplus.com',
        color: 'blue'
    },
    {
        icon: '📍',
        title: 'Vienici a trovare',
        subtitle: 'Via Jacopo Durandi 10, Torino',
        value: 'Mostra sulla mappa',
        valueColor: 'text-yellow-400',
        link: "https://www.google.com/maps/search/Via+Jacopo+Durandi+10,+Torino",
        color: 'yellow'
    },
];

const ContattiAssistenza = () => {
    return (
        <section className="py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {contactData.map((contact, index) => (
                    <MetodoContatto
                        key={index}
                        icon={contact.icon}
                        title={contact.title}
                        subtitle={contact.subtitle}
                        value={contact.value}
                        valueColor={contact.valueColor}
                        link={contact.link}
                        color={contact.color}
                    />
                ))}
            </div>
        </section>
    );
};

export default ContattiAssistenza;