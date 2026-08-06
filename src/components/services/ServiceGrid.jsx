import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useTheme } from "../../context/ThemeContext";

const MotionLink = motion(Link);

const SERVICES = [
  {
    id: "supply",
    tag: "Supply",
    accent: "#E6501B",
    hazardClass: "bg-hazard-orange",
    body: "We partner with individuals and organisations on their product needs. We supply quality materials timely for your projects. We are always open for partnership. Contact us today.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80",
    alt: "A red forklift stationed at a warehouse loading dock, staged to move supplies for a project",
    points: [
      "Serves individuals & organisations",
      "Timely, quality material supply",
      "Open to new partnerships",
    ],
    cta: "Start a Partnership",
    href: ROUTES.CONTACT,
  },
  {
    id: "sales",
    tag: "Sales",
    accent: "#C3110C",
    hazardClass: "bg-hazard-red",
    body: "We supply high-quality Telecommunications, Power, and Electrical Equipment to individuals and organizations at competitive prices. All our products are backed by a manufacturer's warranty, ensuring quality, reliability, and peace of mind.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Close-up of fiber optic switch equipment with rows of bright, colour-coded connectors",
    points: [
      "Telecom, power & electrical equipment",
      "Competitive, transparent pricing",
      "Manufacturer's warranty on every product",
    ],
    cta: "Explore Our Products",
    href: ROUTES.PRODUCTS,
  },
  {
    id: "technical-support",
    tag: "Technical Support",
    accent: "#740A03",
    hazardClass: "bg-hazard-burgundy",
    body: "Our experienced technical team provides expert advice and recommendations to help you select the right materials for your project. Contact us today.",
    image:
      "https://images.unsplash.com/photo-1531497258014-b5736f376b1b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Two engineers reviewing project blueprints together at a desk, discussing material specifications",
    points: [
      "Expert, project-specific advice",
      "Help selecting the right materials",
      "An experienced technical team",
    ],
    cta: "Contact Our Technical Team",
    href: ROUTES.CONTACT,
  },
];

function ServiceRow({ service, reversed }) {
  const { theme } = useTheme();
  return (
    <div className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24 border-b ${theme === "dark" ? "last:border-b-0 border-gray-500" : "last:border-b-0 border-dark-border"}`}>
      {/* Image column with hazard-stripe frame — the page's recurring signature */}
      <div className={`relative group overflow-hidden transition-all duration-500 ${reversed ? "md:order-2 rounded-r-full" : "rounded-l-full"}`}>
       
          <img
            src={service.image}
            alt={service.alt}
            className={`w-full h-[320px] md:h-[440px] object-cover grayscale-[15%] contrast-[1.05] group-hover:scale-110 transition-all duration-300 object-bottom-left ${theme === "dark" ? "dark:grayscale-[15%] dark:contrast-[1.05]" : ""}`}
            loading="lazy"
          />
      </div>

      {/* Copy column */}
      <div className={`${reversed ? "md:order-1" : ""}`}>
        <span
          className="inline-flex items-center gap-2 font-mono font-bold text-small tracking-[0.2em] uppercase mb-4"
          style={{ color: service.accent }}
        >
          <span
            className="w-6 h-[2px]"
            style={{ backgroundColor: service.accent }}
          />
          {service.tag}
        </span>

        <p className={`leading-relaxed mb-7 max-w-xl ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
          {service.body}
        </p>

        <ul className="space-y-2.5 mb-8">
          {service.points.map((p) => (
            <li
              key={p}
              className={`flex items-center gap-3 text-[13px] font-mono uppercase tracking-wide ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}
            >
              <span
                className="w-1.5 h-1.5 shrink-0"
                style={{ backgroundColor: service.accent }}
              />
              {p}
            </li>
          ))}
        </ul>

        <MotionLink
          to={service.href || ROUTES.CONTACT}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide border-b-2 pb-1 transition-all ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}
          style={{ borderColor: service.accent }}
        >
          {service.cta}
          <span
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            &rarr;
          </span>
        </MotionLink>
      </div>
    </div>
  );
}

/**
 * ServiceGrid — the three pillars of what Onasis Links Resources Limited does:
 * Supply, Sales, and Technical Support. Laid out as alternating rows so each
 * real, on-brand photo sits directly beside the copy it illustrates.
 */
export default function ServiceGrid() {
  const { theme } = useTheme();
  return (
    <section className="bg-dark-background px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="mt-20">
          <p
            className={`text-sm uppercase tracking-[0.2em] ${
              theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
            } font-bold mb-4`}
          >
            What we do
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-light transition-colors duration-300 w-2xl ${
              theme === "dark" ? "text-white" : "text-[#280905]"
            }`}
          >
            Materials,<span className={` ${theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"}`}> Equipment,</span> and
            Expertise for the field.
          </h2>
        </div>

        {SERVICES.map((service, index) => (
          <ServiceRow
            key={service.id}
            service={service}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
