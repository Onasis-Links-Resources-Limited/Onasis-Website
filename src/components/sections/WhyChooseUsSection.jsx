import { useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, useInView } from "framer-motion";
import {
  Shield, 
  Zap, 
  Headphones,
  Wifi,
  Cloud,
  Satellite,
} from "lucide-react";

const WhyChooseUsSection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const reasons = [
    {
      id: 1,
      icon: Wifi,
      title: "High-Speed Connectivity",
      description: "Lightning-fast fiber optic and 5G networks ensuring seamless communication.",
      color: "#E6501B",
      position: "top-left"
    },
    {
      id: 2,
      icon: Cloud,
      title: "Cloud Integration",
      description: "Scalable cloud solutions that grow with your business needs.",
      color: "#C3110C",
      position: "top-right"
    },
    {
      id: 3,
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols protecting your data.",
      color: "#740A03",
      position: "middle-left"
    },
    {
      id: 4,
      icon: Zap,
      title: "24/7 Reliability",
      description: "Round-the-clock network monitoring with 99.9% uptime guarantee.",
      color: "#E6501B",
      position: "middle-right"
    },
    {
      id: 5,
      icon: Satellite,
      title: "Pan-African Coverage",
      description: "Connecting communities across the continent with satellite technology.",
      color: "#C3110C",
      position: "bottom-left"
    },
    {
      id: 6,
      icon: Headphones,
      title: "Expert Support",
      description: "Dedicated technical support team available 24/7 for your peace of mind.",
      color: "#740A03",
      position: "bottom-right"
    },
  ];

  // Animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.15,
  //       delayChildren: 0.2,
  //     },
  //   },
  // };

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

  // Get items by position
  const topLeft = reasons.find(r => r.position === "top-left");
  const topRight = reasons.find(r => r.position === "top-right");
  const middleLeft = reasons.find(r => r.position === "middle-left");
  const middleRight = reasons.find(r => r.position === "middle-right");
  const bottomLeft = reasons.find(r => r.position === "bottom-left");
  const bottomRight = reasons.find(r => r.position === "bottom-right");

  const renderReason = (reason, align = "left") => {
    if (!reason) return null;
    const IconComponent = reason.icon;
    
    return (
      <motion.div
        variants={itemVariants}
        className={`flex items-start gap-4 ${align === "right" ? "flex-row-reverse text-right" : ""}`}
      >
        <div className="shrink-0">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: theme === "dark" 
                ? `${reason.color}33` 
                : `${reason.color}10`,
              color: reason.color
            }}
          >
            <IconComponent className="w-6 h-6" strokeWidth={1.5} />
          </div>
        </div>
        <div className={align === "right" ? "flex-1" : "flex-1"}>
          <h3 className={`text-base font-bold mb-0.5 ${
            theme === "dark" ? "text-white" : "text-[#280905]"
          }`}>
            {reason.title}
          </h3>
          <p className={`text-sm leading-relaxed ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            {reason.description}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className={`py-20 overflow-hidden ${
        theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
          className="text-center mb-12"
        >
          <span className={`text-sm font-bold tracking-[0.2em] uppercase ${
            theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
          }`}>
            Why Choose Us
          </span>
          <h2 className={`text-3xl sm:text-4xl font-light mt-2 ${
            theme === "dark" ? "text-white" : "text-[#280905]"
          }`}>
            The <span className={`${theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"}`}>Onasis Links</span> Advantage
          </h2>
        </motion.div>

        {/* Grid with Image at Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column - Top Left & Middle Left */}
          <div className="space-y-16">
            {topLeft && renderReason(topLeft, "left")}
            {middleLeft && renderReason(middleLeft, "left")}
            {bottomLeft && renderReason(bottomLeft, "left")}
          </div>

          {/* Center - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/why-choose-us.png"
                alt="Why Choose Onasis Links"
                className="w-full h-auto object-cover"
              />
              {/* Decorative border glow */}
              <div className={`absolute inset-0 rounded-2xl pointer-events-none ${
                theme === "dark"
                  ? "ring-1 ring-[#E6501B]/20"
                  : "ring-1 ring-[#C3110C]/10"
              }`}></div>
            </div>
            
            {/* Decorative elements around image */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#E6501B]/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#C3110C]/10 rounded-full blur-2xl"></div>
          </motion.div>

          {/* Right Column - Top Right & Middle Right */}
          <div className="space-y-16">
            {topRight && renderReason(topRight, "right")}
            {middleRight && renderReason(middleRight, "right")}
            {bottomRight && renderReason(bottomRight, "right")}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;