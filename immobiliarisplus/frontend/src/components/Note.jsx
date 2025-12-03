/**
 * @file Note.jsx
 * @description Simple note component that displays a labeled note message with custom styling.
 */

/**
 * Props for Note component.
 * @typedef {Object} NoteProps
 * @property {React.ReactNode} children - Note content/text.
 * @property {string} [className] - Custom Tailwind classes for the container div.
 * @property {string} [textClassName] - Custom Tailwind classes for the paragraph element.
 */

/**
 * Note
 *
 * Renders a note message with a bold "Nota: " prefix.
 * Supports custom styling for both container and text elements.
 *
 * @param {NoteProps} props
 * @param {React.ReactNode} props.children - Note message content.
 * @param {string} [props.className] - Container element classes.
 * @param {string} [props.textClassName] - Text paragraph classes.
 * @returns {JSX.Element} Note component with labeled prefix.
 */
const Note = ({ children, className = '', textClassName = '' }) => {
    return (
        <div className={className}>
            <p className={textClassName}>
                <span className="font-bold">Nota: </span>
                {children}
            </p>
        </div>
    );
};

export default Note;