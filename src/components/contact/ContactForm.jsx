import { useTheme } from "../../context/ThemeContext";

const ContactForm = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="contact-form"
      className={`relative z-30 -mt-20 lg:-mt-20 px-6 lg:px-10 pb-24 transition-colors duration-300 ${
        isDark ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className={`mx-auto max-w-5xl rounded-2xl p-8 lg:p-16 z-10 transition-colors duration-300`}>
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side */}
          <div>
            <p className={`text-sm uppercase tracking-[0.2em] ${
                theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
              } font-bold mb-4`}>
              Get In Touch
            </p>

            <h2 className={`text-5xl font-light leading-tight mb-8 transition-colors duration-300 ${
              isDark ? "text-white" : "text-black"
            }`}>
              Let <span className={` ${theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"}`}>Us Know</span>
              <br />
              How We Can Help
            </h2>

            <p className={`leading-8 transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-700"
            }`}>
              Onasis Links Resources Limited maintains a focused approach to
              communication. Our team reviews every enquiry and responds where
              appropriate.
            </p>
          </div>

          {/* Right Side - Form */}
          <form className="space-y-8 mt-10 lg:mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <input
                type="text"
                placeholder="First Name"
                className={`border-b py-3 outline-none transition-colors duration-300 ${
                  isDark 
                    ? "border-gray-700 text-white placeholder:text-gray-500 bg-transparent focus:border-[#C3110C]" 
                    : "border-gray-300 text-black bg-transparent focus:border-[#C3110C]"
                }`}
              />

              <input
                type="text"
                placeholder="Last Name"
                className={`border-b py-3 outline-none transition-colors duration-300 ${
                  isDark 
                    ? "border-gray-700 text-white placeholder:text-gray-500 bg-transparent focus:border-[#C3110C]" 
                    : "border-gray-300 text-black bg-transparent focus:border-[#C3110C]"
                }`}
              />

              <input
                type="email"
                placeholder="Email Address"
                className={`border-b py-3 outline-none transition-colors duration-300 ${
                  isDark 
                    ? "border-gray-700 text-white placeholder:text-gray-500 bg-transparent focus:border-[#C3110C]" 
                    : "border-gray-300 text-black bg-transparent focus:border-[#C3110C]"
                }`}
              />

              <input
                type="text"
                placeholder="Company"
                className={`border-b py-3 outline-none transition-colors duration-300 ${
                  isDark 
                    ? "border-gray-700 text-white placeholder:text-gray-500 bg-transparent focus:border-[#C3110C]" 
                    : "border-gray-300 text-black bg-transparent focus:border-[#C3110C]"
                }`}
              />
            </div>

            <input
              type="tel"
              placeholder="Phone Number"
              className={`w-full border-b py-3 outline-none transition-colors duration-300 ${
                isDark 
                  ? "border-gray-700 text-white placeholder:text-gray-500 bg-transparent focus:border-[#C3110C]" 
                  : "border-gray-300 text-black bg-transparent focus:border-[#C3110C]"
              }`}
            />

            <select className={`w-full border-b py-3 outline-none transition-colors duration-300 ${
              isDark 
                ? "border-gray-700 text-white bg-[#141414] focus:border-[#C3110C]" 
                : "border-gray-300 text-black bg-transparent focus:border-[#C3110C]"
            }`}>
              <option value="" className={isDark ? "bg-[#141414] text-white" : "bg-white text-black"}>Select Service</option>
              <option value="ict" className={isDark ? "bg-[#141414] text-white" : "bg-white text-black"}>ICT Solutions</option>
              <option value="engineering" className={isDark ? "bg-[#141414] text-white" : "bg-white text-black"}>Engineering</option>
              <option value="procurement" className={isDark ? "bg-[#141414] text-white" : "bg-white text-black"}>Procurement</option>
              <option value="consultancy" className={isDark ? "bg-[#141414] text-white" : "bg-white text-black"}>Consultancy</option>
            </select>

            <textarea
              rows="5"
              placeholder="Describe your enquiry"
              className={`w-full border-b py-3 outline-none resize-none transition-colors duration-300 ${
                isDark 
                  ? "border-gray-700 text-white placeholder:text-gray-500 bg-transparent focus:border-[#C3110C]" 
                  : "border-gray-300 text-black bg-transparent focus:border-[#C3110C]"
              }`}
            />

            <label className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-400"
            }`}>
              <input type="checkbox" className="accent-[#C3110C]" />
              I agree to the processing of my personal data.
            </label>

            <button
              type="submit"
              className={`${theme === "dark" ? "hover:bg-[#E6501B] bg-[#E6501B]" : "hover:bg-[#E6501B] bg-[#C3110C]"} text-white px-8 py-3 rounded-lg hover:bg-[#E6501B] cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#C3110C]/20 hover:-translate-y-0.5`}
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;