import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useQuote } from "../context/QuoteContext";
import { useAuth } from "../hooks/useAuth";
import { api } from "../api/client";
import QuoteSuccessModal from "../components/common/QuoteSuccessModal";
import { PRODUCTS } from "../data/productsData";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  FileText,
  Info,
  Lock,
  Minus,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from "lucide-react";

const categories = [
  { name: "Fiber Optic", slug: "fiber-optic" },
  { name: "Network Infrastructure", slug: "network-infrastructure" },
  { name: "5G Equipment", slug: "5g-equipment" },
  { name: "Power Solutions", slug: "power-solutions" },
  { name: "Security", slug: "security" },
];

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const formatDisplayValue = (value, fallback = "") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  return value;
};

const QuoteListHeader = ({ productCount, totalUnits, isDark, onClear }) => {
  const summaryText = `${productCount} ${productCount === 1 ? "product" : "products"} • ${totalUnits} ${totalUnits === 1 ? "unit" : "units"} selected`;

  return (
    <div className="mb-8 flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link
          to="/"
          className={
            isDark
              ? "text-gray-400 transition-colors hover:text-[#E6501B]"
              : "text-gray-600 transition-colors hover:text-[#C3110C]"
          }
        >
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 opacity-60" />
        <Link
          to="/products"
          className={
            isDark
              ? "text-gray-400 transition-colors hover:text-[#E6501B]"
              : "text-gray-600 transition-colors hover:text-[#C3110C]"
          }
        >
          Products
        </Link>
        <ChevronRight className="h-3.5 w-3.5 opacity-60" />
        <span
          className={
            isDark ? "font-semibold text-white" : "font-semibold text-[#280905]"
          }
        >
          Quote List
        </span>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p
            className={
              isDark
                ? "mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E6501B]"
                : "mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C3110C]"
            }
          >
            Quotations
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">Quote List</h1>
        </div>

        <button
          type="button"
          onClick={onClear}
          className={
            isDark
              ? "inline-flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-500/20 hover:text-red-200"
              : "inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-100"
          }
        >
          <Trash2 className="h-4 w-4" />
          Remove all
        </button>
      </div>

      <div
        className={
          isDark
            ? "rounded-2xl border border-[#34404d] bg-[#1a1a1a] p-4"
            : "rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
        }
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className={
                isDark
                  ? "text-sm font-semibold text-white"
                  : "text-sm font-semibold text-[#280905]"
              }
            >
              {summaryText}
            </p>
            <p
              className={
                isDark
                  ? "mt-1 text-sm text-gray-400"
                  : "mt-1 text-sm text-gray-600"
              }
            >
              Pricing and availability will be confirmed after your quote
              request is reviewed.
            </p>
          </div>
          <div
            className={
              isDark
                ? "inline-flex items-center gap-2 rounded-full border border-[#E6501B]/30 bg-[#E6501B]/10 px-3 py-1.5 text-xs font-medium text-[#FDBA74]"
                : "inline-flex items-center gap-2 rounded-full border border-[#C3110C]/20 bg-[#C3110C]/5 px-3 py-1.5 text-xs font-medium text-[#740A03]"
            }
          >
            <Info className="h-3.5 w-3.5" />
            Price on request
          </div>
        </div>
      </div>
    </div>
  );
};

