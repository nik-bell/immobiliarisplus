import Card from '../components/Card';     
import BulletPoint from '../components/BulletPoint';

const ComeFunzionaContratto = () => {
    const stepColorClass = "bg-teal-500"; 
    
    return (
        <div className="p-8">
            <Card className="bg-white rounded-xl shadow-lg p-8 mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                    Come funziona il processo
                </h2>
                <BulletPoint 
                    number={1}
                    title="Richiedi il preventivo"
                    description="Compila il form online con i dati del tuo immobile. Ricevi entro 72 ore un preventivo dettagliato con range di valutazione."
                    colorClass={stepColorClass}
                />
                
                <BulletPoint 
                    number={2}
                    title="Incontro con l'agente"
                    description="L'agente dedicato effettua un sopralluogo gratuito, verifica i documenti e discute la strategia di vendita."
                    colorClass={stepColorClass}
                />

                <BulletPoint 
                    number={3}
                    title="Firma del contratto"
                    description="Ricevi il contratto personalizzato con clausole chiare. Puoi firmarlo di persona o tramite raccomandata. Durata tipica: 6-12 mesi."
                    colorClass={stepColorClass}
                />

                <BulletPoint 
                    number={4}
                    title="Promozione attiva"
                    description="Iniziamo subito con foto professionali, pubblicazione sui principali portali, visite guidate e reportistica mensile."
                    colorClass={stepColorClass}
                />

                <BulletPoint 
                    number={5}
                    title="Vendita e rogito"
                    description="Ti supportiamo fino al rogito, gestendo trattativa, documenti e aspetti burocratici."
                    colorClass={stepColorClass}
                />

            </Card>
        </div>
    );
};

export default ComeFunzionaContratto;