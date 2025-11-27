import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function CtaMigliora() {
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
                            Consulenza Gratuita
                        </h3>
                        <p className="text-lg font-light mb-8 opacity-90">
                            Parla con un nostro esperto per personalizzare il piano di miglioramento
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            to="/contattaci"
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
                            Richiedi consulenza
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
                            Richiedi Preventivo
                        </h3>
                        <p className="text-lg font-light mb-8 opacity-90">
                            Ottieni una valutazione e scopri come aumentare il valore della tua casa
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            to="/contattaci"
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
                            Valuta Casa Ora
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    )
}