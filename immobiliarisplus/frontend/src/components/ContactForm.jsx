import { useState, forwardRef, useImperativeHandle } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Button from "./Button.jsx";

const ContactForm = forwardRef(({ onSubmit }, ref) => {
    const INITIAL_STATE = {
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        messaggio: '',
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const resetForm = () => {
        setFormData(INITIAL_STATE);
    };

    useImperativeHandle(ref, () => ({
        resetForm
    }));

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const gridClasses = "grid grid-cols-1 md:grid-cols-2 md:gap-4";
    const buttonStyle = " px-6 py-3 bg-teal-500 text-white font-semibold text-base rounded-lg shadow-md hover:bg-teal-400 hover:shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50";

    return (
        <form onSubmit={handleSubmit} className="p-0">
            <div className={gridClasses}>
                <InputField
                    label="Nome"
                    id="nome"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleChange}
                />
                <InputField
                    label="Cognome"
                    id="cognome"
                    name="cognome"
                    placeholder="Cognome"
                    value={formData.cognome}
                    onChange={handleChange}
                />
            </div>

            <InputField
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="nome.cognome@email.it"
                value={formData.email}
                onChange={handleChange}
            />

            <InputField
                label="Telefono"
                id="telefono"
                name="telefono"
                type="number"
                placeholder="es: 333 123 4567"
                value={formData.telefono}
                onChange={handleChange}
            />

            <TextAreaField
                label="Messaggio"
                id="messaggio"
                name="messaggio"
                placeholder="Scrivi qua il mio messaggio ..."
                value={formData.messaggio}
                onChange={handleChange}
            />
            <Button type="submit" className={buttonStyle}>
                Invia messaggio
            </Button>
        </form>
    );
});

export default ContactForm;