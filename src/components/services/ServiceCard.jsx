import { useTheme } from "../../context/ThemeContext";
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

/**
 * ServiceCard — the hero/thesis section of the Services page.
 * Establishes what Onasis Links Resources Limited does in one glance:
 * a real photo of telecom infrastructure work, the palette's hazard-stripe
 * signature, and the exact service positioning copy.
 */
export default function ServiceCard() {
  const { theme } = useTheme();

  return (
    <section className="relative h-100 overflow-hidden">
      {/* Background photograph */}
      <img
        src={HERO_IMAGE}
        alt="Field technician climbing a red and white telecommunications tower during an installation"
        className={`absolute inset-0 h-full w-full object-cover object-middle ${theme === "dark" ? "brightness-30" : "brightness-60"}`}
        loading="eager"
      />

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-5xl items-end pb-10">
        <div className="">
          <h1 className="text-5xl leading-tight md:text-7xl font-bold dark:text-white">
            Our Services
          </h1>

          <div className="mt-2 h-1 w-24 rounded-full bg-[#E6501B]"></div>

          <p className="mt-4 max-w-xl text-base text-gray-200">
            Premium telecom supplies, industrial equipment, technical
            procurement, and project support for Oil &amp; Gas, Manufacturing,
            Construction, Utilities, and Infrastructure.
          </p>
          <div className="flex flex-row w-fit gap-2 mt-2">
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
