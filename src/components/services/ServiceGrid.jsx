import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const MotionLink = motion(Link);

const SERVICES = [
  {
    id: "supply",
    tag: "Supply",
    accent: "#E6501B",
    hazardClass: "bg-hazard-orange",
    body: "We partner with individuals and organisations on their product needs. We supply quality materials timely for your projects. We are always open for partnership. Contact us today.",
    image:
      "https://images.pexels.com/photos/11666903/pexels-photo-11666903.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.pexels.com/photos/4373997/pexels-photo-4373997.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.pexels.com/photos/3862135/pexels-photo-3862135.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-24 border-b border-dark-border last:border-b-0">
      {/* Image column with hazard-stripe frame — the page's recurring signature */}
      <div className={`relative ${reversed ? "md:order-2" : ""}`}>
        <div
          className={`absolute -top-4 -right-4 md:-top-6 md:-right-6 w-full h-full ${service.hazardClass}`}
          aria-hidden="true"
        />
        <div className="relative border border-dark-border">
          <img
            src={service.image}
            alt={service.alt}
            className="w-full h-[320px] md:h-[440px] object-cover grayscale-[15%] contrast-[1.05]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Copy column */}
      <div className={reversed ? "md:order-1" : ""}>
        <span
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase mb-4"
          style={{ color: service.accent }}
        >
          <span
            className="w-6 h-[2px]"
            style={{ backgroundColor: service.accent }}
          />
          {service.tag}
        </span>

        <h3 className="font-display font-semibold text-white text-3xl md:text-4xl mb-4">
          {service.title}
        </h3>

        <p className="text-dark-text/70 leading-relaxed mb-7 max-w-xl">
          {service.body}
        </p>

        <ul className="space-y-2.5 mb-8">
          {service.points.map((p) => (
            <li
              key={p}
              className="flex items-center gap-3 text-[13px] text-dark-text/55 font-mono uppercase tracking-wide"
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
          className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white border-b-2 pb-1 transition-all"
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
  return (
    <section className="bg-dark-background px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="pt-20 pb-2 md:pt-28">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-primary-600 text-2xl">
            What We Do
          </span>
          <h2 className="font-display font-semibold text-4xl md:text-5xl mt-3 max-w-2xl ">
            Materials, equipment, and expertise for the field.
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
