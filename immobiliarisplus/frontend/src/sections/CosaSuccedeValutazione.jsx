import BulletPoint from "../components/BulletPoint";

const CosaSuccedeValutazione = () => {
    const dettagliBulletPoint = [
        {
            number: 1,
            title: 'Analisi automatica',
            description: 'Il nostro algoritmo AVM analizza i dati del tuo immobile e li confronta con il mercato locale',
            color: 'bg-teal-500',
        },
        {
            number: 2,
            title: "Revisione manuale",
            description: 'Un agente esperto verifica la valutazione e la personalizza in base alle tue specifiche',
            color: 'bg-indigo-900',
        },
        {
            number: 3,
            title: 'Ricezione valutazione via email',
            description: "Riceverai una mail con: riepilogo dati, range di valutazione e se vorrei approfondire possiamo organizzare un incontro",
            color: 'bg-yellow-400',
        },
    ];
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg my-8">
            <h2 className="text-2xl font-normal text-gray-900 mb-6 text-left">
                Cosa Succede ora?
            </h2>
            <div className="flex flex-col space-y-8">
                {dettagliBulletPoint.map((dettaglioBulletPoint) => (
                    <BulletPoint
                        key={dettaglioBulletPoint.number}
                        number={dettaglioBulletPoint.number}
                        title={dettaglioBulletPoint.title}
                        description={dettaglioBulletPoint.description}
                        colorClass={dettaglioBulletPoint.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default CosaSuccedeValutazione;