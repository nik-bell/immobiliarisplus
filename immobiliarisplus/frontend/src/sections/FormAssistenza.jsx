import ContactForm from "../components/ContactForm";
import { useState, useRef } from "react";

/**
 * SuccessModal Component
 *
 * Mostra una modale di conferma dopo il corretto invio del form.
 *
 * @param {Object} props
 * @param {string} props.nome - Nome dell'utente che ha inviato il form.
 * @param {string} props.cognome - Cognome dell'utente che ha inviato il form.
 * @param {Function} props.onClose - Funzione per chiudere la modale.
 * @returns {JSX.Element} La modale visualizzata al centro della pagina.
 */
const SuccessModal = ({ nome, cognome, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto text-center transform scale-100 transition-transform duration-300">
                <h3 className="text-3xl font-semibold text-teal-700 mb-4">Invio Riuscito!</h3>
                <p className="text-gray-700 text-lg mb-6">
                    Grazie <span className="font-bold">{nome} {cognome}</span>, il tuo messaggio è stato inviato con successo.
                    <br />
                    Un agente Immobiliaris ti risponderà al più presto.
                </p>
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-teal-700 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-150"
                >
                    Chiudi
                </button>
            </div>
        </div>
    );
};

/**
 * FormAssistenza Component
 *
 * Gestisce il form di contatto, mostra una modale di successo
 * e permette il reset del form tramite ref.
 *
 * @returns {JSX.Element} Il contenitore del form assistenza e della modale.
 */
const FormAssistenza = () => {
    const formRef = useRef(null);

    /** @type {[boolean, Function]} Stato che controlla la visibilità della modale. */
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    /** @type {[{nome:string, cognome:string}, Function]} - Dati inviati dall'utente. */
    const [submitData, setSubmitData] = useState({ nome: '', cognome: '' });

    /**
     * Gestisce la submit del form.
     *
     * @param {{nome: string, cognome: string}} data - Dati inviati dal form.
     */
    const handleFormSubmit = (data) => {
        setSubmitData({ nome: data.nome, cognome: data.cognome });
        setShowSuccessModal(true);

        // Resetta il form se la funzione è esposta dal child
        if (formRef.current && formRef.current.resetForm) {
            formRef.current.resetForm();
        }
    };

    /** Chiude la modale di successo. */
    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-xl border border-gray-100">
            <h2 className="text-xl font-normal text-teal-700 mb-6">
                Invia un messaggio
            </h2>

            {/* Form di contatto */}
            <ContactForm onSubmit={handleFormSubmit} ref={formRef} />

            {/* Modale di successo */}
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
