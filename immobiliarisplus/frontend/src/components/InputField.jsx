const InputField = ({ label, id, type = 'text', placeholder, value, onChange, className = '', optional = false }) => {
    const inputStyle = "w-full p-3 border border-gray-300 rounded hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none";
    
    return (
        <div className={`mb-4 ${className}`}>
            <label htmlFor={id} className="block text-gray-800 text-sm font-medium mb-1">
                {label}
                {optional && <span className="text-gray-500 font-normal"> (opzionale)</span>}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={inputStyle}
            />
        </div>
    );
};

export default InputField;