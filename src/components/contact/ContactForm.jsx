import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { api } from "../../api/client";
import toast from "react-hot-toast";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const ContactForm = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
    agreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.agreed) newErrors.agreed = "You must agree to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/contact", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: formData.message,
      });

      toast.success("Your inquiry has been sent! We'll get back to you shortly.", {
        duration: 5000,
        position: "bottom-center",
      });

      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
        agreed: false,
      });
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMsg, {
        duration: 4000,
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `border-b py-3 outline-none transition-colors duration-300 ${
    isDark
      ? "border-gray-700 text-white placeholder:text-gray-500 bg-transparent focus:border-[#ED7D00]"
      : "border-gray-300 text-black placeholder:text-gray-500 bg-transparent focus:border-[#ED7D00]"
  }`;

  // Show success state
  if (submitted) {
    return (
      <section
        id="contact-form"
        className={`relative z-30 -mt-20 lg:-mt-20 px-6 lg:px-10 pb-24 transition-colors duration-300 ${
          isDark ? "bg-[#0a0a0a]" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-5xl rounded-2xl p-8 lg:p-16">
          <div className="text-center py-12">
            <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
              isDark ? "bg-green-900/30" : "bg-green-100"
            }`}>
              <CheckCircle className={`h-10 w-10 ${isDark ? "text-green-400" : "text-green-600"}`} />
            </div>
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
              Thank You!
            </h2>
            <p className={`text-lg mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Your inquiry has been sent successfully. Our team will review it and get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isDark
                  ? "bg-[#E6501B] hover:bg-[#C3110C] text-white"
                  : "bg-[#ED7D00] hover:bg-[#E6501B] text-white"
              }`}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact-form"
      className={`relative z-30 -mt-20 lg:-mt-20 px-6 lg:px-10 pb-24 transition-colors duration-300 ${
        isDark ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-5xl rounded-2xl p-8 lg:p-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Side */}
          <div>
            <p className={`text-sm uppercase tracking-[0.2em] ${
              isDark ? "text-[#E6501B]" : "text-[#ED7D00]"
            } font-bold mb-4`}>
              Get In Touch
            </p>

            <h2 className={`text-5xl font-light leading-tight mb-8 transition-colors duration-300 ${
              isDark ? "text-white" : "text-black"
            }`}>
              Let <span className={isDark ? "text-[#E6501B]" : "text-[#ED7D00]"}>Us Know</span>
              <br />
              How We Can Help
            </h2>

            <p className={`leading-8 transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-gray-700"
            }`}>
              Onasis Links Resources Limited maintains a focused approach to
              communication. Our team reviews every enquiry and responds where
              appropriate.
            </p>
          </div>

          {/* Right Side - Form */}
          <form onSubmit={handleSubmit} className="space-y-8 mt-10 lg:mt-0">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  disabled={loading}
                  className={`w-full ${inputClasses} ${errors.firstName ? "border-red-500" : ""}`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  disabled={loading}
                  className={`w-full ${inputClasses} ${errors.lastName ? "border-red-500" : ""}`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{errors.lastName}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled={loading}
                  className={`w-full ${inputClasses} ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{errors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  disabled={loading}
                  className={`w-full ${inputClasses}`}
                />
              </div>
            </div>

            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              disabled={loading}
              className={`w-full ${inputClasses}`}
            />

            <select
              value={formData.service}
              onChange={(e) => handleChange("service", e.target.value)}
              disabled={loading}
              className={`w-full border-b py-3 outline-none transition-colors duration-300 ${
                isDark
                  ? "border-gray-700 text-white bg-[#141414] focus:border-[#ED7D00]"
                  : "border-gray-300 text-black bg-transparent focus:border-[#ED7D00]"
              }`}
            >
              <option value="">Select Service</option>
              <option value="ict">ICT Solutions</option>
              <option value="engineering">Engineering</option>
              <option value="procurement">Procurement</option>
              <option value="consultancy">Consultancy</option>
            </select>

            <div>
              <textarea
                rows="5"
                placeholder="Describe your enquiry *"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                disabled={loading}
                className={`w-full ${inputClasses} resize-none ${errors.message ? "border-red-500" : ""}`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />{errors.message}
                </p>
              )}
            </div>

            <div>
              <label className={`flex items-center gap-3 text-sm transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-gray-400"
              }`}>
                <input
                  type="checkbox"
                  checked={formData.agreed}
                  onChange={(e) => handleChange("agreed", e.target.checked)}
                  disabled={loading}
                  className="accent-[#ED7D00]"
                />
                I agree to the processing of my personal data. *
              </label>
              {errors.agreed && (
                <p className="mt-1 text-xs text-red-500">{errors.agreed}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 ${
                isDark
                  ? "bg-[#E6501B] hover:bg-[#C3110C]"
                  : "bg-[#ED7D00] hover:bg-[#E6501B]"
              } text-white px-8 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#ED7D00]/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;