/**
 * @file ContactForm.jsx
 * @description Contact form component with name, email, phone, and message fields.
 *              Supports imperative reset via ref and form submission callback.
 */

import { useState, forwardRef, useImperativeHandle } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import Button from "./Button.jsx";

/**
 * Contact form data shape.
 * @typedef {Object} ContactFormData
 * @property {string} nome - First name.
 * @property {string} cognome - Last name.
 * @property {string} email - Email address.
 * @property {string} telefono - Phone number.
 * @property {string} messaggio - Message body.
 */

/**
 * Props for ContactForm component.
 * @typedef {Object} ContactFormProps
 * @property {Function} onSubmit - Callback fired on form submission with form data.
 */

/**
 * ContactForm (forwardRef)
 *
 * A contact form component with fields for name, last name, email, phone, and message.
 * Supports imperative form reset via ref. Fires onSubmit callback with form data on submission.
 *
 * @param {ContactFormProps} props
 * @param {Function} props.onSubmit - Callback invoked on form submit with ContactFormData object.
 * @param {React.Ref} ref - Ref exposing resetForm method to clear all fields.
 * @returns {JSX.Element} Contact form element.
 */
const ContactForm = forwardRef(({ onSubmit }, ref) => {
    const INITIAL_STATE = {
        nome: '',
        cognome: '',
        email: '',
        telefono: '',
        messaggio: '',
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    
    /**
     * Reset form fields to initial state.
     */
    const resetForm = () => {
        setFormData(INITIAL_STATE);
    };

    useImperativeHandle(ref, () => ({
        resetForm
    }));

    /**
     * Handle form field changes.
     *
     * @param {Event} e - Input change event.
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Handle form submission.
     *
     * @param {Event} e - Form submit event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const gridClasses = "grid grid-cols-1 md:grid-cols-2 md:gap-4";
    const buttonStyle = " px-6 py-3 bg-teal-700 text-white font-semibold text-base rounded-lg shadow-md hover:bg-teal-500 hover:shadow-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50";

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