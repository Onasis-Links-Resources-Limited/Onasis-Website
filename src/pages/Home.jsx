import AboutSection from "../components/sections/AboutSection";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import WhyChooseUsSection from "../components/sections/WhyChooseUsSection";
import ProcessSection from "../components/sections/ProcessSection";
import BrandsSection from "../components/sections/BrandsSection";
import CTASection from "../components/sections/CTASection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <BrandsSection />
      <CTASection />
    </div>
  );
};

export default Home;
