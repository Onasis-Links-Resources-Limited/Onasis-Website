import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCategories } from "../context/CategoryContext";
import { useProducts } from "../context/ProductContext";
import {
  ArrowLeft,
  Search,
  Grid,
  List,
  Filter,
  SlidersHorizontal,
  X,
} from "lucide-react";
import ProductSidebar from "../components/common/ProductSidebar";

// ✅ Fallback image
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80";

const CategoryProducts = () => {
  const { slug } = useParams();
  const { theme } = useTheme();
  const { categories } = useCategories();
  const { products } = useProducts();

  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterSubHeading, setFilterSubHeading] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // ✅ Find category by slug
  const category = useMemo(() => {
    return categories.find((c) => c.slug === slug) || null;
  }, [categories, slug]);

  // ✅ Get products for this category
  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return products.filter((p) => p.category_id === category.id);
  }, [products, category]);

  // ✅ Extract sub-headings from product specifications or brands
  const subHeadings = useMemo(() => {
    const headings = new Set();
    categoryProducts.forEach((p) => {
      // Option 1: Use specifications keys
      if (p.specifications && Array.isArray(p.specifications)) {
        p.specifications.forEach((spec) => {
          if (spec.key) {
            // Capitalize first letter
            const key = spec.key.charAt(0).toUpperCase() + spec.key.slice(1);
            headings.add(key);
          }
        });
      }
      // Option 2: Use brand as sub-category
      if (p.brand) {
        headings.add(p.brand);
      }
    });
    return Array.from(headings);
  }, [categoryProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchLower) ||
          product.sku?.toLowerCase().includes(searchLower) ||
          product.brand?.toLowerCase().includes(searchLower)
      );
    }

    // Sub-heading filter - search in specifications or brand
    if (filterSubHeading !== "All") {
      result = result.filter((product) => {
        // Check brand
        if (product.brand === filterSubHeading) return true;
        // Check specifications
        if (Array.isArray(product.specifications)) {
          return product.specifications.some(
            (spec) => spec.key === filterSubHeading.toLowerCase()
          );
        }
        return false;
      });
    }

    // Sort
    switch (sortBy) {
      case "name":
        result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "name-desc":
        result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "sku":
        result.sort((a, b) => (a.sku || "").localeCompare(b.sku || ""));
        break;
      case "availability":
        result.sort((a, b) =>
          a.is_available === b.is_available ? 0 : a.is_available ? -1 : 1
        );
        break;
      default:
        break;
    }

    return result;
  }, [categoryProducts, searchTerm, filterSubHeading, sortBy]);

  // Group products by subHeading (for display)
  const groupedProducts = useMemo(() => {
    const groups = {};
    filteredProducts.forEach((product) => {
      let heading = "Other";
      // Try to find a matching sub-heading
      if (filterSubHeading !== "All") {
        heading = filterSubHeading;
      } else if (product.brand) {
        heading = product.brand;
      } else if (Array.isArray(product.specifications) && product.specifications.length > 0) {
        heading = product.specifications[0].key.charAt(0).toUpperCase() + 
                  product.specifications[0].key.slice(1);
      }
      if (!groups[heading]) {
        groups[heading] = [];
      }
      groups[heading].push(product);
    });
    return groups;
  }, [filteredProducts, filterSubHeading]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterSubHeading("All");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileFilterOpen) {
        setIsMobileFilterOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileFilterOpen]);

  if (!category) {
    return (
      <div
        className={`pt-20 min-h-screen flex items-center justify-center ${
          theme === "dark" ? "text-white" : "text-[#280905]"
        }`}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
          <p
            className={`mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            The category "{slug}" does not exist.
          </p>
          <Link
            to="/products"
            className="text-[#C3110C] hover:text-[#E6501B] inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Get the image URL with fallback
  const getImageUrl = (product) => {
    if (product.image_url) return product.image_url;
    if (product.image) return product.image;
    return FALLBACK_IMAGE;
  };

  // Theme classes - using black, #1A1A1A, #2A2A2A, #212121
  const darkBg = "bg-black";
  const darkCard = "bg-[#1A1A1A]";
  const darkBorder = "border-[#2A2A2A]";
  const darkHover = "hover:bg-[#212121]";
  const darkInput = "bg-[#1A1A1A] border-[#2A2A2A]";

  return (
    <div
      className={`pt-20 min-h-screen ${
        theme === "dark"
          ? `${darkBg} text-white`
          : "bg-gray-50 text-[#280905]"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <Link
          to="/products"
          className={`inline-flex items-center gap-2 mb-4 text-sm transition-colors ${
            theme === "dark"
              ? "text-gray-400 hover:text-white"
              : "text-gray-500 hover:text-[#280905]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {category.icon && <span className="text-4xl">{category.icon}</span>}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                {category.name}
              </h1>
              <p
                className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              >
                {category.description ||
                  `Explore our ${category.name} products`}
              </p>
            </div>
          </div>
          <div
            className={`flex items-center gap-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          >
            <span>{categoryProducts.length} products available</span>
            {subHeadings.length > 0 && (
              <>
                <span className="w-px h-4 bg-gray-300 dark:bg-[#2A2A2A]" />
                <span>{subHeadings.length} sub-categories</span>
              </>
            )}
          </div>
        </div>

        {/* Search & Filters Section */}
        <div
          className={`mb-8 rounded-2xl p-5 transition-all duration-300 ${
            theme === "dark"
              ? `${darkCard} border ${darkBorder}`
              : "bg-white shadow-sm border border-gray-100"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${
                    searchTerm
                      ? "text-[#C3110C]"
                      : theme === "dark"
                        ? "text-gray-500"
                        : "text-gray-400"
                  }`}
                >
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name, SKU, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                    theme === "dark"
                      ? `${darkInput} text-white placeholder-gray-400 focus:border-[#E6501B] focus:ring-[#E6501B]/20`
                      : `bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C] focus:ring-[#C3110C]/20`
                  }`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter & Sort */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className={`lg:hidden flex items-center gap-2 px-4 py-3 text-sm rounded-xl border-2 transition-all ${
                  theme === "dark"
                    ? `${darkCard} ${darkBorder} text-white ${darkHover}`
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              {/* Sub-Heading Filter - Desktop */}
              {subHeadings.length > 0 && (
                <div className="relative hidden sm:block">
                  <Filter
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-400"
                    }`}
                  />
                  <select
                    value={filterSubHeading}
                    onChange={(e) => setFilterSubHeading(e.target.value)}
                    className={`pl-9 pr-8 py-3 text-sm rounded-xl border-2 appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-4 ${
                      theme === "dark"
                        ? `${darkInput} text-white focus:border-[#E6501B] focus:ring-[#E6501B]/20`
                        : `bg-gray-50 border-gray-200 text-gray-700 focus:border-[#C3110C] focus:ring-[#C3110C]/20`
                    }`}
                  >
                    <option value="All">All Products</option>
                    {subHeadings.map((heading) => (
                      <option key={heading} value={heading}>
                        {heading}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sort By */}
              <div className="relative">
                <SlidersHorizontal
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-400"
                  }`}
                />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`pl-9 pr-8 py-3 text-sm rounded-xl border-2 appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-4 ${
                    theme === "dark"
                      ? `${darkInput} text-white focus:border-[#E6501B] focus:ring-[#E6501B]/20`
                      : `bg-gray-50 border-gray-200 text-gray-700 focus:border-[#C3110C] focus:ring-[#C3110C]/20`
                  }`}
                >
                  <option value="name">Sort: Name A-Z</option>
                  <option value="name-desc">Sort: Name Z-A</option>
                  <option value="sku">Sort: SKU</option>
                  <option value="availability">Sort: Availability</option>
                </select>
              </div>

              <div
                className={`hidden sm:block w-px h-8 ${theme === "dark" ? "bg-[#2A2A2A]" : "bg-gray-200"}`}
              />

              {/* View Toggle */}
              <div className={`flex gap-1 p-1 rounded-xl border-2 ${theme === "dark" ? `${darkInput}` : "bg-gray-50 border-gray-200"}`}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-[#C3110C] text-white shadow-md"
                      : theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-[#280905]"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-[#C3110C] text-white shadow-md"
                      : theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-[#280905]"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Row */}
          {(searchTerm || filterSubHeading !== "All") && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t dark:border-[#2A2A2A] border-gray-200">
              <span
                className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              >
                Active filters:
              </span>
              {searchTerm && (
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full ${
                    theme === "dark"
                      ? `${darkCard} text-gray-300`
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterSubHeading !== "All" && (
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full ${
                    theme === "dark"
                      ? `${darkCard} text-gray-300`
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {filterSubHeading}
                  <button
                    onClick={() => setFilterSubHeading("All")}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleClearFilters}
                className={`text-xs px-3 py-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors`}
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:w-48 lg:flex-shrink-0">
            <ProductSidebar
              subHeadings={["All", ...subHeadings]}
              selectedSubHeading={filterSubHeading}
              onSubHeadingChange={(heading) => setFilterSubHeading(heading)}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <div
                className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              >
                Showing{" "}
                <span className="font-semibold text-[#C3110C]">
                  {filteredProducts.length}
                </span>{" "}
                of {categoryProducts.length} products
                {filterSubHeading !== "All" && (
                  <span className="ml-2 text-xs opacity-70">
                    • Filtered by: {filterSubHeading}
                  </span>
                )}
              </div>
              {filteredProducts.length > 0 && (
                <div
                  className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                >
                  {Object.keys(groupedProducts).length} sub-categories shown
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div
                className={`text-center py-16 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div>
                {Object.entries(groupedProducts).map(
                  ([subHeading, products]) => (
                    <div key={subHeading} className="mb-12">
                      {/* Sub-Heading Title */}
                      <div className="relative flex items-center mb-6">
                        <div
                          className={`flex-1 border-t ${theme === "dark" ? "border-[#2A2A2A]" : "border-gray-200"}`}
                        />
                        <div className="flex flex-col items-center px-8">
                          <h2
                            className={`text-sm font-semibold uppercase tracking-wider ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            {subHeading}
                          </h2>
                          <span
                            className={`text-[10px] mt-0.5 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                          >
                            {products.length} item{products.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div
                          className={`flex-1 border-t ${theme === "dark" ? "border-[#2A2A2A]" : "border-gray-200"}`}
                        />
                      </div>

                      <div
                        className={
                          viewMode === "grid"
                            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                            : "space-y-4"
                        }
                      >
                        {products.map((product) => (
                          <Link
                            key={product.id}
                            to={`/products/category/${slug}/product/${product.id}`}
                            className={`group block transition-all duration-300 hover:-translate-y-1 ${
                              viewMode === "grid"
                                ? `rounded-xl overflow-hidden ${
                                    theme === "dark"
                                      ? `${darkCard} ${darkHover} border ${darkBorder}`
                                      : "bg-white hover:bg-white border border-gray-200"
                                  } shadow-sm hover:shadow-xl`
                                : `flex gap-5 p-4 rounded-xl ${
                                    theme === "dark"
                                      ? `${darkCard} ${darkHover} border ${darkBorder}`
                                      : "bg-white hover:bg-white border border-gray-200"
                                  } shadow-sm hover:shadow-xl`
                            }`}
                          >
                            <div
                              className={
                                viewMode === "grid"
                                  ? "aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-[#1A1A1A]"
                                  : "w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-[#1A1A1A]"
                              }
                            >
                              <img
                                src={getImageUrl(product)}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src = FALLBACK_IMAGE;
                                }}
                              />
                            </div>
                            <div
                              className={
                                viewMode === "grid" ? "p-4" : "flex-1 p-2"
                              }
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <h3
                                    className={`font-semibold ${viewMode === "grid" ? "text-base" : "text-lg"} line-clamp-1`}
                                  >
                                    {product.name}
                                  </h3>
                                  <p
                                    className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                                  >
                                    {product.brand || "No brand"} •{" "}
                                    {product.sku || "N/A"}
                                  </p>
                                </div>
                                <span
                                  className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                                    product.stock_quantity > 1
                                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                  }`}
                                >
                                  {product.stock_quantity > 1
                                    ? "In Stock"
                                    : "Out of Stock"}
                                </span>
                              </div>
                              <p
                                className={`text-sm mt-2 line-clamp-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                              >
                                {product.description ||
                                  "No description available"}
                              </p>
                              <div className="flex items-center gap-4 mt-2.5 text-xs">
                                <span
                                  className={
                                    theme === "dark"
                                      ? "text-gray-400"
                                      : "text-gray-500"
                                  }
                                >
                                  Min. Order: {product.min_order || 1}{" "}
                                  {product.unit || "unit"}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded ${
                                    theme === "dark"
                                      ? "bg-[#212121] text-gray-300"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {product.sku || "N/A"}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="lg:hidden">
          <ProductSidebar
            subHeadings={["All", ...subHeadings]}
            selectedSubHeading={filterSubHeading}
            onSubHeadingChange={(heading) => setFilterSubHeading(heading)}
            onClearFilters={handleClearFilters}
            isMobile={true}
            onClose={() => setIsMobileFilterOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;