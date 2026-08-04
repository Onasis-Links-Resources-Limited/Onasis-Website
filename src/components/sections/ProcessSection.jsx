import { useTheme } from '../../context/ThemeContext';

const ProcessSection = () => {
  const { theme } = useTheme();

  const steps = [
    {
      id: 1,
      icon: '🔍',
      title: 'Consultation & Assessment',
      description: 'We understand your unique needs through in-depth consultation and infrastructure assessment.',
      color: '#E6501B'
    },
    {
      id: 2,
      icon: '📋',
      title: 'Solution Design & Planning',
      description: 'Our experts design customized telecom solutions tailored to your specific requirements.',
      color: '#C3110C'
    },
    {
      id: 3,
      icon: '⚙️',
      title: 'Implementation & Deployment',
      description: 'We deploy cutting-edge technology with minimal disruption to your operations.',
      color: '#740A03'
    },
    {
      id: 4,
      icon: '🛟',
      title: 'Support & Optimization',
      description: '24/7 technical support and continuous optimization for peak performance.',
      color: '#E6501B'
    }
  ];

  return (
    <section id="process" className={`py-20 ${
      theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`text-sm font-semibold tracking-widest uppercase ${
            theme === 'dark' ? 'text-[#E6501B]' : 'text-[#C3110C]'
          }`}>
            Our Process
          </span>
          <h2 className={`text-4xl font-bold mt-2 ${
            theme === 'dark' ? 'text-white' : 'text-[#280905]'
          }`}>
            How We <span className="text-[#E6501B]">Deliver Excellence</span>
          </h2>
          <p className={`mt-4 text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A systematic approach to delivering world-class telecommunication solutions.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
            theme === 'dark' ? 'bg-[#E6501B]/20' : 'bg-[#C3110C]/20'
          }`}></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                  }`}>
                    <div className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-gray-800/50 border border-gray-700'
                        : 'bg-gray-50 border border-gray-100'
                    }`}>
                      <div className="flex items-center gap-4 md:justify-end">
                        <div className={`text-3xl order-2 ${
                          index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                        }`}>
                          {step.icon}
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
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className="relative z-10 w-16 h-16 flex-shrink-0 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-white font-bold ${
                      theme === 'dark'
                        ? 'bg-[#E6501B] border-[#E6501B]'
                        : 'bg-[#C3110C] border-[#C3110C]'
                    }`}>
                      {step.id}
                    </div>
                    {/* Pulse Ring */}
                    <div className={`absolute inset-0 rounded-full animate-ping ${
                      theme === 'dark' ? 'bg-[#E6501B]/20' : 'bg-[#C3110C]/20'
                    }`}></div>
                  </div>

                  {/* Empty Space for Layout */}
                  <div className="hidden md:block w-5/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Showcase */}
        <div className={`mt-16 p-8 rounded-xl border ${
          theme === 'dark'
            ? 'bg-gray-800/30 border-gray-700'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🔬</div>
              <p className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-[#280905]'
              }`}>State-of-the-Art</p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Technology</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👨‍💻</div>
              <p className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-[#280905]'
              }`}>Expert Team</p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Certified Professionals</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-[#280905]'
              }`}>Quality Assurance</p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>ISO Certified</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⏱️</div>
              <p className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-[#280905]'
              }`}>24/7 Support</p>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>Always Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;