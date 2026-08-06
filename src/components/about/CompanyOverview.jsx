import { useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, useInView } from "framer-motion";
import { 
  Clock, 
  Eye,
  MapPinned
} from "lucide-react";

const CompanyOverview = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const overviewData = [
    {
      id: 1,
      title: "Our History",
      description:
        "Onasis Links Resources Ltd was established in 2005 as a value added distributor of Electrical/Electronics, Power Equipment, ICT and Telecommunication Infrastructure Company. Our strategic partnership with original equipment manufacturers around the globe is our strength to customers' satisfaction.",
      icon: Clock,
      color: "#E6501B",
      stat: "20+",
      statLabel: "Years of Excellence"
    },
    {
      id: 2,
      title: "Our Vision",
      description:
        "To relieve customers challenges through our supply chain global network and timely deliveries.",
      icon: Eye,
      color: "#C3110C",
      stat: "Global",
      statLabel: "Reach & Impact"
    },
    {
      id: 3,
      title: "Our Mission",
      description:
        "To be the centre point in sales and logistics in the areas of our specialization.",
      icon: MapPinned,
      color: "#740A03",
      stat: "100%",
      statLabel: "Customer Focus"
    },
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

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-20 overflow-hidden ${
        theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span
            className={`uppercase tracking-[0.2em] text-sm mb-4 font-bold inline-block ${
              theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
            }`}
          >
            Our Story
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-bold transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-[#280905]"
            }`}
          >
            What <span className="text-[#E6501B]">Drives</span> Us
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Our commitment to excellence, innovation, and customer satisfaction
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {overviewData.map((item, index) => {
            const IconComponent = item.icon;
            const isLast = index === overviewData.length - 1;

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`group relative p-4 rounded-2xl transition-all duration-500 ${
                  theme === "dark"
                    ? "border-r hover:border-[#E6501B]/30"
                    : "border-r hover:border-[#C3110C]/20 hover:shadow-xl"
                } ${!isLast ? "md:border-r-2" : ""}`}
                style={{
                  borderRightColor: !isLast ? (theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)") : "transparent"
                }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <div className="relative mb-4">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      backgroundColor: theme === "dark" 
                        ? `${item.color}33` 
                        : `${item.color}10`,
                      color: item.color
                    }}
                  >
                    <IconComponent className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  
                  
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                  theme === "dark" 
                    ? "text-white group-hover:text-[#E6501B]" 
                    : "text-[#280905] group-hover:text-[#C3110C]"
                }`}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  {item.description}
                </p>

                {/* Stat Badge */}
                <div className={`flex-1 mt-4 pt-4 border-t flex items-center gap-3 ${
                  theme === "dark" ? "border-gray-700" : "border-gray-100"
                }`}>
                  <span className={`text-xl font-bold ${
                    theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
                  }`}>
                    {item.stat}
                  </span>
                  <span className={`text-xs ${
                    theme === "dark" ? "text-gray-500" : "text-gray-400"
                  }`}>
                    {item.statLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyOverview;