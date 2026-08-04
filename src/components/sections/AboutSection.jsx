import { useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, useInView } from "framer-motion";

const AboutSection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const stats = [
    { number: "10+", label: "Years of experience" },
    { number: "500+", label: "Clients served" },
    { number: "100%", label: "Success Rate" },
    { number: "16+", label: "Industry Recognition" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const slideRightVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
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

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePauseVideo = () => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-20 overflow-hidden ${
        theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gap-16 items-start">
          {/* Left - Text Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="space-y-6"
          >
            {/* Tag */}
            <motion.span
              variants={itemVariants}
              className={`inline-block text-sm tracking-[0.2em] uppercase font-bold ${
                theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
              }`}
            >
              About Us
            </motion.span>

            {/* Description Paragraphs */}
            <motion.p
              variants={itemVariants}
              className={`text-base leading-relaxed max-w-3xl font-medium ${
                theme === "dark" ? "text-gray-300" : "text-black"
              }`}
            >
              Onasis Links Resources Limited is a leading telecommunications
              infrastructure provider dedicated to bridging the digital divide
              across Africa. With over a decade of experience, we deliver
              cutting-edge connectivity solutions that empower businesses and
              communities.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 mt-8 md:mt-12 gap-8 md:gap-12 items-start"
          >
            {/* Left Column - Text & Stats */}
            <div className="flex flex-col justify-between h-full">
              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-5"
              >
                <motion.p
                  variants={itemVariants}
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-black"
                  }`}
                >
                  Experts in telecommunications, networking, and digital
                  infrastructure, we simplify complexity and guide you with
                  confidence.
                </motion.p>
                <a
                  href="/about"
                  className={`inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 ${
                    theme === "dark"
                      ? "bg-[#E6501B] hover:bg-[#C3110C] text-white"
                      : "bg-[#C3110C] hover:bg-[#E6501B] text-white"
                  }`}
                >
                  Learn More
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
                </a>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={scaleVariants}
                    custom={index}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-xl text-start transition-all duration-300"
                  >
                    <div
                      className={`text-3xl font-bold ${
                        theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
                      }`}
                    >
                      {stat.number}
                    </div>
                    <div
                      className={`text-sm mt-1 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Video (9:16 Ratio) */}
            <motion.div
              variants={slideRightVariants}
              className="relative overflow-hidden rounded-xl"
            >
              {/* 9:16 Aspect Ratio Container */}
              <div className="relative aspect-12/16 max-h-110 mx-auto">
                {/* Video Element */}
                <video
                  ref={videoRef}
                  src="/video/about_section.mp4"
                  className="w-full h-full object-cover rounded-xl"
                  playsInline
                  onPlay={() => setIsVideoPlaying(true)}
                  onPause={() => setIsVideoPlaying(false)}
                  onEnded={() => setIsVideoPlaying(false)}
                >
                  Your browser does not support the video tag.
                </video>

                {/* Play Button Overlay - Only show when video is not playing */}
                {!isVideoPlaying && (
                  <div className="absolute inset-0 bg-[#280905]/40 hover:bg-[#280905]/50 transition-all duration-300 rounded-xl flex flex-col items-center justify-center cursor-pointer group">
                    {/* Play Button */}
                    <button
                      onClick={handlePlayVideo}
                      className="relative z-10 flex flex-col items-center gap-4 group"
                      aria-label="Play video"
                    >
                      <div
                        className={`w-18 h-18 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-2xl ${
                          theme === "dark"
                            ? "bg-[#E6501B] group-hover:bg-[#C3110C]"
                            : "bg-[#C3110C] group-hover:bg-[#E6501B]"
                        }`}
                      >
                        <svg
                          className="w-12 h-12 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <span className="text-white text-sm font-medium tracking-wider bg-[#280905]/60 px-4 py-2 rounded-full backdrop-blur-sm group-hover:bg-[#280905]/80 transition-all duration-300">
                        Watch Video
                      </span>
                    </button>
                  </div>
                )}

                {/* Video Controls Overlay - Show when playing */}
                {isVideoPlaying && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                    <button
                      onClick={handlePauseVideo}
                      className={`px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 hover:scale-105 ${
                        theme === "dark"
                          ? "bg-[#E6501B] hover:bg-[#C3110C]"
                          : "bg-[#C3110C] hover:bg-[#E6501B]"
                      }`}
                    >
                      Pause
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
