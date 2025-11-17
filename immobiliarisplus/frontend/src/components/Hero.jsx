
import React from "react";

const Hero = ({ backgroundImage, children, className = "" }) => {
  return (
    <section
      className={`w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-6 relative ${className}`}
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
     
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-2xl text-white">{children}</div>
    </section>
  );
};

export default Hero;
