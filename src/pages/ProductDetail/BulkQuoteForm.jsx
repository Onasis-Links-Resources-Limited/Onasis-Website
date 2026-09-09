import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api/client";
import toast from "react-hot-toast";
import { AlertCircle } from "lucide-react";

const BulkQuoteForm = ({ product, onClose, onSuccess }) => {
  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    customer_name: user?.name || user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : "",
    customer_email: user?.email || "",
    customer_phone: user?.phone || "",
    customer_company: user?.company_name || "",
    quantity: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!isAuthenticated) {
      toast.error("Please sign in to request a bulk quote");
      navigate("/login", { state: { from: `/products/product/${product.id}` } });
      return;
    }

    const requestedQuantity = Number(formData.quantity);
    if (!requestedQuantity || requestedQuantity < (product.min_order || 1)) {
      setError(`Quantity must be at least ${product.min_order || 1} ${product.unit || "units"}.`);
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone || "",
        customer_company: formData.customer_company || "",
        items: [{ product_id: product.id, quantity: requestedQuantity }],
        notes: formData.notes || "",
      };

      await api.post("/quotes", payload);
      toast.success("Bulk quote request submitted successfully!");
      onSuccess({ itemCount: 1, totalUnits: requestedQuantity });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const darkClasses = isDark ? "bg-[#1A1A1A] border-[#2A2A2A]" : "bg-white border-gray-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className={`max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl shadow-2xl ${darkClasses}`}>
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className={isDark ? "text-xl font-bold text-white" : "text-xl font-bold text-[#280905]"}>
              Bulk Quote Request
            </h2>
            <button onClick={onClose} className={isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"}>
              ✕
            </button>
          </div>
          <p className={isDark ? "mb-4 text-sm text-gray-400" : "mb-4 text-sm text-gray-600"}>
            Request a bulk quote for <strong>{product.name}</strong>
          </p>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: "customer_name", label: "Full Name *", type: "text", required: true },
              { key: "customer_email", label: "Email *", type: "email", required: true },
              { key: "customer_phone", label: "Phone *", type: "tel", required: true },
              { key: "customer_company", label: "Company", type: "text", required: false },
            ].map(({ key, label, type, required }) => (
              <div key={key}>
                <label className={isDark ? "mb-1 block text-sm font-medium text-gray-200" : "mb-1 block text-sm font-medium text-gray-700"}>
                  {label}
                </label>
                <input
                  type={type}
                  required={required}
                  value={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  className={isDark ? "w-full rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2.5 text-white outline-none focus:border-[#E6501B]" : "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[#280905] outline-none focus:border-[#C3110C]"}
                />
              </div>
            ))}

            <div>
              <label className={isDark ? "mb-1 block text-sm font-medium text-gray-200" : "mb-1 block text-sm font-medium text-gray-700"}>
                Estimated Quantity *
              </label>
              <input
                type="number"
                required
                min={product.min_order || 1}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className={isDark ? "w-full rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2.5 text-white outline-none focus:border-[#E6501B]" : "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[#280905] outline-none focus:border-[#C3110C]"}
                placeholder={`Min. ${product.min_order || 1} ${product.unit || "units"}`}
              />
            </div>

            <div>
              <label className={isDark ? "mb-1 block text-sm font-medium text-gray-200" : "mb-1 block text-sm font-medium text-gray-700"}>
                Additional Notes
              </label>
              <textarea
                rows="3"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className={isDark ? "w-full rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2.5 text-white outline-none focus:border-[#E6501B]" : "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[#280905] outline-none focus:border-[#C3110C]"}
                placeholder="Any special requirements..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className={isDark ? "flex-1 rounded-xl border border-[#2A2A2A] px-4 py-2.5 font-medium text-gray-200 hover:bg-[#212121]" : "flex-1 rounded-xl border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50"}>
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="flex-1 rounded-xl bg-[#C3110C] px-4 py-2.5 font-bold text-white hover:bg-[#E6501B] disabled:opacity-50">
                {submitting ? "Sending..." : "Submit request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkQuoteForm;