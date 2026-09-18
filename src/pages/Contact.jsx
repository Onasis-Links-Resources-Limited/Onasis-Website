import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import ContactMap from "../components/contact/ContactMap";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Onasis Links Resources Limited</title>
        <meta
          name="description"
          content="Get in touch with Onasis Links Resources Limited for ICT, engineering, procurement, or consultancy enquiries."
        />
        <link rel="canonical" href="https://onasisltd.com/contact" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Contact Onasis Links Resources Limited"
        />
        <meta
          property="og:description"
          content="Reach out for enquiries, partnerships, or a quote."
        />
        <meta property="og:url" content="https://onasisltd.com/contact" />
        <meta
          property="og:image"
          content="https://onasisltd.com/images/og/contact.jpg"
        />
      </Helmet>
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <ContactMap />
    </>
  );
};

export default Contact;
