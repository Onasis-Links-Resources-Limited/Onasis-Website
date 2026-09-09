import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import { useQuote } from "../../context/QuoteContext";
import toast from "react-hot-toast";
import QuoteSuccessModal from "../../components/common/QuoteSuccessModal";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Lock,
  Minus,
  PackageSearch,
  Plus,
  Shield,
  Truck,
  Users,
  Eye,
} from "lucide-react";

// Components
import ProductGallery from "./ProductGallery";
import SimilarProducts from "./SimilarProducts";
import BulkQuoteForm from "./BulkQuoteForm";
import { useProductDetail } from "./useProductDetail";

const ProductDetail = () => {
  const { slug, id } = useParams();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const { addToQuote } = useQuote();
  const navigate = useNavigate();
  const { product, loading, error } = useProductDetail(id);

  const isDark = theme === "dark";
  const [quantity, setQuantity] = useState(1);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [addedToQuote, setAddedToQuote] = useState(false);
  const [successSummary, setSuccessSummary] = useState(null);

  // Dark theme classes
  const darkBg = isDark
    ? "bg-[#090909] text-white"
    : "bg-[#f7f7f5] text-[#280905]";
  const darkCard = isDark
    ? "bg-[#1A1A1A] border-[#2A2A2A]"
    : "bg-white border-gray-200";

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen pt-20 flex items-center justify-center ${darkBg}`}
      >
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C3110C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div
        className={`min-h-screen pt-20 flex items-center justify-center ${darkBg}`}
      >
        <div className="px-4 text-center">
          <PackageSearch
            className={`mx-auto mb-4 h-10 w-10 ${isDark ? "text-gray-600" : "text-gray-300"}`}
          />
          <h2 className="mb-2 text-2xl font-bold">Product not found</h2>
          <p
            className={
              isDark
                ? "mb-6 text-sm text-gray-400"
                : "mb-6 text-sm text-gray-500"
            }
          >
            {error || "This product may have been removed."}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 font-medium text-[#C3110C] hover:text-[#E6501B]"
          >
            Back to products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const minOrder = Number(product.min_order || 1);
  const step = Number(product.order_increment || 1);
  const productUnit = product.unit || "Units";

  const decreaseQuantity = () =>
    setQuantity((current) => Math.max(minOrder, current - step));
  const increaseQuantity = () => setQuantity((current) => current + step);

  const handleAddToQuote = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your quote list");
      navigate("/login", {
        state: { from: `/products/product/${product.id}` },
      });
      return;
    }
    const safeQuantity = Math.max(minOrder, Number(quantity) || minOrder);
    addToQuote(product, safeQuantity);
    setAddedToQuote(true);
    toast.success(`${product.name} added to your quote list!`);
    setTimeout(() => setAddedToQuote(false), 2200);
  };

  const handleBulkQuote = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to request a bulk quote");
      navigate("/login", {
        state: { from: `/products/product/${product.id}` },
      });
      return;
    }
    setShowBulkForm(true);
  };

  return (
    <div className={`min-h-screen pt-20 ${darkBg}`}>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm">
          <Link
            to="/"
            className={
              isDark
                ? "text-gray-400 hover:text-[#E6501B]"
                : "text-gray-600 hover:text-[#C3110C]"
            }
          >
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          <Link
            to="/products"
            className={
              isDark
                ? "text-gray-400 hover:text-[#E6501B]"
                : "text-gray-600 hover:text-[#C3110C]"
            }
          >
            Products
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          <Link
            to={`/products/category/${slug}`}
            className={
              isDark
                ? "text-gray-400 hover:text-[#E6501B]"
                : "text-gray-600 hover:text-[#C3110C]"
            }
          >
            {product.category?.name || "Category"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          <span
            className={
              isDark
                ? "font-medium text-white truncate"
                : "font-medium text-[#280905] truncate"
            }
          >
            {product.name}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Column */}
          <div className="space-y-6">
            <ProductGallery product={product} isDark={isDark} />

            {/* View Count */}
            <div
              className={`flex items-center gap-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
            >
              <Eye className="h-4 w-4" />
              <span>{product.view_count || 0} views</span>
            </div>

            {/* Specifications */}
            {product.specifications?.length > 0 && (
              <div className={`rounded-2xl p-5 border ${darkCard}`}>
                <h3
                  className={
                    isDark
                      ? "mb-4 text-lg font-semibold text-white"
                      : "mb-4 text-lg font-semibold text-[#280905]"
                  }
                >
                  Specifications
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {product.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className={
                        isDark
                          ? "rounded-xl border border-[#2A2A2A] bg-[#0a0a0a] p-3"
                          : "rounded-xl border border-gray-200 bg-gray-50 p-3"
                      }
                    >
                      <p
                        className={
                          isDark
                            ? "mb-1 text-[10px] font-semibold uppercase text-gray-400"
                            : "mb-1 text-[10px] font-semibold uppercase text-gray-500"
                        }
                      >
                        {spec.key}
                      </p>
                      <p
                        className={
                          isDark
                            ? "text-sm font-semibold text-white truncate"
                            : "text-sm font-semibold text-[#280905] truncate"
                        }
                      >
                        {spec.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Downloads */}
            {product.datasheets?.length > 0 && (
              <div className={`rounded-2xl p-5 border ${darkCard}`}>
                <h3
                  className={
                    isDark
                      ? "mb-4 text-lg font-semibold text-white"
                      : "mb-4 text-lg font-semibold text-[#280905]"
                  }
                >
                  Downloads
                </h3>
                <div className="space-y-2">
                  {product.datasheets.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        isDark
                          ? `flex items-center gap-3 rounded-xl border border-[#2A2A2A] p-3 text-gray-300 hover:bg-[#212121]`
                          : "flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-700 hover:bg-gray-100"
                      }
                    >
                      <Download className="h-4 w-4 text-[#E6501B]" />
                      <span className="text-sm font-medium truncate">
                        {file.name || `Datasheet ${index + 1}`}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className={`rounded-2xl border p-5 ${darkCard}`}>
              {/* Status Badges */}
              <div className="mb-4 flex flex-wrap gap-2">
                <span
                  className={
                    product.stock_quantity > 0
                      ? "inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }
                >
                  {product.stock_quantity > 0 ? "In stock" : "Out of stock"}
                </span>
                <span
                  className={
                    isDark
                      ? "inline-flex rounded-full border border-[#E6501B]/30 bg-[#E6501B]/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-[#FDBA74]"
                      : "inline-flex rounded-full border border-[#C3110C]/20 bg-[#C3110C]/5 px-2.5 py-1 text-[10px] font-semibold uppercase text-[#740A03]"
                  }
                >
                  Price on request
                </span>
              </div>

              <h1
                className={`text-3xl font-bold truncate ${isDark ? "text-white sm:text-4xl" : "text-[#280905] sm:text-4xl"}`}
              >
                {product.name}
              </h1>
              <p
                className={
                  isDark
                    ? "mt-2 text-base text-gray-300 truncate"
                    : "mt-2 text-base text-gray-600 truncate"
                }
              >
                {product.brand || "Onasis"}
                {product.Category?.name ? ` • ${product.Category.name}` : ""}
              </p>
                {product.sku && (
                  <p
                    className={
                      isDark
                        ? "mt-2 text-sm text-gray-400 truncate"
                        : "mt-2 text-sm text-gray-600 truncate"
                    }
                  >
                    SKU: {product.sku}
                  </p>
                )}
              {product.description && (
                <p
                  className={`mt-3 text-base leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {product.description}
                </p>
              )}

              {/* Price on Request */}
              <div
                className={
                  isDark
                    ? "mt-4 rounded-2xl border border-[#E6501B]/30 bg-[#E6501B]/10 p-4"
                    : "mt-4 rounded-2xl border border-[#C3110C]/20 bg-[#C3110C]/5 p-4"
                }
              >
                <div
                  className={
                    isDark
                      ? "flex items-center gap-2 text-base font-bold text-[#FDBA74]"
                      : "flex items-center gap-2 text-base font-bold text-[#740A03]"
                  }
                >
                  <AlertCircle className="h-5 w-5" />
                  <span>Price available on request</span>
                </div>
                <div
                  className={
                    isDark
                      ? "mt-2 flex flex-nowrap items-center gap-3 text-xs text-gray-300"
                      : "mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600"
                  }
                >
                  <span>
                    Minimum order: {minOrder} {productUnit}
                  </span>
                  <span>•</span>
                  <span>Bulk pricing available</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 space-y-4">
                <label
                  className={
                    isDark
                      ? "block text-sm font-medium text-gray-300"
                      : "block text-sm font-medium text-gray-700"
                  }
                >
                  Requested quantity
                </label>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div
                    className={
                      isDark
                        ? "inline-flex items-center overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#0a0a0a]"
                        : "inline-flex items-center overflow-hidden rounded-xl border border-gray-300 bg-white"
                    }
                  >
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= minOrder}
                      className={
                        quantity <= minOrder
                          ? "flex h-12 w-12 items-center justify-center text-gray-500 opacity-50"
                          : isDark
                            ? "flex h-12 w-12 items-center justify-center text-gray-200 hover:bg-[#212121]"
                            : "flex h-12 w-12 items-center justify-center text-gray-700 hover:bg-gray-100"
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      min={minOrder}
                      step={step}
                      value={quantity}
                      onChange={(e) => {
                        const val = Number.parseInt(e.target.value, 10);
                        if (!isNaN(val)) setQuantity(Math.max(minOrder, val));
                      }}
                      onBlur={(e) => {
                        const val = Number.parseInt(e.target.value, 10);
                        if (isNaN(val) || val < minOrder) setQuantity(minOrder);
                      }}
                      className={
                        isDark
                          ? "h-12 w-20 border-0 bg-transparent px-2 text-center text-lg font-bold text-white outline-none [appearance:textfield]"
                          : "h-12 w-20 border-0 bg-transparent px-2 text-center text-lg font-bold text-[#280905] outline-none [appearance:textfield]"
                      }
                    />
                    <button
                      onClick={increaseQuantity}
                      className={
                        isDark
                          ? "flex h-12 w-12 items-center justify-center text-gray-200 hover:bg-[#212121]"
                          : "flex h-12 w-12 items-center justify-center text-gray-700 hover:bg-gray-100"
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div
                    className={
                      isDark
                        ? "text-sm font-medium text-gray-400 truncate"
                        : "text-sm font-medium text-gray-600 truncate"
                    }
                  >
                    Min: {minOrder} {productUnit}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={handleAddToQuote}
                    disabled={
                      !product.stock_quantity || product.stock_quantity < 1
                    }
                    className="flex items-center justify-center gap-2 rounded-xl cursor-pointer bg-[#C3110C] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-[#C3110C]/20 hover:bg-[#E6501B] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none text-nowrap"
                  >
                    {addedToQuote ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                    {addedToQuote ? "Added" : "Add to Quote"}
                  </button>
                  <button
                    onClick={handleBulkQuote}
                    className={
                      isDark
                        ? "flex items-center justify-center gap-2 rounded-xl border border-[#E6501B]/40 bg-[#E6501B]/10 px-5 py-4 text-sm font-bold text-[#FDBA74] hover:bg-[#E6501B]/20 text-nowrap cursor-pointer"
                        : "flex items-center justify-center gap-2 rounded-xl border border-[#C3110C]/30 bg-[#C3110C]/5 px-5 py-4 text-sm font-bold text-[#740A03] hover:bg-[#C3110C]/10 text-nowrap cursor-pointer"
                    }
                  >
                    <Users className="h-5 w-5" />
                    Request Bulk Quote
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div
                className={`grid gap-2 border-t pt-6 sm:grid-cols-2 ${isDark ? "border-[#2A2A2A]" : "border-gray-200"}`}
              >
                {[
                  { icon: Shield, label: "Genuine products" },
                  { icon: Truck, label: "Fast delivery" },
                  { icon: CheckCircle, label: "Quality checked" },
                  { icon: Clock, label: "Support available" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className={
                      isDark
                        ? "flex items-center gap-3 rounded-xl p-3 text-xs text-gray-300"
                        : "flex items-center gap-3 rounded-xl bg-gray-50 p-3 text-sm text-gray-700"
                    }
                  >
                    <span
                      className={
                        isDark
                          ? "flex h-9 w-9 items-center justify-center rounded-lg bg-[#E6501B]/10 text-[#E6501B]"
                          : "flex h-9 w-9 items-center justify-center rounded-lg bg-[#C3110C]/5 text-[#740A03]"
                      }
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Info */}
            <div className={`rounded-2xl border p-4 ${darkCard}`}>
              <div className="mb-3 flex items-center gap-2">
                <Lock
                  className={
                    isDark ? "h-4 w-4 text-[#E6501B]" : "h-4 w-4 text-[#C3110C]"
                  }
                />
                <span
                  className={
                    isDark
                      ? "text-sm font-semibold text-white"
                      : "text-sm font-semibold text-[#280905]"
                  }
                >
                  Quote request process
                </span>
              </div>
              <ul
                className={
                  isDark
                    ? "space-y-2 text-sm text-gray-300"
                    : "space-y-2 text-sm text-gray-600"
                }
              >
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-[#E6501B]" />{" "}
                  Share requirements and quantity
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-[#E6501B]" />{" "}
                  Receive a reviewed commercial quotation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-[#E6501B]" />{" "}
                  Confirm delivery and commercial terms
                </li>
              </ul>
            </div>
          </div>
        </div>

        <SimilarProducts currentProduct={product} isDark={isDark} />
      </div>

      {showBulkForm && (
        <BulkQuoteForm
          product={product}
          onClose={() => setShowBulkForm(false)}
          onSuccess={(summary) => {
            setShowBulkForm(false);
            setSuccessSummary(summary);
          }}
        />
      )}
      {successSummary && (
        <QuoteSuccessModal
          isDark={isDark}
          itemCount={successSummary.itemCount}
          totalUnits={successSummary.totalUnits}
          onClose={() => setSuccessSummary(null)}
        />
      )}
    </div>
  );
};

export default ProductDetail;
