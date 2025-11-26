import ContactForm from "../components/ContactForm";
import { useState, useRef } from "react";

const SuccessModal = ({ nome, cognome, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto text-center transform scale-100 transition-transform duration-300">
                <h3 className="text-3xl font-semibold text-teal-600 mb-4">Invio Riuscito!</h3>
                <p className="text-gray-700 text-lg mb-6">
                    Grazie <span className="font-bold">{nome} {cognome}</span>, il tuo messaggio è stato inviato con successo.
                    <br />
                    Un agente Immobiliaris ti risponderà al più presto.
                </p>
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-150"
                >
                    Chiudi
                </button>
            </div>
        </div>
    );
};

const FormAssistenza = () => {
    const formRef = useRef(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [submitData, setSubmitData] = useState({ nome: '', cognome: '' });

    const handleFormSubmit = (data) => {
        console.log('Dati inviati dal form: ', data);
        setSubmitData({ nome: data.nome, cognome: data.cognome });
        setShowSuccessModal(true);
        if (formRef.current && formRef.current.resetForm) {
            formRef.current.resetForm();
        }
    }

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-xl border border-gray-100">
            <h2 className="text-xl font-normal text-teal-600 mb-6">
                Invia un messaggio
            </h2>
            <ContactForm onSubmit={handleFormSubmit} ref={formRef} />

            {showSuccessModal && (
                <SuccessModal
                    nome={submitData.nome}
                    cognome={submitData.cognome}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default FormAssistenza;