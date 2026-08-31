import { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import { useQuote } from "../context/QuoteContext";
import { PRODUCTS } from "../data/productsData";
import {
  Download,
  Plus,
  Minus,
  CheckCircle,
  Truck,
  Shield,
  Clock,
  AlertCircle,
  Users,
  ChevronRight,
  FileText,
  PackageSearch,
  ArrowRight,
} from "lucide-react";

// Navigation categories for the left sidebar
const categories = [
  { name: "Fiber Optic", slug: "fiber-optic" },
  
  { name: "Network Infrastructure", slug: "network-infrastructure" },
  { name: "5G Equipment", slug: "5g-equipment" },
  { name: "Power Solutions", slug: "power-solutions" },
  { name: "Security", slug: "security" },
];

const slugify = (str = "") => str.toLowerCase().replace(/ /g, "-");

const ProductDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const { addToQuote } = useQuote();
  const navigate = useNavigate();

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === parseInt(id)),
    [id],
  );

  // Quantity always starts at the product's minimum order, and only ever
  // steps by the product's own increment (defaulting to 1 for items without one).
  const step = product?.orderIncrement || 1;
  const [quantity, setQuantity] = useState(product?.minOrder || 1);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [addedToQuote, setAddedToQuote] = useState(false);

  const isDark = theme === "dark";

  if (!product) {
    return (
      <div
        className={`pt-20 min-h-screen flex items-center justify-center ${isDark ? "text-white" : "text-[#280905]"}`}
      >
        <div className="text-center px-4">
          <PackageSearch
            className={`w-10 h-10 mx-auto mb-4 ${isDark ? "text-gray-600" : "text-gray-300"}`}
          />
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p
            className={`mb-6 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            This product may have been removed or the link is out of date.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 font-medium text-[#C3110C] hover:text-[#E6501B]"
          >
            Back to all products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const minOrder = product.minOrder || 1;

  const decreaseQuantity = () =>
    setQuantity((q) => Math.max(minOrder, q - step));
  const increaseQuantity = () => setQuantity((q) => q + step);

  const handleAddToQuote = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/products/product/${product.id}` },
      });
      return;
    }
    addToQuote(product, quantity);
    setAddedToQuote(true);
    window.setTimeout(() => setAddedToQuote(false), 2500);
  };

  const handleBulkQuote = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/products/product/${product.id}` },
      });
      return;
    }
    setShowBulkForm(true);
  };

  return (
    <div
      className={`pt-20 min-h-screen ${isDark ? "text-white" : "text-[#280905]"}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Categories (Hidden on Mobile) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div
            className={`sticky top-24 rounded-2xl p-6 ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-md border border-gray-200"}`}
          >
            <h2 className="text-lg font-bold mb-4 text-[#E6501B]">
              Categories
            </h2>
            <nav className="space-y-2" aria-label="Product categories">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/products/category/${cat.slug}`}
                  className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                    slugify(product.category) === cat.slug
                      ? "bg-[#C3110C] text-white shadow-md"
                      : isDark
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <span className="font-medium">{cat.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumbs */}
          <nav
            className={`flex items-center gap-2 text-sm mb-6 flex-wrap ${isDark ? "text-gray-400" : "text-gray-500"}`}
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-[#E6501B]">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-[#E6501B]">
              Products
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              to={`/products/category/${slugify(product.category)}`}
              className="hover:text-[#E6501B]"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span
              className={`font-medium ${isDark ? "text-white" : "text-[#280905]"}`}
            >
              {product.name}
            </span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Gallery + supporting technical info */}
            <div className="space-y-6">
              <ProductGallery product={product} isDark={isDark} />

              {product.specifications &&
                Object.keys(product.specifications).length > 0 && (
                  <div
                    className={`rounded-xl p-5 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                  >
                    <h3 className="font-semibold mb-4 text-lg">
                      Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className={`flex flex-col justify-between py-2 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
                          >
                            <span
                              className={`text-xs uppercase tracking-wide mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                            >
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="font-semibold">{value}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {product.downloads?.length > 0 && (
                <div
                  className={`rounded-xl p-5 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                >
                  <h3 className="font-semibold mb-3">Downloads</h3>
                  <div className="space-y-2">
                    {product.downloads.map((file, index) => (
                      <a
                        key={file.url || index}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                      >
                        <Download className="w-4 h-4 text-[#E6501B] flex-shrink-0" />
                        <span className="text-sm font-medium">{file.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right - Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span
                    className={`text-sm px-3 py-1 rounded-full font-medium ${
                      product.isAvailable
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {product.isAvailable ? "In Stock" : "Out of Stock"}
                  </span>
                  {product.sku && (
                    <span
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      SKU: {product.sku}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                  {product.name}
                </h1>
                <p
                  className={`text-lg mt-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {[product.brand, product.category]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              </div>

              {product.description && (
                <p
                  className={`text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {product.description}
                </p>
              )}

              <div className="rounded-xl p-5 border-2 border-[#E6501B]/30 bg-[#E6501B]/5">
                <div className="flex items-center gap-2 text-[#E6501B] font-bold text-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span>Price: Available on Request</span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm flex-wrap">
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                    Min. Order: {minOrder} {product.unit}
                  </span>
                  <span className={isDark ? "text-gray-300" : "text-gray-600"}>
                    Bulk discounts available
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center rounded-lg border ${isDark ? "border-gray-700" : "border-gray-300"}`}
                  >
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity <= minOrder}
                      aria-label="Decrease quantity"
                      className={`p-3 rounded-l-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span
                      className="w-14 text-center font-bold text-lg"
                      aria-live="polite"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={increaseQuantity}
                      aria-label="Increase quantity"
                      className={`p-3 rounded-r-lg transition-colors ${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span
                    className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {product.unit}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleAddToQuote}
                    disabled={!product.isAvailable}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#C3110C] hover:bg-[#E6501B] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg shadow-[#C3110C]/20"
                  >
                    {addedToQuote ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Added to Quote
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5" />
                        Add to Quote
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleBulkQuote}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#C3110C] text-[#C3110C] hover:bg-[#C3110C] hover:text-white font-bold rounded-xl transition-all duration-300"
                  >
                    <Users className="w-5 h-5" />
                    Request Bulk Quote
                  </button>
                </div>
              </div>

              <div
                className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}
              >
                {[
                  { icon: Shield, label: "Genuine Products" },
                  { icon: Truck, label: "Fast Delivery" },
                  { icon: CheckCircle, label: "Warranty" },
                  { icon: Clock, label: "24/7 Support" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    <Icon className="w-6 h-6 text-[#E6501B]" />
                    <span
                      className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SimilarProducts currentProduct={product} isDark={isDark} />
        </div>
      </div>

      {showBulkForm && (
        <BulkQuoteForm
          product={product}
          onClose={() => setShowBulkForm(false)}
        />
      )}
    </div>
  );
};

// Image gallery, split out so the main/thumbnail images can be swapped
// independently and the component tolerates products with a single image
// or an explicit `images` array.
const ProductGallery = ({ product, isDark }) => {
  const images = useMemo(() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    return [product.image];
  }, [product]);

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div
        className={`rounded-2xl overflow-hidden aspect-square ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <img
          src={activeImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActiveImage(src)}
              aria-label={`Show image ${i + 1} of ${product.name}`}
              aria-pressed={activeImage === src}
              className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-shadow ${
                activeImage === src ? "ring-2 ring-[#E6501B]" : ""
              } ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Similar Products — surfaces other items from the same category (falling
// back to the same brand, then a general sample) so the section is never
// empty even for niche or single-item categories.
const SimilarProducts = ({ currentProduct, isDark }) => {
  const navigate = useNavigate();

  const similar = useMemo(() => {
    const sameCategory = PRODUCTS.filter(
      (p) =>
        p.id !== currentProduct.id && p.category === currentProduct.category,
    );
    if (sameCategory.length >= 4) return sameCategory.slice(0, 8);

    const sameBrand = PRODUCTS.filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.brand === currentProduct.brand &&
        !sameCategory.includes(p),
    );

    const fallback = PRODUCTS.filter(
      (p) =>
        p.id !== currentProduct.id &&
        !sameCategory.includes(p) &&
        !sameBrand.includes(p),
    );

    return [...sameCategory, ...sameBrand, ...fallback].slice(0, 8);
  }, [currentProduct]);

  if (similar.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="similar-products-heading">
      <div className="flex items-center justify-between mb-6">
        <h2 id="similar-products-heading" className="text-2xl font-bold">
          Similar Products
        </h2>
        <Link
          to={`/products/category/${slugify(currentProduct.category)}`}
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#C3110C] hover:text-[#E6501B]"
        >
          View all in {currentProduct.category}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
        {similar.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(`/products/product/${item.id}`)}
            className={`text-left snap-start flex-shrink-0 w-64 sm:w-auto rounded-2xl overflow-hidden border transition-all hover:-translate-y-0.5 hover:shadow-lg ${
              isDark
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
            }`}
          >
            <div
              className={`aspect-square ${isDark ? "bg-gray-900" : "bg-gray-100"}`}
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 space-y-1.5">
              <p
                className={`text-xs uppercase tracking-wide ${isDark ? "text-gray-500" : "text-gray-400"}`}
              >
                {item.brand || item.category}
              </p>
              <h3 className="font-semibold leading-snug line-clamp-2">
                {item.name}
              </h3>
              <p
                className={`text-xs font-medium ${
                  item.isAvailable
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {item.isAvailable ? "In Stock" : "Out of Stock"}
              </p>
              <span className="inline-flex items-center gap-1 pt-1 text-sm font-bold text-[#C3110C]">
                View Details
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

// Bulk Quote Form Component
const BulkQuoteForm = ({ product, onClose }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === "dark";
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    company: user?.company_name || "",
    quantity: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (Number(formData.quantity) < product.minOrder) {
      setError(
        `Quantity must be at least ${product.minOrder} ${product.unit}.`,
      );
      return;
    }

    setSubmitting(true);
    try {
      // Replace with the real bulk-quote request endpoint.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      onClose();
    } catch {
      setError("Something went wrong sending your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bulk-quote-title"
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 id="bulk-quote-title" className="text-xl font-bold">
              Bulk Quote Request
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <p
            className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Request a bulk quote for <strong>{product.name}</strong>
          </p>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-700 dark:text-red-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                key: "name",
                label: "Full Name *",
                type: "text",
                required: true,
              },
              { key: "email", label: "Email *", type: "email", required: true },
              { key: "phone", label: "Phone *", type: "tel", required: true },
              {
                key: "company",
                label: "Company",
                type: "text",
                required: false,
              },
            ].map(({ key, label, type, required }) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium mb-1">
                  {label}
                </label>
                <input
                  id={key}
                  type={type}
                  required={required}
                  value={formData[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium mb-1"
              >
                Estimated Quantity *
              </label>
              <input
                id="quantity"
                type="number"
                required
                min={product.minOrder}
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg border ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}
                placeholder={`Min. ${product.minOrder} ${product.unit}`}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Additional Notes
              </label>
              <textarea
                id="message"
                rows="3"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`w-full px-4 py-2 rounded-lg border ${isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300"}`}
                placeholder="Any special requirements..."
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 px-4 py-2.5 rounded-lg border font-medium ${isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-300 hover:bg-gray-50"}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-2.5 bg-[#C3110C] hover:bg-[#E6501B] text-white font-bold rounded-lg transition-all disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