const QuantitySelector = ({
  item,
  isDark,
  onChange,
  onDecrease,
  onIncrease,
}) => {
  const minOrder = Number(item.minOrder || 1);
  const quantity = Number(item.quantity || minOrder);

  return (
    <div
      className={
        isDark
          ? "inline-flex items-center overflow-hidden rounded-xl border border-[#34404d] bg-[#151515]"
          : "inline-flex items-center overflow-hidden rounded-xl border border-gray-300 bg-white"
      }
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= minOrder}
        aria-label={`Decrease quantity of ${item.name}`}
        className={
          quantity <= minOrder
            ? "flex h-11 w-11 items-center justify-center border-r border-gray-500/40 bg-transparent text-gray-500 opacity-50"
            : isDark
              ? "flex h-11 w-11 items-center justify-center border-r border-[#34404d] bg-transparent text-gray-200 transition hover:bg-[#222222]"
              : "flex h-11 w-11 items-center justify-center border-r border-gray-300 bg-transparent text-gray-700 transition hover:bg-gray-100"
        }
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="number"
        inputMode="numeric"
        min={minOrder}
        step={1}
        value={quantity}
        onChange={(event) => {
          const value = Number.parseInt(event.target.value, 10);
          if (!Number.isNaN(value)) {
            onChange(Math.max(minOrder, value));
          }
        }}
        onBlur={(event) => {
          const value = Number.parseInt(event.target.value, 10);
          if (Number.isNaN(value) || value < minOrder) {
            onChange(minOrder);
          }
        }}
        aria-label={`Quantity for ${item.name}`}
        className={
          isDark
            ? "h-11 w-16 border-0 bg-transparent px-2 text-center text-base font-bold text-white outline-none [appearance:textfield] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            : "h-11 w-16 border-0 bg-transparent px-2 text-center text-base font-bold text-[#280905] outline-none [appearance:textfield] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        }
      />

      <button
        type="button"
        onClick={onIncrease}
        aria-label={`Increase quantity of ${item.name}`}
        className={
          isDark
            ? "flex h-11 w-11 items-center justify-center border-l border-[#34404d] bg-transparent text-gray-200 transition hover:bg-[#222222]"
            : "flex h-11 w-11 items-center justify-center border-l border-gray-300 bg-transparent text-gray-700 transition hover:bg-gray-100"
        }
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

const QuoteItemCard = ({ item, isDark, onRemove, onUpdateQuantity }) => {
  const minOrder = Number(item.minOrder || 1);
  const quantity = Number(item.quantity || minOrder);
  const brand = formatDisplayValue(item.brand, "Onasis");
  const sku = formatDisplayValue(item.sku, "Custom request");
  const category = formatDisplayValue(item.category, "General");
  const unit = formatDisplayValue(item.unit, "Units");

  return (
    <article
      className={
        isDark
          ? "rounded-2xl border border-[#34404d] bg-[#1a1a1a] p-4 shadow-sm shadow-black/20 transition-colors sm:p-5"
          : "rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors sm:p-5"
      }
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="h-24 w-24 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 sm:h-28 sm:w-28">
          <img
            src={
              item.image ||
              "https://placehold.co/240x240/f3f4f6/9ca3af?text=Product"
            }
            alt={item.name || "Product image"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                {category && (
                  <span
                    className={
                      isDark
                        ? "inline-flex rounded-full border border-[#34404d] bg-[#151515] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-300"
                        : "inline-flex rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-600"
                    }
                  >
                    {category}
                  </span>
                )}
                <span
                  className={
                    isDark
                      ? "inline-flex rounded-full border border-[#E6501B]/30 bg-[#E6501B]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FDBA74]"
                      : "inline-flex rounded-full border border-[#C3110C]/20 bg-[#C3110C]/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#740A03]"
                  }
                >
                  Price on request
                </span>
              </div>

              <h3
                className={
                  isDark
                    ? "break-words text-lg font-bold text-white"
                    : "break-words text-lg font-bold text-[#280905]"
                }
              >
                {formatDisplayValue(item.name, "Product")}
              </h3>

              <div
                className={
                  isDark
                    ? "mt-2 text-sm text-gray-400"
                    : "mt-2 text-sm text-gray-600"
                }
              >
                {brand && sku ? (
                  <span>
                    {brand} • {sku}
                  </span>
                ) : (
                  <span>{brand || sku}</span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.name} from quote list`}
              className={
                isDark
                  ? "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 transition hover:border-red-400 hover:bg-red-500/20"
                  : "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-600 transition hover:border-red-300 hover:bg-red-100"
              }
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4 border-t border-gray-200/80 pt-4 sm:flex-row sm:items-center sm:justify-between dark:border-[#34404d]">
            <div className="flex items-center gap-3">
              <QuantitySelector
                item={item}
                isDark={isDark}
                onChange={(nextValue) => onUpdateQuantity(item.id, nextValue)}
                onDecrease={() =>
                  onUpdateQuantity(item.id, Math.max(minOrder, quantity - 1))
                }
                onIncrease={() => onUpdateQuantity(item.id, quantity + 1)}
              />
            </div>

            <div
              className={
                isDark ? "text-sm text-gray-400" : "text-sm text-gray-600"
              }
            >
              <span className="font-medium">Minimum order:</span> {minOrder}{" "}
              {unit}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const QuoteSummary = ({
  productCount,
  totalUnits,
  isDark,
  onRequestQuote,
  isSubmitting,
  requestError,
}) => {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div
        className={
          isDark
            ? "rounded-2xl border border-[#34404d] bg-[#1a1a1a] p-5 shadow-lg shadow-black/20"
            : "rounded-2xl border border-gray-200 bg-white p-5 shadow-lg shadow-gray-200/60"
        }
      >
        <div className="mb-5 flex items-center gap-2">
          <PackageCheck
            className={
              isDark ? "h-5 w-5 text-[#E6501B]" : "h-5 w-5 text-[#C3110C]"
            }
          />
          <h2
            className={
              isDark
                ? "text-xl font-bold text-white"
                : "text-xl font-bold text-[#280905]"
            }
          >
            Quote Summary
          </h2>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
              Products
            </span>
            <span
              className={
                isDark
                  ? "font-semibold text-white"
                  : "font-semibold text-[#280905]"
              }
            >
              {productCount}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
              Total units
            </span>
            <span
              className={
                isDark
                  ? "font-semibold text-white"
                  : "font-semibold text-[#280905]"
              }
            >
              {totalUnits}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
              Delivery
            </span>
            <span
              className={
                isDark
                  ? "font-semibold text-white"
                  : "font-semibold text-[#280905]"
              }
            >
              Confirmed after quotation
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
              Taxes
            </span>
            <span
              className={
                isDark
                  ? "font-semibold text-white"
                  : "font-semibold text-[#280905]"
              }
            >
              Confirmed after quotation
            </span>
          </div>
        </div>

        <div
          className={
            isDark
              ? "my-6 border-t border-[#34404d]"
              : "my-6 border-t border-gray-200"
          }
        />

        <div className="mb-5">
          <p
            className={
              isDark
                ? "text-xs font-semibold uppercase tracking-[0.18em] text-gray-500"
                : "text-xs font-semibold uppercase tracking-[0.18em] text-gray-500"
            }
          >
            Quote total
          </p>
          <p
            className={
              isDark
                ? "mt-2 text-2xl font-bold text-white"
                : "mt-2 text-2xl font-bold text-[#280905]"
            }
          >
            To be confirmed
          </p>
          <p
            className={
              isDark
                ? "mt-2 text-sm text-gray-400"
                : "mt-2 text-sm text-gray-600"
            }
          >
            Final pricing will be provided after review of your request.
          </p>
        </div>

        {requestError && (
          <p className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            {requestError}
          </p>
        )}

        <button
          type="button"
          onClick={onRequestQuote}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C3110C] px-5 py-4 text-base font-bold text-white shadow-lg shadow-[#C3110C]/20 transition hover:bg-[#E6501B] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            "Sending request..."
          ) : (
            <>
              <ShoppingBag className="h-5 w-5" />
              Request a Quote
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        <p
          className={
            isDark
              ? "mt-4 text-center text-xs text-gray-400"
              : "mt-4 text-center text-xs text-gray-500"
          }
        >
          No payment is required at this stage.
        </p>
      </div>
    </aside>
  );
};

const QuoteTrustIndicators = ({ isDark }) => {
  const items = [
    { icon: Tag, text: "Bulk order pricing available" },
    { icon: Truck, text: "Delivery options confirmed with your quotation" },
    { icon: Lock, text: "Secure quote request process" },
  ];

  return (
    <div
      className={
        isDark
          ? "mt-6 rounded-2xl border border-[#34404d] bg-[#1a1a1a] p-4"
          : "mt-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
      }
    >
      <div className="space-y-3">
        {items.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-start gap-3 text-sm">
            <span
              className={
                isDark
                  ? "mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-[#E6501B]/10 text-[#E6501B]"
                  : "mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-[#C3110C]/5 text-[#740A03]"
              }
            >
              <Icon className="h-4 w-4" />
            </span>
            <span className={isDark ? "text-gray-300" : "text-gray-700"}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmptyQuoteState = ({ isDark, onBrowse }) => {
  return (
    <div
      className={`flex min-h-screen items-center justify-center px-4 py-20 ${isDark ? "bg-[#090909] text-white" : "bg-[#f7f7f5] text-[#280905]"}`}
    >
      <div className="w-full max-w-xl rounded-3xl border p-8 text-center shadow-sm sm:p-10">
        <div
          className={
            isDark
              ? "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#E6501B]/30 bg-[#E6501B]/10 text-[#E6501B]"
              : "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#C3110C]/20 bg-[#C3110C]/5 text-[#C3110C]"
          }
        >
          <FileText className="h-9 w-9" />
        </div>

        <h2 className="text-3xl font-bold">Your Quote List is Empty</h2>
        <p
          className={
            isDark
              ? "mt-3 text-base text-gray-400"
              : "mt-3 text-base text-gray-600"
          }
        >
          Browse our telecom and engineering products, select the items you
          need, and request a quotation when you are ready.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBrowse}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C3110C] px-6 py-3.5 font-semibold text-white transition hover:bg-[#E6501B]"
          >
            <ShoppingBag className="h-4 w-4" />
            Browse Products
          </button>
        </div>

        <p
          className={
            isDark ? "mt-5 text-sm text-gray-500" : "mt-5 text-sm text-gray-600"
          }
        >
          Add multiple items before submitting your quotation request.
        </p>
      </div>
    </div>
  );
};

const ClearQuoteDialog = ({ isDark, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div
        className={
          isDark
            ? "w-full max-w-md rounded-2xl border border-[#34404d] bg-[#1a1a1a] p-6 shadow-2xl"
            : "w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
        }
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <Trash2 className="h-5 w-5" />
        </div>

        <h3
          className={
            isDark
              ? "text-xl font-bold text-white"
              : "text-xl font-bold text-[#280905]"
          }
        >
          Clear quote list?
        </h3>
        <p
          className={
            isDark ? "mt-2 text-sm text-gray-400" : "mt-2 text-sm text-gray-600"
          }
        >
          This will remove all selected products from your quote request. This
          action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className={
              isDark
                ? "rounded-xl border border-[#34404d] px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:bg-[#222222]"
                : "rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            }
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-[#C3110C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E6501B]"
          >
            Clear list
          </button>
        </div>
      </div>
    </div>
  );
};

const SimilarProducts = ({ quoteItems, isDark }) => {
  const navigate = useNavigate();
  const { addToQuote } = useQuote();

  const quoteItemIds = quoteItems.map((item) => item.id).join(",");

  const similar = useMemo(() => {
    const inQuoteIds = new Set(quoteItems.map((item) => item.id));
    const quotedCategories = new Set(quoteItems.map((item) => item.category));

    const relatedPool = PRODUCTS.filter(
      (product) =>
        !inQuoteIds.has(product.id) && quotedCategories.has(product.category),
    );
    const restPool = PRODUCTS.filter(
      (product) =>
        !inQuoteIds.has(product.id) && !quotedCategories.has(product.category),
    );

    const picked = shuffle(relatedPool).slice(0, 5);
    if (picked.length < 5) {
      picked.push(...shuffle(restPool).slice(0, 5 - picked.length));
    }

    return picked;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteItemIds]);

  if (similar.length === 0) {
    return null;
  }

  return (
    <section className="pt-3" aria-labelledby="quote-similar-heading">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          id="quote-similar-heading"
          className={
            isDark
              ? "text-xl font-bold text-white"
              : "text-xl font-bold text-[#280905]"
          }
        >
          You Might Also Need
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {similar.map((item) => (
          <div
            key={item.id}
            className={
              isDark
                ? "overflow-hidden rounded-2xl border border-[#34404d] bg-[#1a1a1a] transition hover:-translate-y-0.5 hover:border-[#6b7785] hover:shadow-lg hover:shadow-black/20"
                : "overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            }
          >
            <button
              type="button"
              onClick={() => navigate(`/products/product/${item.id}`)}
              className="block w-full text-left"
            >
              <div className={isDark ? "bg-[#111111]" : "bg-gray-100"}>
                <img
                  src={
                    item.image ||
                    "https://placehold.co/420x420/f3f4f6/9ca3af?text=Product"
                  }
                  alt={item.name || "Recommended product"}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>

              <div className="space-y-2 p-3">
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
              </div>
            </button>

            <div className="px-3 pb-3">
              <button
                type="button"
                onClick={() => addToQuote(item, item.minOrder || 1)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#C3110C] bg-transparent px-3 py-2 text-xs font-bold text-[#C3110C] transition hover:bg-[#C3110C] hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
                Add to Quote
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const QuoteList = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const {
    quoteItems,
    removeFromQuote,
    updateQuantity,
    clearQuote,
    itemCount,
    totalItems,
  } = useQuote();

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState("");
  const [successSummary, setSuccessSummary] = useState(null);

  const productCount = quoteItems.length;
  const totalUnits = quoteItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0,
  );

  const clientName =
    user?.name || [user?.first_name, user?.last_name].filter(Boolean).join(" ");

  const handleClearQuote = () => {
    setIsClearDialogOpen(true);
  };

  const confirmClearQuote = () => {
    clearQuote();
    setIsClearDialogOpen(false);
  };

  const handleRequestQuote = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/quote-list" } });
      return;
    }

    setIsSubmitting(true);
    setRequestError("");
    try {
      await api.post("/quotes", {
        customer_name: clientName,
        customer_email: user?.email,
        customer_phone: user?.phone,
        company_name: user?.company_name,
        items: quoteItems.map((item) => ({
          product_id: item.id,
          name: item.name,
          sku: item.sku,
          quantity: Number(item.quantity || 0),
          unit: item.unit,
        })),
      });
      setSuccessSummary({ itemCount: productCount, totalUnits });
    } catch (error) {
      setRequestError(
        error.response?.data?.message ||
          "We could not send your quote request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (quoteItems.length === 0) {
    return (
      <>
        <EmptyQuoteState
          isDark={isDark}
          onBrowse={() => navigate("/products")}
        />
      </>
    );
  }

  return (
    <div
      className={`min-h-screen pt-20 ${isDark ? "bg-[#090909] text-white" : "bg-[#f7f7f5] text-[#280905]"}`}
    >
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 hidden xl:block">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm dark:border-[#34404d] dark:bg-[#1a1a1a]">
            <CheckCircle2
              className={
                isDark ? "h-5 w-5 text-[#E6501B]" : "h-5 w-5 text-[#C3110C]"
              }
            />
            <span
              className={
                isDark ? "text-sm text-gray-300" : "text-sm text-gray-700"
              }
            >
              Selected products are ready for quotation.
            </span>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_360px]">
          <div className="min-w-0">
            <QuoteListHeader
              productCount={productCount}
              totalUnits={totalUnits}
              isDark={isDark}
              onClear={handleClearQuote}
            />

            <div className="space-y-5">
              {quoteItems.map((item) => (
                <QuoteItemCard
                  key={item.id}
                  item={item}
                  isDark={isDark}
                  onRemove={removeFromQuote}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-[#34404d]">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className={
                  isDark
                    ? "inline-flex items-center gap-2 text-sm font-medium text-gray-300 transition hover:text-white"
                    : "inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#280905]"
                }
              >
                <ArrowLeft className="h-4 w-4" />
                Continue browsing products
              </button>
            </div>

            <div className="mt-8">
              <SimilarProducts quoteItems={quoteItems} isDark={isDark} />
            </div>
          </div>

          <div className="xl:pl-2">
            <QuoteSummary
              productCount={productCount}
              totalUnits={totalUnits}
              isDark={isDark}
              onRequestQuote={handleRequestQuote}
              isSubmitting={isSubmitting}
              requestError={requestError}
            />
            <QuoteTrustIndicators isDark={isDark} />
          </div>
        </div>
      </div>

      {isClearDialogOpen && (
        <ClearQuoteDialog
          isDark={isDark}
          onClose={() => setIsClearDialogOpen(false)}
          onConfirm={confirmClearQuote}
        />
      )}
      {successSummary && (
        <QuoteSuccessModal
          isDark={isDark}
          itemCount={successSummary.itemCount}
          totalUnits={successSummary.totalUnits}
          onClose={() => {
            clearQuote();
            setSuccessSummary(null);
          }}
        />
      )}
    </div>
  );
};

export default QuoteList;
