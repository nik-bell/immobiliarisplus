/**
 * @file Hero.jsx
 * @description Hero section component with responsive background images and overlay.
 *              Supports modern image formats (AVIF, WebP) with fallback.
 */

/**
 * Props for Hero component.
 * @typedef {Object} HeroProps
 * @property {string} backgroundImage - Fallback background image URL (PNG/JPG).
 * @property {string} [backgroundImageWebp] - WebP format background image URL for better compression.
 * @property {string} [backgroundImageAvif] - AVIF format background image URL for optimal modern browser support.
 * @property {React.ReactNode} children - Hero content (typically headings, text, buttons).
 * @property {string} [className] - Additional custom Tailwind classes for the section.
 */

/**
 * Hero
 *
 * Renders a full-width hero section with a responsive background image and dark overlay.
 * Supports multiple image formats (AVIF, WebP, fallback) for optimal performance.
 * Content is centered and overlaid on top of the background with a semi-transparent dark layer.
 *
 * @param {HeroProps} props
 * @param {string} props.backgroundImage - Fallback image URL.
 * @param {string} [props.backgroundImageWebp] - WebP image URL.
 * @param {string} [props.backgroundImageAvif] - AVIF image URL.
 * @param {React.ReactNode} props.children - Hero content.
 * @param {string} [props.className] - Additional container classes.
 * @returns {JSX.Element} Hero section element.
 */
const Hero = ({ 
  backgroundImage, 
  backgroundImageWebp,
  backgroundImageAvif, 
  children, 
  className = "" 
}) => {
  return (
    <section
      className={`w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden ${className}`}
    >
      
      <picture className="absolute inset-0 w-full h-full z-0">
        
        {backgroundImageAvif && (
          <source srcSet={backgroundImageAvif} type="image/avif" />
        )}
        {backgroundImageWebp && (
          <source srcSet={backgroundImageWebp} type="image/webp" />
        )}
        <img
          src={backgroundImage}
          alt="Sfondo Hero"
          fetchPriority="high" 
          loading="eager"
          className="w-full h-full object-cover" 
        />
      </picture>

      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none"></div>
      <div className="relative z-10 max-w-2xl text-white">
        {children}
      </div>

    </section>
  );
};

export default Hero;
