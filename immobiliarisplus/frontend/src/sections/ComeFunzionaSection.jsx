import Card from '../components/Card';
import BulletPoint from '../components/BulletPoint';
import { Link } from 'react-router-dom';

/**
 * Dati degli step del processo "Migliora Casa".
 * Ogni step include numero, titolo, descrizione e colore associato.
 *
 * @type {Array<{number: number, title: string, description: string, color: string}>}
 */
const stepsData = [
    {
        number: 1,
        title: 'Analisi personalizzata',
        description: 'Valutiamo il tuo immobile e identifichiamo gli interventi con il miglior ROI',
        color: 'bg-indigo-900',
    },
    {
        number: 2,
        title: "Piano d'azione",
        description: 'Creiamo un piano dettagliato con preventivi da partner certificati',
        color: 'bg-teal-500',
    },
    {
        number: 3,
        title: 'Realizzazione',
        description: 'Coordiniamo i lavori e ti aggiorniamo costantemente sui progressi',
        color: 'bg-yellow-400',
    },
];

/**
 * ComeFunzionaSection Component
 *
 * Sezione informativa che spiega in 3 step come funziona
 * il servizio "Migliora Casa".
 *
 * Usa Card e BulletPoint per visualizzare gli step con layout responsive.
 *
 * @returns {JSX.Element} La sezione "Come funziona" del servizio Migliora Casa.
 */
const ComeFunzionaSection = () => {
    /** 
     * Classi CSS comuni per le card degli step.
     * @type {string}
     */
    const cardWrapperClasses =
        "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 h-full";

    return (
        <section className="w-full bg-gray-50 border-t border-gray-200 py-10 px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
                Come funziona il servizio "Migliora Casa"
            </h2>

            <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2 mb-10">
                Massimizza il <strong className="font-semibold text-teal-700">valore del tuo immobile</strong> prima di metterlo sul mercato.
                Con il nostro servizio <strong className="font-semibold text-teal-700">Migliora Casa</strong>, trasformiamo la tua proprietà con interventi mirati
                di <strong className="font-semibold text-teal-700">home staging</strong> e riqualificazione, per aumentare il
                <strong className="font-semibold text-teal-700"> prezzo di vendita</strong> e ridurre i tempi di trattativa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {stepsData.map((step) => (

                    <Card key={step.number} className={cardWrapperClasses}>
                        <div className="flex justify-center">
                            <BulletPoint
                                number={step.number}
                                title={step.title}
                                description={step.description}
                                colorClass={step.color}
                                className='flex flex-col items-center text-center'
                                value='homepage'
                            />
                        </div>
                    </Card>

                ))}

                {/** CTA */}
                <Link
                    to='/migliora-casa'
                    className='
                        col-span-full  
                        block           
                        max-w-xs        
                        mx-auto
                        px-6 py-3
                        bg-yellow-400 text-gray-900
                        font-semibold text-base
                        rounded-lg
                        shadow-md
                        hover:bg-yellow-300 hover:shadow-lg
                        transition duration-150 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50'
                >
                    Scopri di più
                </Link>
            </div>
        </section>
    );
};

export default ComeFunzionaSection;
