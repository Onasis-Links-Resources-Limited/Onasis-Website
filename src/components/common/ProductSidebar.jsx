import { Link } from "react-router-dom";
import { ChevronRight, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ProductSidebar = ({
  categories = [],
  activeSlug = "",
  isMobile = false,
  onClose,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      {isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={
          isMobile
            ? "fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-[#1a1a1a] p-6 shadow-2xl"
            : "sticky top-24"
        }
      >
        <div
          className={`rounded-2xl border p-4 shadow-sm ${
            isDark
              ? "border-[#34404d] bg-[#1a1a1a]"
              : "border-gray-200 bg-white"
          }`}
        >
          {isMobile && (
            <div className="mb-4 flex items-center justify-between border-b border-[#34404d] pb-4">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-400">
                Product categories
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close product categories"
                className="rounded-lg p-1 text-gray-400 hover:bg-[#222222] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}

          {!isMobile && (
            <p
              className={`mb-4 px-3 text-xs font-semibold uppercase tracking-[0.16em] ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Product categories
            </p>
          )}

          <nav className="space-y-1" aria-label="Product categories">
            {categories.map((category) => {
              const isCurrent = activeSlug === category.slug;

              return (
                <Link
                  key={category.slug}
                  to={`/products/category/${category.slug}`}
                  onClick={onClose}
                  className={
                    isCurrent
                      ? "flex items-center justify-between rounded-xl bg-[#E6501B] px-3 py-3 text-sm font-semibold text-white shadow-sm"
                      : isDark
                        ? "flex items-center justify-between rounded-xl px-3 py-3 text-sm text-gray-300 transition hover:bg-[#222222] hover:text-white"
                        : "flex items-center justify-between rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-[#C2410C]"
                  }
                >
                  <span>{category.name}</span>
                  <ChevronRight className="h-4 w-4 shrink-0" />
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default ProductSidebar;
