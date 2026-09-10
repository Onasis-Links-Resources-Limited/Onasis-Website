import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { api } from "../api/client";
import {
  Mail,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  Home,
} from "lucide-react";

const NewsletterUnsubscribe = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [status, setStatus] = useState(id ? "confirm" : "error"); // 'loading' | 'success' | 'error' | 'confirm'
  const [error, setError] = useState(
    id ? "" : "Invalid unsubscribe link."
  );
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  const handleUnsubscribe = async () => {
    setIsUnsubscribing(true);
    setError("");

    try {
      await api.get(`/newsletter/unsubscribe/${id}`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err.response?.data?.message ||
          "We could not process your unsubscribe request. Please try again."
      );
    } finally {
      setIsUnsubscribing(false);
    }
  };

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (status === "loading") {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? "bg-[#090909]" : "bg-[#f7f7f5]"
      }`}>
        <Loader2 className={`w-12 h-12 animate-spin ${
          isDark ? "text-[#E6501B]" : "text-[#C3110C]"
        }`} />
      </div>
    );
  }

  // ============================================================
  // SUCCESS STATE
  // ============================================================
  if (status === "success") {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 py-20 ${
        isDark ? "bg-[#090909]" : "bg-[#f7f7f5]"
      }`}>
        <div className={`w-full max-w-lg rounded-3xl p-8 sm:p-10 text-center shadow-sm border ${
          isDark ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-white border-gray-200"
        }`}>
          <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
            isDark ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"
          }`}>
            <CheckCircle className="h-10 w-10" />
          </div>

          <h1 className={`text-3xl font-bold mb-3 ${
            isDark ? "text-white" : "text-[#280905]"
          }`}>
            You've Been Unsubscribed
          </h1>

          <p className={`text-base mb-8 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            We're sorry to see you go. You will no longer receive our newsletter.
            If this was a mistake, you can subscribe again anytime.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition-colors ${
                isDark
                  ? "bg-[#E6501B] hover:bg-[#C3110C] text-white"
                  : "bg-[#C3110C] hover:bg-[#E6501B] text-white"
              }`}
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================
  if (status === "error") {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 py-20 ${
        isDark ? "bg-[#090909]" : "bg-[#f7f7f5]"
      }`}>
        <div className={`w-full max-w-lg rounded-3xl p-8 sm:p-10 text-center shadow-sm border ${
          isDark ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-white border-gray-200"
        }`}>
          <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${
            isDark ? "bg-red-900/30 text-red-400" : "bg-red-100 text-red-600"
          }`}>
            <XCircle className="h-10 w-10" />
          </div>

          <h1 className={`text-3xl font-bold mb-3 ${
            isDark ? "text-white" : "text-[#280905]"
          }`}>
            Something Went Wrong
          </h1>

          <p className={`text-base mb-8 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {error || "We couldn't process your unsubscribe request."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition-colors ${
                isDark
                  ? "bg-[#E6501B] hover:bg-[#C3110C] text-white"
                  : "bg-[#C3110C] hover:bg-[#E6501B] text-white"
              }`}
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // CONFIRM STATE (Default)
  // ============================================================
  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-20 ${
      isDark ? "bg-[#090909]" : "bg-[#f7f7f5]"
    }`}>
      <div className={`w-full max-w-lg rounded-3xl p-8 sm:p-10 text-center shadow-sm border ${
        isDark ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-white border-gray-200"
      }`}>
        <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border ${
          isDark
            ? "bg-[#E6501B]/10 border-[#E6501B]/30 text-[#E6501B]"
            : "bg-[#C3110C]/5 border-[#C3110C]/20 text-[#C3110C]"
        }`}>
          <Mail className="h-9 w-9" />
        </div>

        <h1 className={`text-3xl font-bold mb-3 ${
          isDark ? "text-white" : "text-[#280905]"
        }`}>
          Unsubscribe from Newsletter
        </h1>

        <p className={`text-base mb-8 ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          Are you sure you want to unsubscribe from the Onasis Links newsletter?
          You'll no longer receive product updates, industry insights, and special offers.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleUnsubscribe}
            disabled={isUnsubscribing}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              isDark
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isUnsubscribing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Unsubscribing...
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                Yes, Unsubscribe Me
              </>
            )}
          </button>

          <button
            onClick={() => navigate("/")}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold transition-colors border ${
              isDark
                ? "border-[#2A2A2A] text-gray-300 hover:bg-[#212121]"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </button>
        </div>

        <p className={`mt-6 text-xs ${
          isDark ? "text-gray-500" : "text-gray-400"
        }`}>
          You can always subscribe again from the footer of our website.
        </p>
      </div>
    </div>
  );
};

export default NewsletterUnsubscribe;