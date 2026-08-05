import React from 'react';

const AboutHero = () => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] overflow-hidden rounded-b-3xl mb-10 bg-gray-900 ">
      {/* Video - Full width and height */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source 
          src="images/hero1.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col text-center text-white p-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg">
          About Us
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl drop-shadow-md">
          Our mission is to provide businesses with the financial tools they need to thrive in today's market.
        </p>
      </div>
    </div>
  );
};

export default AboutHero;