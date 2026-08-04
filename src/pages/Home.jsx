import AboutSection from "../components/sections/AboutSection";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import WhyChooseUsSection from "../components/sections/WhyChooseUsSection";
import ProcessSection from "../components/sections/ProcessSection";
import BrandsSection from "../components/sections/BrandsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import CTASection from "../components/sections/CTASection";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <BrandsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
