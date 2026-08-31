import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useQuote } from "../context/QuoteContext";
import { useAuth } from "../hooks/useAuth";
import { PRODUCTS } from "../data/productsData";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  FileText,
  Tag,
  Truck,
  Lock,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

// Navigation categories for the left sidebar
const categories = [
  { name: "Fiber Optic", slug: "fiber-optic" },
  { name: "Network Infrastructure", slug: "network-infrastructure" },
  { name: "5G Equipment", slug: "5g-equipment" },
  { name: "Power Solutions", slug: "power-solutions" },
  { name: "Security", slug: "security" },
];

// Simple Fisher–Yates shuffle so "random" doesn't mean "biased toward the
// front of the catalog array".
const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const QuoteList = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { quoteItems, removeFromQuote, updateQuantity, clearQuote, itemCount } =
    useQuote();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRequestQuote = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/quote-list" } });
      return;
    }
    // Sending user to the Dashboard where they can finalize the request
    navigate("/dashboard");
  };

  if (quoteItems.length === 0) {
    return (
      <div
        className={`pt-20 min-h-screen flex items-center justify-center ${isDark ? "text-white" : "text-[#280905]"}`}
      >
        <div className="text-center max-w-md">
          <div
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
          >
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Quote List is Empty</h2>
          <p
            className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Browse our products and add items to get a quote.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-lg transition-all duration-300"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

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
                    isDark
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
          {/* Breadcrumbs / Header Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <div
                className={`flex items-center gap-2 text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                <Link to="/products" className="hover:text-[#E6501B]">
                  Products
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span
                  className={`font-medium ${isDark ? "text-white" : "text-[#280905]"}`}
                >
                  Quote List
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold">
                Your Quote List
              </h1>
              <p
                className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {itemCount} {itemCount === 1 ? "product" : "products"} waiting
                for approval
              </p>
            </div>
            <button
              onClick={clearQuote}
              className={`text-sm font-medium ${isDark ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-600"}`}
            >
              Remove all from list
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Items List (Left 2/3) */}
            <div className="lg:col-span-2 space-y-6">
              {quoteItems.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl p-6 transition-all ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-sm hover:shadow-md"}`}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-bold text-lg leading-tight">
                            {item.name}
                          </h3>
                          <p
                            className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                          >
                            {item.brand} • {item.sku}
                          </p>
                          <p
                            className={`text-xs mt-2 uppercase tracking-wide font-semibold ${isDark ? "text-[#E6501B]" : "text-[#C3110C]"}`}
                          >
                            Price on Request
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromQuote(item.id)}
                          aria-label={`Remove ${item.name} from quote list`}
                          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${isDark ? "hover:bg-red-900/20 text-red-400" : "hover:bg-red-50 text-red-500"}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div
                        className={`flex items-center justify-between mt-4 pt-4 border-t ${isDark ? "border-gray-700" : "border-gray-100"}`}
                      >
                        <div
                          className={`flex items-center rounded-lg border ${isDark ? "border-gray-600" : "border-gray-300"}`}
                        >
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(item.minOrder || 1, item.quantity - 1),
                              )
                            }
                            disabled={item.quantity <= (item.minOrder || 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className={`p-2.5 disabled:opacity-40 disabled:cursor-not-allowed ${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span
                            className="w-12 text-center font-bold"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label={`Increase quantity of ${item.name}`}
                            className={`p-2.5 ${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <span
                          className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
                        >
                          Min. {item.minOrder} {item.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <SimilarProducts quoteItems={quoteItems} isDark={isDark} />
            </div>

            {/* Sticky Summary Panel (Right 1/3) */}
            <div className="lg:col-span-1">
              <div
                className={`sticky top-24 rounded-2xl p-6 ${isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-lg"}`}
              >
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    >
                      Items ({itemCount})
                    </span>
                    <span className="font-semibold">Pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    >
                      Delivery cost
                    </span>
                    <span className="font-semibold">Calculated Later</span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    >
                      Tax
                    </span>
                    <span className="font-semibold">Included</span>
                  </div>
                </div>

                <div
                  className={`border-t my-6 ${isDark ? "border-gray-700" : "border-gray-200"}`}
                ></div>

                <div className="flex justify-between items-end mb-6">
                  <span className="text-lg font-bold">Total:</span>
                  <span className="text-2xl font-bold text-[#C3110C]">
                    Pending
                  </span>
                </div>

                <button
                  onClick={handleRequestQuote}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#C3110C] hover:bg-[#E6501B] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#C3110C]/20"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Request Quote
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs">
                    <Tag className="w-4 h-4 text-[#E6501B] flex-shrink-0" />
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    >
                      Bulk discounts applied automatically
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Truck className="w-4 h-4 text-[#E6501B] flex-shrink-0" />
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    >
                      Global shipping available
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Lock className="w-4 h-4 text-[#E6501B] flex-shrink-0" />
                    <span
                      className={isDark ? "text-gray-400" : "text-gray-500"}
                    >
                      Secure business transaction
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Similar Products — up to 5 random items related to what's already in the
// quote (same category first, topped up from the wider catalog), excluding
// anything already on the list. Re-shuffles only when the quote contents
// actually change, not on every render (e.g. quantity ticks).
const SimilarProducts = ({ quoteItems, isDark }) => {
  const navigate = useNavigate();
  const { addToQuote } = useQuote();

  const quoteItemIds = quoteItems.map((i) => i.id).join(",");

  const similar = useMemo(() => {
    const inQuoteIds = new Set(quoteItems.map((i) => i.id));
    const quotedCategories = new Set(quoteItems.map((i) => i.category));

    const relatedPool = PRODUCTS.filter(
      (p) => !inQuoteIds.has(p.id) && quotedCategories.has(p.category),
    );
    const restPool = PRODUCTS.filter(
      (p) => !inQuoteIds.has(p.id) && !quotedCategories.has(p.category),
    );

    const picked = shuffle(relatedPool).slice(0, 5);
    if (picked.length < 5) {
      picked.push(...shuffle(restPool).slice(0, 5 - picked.length));
    }
    return picked;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteItemIds]);

  if (similar.length === 0) return null;

  return (
    <section className="pt-4" aria-labelledby="quote-similar-heading">
      <h2 id="quote-similar-heading" className="text-xl font-bold mb-4">
        You Might Also Need
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 xl:grid-cols-5 sm:overflow-visible">
        {similar.map((item) => (
          <div
            key={item.id}
            className={`snap-start flex-shrink-0 w-48 sm:w-auto rounded-2xl overflow-hidden border transition-all hover:-translate-y-0.5 hover:shadow-lg ${
              isDark
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
            }`}
          >
            <button
              type="button"
              onClick={() => navigate(`/products/product/${item.id}`)}
              className="block w-full text-left"
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
              <div className="p-3 space-y-1">
                <p
                  className={`text-[11px] uppercase tracking-wide ${isDark ? "text-gray-500" : "text-gray-400"}`}
                >
                  {item.brand || item.category}
                </p>
                <h3 className="font-semibold text-sm leading-snug line-clamp-2">
                  {item.name}
                </h3>
              </div>
            </button>
            <div className="px-3 pb-3">
              <button
                type="button"
                onClick={() => addToQuote(item, item.minOrder || 1)}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg border-2 border-[#C3110C] text-[#C3110C] hover:bg-[#C3110C] hover:text-white transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add to Quote
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuoteList;
