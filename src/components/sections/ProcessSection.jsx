import { useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, useInView } from 'framer-motion';
import { 
  Send, 
  NotebookText, 
  BanknoteCheck, 
  CircleCheckBig,
  Shield,
  TrendingUp,
  Headphones,
  Truck,
} from 'lucide-react';

const ProcessSection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const steps = [
    {
      id: 1,
      icon: Send,
      title: 'Send Us A Request',
      description: 'We are waiting to meet you, be it a request for quotation for a product or partnership.',
      color: '#E6501B'
    },
    {
      id: 2,
      icon: NotebookText,
      title: 'Response & Followup',
      description: 'We often respond quickly with your quotation/procedure for partnership. We also support you with all relevant facts.',
      color: '#C3110C'
    },
    {
      id: 3,
      icon: BanknoteCheck,
      title: 'Commitment from you',
      description: 'For new clients, we often require a commitment fee before delivery. However, for our existing clients, we follow the terms of our contract.',
      color: '#740A03'
    },
    {
      id: 4,
      icon: CircleCheckBig,
      title: 'Accept Your Products',
      description: 'At this point, we deliver/supply your products. You often acknowledge receipt. The cycle continues.',
      color: '#E6501B'
    }
  ];

  // Technology showcase data - matching the inspiration image
  const showcaseItems = [
    {
      id: 1,
      icon: Shield,
      title: 'Superior Quality',
      description: 'Top-notch quality products with warranty',
      color: '#E6501B'
    },
    {
      id: 2,
      icon: TrendingUp,
      title: 'Competitive Pricing',
      description: 'We offer our products at a competitive price',
      color: '#C3110C'
    },
    {
      id: 3,
      icon: Truck,
      title: 'Timely Delivery',
      description: 'We often beat our lead time',
      color: '#740A03'
    },
    {
      id: 4,
      icon: Headphones,
      title: 'Technical Support',
      description: 'Having difficulties? We support you all through.',
      color: '#E6501B'
    }
  ];

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
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const showcaseVariants = {
    hidden: { opacity: 0, scale: 0.95 },
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
      id="process" 
      ref={sectionRef}
      className={`py-20 overflow-hidden ${
        theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span className={`text-sm font-bold tracking-[0.2em] uppercase ${
            theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
          }`}>
            Our Process
          </span>
          <h2 className={`text-4xl sm:text-5xl font-light mt-2 ${
            theme === 'dark' ? 'text-white' : 'text-[#280905]'
          }`}>
            How We <span className={`${theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'}`}>Deliver Excellence</span>
          </h2>
          <p className={`mt-4 text-base ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A systematic approach to delivering world-class telecommunication solutions.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
            theme === 'dark' ? 'bg-[#E6501B]/20' : 'bg-[#C3110C]/20'
          }`}></div>

          <div className="space-y-10">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div 
                  key={step.id} 
                  className="relative"
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <div className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    {/* Content */}
                    <div className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                    }`}>
                      <motion.div 
                        className={`p-6 rounded-xl transition-all duration-300 ${
                          theme === 'dark'
                            ? 'hover:bg-gray-800/50'
                            : 'hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-4 md:justify-end">
                          <div className={`order-2 ${
                            index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                          }`}>
                            <Icon className={`w-12 h-12 ${
                              theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
                            }`} strokeWidth={1.5} />
                          </div>
                          <h3 className={`text-xl font-bold order-1 ${
                            index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                          } ${theme === 'dark' ? 'text-white' : 'text-[#280905]'}`}>
                            {step.title}
                          </h3>
                        </div>
                        <p className={`mt-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {step.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Center Circle */}
                    <motion.div 
                      className="relative z-10 w-14 h-14 flex-shrink-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center text-white font-bold ${
                        theme === 'dark'
                          ? 'bg-[#E6501B] border-[#E6501B]'
                          : 'bg-[#C3110C] border-[#C3110C]'
                      }`}>
                        {step.id}
                      </div>
                      {/* Pulse Ring */}
                      <motion.div 
                        className={`absolute inset-0 rounded-full ${
                          theme === 'dark' ? 'bg-[#E6501B]/20' : 'bg-[#C3110C]/20'
                        }`}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    {/* Empty Space for Layout */}
                    <div className="hidden md:block w-5/12"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Technology Showcase - Matching the inspiration image */}
        <motion.div 
          className={`mt-20 p-8 rounded-2xl`}
          variants={showcaseVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {showcaseItems.map((item) => {
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={item.id}
                  className="text-center group"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Large Icon */}
                  <motion.div 
                    className="flex justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300"
                    >
                      <IconComponent 
                      fill={theme === 'dark' ? `${item.color}33` : `${item.color}10`}
                        className="w-12 h-12" 
                        strokeWidth={1.5}
                        style={{ color: item.color }}
                      />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h4 className={`text-lg font-bold mb-1 transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-white group-hover:text-[#E6501B]' 
                      : 'text-[#280905] group-hover:text-[#C3110C]'
                  }`}>
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className={`text-sm leading-relaxed ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;