import { useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, useInView } from 'framer-motion';

const ServicesSection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const services = [
    {
      id: 1,
      title: 'Fiber Optic',
      subtitle: 'Networks',
      description: 'High-speed fiber optic infrastructure for seamless connectivity.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      color: '#E6501B'
    },
    {
      id: 2,
      title: '5G',
      subtitle: 'Technology',
      description: 'Next-generation wireless networks for ultra-fast communication.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      color: '#C3110C'
    },
    {
      id: 3,
      title: 'Cloud',
      subtitle: 'Solutions',
      description: 'Secure, scalable cloud infrastructure for your business needs.',
      image: 'https://images.unsplash.com/photo-1563770551464-9bfd8191736c?w=800&q=80',
      color: '#740A03'
    },
    {
      id: 4,
      title: 'Satellite',
      subtitle: 'Communication',
      description: 'Connecting remote areas with reliable satellite technology.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
      color: '#E6501B'
    },
    {
      id: 5,
      title: 'Cybersecurity',
      subtitle: 'Protection',
      description: 'Protecting your digital assets with enterprise-grade security.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
      color: '#C3110C'
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className={`py-20 ${
        theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Left: Title, Right: Description + Button */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8 items-start mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          {/* Left - Title */}
          <div>
            <span className={`text-sm font-bold tracking-[0.2em] uppercase ${
              theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
            }`}>
              Our Services
            </span>
            <h2 className={`text-4xl sm:text-5xl font-bold mt-2 ${
              theme === 'dark' ? 'text-white' : 'text-[#280905]'
            }`}>
              What We <span className="text-[#E6501B]">Can Do</span>
            </h2>
          </div>

          {/* Right - Description + Button */}
          <div className="">
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              From design to installation, we provide quality telecommunications
              solutions tailored to your needs.
            </p>
            <motion.a
              href="/services"
              className={`inline-flex items-center gap-2 mt-4 px-8 py-3 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-[#E6501B] hover:bg-[#C3110C] text-white'
                  : 'bg-[#C3110C] hover:bg-[#E6501B] text-white'
              }`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              See Our Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Services Grid - Image Cards with Hover Width Effect */}
        <motion.div 
          className="flex gap-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const shouldShrink = hoveredIndex !== null && !isHovered;

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
                style={{
                  aspectRatio: '3/4',
                  width: isHovered ? '100%' : shouldShrink ? '85%' : '100%',
                  transform: isHovered ? 'scale(1.05)' : shouldShrink ? 'scale(0.92)' : 'scale(1)',
                  opacity: shouldShrink ? 0.6 : 1,
                  zIndex: isHovered ? 10 : 1,
                  transition: 'all 0.5s cubic-bezier(0.6, -0.05, 0.01, 0.99)',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark Overlay */}
                  <div className={`absolute inset-0 ${
                    isHovered
                      ? 'bg-gradient-to-t from-[#280905]/90 via-[#280905]/40 to-transparent'
                      : 'bg-gradient-to-t from-[#280905]/80 via-[#280905]/50 to-[#280905]/20'
                  } transition-all duration-500`}></div>
                </div>

                {/* Content - Hidden by default, shown on hover */}
                <div className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  {/* Service Number */}
                  <span className={`text-xs font-medium tracking-widest ${
                    theme === 'dark' ? 'text-[#E6501B]' : 'text-[#E6501B]'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Title */}
                  <h3 className={`text-xl font-bold mt-1 ${
                    theme === 'dark' ? 'text-white' : 'text-white'
                  }`}>
                    {service.title}
                    <span className="text-[#E6501B]"> {service.subtitle}</span>
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-sm mt-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-200'
                  }`}>
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <motion.a
                    href="/services"
                    className={`inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[#E6501B] hover:text-[#C3110C] transition-colors`}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                </div>

                {/* Title - Shown when not hovered (minimal) */}
                <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 ${
                  isHovered ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium tracking-widest ${
                      theme === 'dark' ? 'text-[#E6501B]' : 'text-[#E6501B]'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`text-sm font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-white'
                    }`}>
                      {service.title}
                    </span>
                  </div>
                </div>

                {/* Hover Border Glow */}
                {isHovered && (
                  <motion.div 
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: `inset 0 0 40px ${service.color}40, 0 0 40px ${service.color}20`,
                      border: `2px solid ${service.color}`,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;