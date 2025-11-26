const TextAreaField = ({ label, id, placeholder, value, onChange }) => {
    const textareaStyle = "w-full p-3 h-32 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none";

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-800 text-sm font-medium mb-1">
                {label}
            </label>
            <textarea
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={textareaStyle}
            />
        </div>
    );
};

export default TextAreaField;