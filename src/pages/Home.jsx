import AboutSection from "../components/sections/AboutSection";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import WhyChooseUsSection from "../components/sections/WhyChooseUsSection";
import ProcessSection from "../components/sections/ProcessSection";
import BrandsSection from "../components/sections/BrandsSection";
import CTASection from "../components/sections/CTASection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Onasis Links Resources Limited — ICT, Engineering & Procurement</title>
        <meta
          name="description"
          content="Onasis Links Resources Limited delivers world-class ICT, engineering, procurement, and consultancy services across Nigeria."
        />
        <link rel="canonical" href="https://onasisltd.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Onasis Links Resources Limited" />
        <meta
          property="og:description"
          content="World-class ICT, engineering, procurement, and consultancy services."
        />
        <meta property="og:url" content="https://onasisltd.com/" />
        <meta property="og:image" content="https://onasisltd.com/images/og/home.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Onasis Links Resources Limited" />
        <meta
          name="twitter:description"
          content="World-class ICT, engineering, procurement, and consultancy services."
        />
        <meta name="twitter:image" content="https://onasisltd.com/images/og/home.jpg" />
      </Helmet>

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