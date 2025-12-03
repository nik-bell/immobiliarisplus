/**
 * @file BulletPointImg.jsx
 * @description Reusable bullet point component with a circular image and text content.
 *              Displays an image or placeholder in a rounded container alongside title and description.
 */

/**
 * Props for BulletPointImg component.
 * @typedef {Object} BulletPointImgProps
 * @property {string} [imgSrc] - URL of the image to display. If not provided, shows a placeholder.
 * @property {string} title - Main title text.
 * @property {string} description - Description text below the title.
 * @property {string} [className] - Additional custom Tailwind classes for the container.
 */

/**
 * BulletPointImg
 *
 * Renders a bullet point with a circular image badge and accompanying text.
 * If imgSrc is not provided, displays a placeholder with "Foto" text.
 *
 * @param {BulletPointImgProps} props
 * @param {string} [props.imgSrc] - Image source URL.
 * @param {string} props.title - Title text.
 * @param {string} props.description - Description text.
 * @param {string} [props.className] - Additional container classes.
 * @returns {JSX.Element} Bullet point component with image.
 */
const BulletPointImg = ({ imgSrc, title, description, className = '' }) => {
  return (
    <div className={`flex items-start space-x-4 py-3 ${className}`}>
      <div className="flex-shrink-0 w-24 h-24 rounded-full overflow-hidden bg-gray-200">
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Foto
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BulletPointImg;
