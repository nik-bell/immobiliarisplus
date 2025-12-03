import Card from '../components/Card';
import BulletPoint from '../components/BulletPoint';
import { Link } from 'react-router-dom';

/**
 * Lista dei passaggi mostrati nella sezione "Come Funziona".
 * Ogni step contiene numero, titolo, descrizione e un colore identificativo.
 * @type {Array<{number: number, title: string, description: string, color: string}>}
 */
const stepsData = [
    {
        number: 1,
        title: 'Valuta la tua casa',
        description: 'Compila il form in 3 minuti con i dati essenziali del tuo immobile',
        color: 'bg-indigo-900',
    },
    {
        number: 2,
        title: "Ricevi la valutazione",
        description: 'In 72 ore ricevi un range di valutazione dettagliato e personalizzato',
        color: 'bg-teal-500',
    },
    {
        number: 3,
        title: 'Vendi con noi',
        description: 'Ricevi il contratto in esclusiva e monitora tutto dalla tua dashboard',
        color: 'bg-yellow-400',
    },
];

/**
 * ComeFunzionaHomepage Component
 *
 * Sezione della homepage che mostra i tre passaggi principali
 * del processo di valutazione e vendita immobiliare.
 *
 * Utilizza componenti Card e BulletPoint per visualizzare ciascun step.
 *
 * @returns {JSX.Element} La sezione informativa "Come funziona la vendita dell'immobile".
 */
const ComeFunzionaHomepage = () => {
    /** 
     * Classi CSS comuni assegnate alle card che contengono ciascun step.
     * @type {string}
     */
    const cardWrapperClasses = "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 h-full";

    return (
        <section className="w-full border-t border-gray-200 py-10 px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
                Come funziona la vendita dell'immobile
            </h2>

            <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2 mb-10">
                Scopri il nostro metodo collaudato per <strong className="font-semibold text-teal-700">vendere casa</strong> velocemente e senza stress.
                Abbiamo condensato l'intero processo in <strong className="font-semibold text-teal-700">tre semplici passaggi</strong>:
                dalla <strong className="font-semibold text-teal-700">valutazione immobiliare gratuita</strong>, passando per una promozione strategica,
                fino alla firma del rogito al miglior <strong className="font-semibold text-teal-700">prezzo di mercato</strong>.
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
                                className='flex flex-col'
                                value='homepage'
                            />
                        </div>

                    </Card>

                ))}

                {/** CTA button */}
                <Link
                    to='/valuta-casa'
                    className='
                        col-span-full  
                        block           
                        max-w-xs        
                        mx-auto
                        px-6 py-3
                        bg-teal-700 text-white
                        font-semibold text-base text-center
                        rounded-lg
                        shadow-md
                        hover:bg-teal-400 hover:shadow-lg
                        transition duration-150 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50'
                >
                    Inizia la valutazione
                </Link>
                
            </div>
        </section>
    );
};

export default ComeFunzionaHomepage;
