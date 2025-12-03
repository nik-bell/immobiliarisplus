/**
 * @file FAQItem.jsx
 * @description Expandable FAQ item component with smooth open/close animation.
 *              Displays a question header and toggleable answer content.
 */

/**
 * Props for FAQItem component.
 * @typedef {Object} FAQItemProps
 * @property {string} question - FAQ question text to display in the header.
 * @property {string} answer - FAQ answer text to display when expanded.
 * @property {boolean} isOpen - Whether the item is currently expanded.
 * @property {Function} onClick - Callback invoked when the header is clicked to toggle open state.
 */

/**
 * FAQItem
 *
 * Renders an expandable FAQ item with a question header and answer content.
 * Animates smooth transitions when toggling between open and closed states.
 * The expand/collapse indicator rotates 45 degrees when open.
 *
 * @param {FAQItemProps} props
 * @param {string} props.question - Question text.
 * @param {string} props.answer - Answer text.
 * @param {boolean} props.isOpen - Open state.
 * @param {Function} props.onClick - Toggle callback.
 * @returns {JSX.Element} Expandable FAQ item element.
 */
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