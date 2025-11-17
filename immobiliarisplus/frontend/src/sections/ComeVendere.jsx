import BulletList from "../components/BulletList";

const ComeVendere = () => {
    const dettagliBulletPoint = [
        {
            number: 1,
            title: 'Valutazione accurata',
            description: 'Algoritmo AVM + revisione manuale per una stima precisa del valore di mercato',
            color: 'bg-teal-500',
        },
        {
            number: 2,
            title: 'Marketing professionale',
            description: 'Foto professionali, virtual tour, pubblicazione su tutti i principali portali',
            color: 'bg-blue-950',
        },
        {
            number: 3,
            title: 'Contratto in esclusiva',
            description: 'Ricevi il contratto personalizzato, controlla tutto dalla dashboard, massima trasparenza',
            color: 'bg-teal-500',
        },
        {
            number: 4,
            title: 'Assistenza dedicata',
            description: 'Un agente personale ti segue dall\'inizio alla firma del rogito',
            color: 'bg-yellow-400',
        },
    ];
    return (
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg my-4">
                <h2 className="text-2xl font-normal text-gray-900 mb-6">
                    Perché vendere con ImmobiliarisPLUS
                </h2>
                <div className="space-y-4">
                    {dettagliBulletPoint.map((dettaglioBulletPoint) => (
                        <BulletList
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

export default ComeVendere;