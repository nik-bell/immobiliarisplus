/**
 * @file Button.jsx
 * @description Generic reusable button component that accepts custom styling and click handlers.
 */

/**
 * Props for Button component.
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children - Button content/text.
 * @property {Function} [onClick] - Click event handler.
 * @property {string} [className] - Custom Tailwind classes for styling.
 */

/**
 * Button
 *
 * Generic button component that accepts custom classes and a click handler.
 * Allows flexible styling through Tailwind classes.
 *
 * @param {ButtonProps} props
 * @param {React.ReactNode} props.children - Button label or content.
 * @param {Function} [props.onClick] - Callback function on button click.
 * @param {string} [props.className] - Custom Tailwind CSS classes.
 * @returns {JSX.Element} Button element.
 */
const Button = ({ children, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`${className}`}
        >
            {children}
        </button>
    );
};

export default Button;