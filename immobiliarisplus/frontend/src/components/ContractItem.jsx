/**
 * @file ContractItem.jsx
 * @description List item component with a checkmark icon and text content.
 *              Commonly used for displaying contract terms or feature lists.
 */

/**
 * Props for ContractItem component.
 * @typedef {Object} ContractItemProps
 * @property {string} text - Text content to display next to the checkmark icon.
 */

/**
 * ContractItem
 *
 * Renders a list item with a teal checkmark icon and accompanying text.
 * Typically used for displaying contract terms, features, or checklist items.
 *
 * @param {ContractItemProps} props
 * @param {string} props.text - Text to display.
 * @returns {JSX.Element} List item with checkmark icon and text.
 */
export const ContractItem = ({ text }) => {
    return (
        <div className="flex items-start mb-3">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-teal-500 flex-shrink-0 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                />
            </svg>
            <p className="text-left ml-3 text-base text-gray-700">
                {text}
            </p>
        </div>
    );
};