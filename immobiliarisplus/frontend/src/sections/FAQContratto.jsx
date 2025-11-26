import { useState } from 'react';
import Card from '../components/Card';
import FAQItem from '../components/FAQItem';

const faqsData = [
    {
        id: 1,
        question: "Posso vendere da solo se ho un'offerta diretta?",
        answer: "Sì, molti contratti includono una clausola che ti permette di vendere autonomamente a contatti personali, senza pagare provvigione. Verifica sempre le condizioni specifiche."
    },
    {
        id: 2,
        question: "Cosa succede se voglio recedere?",
        answer: "Puoi recedere anticipatamente in caso di giusta causa (motivi personali gravi, trasferimento urgente) o secondo le clausole concordate. Non ci sono penali onerose."
    },
    {
        id: 3,
        question: "Quando pago la provvigione?",
        answer: "Solo al momento del rogito, quando la vendita è conclusa e il pagamento è avvenuto. Nessun costo anticipato."
    },
    {
        id: 4,
        question: "Il contratto è firmabile online?",
        answer: "No, per garantire massima trasparenza e sicurezza legale, il contratto viene firmato di persona o tramite raccomandata con ricevuta di ritorno."
    },
];


const FAQContratto = () => {
    const [activeId, setActiveId] = useState(null);

    const toggleFAQ = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    const cardClasses = "p-6 bg-white rounded-lg shadow-xl border border-gray-100";

    return (
        <div className="my-8">
            <Card className={cardClasses}>
                <h2 className="text-xl font-semibold text-teal-600 mb-4">
                    FAQ rapide
                </h2>

                <div className="divide-y divide-gray-200">
                    {faqsData.map((item) => (
                        <FAQItem
                            key={item.id}
                            question={item.question}
                            answer={item.answer}
                            isOpen={activeId === item.id}
                            onClick={() => toggleFAQ(item.id)}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default FAQContratto;