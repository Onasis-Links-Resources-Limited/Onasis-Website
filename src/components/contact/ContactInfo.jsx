import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ContactInfo = () => {
  const { theme } = useTheme();

  const contactDetails = [
    {
      id: 1,
      icon: MapPin,
      title: "Office Address",
      details: (
        <>
          Plot 78A,
          <br />
          Eleganza Gardens,
          <br />
          Lekki-Epe Expressway,
          <br />
          Lagos.
        </>
      ),
    },
    {
      id: 2,
      icon: Phone,
      title: "Phone",
      details: "+234 802 958 1337",
    },
    {
      id: 3,
      icon: Mail,
      title: "Email",
      details: "info@onasisltd.com",
    },
    {
      id: 4,
      icon: Clock,
      title: "Working Hours",
      details: (
        <>
          Monday - Friday
          <br />
          8:00 AM - 5:00 PM
        </>
      ),
    },
  ];

  const isDark = theme === "dark";

  return (
    <section
      className={`py-10 px-6 lg:px-10 transition-colors duration-300 ${
        isDark ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p
            className={`uppercase tracking-[0.2em] text-sm mb-4 font-bold transition-colors duration-300 ${
              isDark ? "text-[#E6501B]" : "text-[#C3110C]"
            }`}
          >
            CONTACT DETAILS
          </p>
          <h2
            className={`text-5xl font-light transition-colors duration-300 ${
              isDark ? "text-white" : "text-[#C3110C]"
            }`}
          >
            Visit or Reach Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactDetails.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`
                  rounded-2xl border p-8 transition-all duration-300
                  ${
                    isDark
                      ? "border-gray-700 bg-[#141414] hover:bg-[#1a1a1a] hover:border-[#E6501B] hover:shadow-lg hover:shadow-[#C3110C]/10"
                      : "border-gray-200 bg-white hover:shadow-xl hover:border-[#C3110C]"
                  }
                `}
              >
                <Icon
                  className={`mb-5 transition-transform duration-300 ${
                    isDark ? "hover:scale-110 text-[#E6501B]" : "text-[#C3110C]"
                  }`}
                  size={35}
                />
                <h3
                  className={`font-semibold text-xl mb-3 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`leading-7 transition-colors duration-300 ${
                    isDark ? "text-gray-400" : "text-gray-400"
                  }`}
                >
                  {item.details}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
