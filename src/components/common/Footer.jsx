import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

//   const quickLinks = [
//     { name: 'About Us', href: '/about' },
//     { name: 'Services', href: '/services' },
//     { name: 'Products', href: '/products' },
//     { name: 'Contact', href: '/contact' },
//   ];

  const services = [
    { name: 'Fiber Optic Networks', href: '/services#fiber' },
    { name: '5G Technology', href: '/services#5g' },
    { name: 'Cloud Solutions', href: '/services#cloud' },
    { name: 'Satellite Communication', href: '/services#satellite' },
    { name: 'Cybersecurity', href: '/services#security' },
    { name: 'IoT Solutions', href: '/services#iot' },
  ];

  const contactInfo = [
    { icon: '📍', text: '123 Telecom Road, Lagos, Nigeria' },
    { icon: '📞', text: '+234 800 123 4567' },
    { icon: '✉️', text: 'info@onasislinks.com' },
    { icon: '🕐', text: 'Mon-Fri: 8:00 AM - 6:00 PM' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: '📘', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Instagram', icon: '📸', href: '#' },
    { name: 'YouTube', icon: '▶️', href: '#' },
  ];

  return (
    <footer className={`relative ${
      theme === 'dark' 
        ? 'bg-[#0a0a0a] border-t border-gray-800' 
        : 'bg-gray-50 border-t border-gray-200'
    }`}>
      {/* Top Decorative Line */}
      <div className={`h-1 w-full bg-gradient-to-r ${
        theme === 'dark'
          ? 'from-[#280905] via-[#E6501B] to-[#280905]'
          : 'from-[#C3110C] via-[#E6501B] to-[#C3110C]'
      }`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4">
              {theme === "dark" ? (
                <img
                  src="/images/logo-dark.png"
                  alt="Onasis Links Resources Limited"
                  className="h-12 w-auto"
                />
              ) : (
                <img
                  src="/images/logo-light.png"
                  alt="Onasis Links Resources Limited"
                  className="h-12 w-auto"
                />
              )}
            </Link>
            <p className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Empowering businesses and communities with cutting-edge 
              telecommunications infrastructure and innovative digital 
              solutions across Africa.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    theme === 'dark'
                      ? 'bg-gray-800 hover:bg-[#E6501B] text-gray-400 hover:text-white'
                      : 'bg-gray-200 hover:bg-[#C3110C] text-gray-600 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          {/* <div>
            <h3 className={`text-lg font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#280905]'
            }`}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={`text-sm transition-colors duration-200 hover:translate-x-1 inline-block ${
                      theme === 'dark'
                        ? 'text-gray-400 hover:text-[#E6501B]'
                        : 'text-gray-600 hover:text-[#C3110C]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Column 3: Services */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#280905]'
            }`}>
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className={`text-sm transition-colors duration-200 hover:translate-x-1 inline-block ${
                      theme === 'dark'
                        ? 'text-gray-400 hover:text-[#E6501B]'
                        : 'text-gray-600 hover:text-[#C3110C]'
                    }`}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#280905]'
            }`}>
              Get In Touch
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className={`text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-[#280905]'
              }`}>
                Subscribe to Our Newsletter
              </h4>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6501B] ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white border-gray-700'
                      : 'bg-white text-[#280905] border-gray-200'
                  }`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C3110C] hover:bg-[#E6501B] text-white text-sm font-semibold rounded-lg transition-colors duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-12 pt-8 border-t ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              © {currentYear} Onasis Links Resources Limited. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className={`text-sm transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'text-gray-500 hover:text-[#E6501B]'
                    : 'text-gray-500 hover:text-[#C3110C]'
                }`}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className={`text-sm transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'text-gray-500 hover:text-[#E6501B]'
                    : 'text-gray-500 hover:text-[#C3110C]'
                }`}
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className={`text-sm transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'text-gray-500 hover:text-[#E6501B]'
                    : 'text-gray-500 hover:text-[#C3110C]'
                }`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-500 hover:scale-110 z-40 animate-fadeIn ${
            theme === 'dark'
              ? 'bg-[#E6501B] hover:bg-[#C3110C] text-white'
              : 'bg-[#C3110C] hover:bg-[#E6501B] text-white'
          }`}
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </footer>
  );
};

export default Footer;