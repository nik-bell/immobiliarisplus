const FAQItem = ({ question, answer, isOpen, onClick }) => {
    const headerClasses = "flex justify-between items-center cursor-pointer py-3 text-gray-800 font-semibold hover:text-teal-600 transition duration-150";
    const iconClasses = "text-xl font-bold transition-transform duration-300";
    const answerClasses = `overflow-hidden transition-max-height duration-500 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100 pt-2 pb-3' : 'max-h-0 opacity-0'
    }`;
    
    return (
        <div className="border-b border-gray-200">
            <div className={headerClasses} onClick={onClick}>
                <p className="text-base">{question}</p>
                <span className={iconClasses} style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                </span>
            </div>
            <div className={answerClasses}>
                <p className="text-sm text-gray-600">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default FAQItem;