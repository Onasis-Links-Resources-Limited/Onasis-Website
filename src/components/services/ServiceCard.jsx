// Real field photo: a telecom technician climbing a communication tower —
// the most characteristic image of a telecom materials & infrastructure supplier at work.
const HERO_IMAGE =
  "https://images.pexels.com/photos/11320755/pexels-photo-11320755.jpeg?auto=compress&cs=tinysrgb&w=1920";

const CAPABILITIES = [
  "Telecom Materials",
  "Power & Electrical Equipment",
  "Safety Solutions",
  "Technical Procurement",
];

const SECTORS = [
  "Oil & Gas",
  "Manufacturing",
  "Construction",
  "Utilities",
  "Infrastructure",
];

/**
 * ServiceCard — the hero/thesis section of the Services page.
 * Establishes what Onasis Links Resources Limited does in one glance:
 * a real photo of telecom infrastructure work, the palette's hazard-stripe
 * signature, and the exact service positioning copy.
 */
export default function ServiceCard() {
  return (
    <section className="relative w-full h-[50vh] min-h-[420px] flex items-end overflow-hidden bg-primary-900">
      {/* Signature element: hazard-stripe accent, echoing cable colour-bands & site safety tape */}
      <div
        className="absolute top-0 left-0 w-full h-[6px] z-20 bg-hazard-top"
        aria-hidden="true"
      />

      {/* Background photograph */}
      <img
        src={HERO_IMAGE}
        alt="Field technician climbing a red and white telecommunications tower during an installation"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        loading="eager"
      />

      {/* Gradient overlays for legibility, tuned to the primary-900 base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(40,9,5,0.55) 0%, rgba(40,9,5,0.65) 40%, rgba(40,9,5,0.96) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(40,9,5,0.97) 0%, rgba(40,9,5,0.55) 42%, rgba(40,9,5,0.1) 75%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-36 md:pt-44 text-center">
        <h1 className="font-display font-semibold text-white leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-[5.5rem] mb-6">
          Our Services
        </h1>

        <p className="max-w-2xl mx-auto text-white/75 text-base md:text-lg leading-relaxed mb-9 text-center">
          Premium telecom supplies, industrial equipment, technical procurement, and project support for Oil &amp; Gas,
          Manufacturing, Construction, Utilities, and Infrastructure.
        </p>

        {/* Capability chips — plain-language labels for what we offer */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {CAPABILITIES.map((c) => (
            <span
              key={c}
              className="font-mono text-[10px] md:text-[11px] tracking-widest uppercase px-3 py-1.5 border border-white/20 text-white/85 rounded-full bg-white/[0.06] backdrop-blur-sm"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
