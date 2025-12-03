/**
 * @file BulletPoint.jsx
 * @description Reusable bullet point component with a numbered circle and text content.
 *              Supports layout variations for homepage (centered) and other contexts (left-aligned).
 */

/**
 * Props for BulletPoint component.
 * @typedef {Object} BulletPointProps
 * @property {number|string} number - Number to display in the circle badge.
 * @property {string} title - Main title text.
 * @property {string} description - Description text below the title.
 * @property {string} colorClass - Tailwind color class for the circle background (e.g., "bg-teal-600").
 * @property {string} [className] - Additional custom Tailwind classes for the container.
 * @property {string} [value] - Context identifier. Use "homepage" for centered layout; otherwise left-aligned.
 */

/**
 * BulletPoint
 *
 * Renders a numbered bullet point with a circular badge and accompanying text.
 * When value is "homepage", content is center-aligned; otherwise left-aligned.
 *
 * @param {BulletPointProps} props
 * @param {number|string} props.number - Circle badge number.
 * @param {string} props.title - Title text.
 * @param {string} props.description - Description text.
 * @param {string} props.colorClass - Background color class for the circle.
 * @param {string} [props.className] - Additional container classes.
 * @param {string} [props.value] - Layout context ("homepage" for centered).
 * @returns {JSX.Element} Bullet point component.
 */
const BulletPoint = ({ number, title, description, colorClass, className = '', value = '' }) => {
  let classDiv = '';
  let h3Text = '';
  let pText = '';
  if (value == 'homepage') {
    classDiv = 'items-center';
    h3Text = 'text-center';
    pText = 'text-center';
  }
  else {
    classDiv = 'items-start';
    h3Text = 'items-start';
    pText = 'text-left';
  }
  return (
    <div className={`
    ${className} 
    ${classDiv}       
    flex           
    space-x-4             
    py-3                  
`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${colorClass}`}
        aria-hidden="true"
      >
        {number}
      </div>
      <div className={`${h3Text} flex flex-col`}>
        <h3 className="text-lg font-semibold text-gray-800">
          {title}
        </h3>
        <p className={`${pText} text-base text-gray-600`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default BulletPoint;