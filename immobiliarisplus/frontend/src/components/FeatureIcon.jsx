/**
 * @file FeatureIcon.jsx
 * @description Simple badge component for displaying feature labels.
 */

/**
 * Props for FeatureIcon component.
 * @typedef {Object} FeatureIconProps
 * @property {string} label - Label text to display inside the badge.
 */

/**
 * FeatureIcon
 *
 * Renders a small rounded badge with a label. Commonly used to display feature tags or labels.
 *
 * @param {FeatureIconProps} props
 * @param {string} props.label - Badge label text.
 * @returns {JSX.Element} Feature badge element.
 */
export default function FeatureIcon({ label }) {
  return (
    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
      {label}
    </span>
  );
}
