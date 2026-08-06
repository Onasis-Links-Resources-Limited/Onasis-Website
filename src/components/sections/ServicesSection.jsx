import { useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, useInView } from "framer-motion";

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
      title: "Fiber Optic",
      subtitle: "Networks",
      description:
        "High-speed fiber optic infrastructure for seamless connectivity.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      color: "#E6501B",
    },
    {
      id: 2,
      title: "5G",
      subtitle: "Technology",
      description:
        "Next-generation wireless networks for ultra-fast communication.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      color: "#C3110C",
    },
    {
      id: 3,
      title: "Cloud",
      subtitle: "Solutions",
      description:
        "Secure, scalable cloud infrastructure for your business needs.",
      image:
        "https://images.unsplash.com/photo-1533664488202-6af66d26c44a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "#740A03",
    },
    {
      id: 4,
      title: "Satellite",
      subtitle: "Communication",
      description:
        "Connecting remote areas with reliable satellite technology.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
      color: "#E6501B",
    },
    {
      id: 5,
      title: "Cybersecurity",
      subtitle: "Protection",
      description:
        "Protecting your digital assets with enterprise-grade security.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      color: "#C3110C",
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
      className={`py-20 ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"}`}
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
            <span
              className={`text-sm font-bold tracking-[0.2em] uppercase ${
                theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
              }`}
            >
              Our Services
            </span>
            <h2
              className={`text-4xl sm:text-5xl font-light mt-2 ${
                theme === "dark" ? "text-white" : "text-[#280905]"
              }`}
            >
              What <span className={`${theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"}`}>We</span> <br />{" "}
              <span className={`${theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"}`}>Can</span> Do
            </h2>
          </div>

          {/* Right - Description + Button */}
          <div className="">
            <p
              className={`text-base leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              From design to installation, we provide quality telecommunications
              solutions tailored to your needs.
            </p>
            <motion.a
              href="/services"
              className={`inline-flex items-center gap-2 mt-4 px-8 py-3 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                theme === "dark"
                  ? "bg-[#E6501B] hover:bg-[#C3110C] text-white"
                  : "bg-[#C3110C] hover:bg-[#E6501B] text-white"
              }`}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              See Our Services
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Services Grid - Image Cards with Flex Width Effect */}
        <motion.div
          className="flex gap-2 h-75"
          variants={containerVariants}
          initial="visible"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                animate={{
                  flex: isHovered ? 3 : 1,
                  opacity: hoveredIndex !== null && !isHovered ? 0.55 : 1,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.6, -0.05, 0.01, 0.99],
                }}
                className="relative overflow-hidden rounded-2xl"
                style={{
                  flexBasis: 0,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isHovered
                      ? "bg-linear-to-t from-[#280905]/90 via-[#280905]/40 to-transparent"
                      : "bg-linear-to-t from-[#280905]/80 via-[#280905]/50 to-[#280905]/20"
                  }`}
                />

                {/* Hover Content */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 25,
                  }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex flex-col justify-end p-6"
                >
                  {/* <span className="text-xs tracking-widest font-medium text-[#E6501B]">
                    {String(index + 1).padStart(2, "0")}
                  </span> */}

                  <h3 className="text-white text-2xl font-bold mt-1">
                    {service.title}
                    <span className="text-[#E6501B]"> {service.subtitle}</span>
                  </h3>

                  <p className="text-gray-300 text-sm mt-2">
                    {service.description}
                  </p>

                  <motion.a
                    href="/services"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 mt-5 text-[#E6501B] font-semibold w-fit cursor-pointer"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.a>
                </motion.div>

                {/* Default Title */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 0 : 1,
                    y: isHovered ? 10 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="flex items-center gap-2">
                    {/* <span className="text-xs tracking-widest text-[#E6501B]">
                      {String(index + 1).padStart(2, "0")}
                    </span> */}

                    <span className="text-white font-semibold">
                      {service.title}
                    </span>
                  </div>
                </motion.div>

                {/* Border Glow */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    border: `2px solid ${service.color}`,
                    boxShadow: `inset 0 0 40px ${service.color}40`,
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
