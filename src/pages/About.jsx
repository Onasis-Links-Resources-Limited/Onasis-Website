import AboutHero from "../components/about/AboutHero";
import CompanyOverview from "../components/about/CompanyOverview";
import { Helmet } from "react-helmet-async";
// import TeamSection from '../components/about/TeamSection';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Onasis Links Resources Limited</title>
        <meta
          name="description"
          content="Learn about Onasis Links Resources Limited — our mission, values, and the team behind Nigeria's trusted ICT and engineering partner."
        />
        <link rel="canonical" href="https://onasisltd.com/about" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="About Onasis Links Resources Limited"
        />
        <meta
          property="og:description"
          content="Nigeria's trusted partner for ICT, engineering, and procurement solutions."
        />
        <meta property="og:url" content="https://onasisltd.com/about" />
        <meta
          property="og:image"
          content="https://onasisltd.com/images/og/about.jpg"
        />
      </Helmet>
      <AboutHero />
      <CompanyOverview />
      {/* <TeamSection /> */}
    </>
  );
};

export default About;
