import { useTheme } from "../../context/ThemeContext";
// Real field photo: a telecom technician climbing a communication tower —
// the most characteristic image of a telecom materials & infrastructure supplier at work.

const CAPABILITIES = [
  "Telecom Materials",
  "Power & Electrical Equipment",
  "Safety Solutions",
  "Technical Procurement",
];

/**
 * ServiceCard — the hero/thesis section of the Services page.
 * Establishes what Onasis Links Resources Limited does in one glance:
 * a real photo of telecom infrastructure work, the palette's hazard-stripe
 * signature, and the exact service positioning copy.
 */
export default function ServiceCard() {
  const { theme } = useTheme();

  return (
    <section className="relative min-h-[28rem] overflow-hidden sm:min-h-[32rem] lg:min-h-[36rem]">
      {/* Background photograph */}
      {/* <img
        src={HERO_IMAGE}
        alt="Field technician climbing a red and white telecommunications tower during an installation"
        className={`absolute inset-0 h-full w-full object-cover object-middle ${theme === "dark" ? "brightness-30" : "brightness-60"}`}
        loading="eager"
      /> */}
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        className={`absolute inset-0 h-full w-full object-cover object-bottom ${theme === "dark" ? "brightness-50" : "brightness-70"}`}
      >
        <source src="/video/Services_Hero.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-[28rem] w-full max-w-5xl items-end px-4 pb-10 sm:min-h-[32rem] sm:px-6 lg:min-h-[36rem] lg:px-8 lg:pb-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
            Our Services
          </h1>

          <div className="mt-2 h-1 w-24 rounded-full bg-[#E6501B]"></div>

          <p className="mt-4 max-w-xl text-base text-gray-200">
            Premium telecom supplies, industrial equipment, technical
            procurement, and project support for Oil &amp; Gas, Manufacturing,
            Construction, Utilities, and Infrastructure.
          </p>
          <div className="mt-4 flex w-full flex-wrap gap-2">
            {CAPABILITIES.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/85 backdrop-blur-sm sm:text-[11px]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Content */}
      {/* <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24 pt-36 md:pt-44 text-center">
        <h1 className="font-display font-semibold text-white leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-[5.5rem] mb-6">
          Our Services
        </h1>

        <p className="max-w-2xl mx-auto text-white/75 text-base md:text-lg leading-relaxed mb-9 text-center">
          Premium telecom supplies, industrial equipment, technical procurement,
          and project support for Oil &amp; Gas, Manufacturing, Construction,
          Utilities, and Infrastructure.
        </p>

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
      </div> */}
    </section>
  );
}
