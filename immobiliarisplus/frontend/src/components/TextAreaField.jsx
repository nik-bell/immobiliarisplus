const TextAreaField = ({ label, id, placeholder, value, onChange }) => {
    const textareaStyle = "w-full p-3 h-32 bg-gray-50 border border-gray-100 rounded-lg resize-none focus:ring-teal-500 focus:border-teal-500 transition duration-150";

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