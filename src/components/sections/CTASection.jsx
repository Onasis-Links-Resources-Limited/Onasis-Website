import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const CTASection = () => {
  const { theme } = useTheme();

  return (
    <section className={`py-20 relative overflow-hidden ${
      theme === 'dark'
        ? 'bg-gradient-to-r from-[#280905] to-[#740A03]'
        : 'bg-gradient-to-r from-[#C3110C] to-[#E6501B]'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}></div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Ready to <span className="text-[#E6501B]">Transform</span> Your Connectivity?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join 500+ satisfied clients and experience world-class telecommunication 
          solutions tailored to your needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="px-8 py-4 bg-white text-[#C3110C] hover:bg-[#E6501B] hover:text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            Get Started Today
          </Link>
          <Link
            to="/services"
            className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#C3110C] font-bold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Services
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📞</span>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔒</span>
            <span>100% Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span>Fast Deployment</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span>Competitive Pricing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;