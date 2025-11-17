import Card from "../components/Card";
import Button from "../components/Button";

export default function CtaVendita() {
    const handleScopriDiPiu = () => {

    };
    return (
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="pt-6 lg:w-1/2">
                <Card
                    className="
                    rounded-xl 
                    p-8 md:p-10
                    bg-gradient-to-br from-teal-500 to-teal-800 
                    text-white 
                    text-center
                    border-2
                    border-trasparent
                    "
                >

                    <h3 className="text-3xl font-bold mb-3">
                        Contratto Esclusiva
                    </h3>

                    <p className="text-lg font-light mb-8 opacity-90">
                        Massima visibilità e gestione professionale della vendita
                    </p>

                    <Button
                        onClick={handleScopriDiPiu}
                        className="
                            px-6 py-3
                            bg-white text-teal-700
                            font-semibold text-base
                            rounded-lg
                            shadow-md
                            hover:bg-gray-100 hover:shadow-lg
                            transition duration-150 ease-in-out
                            focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    >
                        Scopri di più
                    </Button>
                </Card>
            </div>

            <div className="pt-6 lg:w-1/2">
                <Card
                    className="
                    rounded-xl 
                    p-8 md:p-10
                    bg-white
                    text-black 
                    text-center
                    border-2
                    border-yellow-400
                    "
                >

                    <h3 className="text-3xl font-bold mb-3 text-blue-950">
                        Migliora Casa
                    </h3>

                    <p className="text-lg font-light mb-8 opacity-90">
                        Aumenta il valore prima di vendere con il nostro servizio dedicato
                    </p>

                    <Button
                        onClick={handleScopriDiPiu}
                        className="
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
                    </Button>
                </Card>
            </div>
        </div>
    )
}