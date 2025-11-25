import ContactForm from "../components/ContactForm";

const FormAssistenza = () => {
    
    const handleFormSubmit = (data) => {
        console.log('Dati invitai dal form: ', data);
    }

    return (
        <div className="p-8 bg-white rounded-lg shadow-xl border border-gray-100">
            <h2 className="text-xl font-normal text-teal-600 mb-6">
                Invia un messaggio
            </h2>
            <ContactForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default FormAssistenza;