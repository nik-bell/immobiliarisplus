import Card from '../components/Card';

const PercheScegliereEsclusiva = () => {
    return (
        <div className="p-8">
            <h2 className="text-3xl text-center mb-10 text-gray-800">
                Perché scegliere l'esclusiva?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="bg-white rounded-lg shadow-md p-6 border-t-4 border-t-teal-500">
                    <div className="flex items-start">
                        <div className="p-3 rounded-lg bg-teal-50 text-teal-600 text-xl mr-4">
                            📈
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">
                                Maggiore visibilità
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Investiamo risorse dedicate su marketing, foto professionali e promozione mirata del tuo immobile.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="bg-white rounded-lg shadow-md p-6 border-t-4 border-t-indigo-900">
                    <div className="flex items-start">
                        <div className="p-3 rounded-lg bg-blue-50 text-blue-600 text-xl mr-4">
                            ⏱️
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">
                                Vendita più rapida
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Strategia coordinata e follow-up costante riducono i tempi di vendita fino al 40%.
                            </p>
                        </div>
                    </div>
                </Card>
                
                <Card className="bg-white rounded-lg shadow-md p-6 border-t-4 border-t-yellow-500">
                    <div className="flex items-start">
                        <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600 text-xl mr-4">
                            🧑‍💼
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">
                                Agente dedicato
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Un solo punto di riferimento che conosce a fondo il tuo immobile e le tue esigenze.
                            </p>
                        </div>
                    </div>
                </Card>
                
                <Card className="bg-white rounded-lg shadow-md p-6 border-t-4 border-t-teal-500">
                    <div className="flex items-start">
                        <div className="p-3 rounded-lg bg-green-50 text-green-600 text-xl mr-4">
                            🛡️
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">
                                Prezzi migliori
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Valutazione accurata e negoziazione professionale garantiscono il miglior prezzo di mercato.
                            </p>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default PercheScegliereEsclusiva;