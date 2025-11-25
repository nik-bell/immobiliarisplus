import BulletPoint from "../components/BulletPoint";

const ComeFunziona = () => {
    const dettagliBulletPoint = [
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
    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg my-8">
            <h2 className="text-2xl font-normal text-gray-900 mb-6">
                Come funziona
            </h2>
            <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
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

export default ComeFunziona;