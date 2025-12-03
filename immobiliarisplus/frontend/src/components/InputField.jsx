/**
 * @file InputField.jsx
 * @description Reusable input field component with label, validation indicator, and custom styling.
 *              Supports optional fields and various input types.
 */

/**
 * Props for InputField component.
 * @typedef {Object} InputFieldProps
 * @property {string} label - Label text displayed above the input.
 * @property {string} id - Unique identifier for the input element.
 * @property {string} [type] - HTML input type (e.g., "text", "email", "number"). Defaults to "text".
 * @property {string} placeholder - Placeholder text for the input.
 * @property {string} value - Current input value.
 * @property {Function} onChange - Callback fired on input change.
 * @property {string} [className] - Additional custom Tailwind classes for the container.
 * @property {boolean} [optional] - Whether the field is optional. Defaults to false.
 */

/**
 * InputField
 *
 * Renders a labeled input field with optional/required indicator and Tailwind styling.
 * Required fields show a red asterisk; optional fields show "(opzionale)" label.
 *
 * @param {InputFieldProps} props
 * @param {string} props.label - Field label.
 * @param {string} props.id - Input element id and name.
 * @param {string} [props.type] - Input type.
 * @param {string} props.placeholder - Input placeholder text.
 * @param {string} props.value - Input value.
 * @param {Function} props.onChange - Change event handler.
 * @param {string} [props.className] - Container classes.
 * @param {boolean} [props.optional] - Whether field is optional.
 * @returns {JSX.Element} Input field component with label.
 */
const InputField = ({ label, id, type = 'text', placeholder, value, onChange, className = '', optional = false }) => {
    const inputStyle = "w-full p-3 bg-white border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none";
    const isRequired = !optional;
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-gray-800 text-sm font-medium mb-1">
                {label}
                {optional && <span className="text-gray-500 font-normal"> (opzionale)</span>}
                {isRequired && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={inputStyle}
                required={isRequired}
            />
        </div>
    );
};

export default InputField;
