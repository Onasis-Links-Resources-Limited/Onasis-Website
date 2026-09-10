import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X, FileText, Shield } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { TERMS_OF_SERVICE, PRIVACY_POLICY } from "../../data/legalContent";

const LegalModal = ({ isOpen, onClose, type }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const content = type === "terms" ? TERMS_OF_SERVICE : PRIVACY_POLICY;
  const Icon = type === "terms" ? FileText : Shield;

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden ${
          isDark ? "bg-[#1A1A1A] border border-[#2A2A2A]" : "bg-white border border-gray-200"
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-5 border-b sticky top-0 z-10 ${
          isDark ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              isDark ? "bg-[#E6501B]/10 text-[#E6501B]" : "bg-[#C3110C]/5 text-[#C3110C]"
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-[#280905]"}`}>
                {content.title}
              </h2>
              <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Effective Date: {content.effectiveDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? "text-gray-400 hover:bg-[#2A2A2A] hover:text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-6 space-y-6">
          {content.sections.map((section) => (
            <div key={section.number}>
              <h3 className={`text-base font-bold mb-2 ${isDark ? "text-white" : "text-[#280905]"}`}>
                {section.number}. {section.title}
              </h3>
              <p className={`text-sm leading-relaxed whitespace-pre-line ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>
                {section.content}
              </p>
            </div>
          ))}

          {/* Contact Section */}
          <div className={`rounded-xl p-4 border-l-4 ${
            isDark ? "bg-[#0a0a0a] border-[#E6501B]" : "bg-[#FFF8F5] border-[#C3110C]"
          }`}>
            <h3 className={`text-base font-bold mb-2 ${isDark ? "text-white" : "text-[#280905]"}`}>
              Contact Us
            </h3>
            <div className={`text-sm space-y-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              <p className="font-semibold">{content.contact.company}</p>
              <p>{content.contact.rc}</p>
              <p>{content.contact.address}</p>
              <p>Email: <a href={`mailto:${content.contact.email}`} className="text-[#E6501B] hover:underline">{content.contact.email}</a></p>
              <p>Tel: <a href={`tel:${content.contact.phone}`} className="text-[#E6501B] hover:underline">{content.contact.phone}</a></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t ${isDark ? "bg-[#0a0a0a] border-[#2A2A2A]" : "bg-gray-50 border-gray-200"}`}>
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#C3110C] hover:bg-[#E6501B] px-6 py-3 font-semibold text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LegalModal;