import ServiceCard from "../components/services/ServiceCard";
import ServiceGrid from "../components/services/ServiceGrid";
import { Helmet } from "react-helmet-async";

const Services = () => {
  return (
    <div>
      <Helmet>
        <title>Our Services | Onasis Links Resources Limited</title>
        <meta
          name="description"
          content="Explore our services: ICT solutions, engineering, procurement, and consultancy — tailored for Nigerian businesses."
        />
        <link rel="canonical" href="https://onasisltd.com/services" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Our Services | Onasis Links Resources Limited"
        />
        <meta
          property="og:description"
          content="ICT, engineering, procurement, and consultancy services."
        />
        <meta property="og:url" content="https://onasisltd.com/services" />
        <meta
          property="og:image"
          content="https://onasisltd.com/images/og/services.jpg"
        />
      </Helmet>
      <ServiceCard />
      <ServiceGrid />
    </div>
  );
};

export default Services;
