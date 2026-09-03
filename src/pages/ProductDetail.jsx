import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import { useQuote } from "../context/QuoteContext";
import { api } from "../api/client";
import QuoteSuccessModal from "../components/common/QuoteSuccessModal";
import { PRODUCTS } from "../data/productsData";
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
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";

const categories = [
  { name: "Fiber Optic", slug: "fiber-optic" },
  { name: "Network Infrastructure", slug: "network-infrastructure" },
  { name: "5G Equipment", slug: "5g-equipment" },
  { name: "Power Solutions", slug: "power-solutions" },
  { name: "Security", slug: "security" },
];

const slugify = (str = "") => str.toLowerCase().replace(/ /g, "-");

const formatDisplayValue = (value, fallback = "") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  return value;
};

const ProductDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const { addToQuote, itemCount } = useQuote();
  const navigate = useNavigate();

  const product = useMemo(
    () => PRODUCTS.find((p) => p.id === Number.parseInt(id, 10)),
    [id],
  );

  const isDark = theme === "dark";
  const [quantity, setQuantity] = useState(product?.minOrder || 1);
  const [showBulkForm, setShowBulkForm] = useState(false);
  const [addedToQuote, setAddedToQuote] = useState(false);
  const [successSummary, setSuccessSummary] = useState(null);

  useEffect(() => {
    setQuantity(product?.minOrder || 1);
  }, [product?.id]);

  if (!product) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center pt-20 ${isDark ? "bg-[#090909] text-white" : "bg-[#f7f7f5] text-[#280905]"}`}
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
            This product may have been removed or the link is out of date.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 font-medium text-[#C3110C] hover:text-[#E6501B]"
          >
            Back to all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const minOrder = Number(product.minOrder || 1);
  const step = Number(product.orderIncrement || 1);

  const decreaseQuantity = () =>
    setQuantity((current) => Math.max(minOrder, current - step));
  const increaseQuantity = () => setQuantity((current) => current + step);

  const handleAddToQuote = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/products/product/${product.id}` },
      });
      return;
    }

    const safeQuantity = Math.max(minOrder, Number(quantity) || minOrder);
    addToQuote(product, safeQuantity);
    setAddedToQuote(true);
    window.setTimeout(() => setAddedToQuote(false), 2200);
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

  const productBrand = formatDisplayValue(product.brand, "Onasis");
  const productSku = formatDisplayValue(product.sku, "Custom request");
  const productUnit = formatDisplayValue(product.unit, "Units");

  return (
    <div
      className={`min-h-screen pt-20 ${isDark ? "bg-[#090909] text-white" : "bg-[#f7f7f5] text-[#280905]"}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
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
            to={`/products/category/${slugify(product.category)}`}
            className={
              isDark
                ? "text-gray-400 hover:text-[#E6501B]"
                : "text-gray-600 hover:text-[#C3110C]"
            }
          >
            {product.category}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          <span
            className={
              isDark ? "font-medium text-white" : "font-medium text-[#280905]"
            }
          >
            {product.name}
          </span>
        </div>

        <div className="mb-8 hidden xl:block">
          <div
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm ${isDark ? "border-gray-700 bg-gray-800/80" : "border-gray-200 bg-white"}`}
          >
            <ShoppingBag
              className={
                isDark ? "h-5 w-5 text-[#E6501B]" : "h-5 w-5 text-[#C3110C]"
              }
            />
            <span
              className={
                isDark ? "text-sm text-gray-300" : "text-sm text-gray-700"
              }
            >
              {itemCount > 0
                ? `${itemCount} product${itemCount === 1 ? "" : "s"} in your quote list`
                : "Add this product to your quote list for review"}
            </span>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="space-y-6">
            <ProductGallery product={product} isDark={isDark} />

            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <div
                  className={`rounded-2xl p-5 ${isDark ? "border border-gray-700 bg-gray-800/90" : "border border-gray-200 bg-white shadow-sm"}`}
                >
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
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className={
                            isDark
                              ? "rounded-xl border border-gray-700 bg-gray-900/60 p-3"
                              : "rounded-xl border border-gray-200 bg-gray-50 p-3"
                          }
                        >
                          <p
                            className={
                              isDark
                                ? "mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400"
                                : "mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500"
                            }
                          >
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </p>
                          <p
                            className={
                              isDark
                                ? "text-sm font-semibold text-white"
                                : "text-sm font-semibold text-[#280905]"
                            }
                          >
                            {value}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

            {product.downloads?.length > 0 && (
              <div
                className={`rounded-2xl p-5 ${isDark ? "border border-gray-700 bg-gray-800/90" : "border border-gray-200 bg-white shadow-sm"}`}
              >
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
                  {product.downloads.map((file, index) => (
                    <a
                      key={file.url || index}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        isDark
                          ? "flex items-center gap-3 rounded-xl border border-gray-700 p-3 text-gray-300 transition hover:bg-gray-700"
                          : "flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-700 transition hover:bg-gray-100"
                      }
                    >
                      <Download className="h-4 w-4 text-[#E6501B]" />
                      <span className="text-sm font-medium">{file.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div
              className={`rounded-2xl border p-5 ${isDark ? "border-gray-700 bg-gray-800/90" : "border-gray-200 bg-white shadow-sm"}`}
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span
                  className={
                    product.isAvailable
                      ? "inline-flex rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "inline-flex rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }
                >
                  {product.isAvailable ? "In stock" : "Out of stock"}
                </span>
                <span
                  className={
                    isDark
                      ? "inline-flex rounded-full border border-[#E6501B]/30 bg-[#E6501B]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#FDBA74]"
                      : "inline-flex rounded-full border border-[#C3110C]/20 bg-[#C3110C]/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#740A03]"
                  }
                >
                  Price on request
                </span>
              </div>

              <h1
                className={
                  isDark
                    ? "text-3xl font-bold text-white sm:text-4xl"
                    : "text-3xl font-bold text-[#280905] sm:text-4xl"
                }
              >
                {product.name}
              </h1>

              <p
                className={
                  isDark
                    ? "mt-2 text-base text-gray-300"
                    : "mt-2 text-base text-gray-600"
                }
              >
                {productBrand}
                {product.category ? ` • ${product.category}` : ""}
              </p>

              {productSku && (
                <p
                  className={
                    isDark
                      ? "mt-3 text-sm text-gray-400"
                      : "mt-3 text-sm text-gray-600"
                  }
                >
                  SKU: {productSku}
                </p>
              )}

              {product.description && (
                <p
                  className={
                    isDark
                      ? "mt-5 text-base leading-relaxed text-gray-300"
                      : "mt-5 text-base leading-relaxed text-gray-600"
                  }
                >
                  {product.description}
                </p>
              )}

              <div
                className={
                  isDark
                    ? "mt-6 rounded-2xl border border-[#E6501B]/30 bg-[#E6501B]/10 p-4"
                    : "mt-6 rounded-2xl border border-[#C3110C]/20 bg-[#C3110C]/5 p-4"
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
                      ? "mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-300"
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
                        ? "inline-flex items-center overflow-hidden rounded-xl border border-gray-600 bg-gray-900/70"
                        : "inline-flex items-center overflow-hidden rounded-xl border border-gray-300 bg-white"
                    }
                  >
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity <= minOrder}
                      aria-label="Decrease quantity"
                      className={
                        quantity <= minOrder
                          ? isDark
                            ? "flex h-12 w-12 items-center justify-center text-gray-500 opacity-50"
                            : "flex h-12 w-12 items-center justify-center text-gray-400 opacity-50"
                          : isDark
                            ? "flex h-12 w-12 items-center justify-center text-gray-200 transition hover:bg-gray-700"
                            : "flex h-12 w-12 items-center justify-center text-gray-700 transition hover:bg-gray-100"
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <input
                      type="number"
                      min={minOrder}
                      step={step}
                      inputMode="numeric"
                      value={quantity}
                      onChange={(event) => {
                        const nextValue = Number.parseInt(
                          event.target.value,
                          10,
                        );
                        if (!Number.isNaN(nextValue)) {
                          setQuantity(Math.max(minOrder, nextValue));
                        }
                      }}
                      onBlur={(event) => {
                        const nextValue = Number.parseInt(
                          event.target.value,
                          10,
                        );
                        if (Number.isNaN(nextValue) || nextValue < minOrder) {
                          setQuantity(minOrder);
                        }
                      }}
                      aria-label="Quantity"
                      className={
                        isDark
                          ? "h-12 w-20 border-0 bg-transparent px-2 text-center text-lg font-bold text-white outline-none [appearance:textfield] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          : "h-12 w-20 border-0 bg-transparent px-2 text-center text-lg font-bold text-[#280905] outline-none [appearance:textfield] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      }
                    />

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      aria-label="Increase quantity"
                      className={
                        isDark
                          ? "flex h-12 w-12 items-center justify-center text-gray-200 transition hover:bg-gray-700"
                          : "flex h-12 w-12 items-center justify-center text-gray-700 transition hover:bg-gray-100"
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div
                    className={
                      isDark
                        ? "text-sm font-medium text-gray-400"
                        : "text-sm font-medium text-gray-600"
                    }
                  >
                    Minimum order: {minOrder} {productUnit}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleAddToQuote}
                    disabled={!product.isAvailable}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#C3110C] px-5 py-4 text-base font-bold text-white shadow-lg shadow-[#C3110C]/20 transition hover:bg-[#E6501B] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
                  >
                    {addedToQuote ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                    {addedToQuote ? "Added to quote" : "Add to Quote"}
                  </button>

                  <button
                    type="button"
                    onClick={handleBulkQuote}
                    className={
                      isDark
                        ? "flex items-center justify-center gap-2 rounded-xl border border-[#E6501B]/40 bg-[#E6501B]/10 px-5 py-4 text-base font-bold text-[#FDBA74] transition hover:bg-[#E6501B]/20"
                        : "flex items-center justify-center gap-2 rounded-xl border border-[#C3110C]/30 bg-[#C3110C]/5 px-5 py-4 text-base font-bold text-[#740A03] transition hover:bg-[#C3110C]/10"
                    }
                  >
                    <Users className="h-5 w-5" />
                    Request Bulk Quote
                  </button>
                </div>
              </div>

              <div
                className={`grid gap-3 border-t pt-6 sm:grid-cols-2 ${isDark ? "border-gray-700" : "border-gray-200"}`}
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
                        ? "flex items-center gap-3 rounded-xl bg-gray-900/50 p-3 text-sm text-gray-300"
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
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={
                isDark
                  ? "rounded-2xl border border-gray-700 bg-gray-800/90 p-4"
                  : "rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              }
            >
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

        <div className="mt-16">
          <SimilarProducts currentProduct={product} isDark={isDark} />
        </div>
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

const ProductGallery = ({ product, isDark }) => {
  const images = useMemo(() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    return [product.image];
  }, [product]);

  const [activeImage, setActiveImage] = useState(images[0]);

  useEffect(() => {
    setActiveImage(images[0]);
  }, [images]);

  return (
    <div className="space-y-4">
      <div
        className={`mx-auto max-w-[680px] overflow-hidden rounded-2xl border transition-all duration-300 ${isDark ? "border-gray-700 bg-gray-800 shadow-lg shadow-black/10" : "border-gray-200 bg-gray-100 shadow-md shadow-gray-200/60"}`}
      >
        <img
          src={activeImage}
          alt={product.name}
          className="h-[420px] w-full object-cover transition duration-300 ease-out hover:scale-[1.03] hover:shadow-xl sm:h-[500px] lg:h-[560px]"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-3">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveImage(src)}
              aria-label={`Show image ${index + 1} of ${product.name}`}
              aria-pressed={activeImage === src}
              className={
                activeImage === src
                  ? isDark
                    ? "h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 ring-[#E6501B] ring-offset-2 ring-offset-[#090909] transition-all duration-200"
                    : "h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 ring-[#C3110C] ring-offset-2 ring-offset-[#f7f7f5] transition-all duration-200"
                  : isDark
                    ? "h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-700 opacity-80 transition-all duration-200 hover:opacity-100"
                    : "h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 opacity-80 transition-all duration-200 hover:opacity-100"
              }
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SimilarProducts = ({ currentProduct, isDark }) => {
  const navigate = useNavigate();

  const similar = useMemo(() => {
    const sameCategory = PRODUCTS.filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.category === currentProduct.category,
    );

    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 8);
    }

    const sameBrand = PRODUCTS.filter(
      (product) =>
        product.id !== currentProduct.id &&
        product.brand === currentProduct.brand &&
        !sameCategory.some((item) => item.id === product.id),
    );

    const fallback = PRODUCTS.filter(
      (product) =>
        product.id !== currentProduct.id &&
        !sameCategory.some((item) => item.id === product.id) &&
        !sameBrand.some((item) => item.id === product.id),
    );

    return [...sameCategory, ...sameBrand, ...fallback].slice(0, 8);
  }, [currentProduct]);

  if (similar.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="similar-products-heading">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2
          id="similar-products-heading"
          className={
            isDark
              ? "text-2xl font-bold text-white"
              : "text-2xl font-bold text-[#280905]"
          }
        >
          Similar Products
        </h2>

        <Link
          to={`/products/category/${slugify(currentProduct.category)}`}
          className={
            isDark
              ? "hidden items-center gap-1 text-sm font-medium text-[#E6501B] sm:inline-flex"
              : "hidden items-center gap-1 text-sm font-medium text-[#C3110C] sm:inline-flex"
          }
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {similar.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(`/products/product/${item.id}`)}
            className={
              isDark
                ? "overflow-hidden rounded-2xl border border-gray-700 bg-gray-800 text-left transition hover:-translate-y-0.5 hover:border-gray-600"
                : "overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300"
            }
          >
            <div className={isDark ? "bg-gray-900" : "bg-gray-100"}>
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="space-y-2 p-4">
              <p
                className={
                  isDark
                    ? "text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400"
                    : "text-[10px] font-medium uppercase tracking-[0.14em] text-gray-500"
                }
              >
                {formatDisplayValue(item.brand, item.category || "Product")}
              </p>
              <h3
                className={
                  isDark
                    ? "text-sm font-semibold text-white"
                    : "text-sm font-semibold text-[#280905]"
                }
              >
                {formatDisplayValue(item.name, "Product")}
              </h3>
              <p
                className={
                  item.isAvailable
                    ? isDark
                      ? "text-xs font-medium text-green-400"
                      : "text-xs font-medium text-green-600"
                    : isDark
                      ? "text-xs font-medium text-red-400"
                      : "text-xs font-medium text-red-600"
                }
              >
                {item.isAvailable ? "In stock" : "Out of stock"}
              </p>
              <span
                className={
                  isDark
                    ? "inline-flex items-center gap-1 text-sm font-bold text-[#E6501B]"
                    : "inline-flex items-center gap-1 text-sm font-bold text-[#C3110C]"
                }
              >
                View details
                <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

const BulkQuoteForm = ({ product, onClose, onSuccess }) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (Number(formData.quantity) < product.minOrder) {
      setError(
        `Quantity must be at least ${product.minOrder} ${product.unit}.`,
      );
      return;
    }

    setSubmitting(true);

    try {
      const requestedQuantity = Number(formData.quantity);
      await api.post("/quotes", {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        company_name: formData.company,
        items: [
          {
            product_id: product.id,
            name: product.name,
            sku: product.sku,
            quantity: requestedQuantity,
            unit: product.unit,
            notes: formData.message,
          },
        ],
      });
      onSuccess({ itemCount: 1, totalUnits: requestedQuantity });
    } catch {
      setError("Something went wrong sending your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bulk-quote-title"
    >
      <div
        className={`max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl shadow-2xl ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2
              id="bulk-quote-title"
              className={
                isDark
                  ? "text-xl font-bold text-white"
                  : "text-xl font-bold text-[#280905]"
              }
            >
              Bulk Quote Request
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close bulk quote form"
              className={
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-700"
              }
            >
              ✕
            </button>
          </div>

          <p
            className={
              isDark
                ? "mb-4 text-sm text-gray-400"
                : "mb-4 text-sm text-gray-600"
            }
          >
            Request a bulk quote for <strong>{product.name}</strong>
          </p>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
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
                <label
                  htmlFor={key}
                  className={
                    isDark
                      ? "mb-1 block text-sm font-medium text-gray-200"
                      : "mb-1 block text-sm font-medium text-gray-700"
                  }
                >
                  {label}
                </label>
                <input
                  id={key}
                  type={type}
                  required={required}
                  value={formData[key]}
                  onChange={(event) =>
                    setFormData({ ...formData, [key]: event.target.value })
                  }
                  className={
                    isDark
                      ? "w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-[#E6501B]"
                      : "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[#280905] outline-none focus:border-[#C3110C]"
                  }
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="quantity"
                className={
                  isDark
                    ? "mb-1 block text-sm font-medium text-gray-200"
                    : "mb-1 block text-sm font-medium text-gray-700"
                }
              >
                Estimated Quantity *
              </label>
              <input
                id="quantity"
                type="number"
                required
                min={product.minOrder}
                value={formData.quantity}
                onChange={(event) =>
                  setFormData({ ...formData, quantity: event.target.value })
                }
                className={
                  isDark
                    ? "w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-[#E6501B]"
                    : "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[#280905] outline-none focus:border-[#C3110C]"
                }
                placeholder={`Min. ${product.minOrder} ${product.unit}`}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className={
                  isDark
                    ? "mb-1 block text-sm font-medium text-gray-200"
                    : "mb-1 block text-sm font-medium text-gray-700"
                }
              >
                Additional Notes
              </label>
              <textarea
                id="message"
                rows="3"
                value={formData.message}
                onChange={(event) =>
                  setFormData({ ...formData, message: event.target.value })
                }
                className={
                  isDark
                    ? "w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-[#E6501B]"
                    : "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-[#280905] outline-none focus:border-[#C3110C]"
                }
                placeholder="Any special requirements..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={
                  isDark
                    ? "flex-1 rounded-xl border border-gray-700 px-4 py-2.5 font-medium text-gray-200 transition hover:bg-gray-800"
                    : "flex-1 rounded-xl border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-xl bg-[#C3110C] px-4 py-2.5 font-bold text-white transition hover:bg-[#E6501B] disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Submit request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
