const InputField = ({ label, id, type = 'text', placeholder, value, onChange, className = '', optional = false }) => {
    const inputStyle = "w-full p-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150";
    
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