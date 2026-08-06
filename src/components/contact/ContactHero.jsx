import { useTheme } from "../../context/ThemeContext";

const ContactHero = () => {
  const { theme } = useTheme();

  return (
    <section className="relative h-120 overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className={`absolute inset-0 h-full w-full object-cover object-bottom ${theme === 'dark' ? 'brightness-50' : 'brightness-70'}`}
      >
        <source src="/video/contact-us.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-5xl items-center">
        <div className="max-w-2xl">

          <h1 className="text-5xl leading-tight md:text-7xl font-bold dark:text-white">
            Contact Us
          </h1>

          <div className="mt-2 h-1 w-24 rounded-full bg-[#E6501B]"></div>

          <p className="mt-4 max-w-xl text-base text-gray-200">
            For general enquiries, partnerships, and project discussions, please
            submit your details below. Our team will respond as soon as
            possible.
          </p>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-[#E6501B] via-[#C3110C] to-transparent"></div>
    </section>
  );
};

export default ContactHero;
