import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api/client";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Building,
  Phone,
  Shield,
  Truck,
  Headphones,
} from "lucide-react";
import LegalModal from "../../components/common/LegalModal";

const SignUp = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  // ✅ NEW: Newsletter subscription checkbox
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true);
  const [legalModal, setLegalModal] = useState({ open: false, type: "terms" });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Min 8 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!agreedToTerms) newErrors.terms = "You must agree";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // ✅ Split full name into first and last
      const nameParts = formData.fullName.trim().split(" ");
      const first_name = nameParts[0];
      const last_name = nameParts.slice(1).join(" ") || first_name;

      // ✅ Register the user
      const result = await register({
        first_name,
        last_name,
        email: formData.email.toLowerCase(),
        password: formData.password,
        phone: formData.phone || "",
        company_name: formData.company || "",
      });

      if (!result.success) {
        setErrors({
          general: result.message || "Registration failed",
        });
        setIsSubmitting(false);
        return;
      }

      // ✅ Subscribe to newsletter if opted in (non-blocking)
      if (subscribeToNewsletter) {
        try {
          await api.post("/newsletter/subscribe", {
            email: formData.email.toLowerCase(),
            first_name: first_name,
            source: "signup",
          });
          toast.success("Subscribed to newsletter! 📬", { duration: 3000 });
        } catch (newsletterError) {
          // Don't fail signup if newsletter fails
          console.warn(
            "Newsletter subscription failed:",
            newsletterError.message,
          );
        }
      }

      toast.success("Account created! Check your email for verification.", {
        duration: 5000,
      });

      // ✅ Navigate to verify email
      navigate("/verify-email", {
        state: { email: formData.email.toLowerCase() },
      });
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const benefits = [
    { icon: Shield, text: "Secure account & data protection" },
    { icon: Truck, text: "Priority shipping & tracking" },
    { icon: Headphones, text: "24/7 customer support" },
  ];

  return (
    <div
      className={`h-screen overflow-hidden flex items-center justify-center ${
        isDark ? "bg-black" : "bg-gray-50"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto px-4 py-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Form */}
          <div
            className={`rounded-2xl p-6 shadow-sm ${
              isDark
                ? "bg-[#1A1A1A] border border-[#2A2A2A]"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="mb-4">
              <h1
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Create Account
              </h1>
              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Join Onasis Links Resources Limited
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* General error */}
              {errors.general && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{errors.general}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Full Name *
                </label>
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                      errors.fullName
                        ? "text-red-500"
                        : isDark
                          ? "text-gray-500"
                          : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? "border-red-500 focus:ring-red-200"
                        : isDark
                          ? "bg-black/50 border-[#2A2A2A] text-white placeholder-gray-400 focus:border-[#E6501B]"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]"
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email Address *
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                      errors.email
                        ? "text-red-500"
                        : isDark
                          ? "text-gray-500"
                          : "text-gray-400"
                    }`}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-200"
                        : isDark
                          ? "bg-black/50 border-[#2A2A2A] text-white placeholder-gray-400 focus:border-[#E6501B]"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password & Confirm Password (Side by Side) */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        errors.password
                          ? "text-red-500"
                          : isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                      }`}
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 8 chars"
                      className={`w-full pl-10 pr-10 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.password
                          ? "border-red-500 focus:ring-red-200"
                          : isDark
                            ? "bg-black/50 border-[#2A2A2A] text-white placeholder-gray-400 focus:border-[#E6501B]"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                        isDark ? "text-gray-400" : "text-gray-400"
                      }`}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        errors.confirmPassword
                          ? "text-red-500"
                          : isDark
                            ? "text-gray-500"
                            : "text-gray-400"
                      }`}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm"
                      className={`w-full pl-10 pr-10 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-200"
                          : isDark
                            ? "bg-black/50 border-[#2A2A2A] text-white placeholder-gray-400 focus:border-[#E6501B]"
                            : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                        isDark ? "text-gray-400" : "text-gray-400"
                      }`}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Company & Phone */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Company
                  </label>
                  <div className="relative">
                    <Building
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        isDark
                          ? "bg-black/50 border-[#2A2A2A] text-white placeholder-gray-400 focus:border-[#E6501B]"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <Phone
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        isDark ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                        isDark
                          ? "bg-black/50 border-[#2A2A2A] text-white placeholder-gray-400 focus:border-[#E6501B]"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* ✅ NEW: Newsletter Subscription Toggle */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscribeToNewsletter}
                    onChange={() =>
                      setSubscribeToNewsletter(!subscribeToNewsletter)
                    }
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-[#C3110C] focus:ring-[#C3110C] cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {/* <Mailbox className={`w-4 h-4 ${
                        isDark ? "text-[#E6501B]" : "text-[#C3110C]"
                      }`} /> */}
                      <span
                        className={`text-sm font-medium ${
                          isDark ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        Subscribe to our newsletter
                      </span>
                    </div>
                    {/* <p
                      className={`text-xs mt-1 ${
                        isDark ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      Get product updates, industry insights, and exclusive offers. You can unsubscribe anytime.
                    </p> */}
                  </div>
                </label>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-[#C3110C] focus:ring-[#C3110C]"
                />
                <div>
                  <label
                    className={`text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      onClick={() =>
                        setLegalModal({ open: true, type: "terms" })
                      }
                      className="text-[#C3110C] hover:underline cursor-pointer"
                    >
                      Terms & Conditions
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      onClick={() =>
                        setLegalModal({ open: true, type: "privacy" })
                      }
                      className="text-[#C3110C] hover:underline cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  </label>
                  {errors.terms && (
                    <p className="mt-1 text-xs text-red-500">{errors.terms}</p>
                  )}
                </div>
              </div>

              <LegalModal
                isOpen={legalModal.open}
                onClose={() => setLegalModal({ open: false, type: "terms" })}
                type={legalModal.type}
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>

              <p
                className={`text-center text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#C3110C] hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>

          {/* Right Side - Info */}
          <div
            className={`hidden md:flex flex-col justify-center rounded-2xl p-6 ${
              isDark ? "bg-[#1A1A1A]" : "bg-white"
            } border ${isDark ? "border-[#2A2A2A]" : "border-gray-200"}`}
          >
            <div className="text-center mb-6">
              <Link to="/">
                <img
                  src="/images/onasis-t-logo.png"
                  alt="Onasis Logo"
                  className="h-12 w-auto mx-auto mb-4 object-contain"
                />
              </Link>
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Welcome to Onasis Links
              </h2>
              <p
                className={`text-sm mt-2 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Join our community of professionals
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <benefit.icon className={`w-5 h-5 mt-0.5 text-[#C3110C]`} />
                  <div>
                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`mt-6 p-4 rounded-xl ${
                isDark ? "bg-[#212121]" : "bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                    AK
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    SM
                  </div>
                </div>
                <div>
                  <p
                    className={`text-xs ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <span className="font-semibold">500+</span> professionals
                    already joined
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
