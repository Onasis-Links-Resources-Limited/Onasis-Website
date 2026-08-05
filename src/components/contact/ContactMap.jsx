import { useTheme } from "../../context/ThemeContext";
import { Phone, Mail } from "lucide-react";

const ContactMap = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`relative z-30 -mt-20 px-6 lg:px-10 pb-24 transition-colors duration-300 ${
        isDark ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 mt-24">
          <p
            className={`uppercase tracking-[0.2em] font-bold text-sm mb-3 transition-colors duration-300 ${
              isDark ? "text-[#E6501B]" : "text-[#C3110C]"
            }`}
          >
            Visit Our Office
          </p>
          <h2
            className={`text-5xl font-light transition-colors duration-300 ${
              isDark ? "text-white" : "text-[#C3110C]"
            }`}
          >
            How to Find Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Google Map */}
          <div
            className={`overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ${
              isDark ? "border border-gray-700" : ""
            }`}
          >
            <iframe
              title="Onasis Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.486540216153!2d3.553643273992329!3d6.459872923901527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf786b24163a3%3A0x3b15126bbe00b025!2sEleganza%20Gardens%20Estate!5e0!3m2!1sen!2sng!4v1785937065999!5m2!1sen!2sng"
              width="100%"
              height="450"
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>

          {/* Office Details */}
          <div className="flex flex-col justify-center">
            <div
              className={`rounded-xl shadow-lg p-8 mb-6 transition-all duration-300 ${
                isDark
                  ? "bg-[#141414] border border-gray-700 hover:bg-[#1a1a1a] hover:border-[#C3110C] hover:shadow-lg hover:shadow-[#C3110C]/10"
                  : "bg-white border border-gray-200 hover:border-[#C3110C] hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <h3
                className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-[#280905]"
                }`}
              >
                Lagos Head Office
              </h3>
              <p
                className={`leading-8 transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Plot 78A, Eleganza Gardens
                <br />
                Lekki–Epe Expressway
                <br />
                Lagos, Nigeria
              </p>
            </div>

            <div
              className={`rounded-xl shadow-lg p-8 border transition-all duration-300 ${
                isDark
                  ? "border-gray-700 bg-[#141414] hover:bg-[#1a1a1a] hover:border-[#C3110C] hover:shadow-lg hover:shadow-[#C3110C]/10"
                  : "border-gray-200 bg-white hover:border-[#C3110C] hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <h3
                className={`text-2xl font-semibold mb-4 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-[#280905]"
                }`}
              >
                Contact Information
              </h3>
              <p
                className={`mb-2 transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Phone size={20} className="inline mr-2" />
                +234 802 958 1337
              </p>
              <p
                className={`transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Mail size={20} className="inline mr-2" />
                info@onasisltd.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
