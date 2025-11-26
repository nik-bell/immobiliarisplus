import Card from '../components/Card';
import BulletPoint from '../components/BulletPoint';

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

const ComeFunzionaSection = () => {
    const cardWrapperClasses = "bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 h-full";

    return (
        <section className="w-full bg-gray-50 border-t border-gray-200 py-16 px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
                Come funziona  migliora casa
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2 mb-10">
                Tre semplici passaggi per vendere casa
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
                                className='flex flex-col justify-center'
                            />
                        </div>

                    </Card>

                ))}
            </div>
        </section>
    );
};

export default ComeFunzionaSection;