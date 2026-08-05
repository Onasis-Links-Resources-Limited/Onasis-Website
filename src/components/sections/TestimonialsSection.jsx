import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const TestimonialsSection = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Adebayo Ogunlesi',
      position: 'CEO, TechVentures Nigeria',
      image: '/images/testimonials/client1.jpg',
      quote: 'Onasis Links revolutionized our network infrastructure. Their fiber optic solution increased our internet speed by 400% and reduced downtime to virtually zero.',
      rating: 5,
      company: 'TechVentures Nigeria'
    },
    {
      id: 2,
      name: 'Mrs. Ngozi Okonkwo',
      position: 'IT Director, First National Bank',
      image: '/images/testimonials/client2.jpg',
      quote: 'The 5G deployment by Onasis Links has transformed our banking operations. Mobile banking transactions are now instantaneous, and our customers love the speed.',
      rating: 5,
      company: 'First National Bank'
    },
    {
      id: 3,
      name: 'Engr. Michael Adeyemi',
      position: 'CTO, CloudNation Africa',
      image: '/images/testimonials/client3.jpg',
      quote: 'Their cloud solutions are second to none. We\'ve scaled our operations significantly thanks to their robust and secure cloud infrastructure.',
      rating: 4,
      company: 'CloudNation Africa'
    },
    {
      id: 4,
      name: 'Prof. Sarah Mwangi',
      position: 'Dean, Nairobi University',
      image: '/images/testimonials/client4.jpg',
      quote: 'Satellite communication services from Onasis Links connected our remote research stations. This has been a game-changer for academic research in Kenya.',
      rating: 5,
      company: 'Nairobi University'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className={`py-20 ${
      theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-sm font-semibold tracking-widest uppercase ${
            theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
          }`}>
            Testimonials
          </span>
          <h2 className={`text-4xl font-bold mt-2 ${
            theme === 'dark' ? 'text-white' : 'text-[#280905]'
          }`}>
            What Our <span className="text-[#E6501B]">Clients Say</span>
          </h2>
          <p className={`mt-4 text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Real feedback from businesses we've helped transform.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className={`p-8 md:p-12 rounded-2xl transition-all duration-500 ${
            theme === 'dark'
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white shadow-xl'
          }`}>
            {/* Rating Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-2xl">
                  {i < currentTestimonial.rating ? '⭐' : '☆'}
                </span>
              ))}
            </div>

            {/* Quote */}
            <div className="relative">
              <span className={`text-6xl absolute -top-4 -left-4 ${
                theme === 'dark' ? 'text-[#E6501B]/20' : 'text-[#C3110C]/10'
              }`}>
                "
              </span>
              <p className={`text-xl md:text-2xl leading-relaxed pl-6 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {currentTestimonial.quote}
              </p>
            </div>

            {/* Client Info */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#C3110C] to-[#E6501B] flex items-center justify-center text-2xl font-bold text-white">
                {currentTestimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className={`font-bold text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-[#280905]'
                }`}>
                  {currentTestimonial.name}
                </h4>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {currentTestimonial.position}
                </p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {currentTestimonial.company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentIndex 
                    ? `w-12 h-2 ${theme === 'dark' ? 'bg-[#E6501B]' : 'bg-[#C3110C]'}`
                    : `w-2 h-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;