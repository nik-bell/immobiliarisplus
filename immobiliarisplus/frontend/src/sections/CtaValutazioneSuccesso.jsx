import Card from "../components/Card";
import { Link } from "react-router-dom";

/**
 * CtaValutazioneSuccesso Component
 *
 * Mostra due call-to-action dopo l'invio riuscito della valutazione:
 *  1. Invito a scoprire il servizio di "Contratto in Esclusiva"
 *  2. Invito a visitare la pagina "Migliora Casa"
 *
 * Ogni card è strutturata con titolo, descrizione e un pulsante che
 * rimanda alla pagina dedicata. Ideale per guidare l’utente verso
 * i prossimi step dopo aver completato la valutazione.
 *
 * @returns {JSX.Element} Sezione con due CTA grafiche affiancate.
 */
export default function CtaValutazioneSuccesso() {
    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="pt-6 lg:w-1/2">
                <Card
                    className="
                    flex flex-col h-full
                    rounded-xl 
                    p-8 md:p-10
                    bg-gradient-to-br from-teal-500 to-teal-800 
                    text-white 
                    text-center
                    min-h-full
                    "
                >
                    <div className="flex-grow">
                        <h3 className="text-3xl font-bold mb-3">
                            Contratto in Esclusiva
                        </h3>
                        <p className="text-lg font-light mb-8 opacity-90">
                            Scopri tutti i vantaggi e i servizi dedicati per vendere al miglior prezzo e in tempi rapidi.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            to='/contratto-esclusiva'
                            className="
                            w-1/1 md:w-1/2
                            px-6 py-3
                            bg-white text-teal-700
                            font-semibold text-base
                            rounded-lg
                            shadow-md
                            hover:bg-gray-100 hover:shadow-lg
                            transition duration-150 ease-in-out
                            focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                        >
                            Scopri l'Esclusiva
                        </Link>
                    </div>
                </Card>
            </div>

            <div className="pt-6 lg:w-1/2">
                <Card
                    className="
                    flex flex-col h-full
                    rounded-xl 
                    p-8 md:p-10
                    bg-white
                    text-black 
                    text-center
                    border-2
                    border-yellow-400
                    "
                >
                    <div className="flex-grow">
                        <h3 className="text-3xl font-bold mb-3 text-blue-950">
                            Migliora Casa
                        </h3>
                        <p className="text-lg font-light mb-8 opacity-90">
                            Aumenta il valore prima di vendere con il nostro servizio dedicato
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            to='/migliora-casa'
                            className="
                                w-1/1 md:w-1/2
                                px-6 py-3
                                bg-yellow-400 text-black
                                font-semibold text-base
                                rounded-lg
                                shadow-md
                                hover:bg-yellow-300 hover:shadow-lg
                                transition duration-150 ease-in-out
                                focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                        >
                            Scopri di più
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}
