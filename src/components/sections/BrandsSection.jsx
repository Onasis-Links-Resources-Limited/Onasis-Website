import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const BrandsSection = () => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const brands = [
    { id: 1, name: 'MTN', logo: '/images/brands/mtn.png', color: '#FFCD00' },
    { id: 2, name: 'Airtel', logo: '/images/brands/airtel.png', color: '#ED1B24' },
    { id: 3, name: 'Glo', logo: '/images/brands/glo.png', color: '#0066CC' },
    { id: 4, name: '9mobile', logo: '/images/brands/9mobile.png', color: '#00A651' },
    { id: 5, name: 'Nigerian Communications Commission', logo: '/images/brands/ncc.png', color: '#00843D' },
    { id: 6, name: 'Cisco', logo: '/images/brands/cisco.png', color: '#049FD9' },
    { id: 7, name: 'Huawei', logo: '/images/brands/huawei.png', color: '#FF0000' },
    { id: 8, name: 'ZTE', logo: '/images/brands/zte.png', color: '#005B96' },
    { id: 9, name: 'Ericsson', logo: '/images/brands/ericsson.png', color: '#003D6B' },
    { id: 10, name: 'Nokia', logo: '/images/brands/nokia.png', color: '#005AFF' },
  ];

  // Double the array for seamless scrolling
  const doubledBrands = [...brands, ...brands];

  return (
    <section id="brands" className={`py-20 overflow-hidden ${
      theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`text-sm font-bold tracking-widest uppercase ${
            theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
          }`}>
            Our Partners & Clients
          </span>
          <h2 className={`text-4xl sm:text-5xl font-light mt-2 ${
            theme === 'dark' ? 'text-white' : 'text-[#280905]'
          }`}>
            Trusted by <span className="text-[#E6501B]">Industry Leaders</span>
          </h2>
          <p className={`mt-4 text-base ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We partner with the best in the industry to deliver exceptional value.
          </p>
        </div>

        {/* Brand Logos Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <div 
              className={`flex gap-12 py-8 animate-scroll ${
                isHovered ? 'animation-paused' : ''
              }`}
              style={{
                animation: `scrollBrands 30s linear infinite`,
                animationPlayState: isHovered ? 'paused' : 'running'
              }}
            >
              {doubledBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300"
                      style={{
                        filter: theme === 'dark' 
                          ? 'brightness(0) invert(0.7)' 
                          : 'brightness(0.4)'
                      }}
                    />
                    <div className={`absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                      theme === 'dark' ? 'bg-[#0a0a0a]/80' : 'bg-white/80'
                    }`}>
                      <span className={`text-xs font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-[#280905]'
                      }`}>
                        {brand.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient Overlays */}
          <div className={`absolute left-0 top-0 w-32 h-full bg-gradient-to-r ${
            theme === 'dark' 
              ? 'from-gray-900/50 to-transparent' 
              : 'from-gray-50 to-transparent'
          }`}></div>
          <div className={`absolute right-0 top-0 w-32 h-full bg-gradient-to-l ${
            theme === 'dark' 
              ? 'from-gray-900/50 to-transparent' 
              : 'from-gray-50 to-transparent'
          }`}></div>
        </div>

        {/* Certifications & Awards */}
        {/* <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
            theme === 'dark'
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-100 shadow-sm'
          }`}>
            <div className="text-4xl mb-2">🏆</div>
            <h4 className={`font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#280905]'
            }`}>Best Telecom Provider 2023</h4>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>African Telecom Awards</p>
          </div>
          <div className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
            theme === 'dark'
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-100 shadow-sm'
          }`}>
            <div className="text-4xl mb-2">⭐</div>
            <h4 className={`font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#280905]'
            }`}>ISO 27001 Certified</h4>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Information Security Management</p>
          </div>
          <div className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
            theme === 'dark'
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-100 shadow-sm'
          }`}>
            <div className="text-4xl mb-2">🤝</div>
            <h4 className={`font-bold ${
              theme === 'dark' ? 'text-white' : 'text-[#280905]'
            }`}>100+ Strategic Partners</h4>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>Global Technology Alliances</p>
          </div>
        </div> */}
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes scrollBrands {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animation-paused {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
};

export default BrandsSection;