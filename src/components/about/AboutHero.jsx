import { useTheme } from "../../context/ThemeContext";

const AboutHero = () => {
  const { theme } = useTheme();

  return (
    <section className="relative h-100 overflow-hidden">
      {/* Image - Full width and height */}
      <img src="/images/about-us.png" alt="about-us" className={`absolute inset-0 h-full w-full object-cover object-middle ${theme === 'dark' ? 'brightness-50' : 'brightness-70'}`} />
      
      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-5xl items-center">
        <div className="max-w-2xl">

          <h1 className="text-5xl leading-tight md:text-7xl font-bold dark:text-white">
            About Us
          </h1>

          <div className="mt-2 h-1 w-24 rounded-full bg-[#E6501B]"></div>

          <p className="mt-4 max-w-xl text-base text-gray-200">
            Our mission is to provide businesses with the financial tools they need to thrive in today's market.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;