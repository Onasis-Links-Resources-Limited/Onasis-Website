import { useTheme } from '../../context/ThemeContext';

const WhyChooseUsSection = () => {
  const { theme } = useTheme();

  const reasons = [
    {
      id: 1,
      icon: '📅',
      title: '10+ Years Experience',
      description: 'A decade of excellence in telecommunications infrastructure and solutions.',
      color: '#E6501B'
    },
    {
      id: 2,
      icon: '🌍',
      title: 'Pan-African Coverage',
      description: 'Reaching communities and businesses across the African continent.',
      color: '#C3110C'
    },
    {
      id: 3,
      icon: '🔒',
      title: 'Enterprise-Grade Security',
      description: 'State-of-the-art security measures protecting your data and communications.',
      color: '#740A03'
    },
    {
      id: 4,
      icon: '⚡',
      title: 'Cutting-Edge Technology',
      description: 'Always at the forefront of telecom innovation and emerging technologies.',
      color: '#E6501B'
    },
    {
      id: 5,
      icon: '👨‍💻',
      title: 'Certified Experts',
      description: 'Our team of certified professionals delivers world-class solutions.',
      color: '#C3110C'
    },
    {
      id: 6,
      icon: '🛟',
      title: '24/7 Support',
      description: 'Round-the-clock technical support for uninterrupted operations.',
      color: '#740A03'
    }
  ];

  return (
    <section id="why-us" className={`py-20 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-sm font-semibold tracking-widest uppercase ${
            theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
          }`}>
            Why Choose Us
          </span>
          <h2 className={`text-4xl font-bold mt-2 ${
            theme === 'dark' ? 'text-white' : 'text-[#280905]'
          }`}>
            The <span className="text-[#E6501B]">Onasis Links</span> Advantage
          </h2>
          <p className={`mt-4 text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            What sets us apart in the competitive telecommunications landscape.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className={`group p-8 rounded-2xl transition-all duration-500 hover:-translate-y-3 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700'
                  : 'bg-gray-50 hover:bg-white border border-gray-100 hover:shadow-xl'
              }`}
            >
              <div className="relative">
                {/* Icon with animated background */}
                <div className={`relative inline-block`}>
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      backgroundColor: theme === 'dark' 
                        ? `${reason.color}33` 
                        : `${reason.color}15`,
                      color: reason.color
                    }}
                  >
                    {reason.icon}
                  </div>
                  {/* Pulse effect */}
                  <div className={`absolute inset-0 rounded-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    theme === 'dark' ? 'bg-[#E6501B]/5' : 'bg-[#C3110C]/5'
                  }`}></div>
                </div>
              </div>

              <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-white group-hover:text-[#E6501B]' 
                  : 'text-[#280905] group-hover:text-[#C3110C]'
              }`}>
                {reason.title}
              </h3>
              <p className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {reason.description}
              </p>

              {/* Decorative line */}
              <div className={`mt-4 w-12 h-0.5 transition-all duration-300 group-hover:w-full ${
                theme === 'dark' ? 'bg-[#E6501B]/30' : 'bg-[#C3110C]/30'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Key Metrics */}
        <div className={`mt-16 p-8 rounded-2xl bg-gradient-to-r ${
          theme === 'dark'
            ? 'from-[#280905] to-[#740A03]'
            : 'from-[#E6501B]/10 to-[#C3110C]/10'
        }`}>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`text-4xl font-bold ${
                theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
              }`}>
                98%
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                Customer Satisfaction
              </p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${
                theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
              }`}>
                99.9%
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                Uptime Guarantee
              </p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${
                theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
              }`}>
                500+
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                Projects Completed
              </p>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${
                theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
              }`}>
                50+
              </div>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                Team Members
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;