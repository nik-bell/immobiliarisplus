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