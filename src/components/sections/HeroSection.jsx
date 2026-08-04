import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const HeroSection = () => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Telecom images with descriptions
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
      title: 'Fiber Optic Network',
      description: 'High-speed connectivity for the digital age',
      tag: 'Next-Gen Infrastructure'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80',
      title: '5G Technology',
      description: 'Transforming communication across Africa',
      tag: 'Cutting-Edge Innovation'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
      title: 'Cloud Solutions',
      description: 'Secure and scalable business infrastructure',
      tag: 'Digital Transformation'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80',
      title: 'Satellite Communication',
      description: 'Connecting remote communities to the world',
      tag: 'Universal Access'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Image with overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-black/85 via-black/70'
                : 'bg-white opacity-20'
            }`}></div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Left Content - Text */}
          <div className="space-y-6">
            {/* Slide Indicator */}
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium tracking-widest ${
                theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
              }`}>
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
              <div className="flex gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-0.5 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? `w-8 ${theme === 'dark' ? 'bg-[#E6501B]' : 'bg-[#C3110C]'}`
                        : `w-4 ${theme === 'dark' ? 'bg-white/30' : 'bg-[#280905]/20'}`
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <span className={`text-sm font-medium tracking-widest ${
                theme === 'dark' ? 'text-white/40' : 'text-[#280905]/40'
              }`}>
                {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Badge/Tag */}
            {/* <div className="inline-block">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider ${
                theme === 'dark'
                  ? 'bg-[#E6501B]/20 text-[#E6501B] border border-[#E6501B]/30'
                  : 'bg-[#C3110C]/10 text-[#C3110C] border border-[#C3110C]/20'
              }`}>
                {slides[currentSlide].tag}
              </span>
            </div> */}

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              <span className={`transition-all duration-500 ${
                theme === 'dark' ? 'text-white' : 'text-[#280905]'
              }`}>
                {slides[currentSlide].title}
              </span>
            </h1>

            {/* Description - Changes with slide */}
            <p className={`text-lg sm:text-xl max-w-lg leading-relaxed transition-all duration-500 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                className="group relative px-8 py-3.5 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
              >
                <span className="relative z-10">Discover Solutions</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#E6501B] to-[#C3110C] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              
              <a
                href="#services"
                className={`px-8 py-3.5 font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40'
                    : 'bg-[#280905]/5 hover:bg-[#280905]/10 text-[#280905] border border-[#280905]/10 hover:border-[#280905]/20'
                }`}
              >
                <span>Learn More</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className={`flex gap-8 pt-6 border-t ${
              theme === 'dark' ? 'border-white/10' : 'border-[#280905]/10'
            }`}>
              <div className="transition-all duration-500">
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-[#280905]'
                }`}>10+</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Years Experience</p>
              </div>
              <div className="transition-all duration-500">
                <p className="text-2xl font-bold text-[#E6501B]">500+</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Clients Served</p>
              </div>
              <div className="transition-all duration-500">
                <p className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-[#280905]'
                }`}>98%</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Right Content - Empty for minimal design */}
          <div className="hidden lg:block">
            {/* Slide thumbnails */}
            <div className="flex flex-col gap-3 items-end">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative w-48 h-20 rounded-lg overflow-hidden transition-all duration-500 group ${
                    index === currentSlide 
                      ? 'ring-2 ring-[#E6501B] scale-105' 
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                  <div className="absolute inset-0 bg-[#280905]/50 flex items-center justify-center">
                    <span className="text-white text-xs font-medium px-2 text-center">
                      {slide.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Arrows - Mobile */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-4 lg:hidden">
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className={`p-2 rounded-full transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-[#280905]/5 hover:bg-[#280905]/10 text-[#280905]'
          }`}
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className={`p-2 rounded-full transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-[#280905]/5 hover:bg-[#280905]/10 text-[#280905]'
          }`}
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className={`text-xs font-medium tracking-widest uppercase ${
          theme === 'dark' ? 'text-white/40' : 'text-[#280905]/40'
        }`}>Scroll</span>
        <div className={`w-5 h-8 border-2 rounded-full flex justify-center p-1 ${
          theme === 'dark' ? 'border-white/20' : 'border-[#280905]/20'
        }`}>
          <div className="w-1 h-2 bg-[#E6501B] rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;