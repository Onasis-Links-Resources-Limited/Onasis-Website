import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  Headphones, 
  Globe, 
  Users,
  Package,
  Truck
} from "lucide-react";

const CTASection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const trustBadges = [
    { icon: Shield, label: "ISO 9001 Certified" },
    { icon: Headphones, label: "24/7 Customer Support" },
    { icon: Globe, label: "Global Network Coverage" },
    { icon: Users, label: "Trusted by 500+ Clients" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + (i * 0.1),
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className={`py-5 relative overflow-hidden ${
        theme === "dark"
          ? "bg-linear-to-r from-[#280905] to-[#740A03]"
          : "bg-linear-to-r from-[#9a0e0a] to-[#bd4317]"
      }`}
    >
      {/* Background Image - Package Delivery */}
      <div className="absolute inset-0 opacity-10 md:opacity-15">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80')",
            backgroundBlendMode: "overlay",
          }}
        />
      </div>

      {/* Floating Delivery Icons */}
      <motion.div 
        className="absolute top-10 left-10 text-white/10 hidden lg:block"
        variants={floatingIconVariants}
        animate="animate"
      >
        <Package className="w-20 h-20" strokeWidth={1} />
      </motion.div>
      <motion.div 
        className="absolute bottom-10 right-10 text-white/10 hidden lg:block"
        variants={floatingIconVariants}
        animate="animate"
        transition={{ delay: 1.5 }}
      >
        <Truck className="w-20 h-20" strokeWidth={1} />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-light text-white mb-2"
          >
            Ready to <span className={`${theme === 'dark' ? 'text-[#E6501B]' : 'text-white'}`}>Transform</span> Your
            Connectivity?
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-base text-white/90 mb-6 max-w-2xl mx-auto"
          >
            Join 500+ satisfied clients and experience world-class
            telecommunication solutions tailored to your needs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#C3110C] hover:bg-[#E6501B] hover:text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#C3110C] font-bold rounded-full transition-all duration-300"
              >
                Explore Our Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-2 text-white/80 text-sm"
                  custom={index}
                  variants={badgeVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconComponent className={`w-4 h-4 ${theme === 'dark' ? 'text-[#E6501B]' : 'text-white'}`} />
                  <span>{badge.label}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Delivery Guarantee Badge */}
          <motion.div 
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.8,
              duration: 0.5,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          >
            <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-[#E6501B]' : 'text-white'}`} />
            <span className="text-white/80 text-xs font-medium tracking-wider">
              Fast & Reliable Delivery Across Africa
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;