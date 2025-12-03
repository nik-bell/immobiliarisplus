/**
 * @file TextAreaField.jsx
 * @description Reusable textarea field component with label, validation indicator, and custom styling.
 *              Supports optional fields and fixed height layout.
 */

/**
 * Props for TextAreaField component.
 * @typedef {Object} TextAreaFieldProps
 * @property {string} label - Label text displayed above the textarea.
 * @property {string} id - Unique identifier for the textarea element.
 * @property {string} placeholder - Placeholder text for the textarea.
 * @property {string} value - Current textarea value.
 * @property {Function} onChange - Callback fired on textarea change.
 * @property {boolean} [optional] - Whether the field is optional. Defaults to false.
 */

/**
 * TextAreaField
 *
 * Renders a labeled textarea field with optional/required indicator and Tailwind styling.
 * Required fields show a red asterisk; optional fields show "(opzionale)" label.
 * Textarea has a fixed height of 8 rows (h-32).
 *
 * @param {TextAreaFieldProps} props
 * @param {string} props.label - Field label.
 * @param {string} props.id - Textarea element id and name.
 * @param {string} props.placeholder - Textarea placeholder text.
 * @param {string} props.value - Textarea value.
 * @param {Function} props.onChange - Change event handler.
 * @param {boolean} [props.optional] - Whether field is optional.
 * @returns {JSX.Element} Textarea field component with label.
 */
const TextAreaField = ({ label, id, placeholder, value, onChange, optional=false}) => {
    const textareaStyle = "w-full p-3 h-32 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none";
    const isRequired = !optional;

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-800 text-sm font-medium mb-1">
                {label}
                {optional && <span className="text-gray-500 font-normal"> (opzionale)</span>}
                {isRequired && <span className="text-red-500">*</span>}
            </label>
            <textarea
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={textareaStyle}
                required={isRequired}
            />
        </div>
    );
};

export default TextAreaField;
