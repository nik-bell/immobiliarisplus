import { useState } from 'react';
import Card from '../components/Card';
import FAQItem from '../components/FAQItem';

const faqData = [
    {
        id: 1,
        question: 'Quanto tempo serve per la valutazione?',
        answer: 'Ricevi la valutazione entro 72 ore, 24h per lead prioritari con documentazione completa.',
    },
    {
        id: 2,
        question: 'La valutazione ha un costo?',
        answer: 'No, la valutazione è completamente gratuita e senza impegno.',
    },
    {
        id: 3,
        question: 'Devo fornire documentazione complessa in anticipo?',
        answer: 'No, inizialmente ci bastano solo i dati base dell\'immobile. Ti guideremo passo dopo passo nella raccolta di eventuale documentazione più specifica, se necessaria.',
    },
];

const FAQAssistenza = () => {
    const [activeId, setActiveId] = useState(null);

    const toggleFAQ = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    const cardClasses = "p-6 bg-white rounded-lg shadow-xl border border-gray-100";

    return (
        <div className="my-8">
            <Card className={cardClasses}>
                <h2 className="text-xl font-semibold text-teal-700 mb-4">
                    FAQ rapide
                </h2>

                <div className="divide-y divide-gray-200">
                    {faqData.map((item) => (
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

export default FAQAssistenza;