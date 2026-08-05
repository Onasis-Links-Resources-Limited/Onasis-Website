import heroImage from "../../assets/contact/image.png"; // Change to .jpg if that's your image

const ContactHero = () => {
  return (
    <section className="relative h-[550px] overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Onasis Links Resources Limited"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Light Mode Overlay - Lighter */}
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.15)]"></div>

      {/* Dark Mode Overlay - Darker */}
      <div className="absolute inset-0 bg-[rgba(10,10,10,0.75)]"></div>

      {/* Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#1a1a1a]/70 to-[#2a2a2a]/30"></div>

      {/* Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent"></div>

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-8 lg:px-20">
        <div className="max-w-2xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[8px] text-[#E6501B]">
            Onasis Links Resources Limited
          </p>

          <h1 className="text-5xl font-light leading-tight text-white md:text-7xl">
            Contact Us
          </h1>

          <div className="mt-6 h-1 w-24 rounded-full bg-[#E6501B]"></div>

          <p className="mt-8 max-w-xl text-lg leading-9 text-gray-200">
            For general enquiries, partnerships, and project discussions, please
            submit your details below. Our team will respond as soon as
            possible.
          </p>

          {/* Find Out More Button */}
          <a
            href="#contact-form"
            className="group mt-10 inline-flex items-center gap-4 border border-[#E6501B] px-8 py-4 text-[#E6501B] transition-all duration-300 hover:bg-[#E6501B] hover:text-white relative overflow-hidden"
          >
            <span className="relative z-10">Find Out More</span>
            <span className="relative z-10 text-xl transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
            <span className="absolute inset-0 bg-[#E6501B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </a>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#E6501B] via-[#C3110C] to-transparent"></div>
    </section>
  );
};

export default ContactHero;
  