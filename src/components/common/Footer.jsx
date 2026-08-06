import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  MapPin,
  Phone,
  Mail,
  ArrowUp,
  Send,
  Shield,
  FileText,
  Cookie,
  Wifi,
  Cloud,
  Satellite,
  Lock,
  Smartphone,
  TrendingUp,
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.1,
  });

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

  // Services - matching the image
  const services = [
    { name: 'Fiber Optic Networks', href: '/services#fiber', icon: Wifi },
    { name: '5G Technology', href: '/services#5g', icon: TrendingUp },
    { name: 'Cloud Solutions', href: '/services#cloud', icon: Cloud },
    { name: 'Satellite Communication', href: '/services#satellite', icon: Satellite },
    { name: 'Cybersecurity', href: '/services#security', icon: Lock },
    { name: 'IoT Solutions', href: '/services#iot', icon: Smartphone },
  ];

  // Contact Info - Using the correct info from the image
  const contactInfo = [
    { 
      icon: MapPin, 
      text: 'Plot 75B Eleganza Gardens, Lekki Lagos',
      label: 'FIND US'
    },
    { 
      icon: Phone, 
      text: '+234 808 753 8176',
      label: 'CALL US'
    },
    { 
      icon: Mail, 
      text: 'info@onasisltd.com',
      label: 'WRITE US'
    },
  ];

  // Social Links with Lucide icons
  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: '#', color: '#1877F2' },
    { name: 'Twitter', icon: FaXTwitter, href: '#', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: FaLinkedin, href: '#', color: '#0077B5' },
    { name: 'Instagram', icon: FaInstagram, href: '#', color: '#E1306C' },
    { name: 'YouTube', icon: FaYoutube, href: '#', color: '#FF0000' },
  ];

  // Legal Links
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy', icon: Shield },
    { name: 'Terms of Service', href: '/terms', icon: FileText },
    { name: 'Cookie Policy', href: '/cookies', icon: Cookie },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const contactVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const scrollTopVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99],
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20,
      transition: {
        duration: 0.2,
      }
    },
  };

  return (
    <footer 
      ref={sectionRef}
      className={`relative ${
        theme === 'dark' 
          ? 'bg-[#0a0a0a] border-t border-gray-800' 
          : 'bg-gray-50 border-t border-gray-200'
      }`}
    >

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Info */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
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
            
            {/* Social Links */}
            <motion.div 
              className="flex gap-3 mt-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300`}
                  >
                    <IconComponent className="w-6 h-6" color={social.color} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Column 2: Our Services */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className={`text-lg font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#280905]'
            }`}>
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <motion.li 
                    key={service.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={service.href}
                      className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                        theme === 'dark'
                          ? 'text-gray-400 hover:text-[#E6501B]'
                          : 'text-gray-600 hover:text-[#C3110C]'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      {service.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info - Using the correct info from the image */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className={`text-lg font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-[#280905]'
            }`}>
              GET IN TOUCH
            </h3>
            <ul className="space-y-5">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.li 
                    key={index}
                    custom={index}
                    variants={contactVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col"
                  >
                    <span className={`text-xs font-bold tracking-[0.1em] uppercase ${
                      theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
                    }`}>
                      {item.label}
                    </span>
                    <div className="flex items-start gap-3 mt-1">
                      <IconComponent className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
                      }`} />
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.text}
                      </span>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Column 4: Quick Links & Newsletter */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className={`text-sm font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-[#280905]'
              }`}>
                Subscribe to Our Newsletter
              </h4>
              <motion.form 
                className="flex gap-2" 
                onSubmit={(e) => e.preventDefault()}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-4 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E6501B] transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-gray-800 text-white border-gray-700 focus:border-[#E6501B]'
                      : 'bg-white text-[#280905] border-gray-200 focus:border-[#C3110C]'
                  }`}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-[#C3110C] hover:bg-[#E6501B] text-white text-sm font-semibold rounded-lg transition-colors duration-300 whitespace-nowrap flex items-center gap-1"
                >
                  Subscribe
                  <Send className="w-3.5 h-3.5" />
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className={`mt-12 pt-8 border-t ${
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.4,
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              © {currentYear} Onasis Links Resources Limited. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'text-gray-500 hover:text-[#E6501B]'
                      : 'text-gray-500 hover:text-[#C3110C]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button with AnimatePresence */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            variants={scrollTopVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg hover:scale-110 z-40 ${
              theme === 'dark'
                ? 'bg-[#E6501B] hover:bg-[#C3110C] text-white'
                : 'bg-[#C3110C] hover:bg-[#E6501B] text-white'
            }`}
            aria-label="Scroll to top"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;