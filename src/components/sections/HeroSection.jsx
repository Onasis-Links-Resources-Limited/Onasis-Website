import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, useInView, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.1,
  });

  // Telecom images with descriptions
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
      title: "Fiber Optic Network",
      description: "High-speed connectivity for the digital age",
      tag: "Next-Gen Infrastructure",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
      title: "5G Technology",
      description: "Transforming communication across Africa",
      tag: "Cutting-Edge Innovation",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1533664488202-6af66d26c44a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Cloud Solutions",
      description: "Secure and scalable business infrastructure",
      tag: "Digital Transformation",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80",
      title: "Satellite Communication",
      description: "Connecting remote communities to the world",
      tag: "Universal Access",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

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

  const slideTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.4,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const slideRightVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
          initial={false}
          animate={{
            opacity: index === currentSlide ? 1 : 0,
            scale: index === currentSlide ? 1 : 1.05,
          }}
          transition={{
            duration: 1,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          {/* Image with overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 ${
                theme === "dark"
                  ? "bg-linear-to-r from-black/85 via-black/70 to-100%"
                  : "bg-linear-to-r from-white via-white/30 to-80%"
              }`}
            ></div>
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Left Content - Text */}
          <div className="space-y-4">
            {/* Slide Indicator */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <span
                className={`text-sm font-medium tracking-widest ${
                  theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
                }`}
              >
                {String(currentSlide + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-0.5 rounded-full transition-all duration-500 ${
                      index === currentSlide
                        ? `w-8 ${theme === "dark" ? "bg-[#E6501B]" : "bg-[#C3110C]"}`
                        : `w-4 ${theme === "dark" ? "bg-white/30" : "bg-[#280905]/20"}`
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <span
                className={`text-sm font-medium tracking-widest ${
                  theme === "dark" ? "text-white/40" : "text-[#280905]/40"
                }`}
              >
                {String(slides.length).padStart(2, "0")}
              </span>
            </motion.div>

            <div className="">
              {/* Main Heading with AnimatePresence for slide transitions */}
              {/* <div className="relative h-auto min-h-[4rem] sm:min-h-[5rem] lg:min-h-[6rem]"> */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentSlide}
                  variants={slideTextVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {slides[currentSlide].title}
                </motion.h1>
              </AnimatePresence>
              {/* </div> */}

              {/* Description - Changes with slide */}
              {/* <div className="relative h-auto min-h-[4rem]"> */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentSlide}
                  variants={slideTextVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`absolute text-lg sm:text-xl max-w-lg leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-950"
                  }`}
                >
                  {slides[currentSlide].description}
                </motion.p>
              </AnimatePresence>
              {/* </div> */}
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-4 mt-8"
            >
              <a
                href="/products"
                className="group relative px-8 py-3.5 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
              >
                <span className="relative z-10">Explore Products</span>
                <span className="absolute inset-0 bg-linear-to-r from-[#E6501B] to-[#C3110C] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>

              <a
                href="/about"
                className={`px-8 py-3.5 font-semibold rounded-full transition-all duration-300 flex items-center gap-2 ${
                  theme === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
                    : "bg-[#280905]/5 hover:bg-[#280905]/10 text-[#280905] border border-black hover:border-[#280905]/20"
                }`}
              >
                <span>Learn More</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className={`flex gap-8 pt-6 border-t ${
                theme === "dark" ? "border-white/10" : "border-[#280905]/10"
              }`}
            >
              <motion.div
                className="transition-all duration-500"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-[#280905]"
                  }`}
                >
                  10+
                </p>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Years Experience
                </p>
              </motion.div>
              <motion.div
                className="transition-all duration-500"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-2xl font-bold text-[#E6501B]">500+</p>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Clients Served
                </p>
              </motion.div>
              <motion.div
                className="transition-all duration-500"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-[#280905]"
                  }`}
                >
                  98%
                </p>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Satisfaction Rate
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Thumbnails */}
          <motion.div variants={slideRightVariants} className="hidden lg:block">
            <motion.div
              className="flex flex-col gap-3 items-end"
              variants={containerVariants}
            >
              {slides.map((slide, index) => (
                <motion.button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`relative w-48 h-20 rounded-lg overflow-hidden transition-all duration-500 group ${
                    index === currentSlide
                      ? "ring-2 ring-[#E6501B] scale-105"
                      : "opacity-40 hover:opacity-70"
                  }`}
                  variants={scaleVariants}
                  whileHover={{ scale: index === currentSlide ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 border-2 border-[#E6501B] rounded-lg"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1,
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        <span
          className={`text-xs font-medium tracking-widest uppercase ${
            theme === "dark" ? "text-white/40" : "text-[#280905]/40"
          }`}
        >
          Scroll
        </span>
        <div
          className={`w-5 h-8 border-2 rounded-full flex justify-center p-1 ${
            theme === "dark" ? "border-white/20" : "border-[#280905]/20"
          }`}
        >
          <motion.div
            className="w-1 h-2 bg-[#E6501B] rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: [0.6, -0.05, 0.01, 0.99],
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
