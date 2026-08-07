import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Award, BadgeCheck, Handshake } from "lucide-react";


const BrandsSection = () => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const brands = [
    {
      id: 1,
      name: "Huawei",
      logo: "https://www.huawei.com/-/media/hcomponent-header/1.0.1.20260519084135/component/img/huawei_logo.png",
    },
    {
      id: 2,
      name: "Camp",
      logo: "https://www.camp.it/api/GetFile/eda365f8-48b6-4fda-b3a7-5bc212b27142",
    },
    {
      id: 3,
      name: "Roxtec",
      logo: "https://www.roxtec.com/globalassets/02.-images/logos/site-header-logos/roxtec_logo_black_blue_rgb_fixed.svg",
    },
    {
      id: 4,
      name: "Commscope",
      logo: "https://webresources.commscope.com/images/assets/CS_Amphenol_Color_RGB/Zz1lMmUyZjM1MmViZDQxMWYwYWRmZWEyYmFlMjc4NDJiZQ==",
    },
    {
      id: 5,
      name: "InstaPower",
      logo: "https://www.instapower.com/images/newlogo.png",
    },
    {
      id: 6,
      name: "AKCP",
      logo: "https://www.akcp.com/wp-content/uploads/2025/03/akcp-white-logo.webp",
    },
    {
      id: 7,
      name: "Corning",
      logo: "https://www.corning.com/etc.clientlibs/settings/wcm/designs/corning/resources/images/global/logo-glass-bg.png",
    },
    {
      id: 8,
      name: "YOFC",
      logo: "https://en.yofc.com/theme/2024_images/logo.png",
    },
    {
      id: 9,
      name: "Emerson",
      logo: "https://www.emerson.com/is/image/emerson/logo?fmt=webp-alpha&qlt=95",
    },
    {
      id: 10,
      name: "Nigerchin",
      logo: "https://nigerchin.com/wp-content/uploads/2023/08/Vector-300x59.png",
    },
    {
      id: 11,
      name: "3M",
      logo: "https://www.3m.com/3m_theme_assets/themes/3MTheme/assets/images/unicorn/Logo.svg",
    },
    {
      id: 12,
      name: "Legrand",
      logo: "https://www.legrand.ng/themes/custom/legrand_wf/logo.svg",
    },
    {
      id: 13,
      name: "HP",
      logo: "https://th.bing.com/th/id/R.488d10a8f526309d8931cc51e1d570f3?rik=v9ulsoTziVXmeA&pid=ImgRaw&r=0",
    },
  ];

  // Double the array for seamless scrolling
  const doubledBrands = [...brands, ...brands];

  return (
    <section
      id="brands"
      className={`py-20 overflow-hidden ${
        theme === "dark" ? "bg-gray-700/50" : "bg-gray-200"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span
            className={`text-sm font-bold tracking-widest uppercase ${
              theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
            }`}
          >
            Our Partners & Clients
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-light mt-2 ${
              theme === "dark" ? "text-white" : "text-[#280905]"
            }`}
          >
            Trusted by{" "}
            <span
              className={`${theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"}`}
            >
              Industry Leaders
            </span>
          </h2>
          <p
            className={`mt-4 text-base ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            We partner with the best in the industry to deliver exceptional
            value.
          </p>
        </div>

        {/* Brand Logos Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <div
              className={`flex w-max gap-12 py-8 ${
                isHovered ? "animation-paused" : ""
              }`}
              style={{
                animation: `scrollBrands 30s linear infinite`,
                animationPlayState: isHovered ? "paused" : "running",
              }}
            >
              {doubledBrands.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex-shrink-0 w-40 h-20 flex items-center transition-all duration-300"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-12 w-auto object-contain transition-all duration-300"
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                        theme === "dark" ? "bg-[#0a0a0a]/80" : "bg-white/80"
                      }`}
                    >
                      <span
                        className={`text-xs font-semibold ${
                          theme === "dark" ? "text-white" : "text-[#280905]"
                        }`}
                      >
                        {brand.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Awards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div
            className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-100 shadow-sm"
            }`}
          >
            <div className="flex justify-center mb-3">
  <Award
    size={42}
    className={theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"}
    strokeWidth={2}
  />
</div>
            <h4
              className={`font-bold ${
                theme === "dark" ? "text-white" : "text-[#280905]"
              }`}
            >
              Best Telecom Provider 2023
            </h4>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              African Telecom Awards
            </p>
          </div>
          <div
            className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-100 shadow-sm"
            }`}
          >
            <div className="flex justify-center mb-3">
  <BadgeCheck
    size={42}
    className={theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"}
    strokeWidth={2}
  />
</div>
            <h4
              className={`font-bold ${
                theme === "dark" ? "text-white" : "text-[#280905]"
              }`}
            >
              ISO 27001 Certified
            </h4>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Information Security Management
            </p>
          </div>
          <div
            className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-100 shadow-sm"
            }`}
          >
            <div className="flex justify-center mb-3">
  <Handshake
    size={42}
    className={theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"}
    strokeWidth={2}
  />
</div>
            <h4
              className={`font-bold ${
                theme === "dark" ? "text-white" : "text-[#280905]"
              }`}
            >
              100+ Strategic Partners
            </h4>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Global Technology Alliances
            </p>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes scrollBrands {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animation-paused {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
};

export default BrandsSection;
