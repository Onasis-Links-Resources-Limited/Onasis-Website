import { CheckCircle2, X } from "lucide-react";

const QuoteSuccessModal = ({
  isDark,
  onClose,
  itemCount,
  totalUnits,
  title = "Quote request sent",
}) => (
  <div
    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-labelledby="quote-success-title"
  >
    <div
      className={`relative w-full max-w-md rounded-2xl border p-7 text-center shadow-2xl ${
        isDark
          ? "border-gray-700 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-[#280905]"
      }`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close quote confirmation"
        className={`absolute right-4 top-4 rounded-lg p-1 transition ${
          isDark
            ? "text-gray-400 hover:bg-gray-800 hover:text-white"
            : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        }`}
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${
          isDark ? "bg-green-900/30" : "bg-green-100"
        }`}
      >
        <CheckCircle2
          className={`h-9 w-9 ${isDark ? "text-green-400" : "text-green-600"}`}
        />
      </div>

      <h2 id="quote-success-title" className="text-2xl font-bold">
        {title}
      </h2>
      <p
        className={
          isDark
            ? "mt-3 text-sm leading-relaxed text-gray-300"
            : "mt-3 text-sm leading-relaxed text-gray-600"
        }
      >
        Thank you. Our team has received your request and will review the
        details before getting back to you.
      </p>

      <div
        className={
          isDark
            ? "mt-5 rounded-xl bg-gray-800 p-3 text-sm text-gray-300"
            : "mt-5 rounded-xl bg-gray-50 p-3 text-sm text-gray-600"
        }
      >
        {itemCount} {itemCount === 1 ? "product" : "products"} • {totalUnits}{" "}
        {totalUnits === 1 ? "unit" : "units"} submitted
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-6 w-full rounded-xl bg-[#C3110C] px-5 py-3 font-bold text-white transition hover:bg-[#E6501B]"
      >
        Done
      </button>
    </div>
  </div>
);

export default QuoteSuccessModal;
