/**
 * @file Card.jsx
 * @description Generic reusable card component for wrapping content with custom styling.
 */

/**
 * Props for Card component.
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children - Card content.
 * @property {string} [className] - Custom Tailwind classes for styling.
 */

/**
 * Card
 *
 * Generic card component that wraps content with custom Tailwind classes.
 * Provides a flexible container for any content.
 *
 * @param {CardProps} props
 * @param {React.ReactNode} props.children - Content to display inside the card.
 * @param {string} [props.className] - Custom Tailwind CSS classes.
 * @returns {JSX.Element} Card container element.
 */
const Card = ({ children, className = '' }) => {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    );
};

export default Card;