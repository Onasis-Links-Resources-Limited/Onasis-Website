import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS, CATEGORIES, getProductSubHeadings } from '../data/productsData';
import { ArrowLeft, Search, Grid, List, Filter, SlidersHorizontal, X } from 'lucide-react';
import ProductSidebar from '../components/common/ProductSidebar';

const CategoryProducts = () => {
  const { slug } = useParams();
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterSubHeading, setFilterSubHeading] = useState('All');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const category = CATEGORIES.find(c => c.slug === slug);
  const categoryProducts = PRODUCTS.filter(p => p.category === category?.name);
  const subHeadings = getProductSubHeadings(slug);

  // Filter products
  const filteredProducts = categoryProducts
    .filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSubHeading = filterSubHeading === 'All' || product.subHeading === filterSubHeading;
      
      return matchesSearch && matchesSubHeading;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'sku':
          return a.sku.localeCompare(b.sku);
        case 'availability':
          return a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1;
        default:
          return 0;
      }
    });

  // Group products by subHeading
  const groupedProducts = {};
  filteredProducts.forEach(product => {
    const heading = product.subHeading || 'Other';
    if (!groupedProducts[heading]) {
      groupedProducts[heading] = [];
    }
    groupedProducts[heading].push(product);
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterSubHeading('All');
    setSelectedCategory('All');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileFilterOpen) {
        setIsMobileFilterOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileFilterOpen]);

  if (!category) {
    return (
      <div className={`pt-20 min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'text-white' : 'text-[#280905]'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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

  return (
    <div className={`pt-20 min-h-screen ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-[#280905]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back button */}
        <Link
          to="/products"
          className={`inline-flex items-center gap-2 mb-4 text-sm transition-colors ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-[#280905]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">{category.name}</h1>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {category.description}
              </p>
            </div>
          </div>
          <div className={`flex items-center gap-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>{categoryProducts.length} products available</span>
            <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <span>{subHeadings.length} categories</span>
          </div>
        </div>

        {/* Search & Filters Section */}
        <div className={`mb-8 rounded-2xl p-5 transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-800/80 border border-gray-700' 
            : 'bg-white shadow-sm border border-gray-100'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative group">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${
                  searchTerm ? 'text-[#C3110C]' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name, SKU, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 ${
                    theme === 'dark'
                      ? `bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#E6501B] focus:ring-[#E6501B]/20`
                      : `bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C] focus:ring-[#C3110C]/20`
                  }`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter & Sort */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className={`lg:hidden flex items-center gap-2 px-4 py-3 text-sm rounded-xl border-2 transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              {/* Sub-Heading Filter - Desktop */}
              <div className="relative hidden sm:block">
                <Filter className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <select
                  value={filterSubHeading}
                  onChange={(e) => setFilterSubHeading(e.target.value)}
                  className={`pl-9 pr-8 py-3 text-sm rounded-xl border-2 appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-4 ${
                    theme === 'dark'
                      ? `bg-gray-700/50 border-gray-600 text-white focus:border-[#E6501B] focus:ring-[#E6501B]/20`
                      : `bg-gray-50 border-gray-200 text-gray-700 focus:border-[#C3110C] focus:ring-[#C3110C]/20`
                  }`}
                >
                  {['All', ...subHeadings].map((heading) => (
                    <option key={heading} value={heading}>
                      {heading}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="relative">
                <SlidersHorizontal className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`pl-9 pr-8 py-3 text-sm rounded-xl border-2 appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-4 ${
                    theme === 'dark'
                      ? `bg-gray-700/50 border-gray-600 text-white focus:border-[#E6501B] focus:ring-[#E6501B]/20`
                      : `bg-gray-50 border-gray-200 text-gray-700 focus:border-[#C3110C] focus:ring-[#C3110C]/20`
                  }`}
                >
                  <option value="name">Sort: Name A-Z</option>
                  <option value="name-desc">Sort: Name Z-A</option>
                  <option value="sku">Sort: SKU</option>
                  <option value="availability">Sort: Availability</option>
                </select>
              </div>

              {/* Divider */}
              <div className={`hidden sm:block w-px h-8 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />

              {/* View Toggle */}
              <div className="flex gap-1 p-1 rounded-xl border-2 bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-[#C3110C] text-white shadow-md'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-500 hover:text-[#280905]'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-[#C3110C] text-white shadow-md'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-500 hover:text-[#280905]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Row */}
          {(searchTerm || filterSubHeading !== 'All') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t dark:border-gray-700 border-gray-200">
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Active filters:
              </span>
              {searchTerm && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterSubHeading !== 'All' && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>
                  {filterSubHeading}
                  <button onClick={() => setFilterSubHeading('All')} className="hover:text-red-500">
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

        {/* ============================================================ */}
        {/* MAIN CONTENT WITH SIDEBAR */}
        {/* ============================================================ */}
        <div className="flex gap-8">
          {/* Sidebar - Desktop - Only Activities & Tags */}
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <ProductSidebar
              categories={CATEGORIES}
              subHeadings={['All', ...subHeadings]}
              selectedCategory={selectedCategory}
              selectedSubHeading={filterSubHeading}
              onCategoryChange={(cat) => setSelectedCategory(cat)}
              onSubHeadingChange={(heading) => setFilterSubHeading(heading)}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Products Area */}
          <div className="flex-1 min-w-0">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Showing <span className="font-semibold text-[#C3110C]">{filteredProducts.length}</span> of{' '}
                {categoryProducts.length} products
                {filterSubHeading !== 'All' && (
                  <span className="ml-2 text-xs opacity-70">• Filtered by: {filterSubHeading}</span>
                )}
              </div>
              {filteredProducts.length > 0 && (
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {Object.keys(groupedProducts).length} categories shown
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className={`text-center py-16 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div>
                {Object.entries(groupedProducts).map(([subHeading, products]) => (
                  <div key={subHeading} className="mb-12">
                    {/* Sub-Heading Title */}
                    <div className="relative flex items-center mb-6">
                      <div className={`flex-1 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                      <div className="flex flex-col items-center px-8">
                        <h2 className={`text-sm font-semibold uppercase tracking-wider ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {subHeading}
                        </h2>
                        <span className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {products.length} items
                        </span>
                      </div>
                      <div className={`flex-1 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`} />
                    </div>

                    <div className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                        : 'space-y-4'
                    }>
                      {products.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/product/${product.id}`}
                          className={`group block transition-all duration-300 hover:-translate-y-1 ${
                            viewMode === 'grid'
                              ? `rounded-xl overflow-hidden ${
                                  theme === 'dark' 
                                    ? 'bg-gray-800 hover:bg-gray-700/80 border border-gray-700' 
                                    : 'bg-white hover:bg-white border border-gray-200'
                                } shadow-sm hover:shadow-xl`
                              : `flex gap-5 p-4 rounded-xl ${
                                  theme === 'dark' 
                                    ? 'bg-gray-800 hover:bg-gray-700/80 border border-gray-700' 
                                    : 'bg-white hover:bg-white border border-gray-200'
                                } shadow-sm hover:shadow-xl`
                          }`}
                        >
                          <div className={
                            viewMode === 'grid' 
                              ? 'aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700' 
                              : 'w-28 h-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700'
                          }>
                            <img
                              src={product.image || `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
                              }}
                            />
                          </div>
                          <div className={viewMode === 'grid' ? 'p-4' : 'flex-1 p-2'}>
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h3 className={`font-semibold ${viewMode === 'grid' ? 'text-base' : 'text-lg'} line-clamp-1`}>
                                  {product.name}
                                </h3>
                                <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {product.brand} • {product.sku}
                                </p>
                                {product.subHeading && (
                                  <span className={`inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full ${
                                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {product.subHeading}
                                  </span>
                                )}
                              </div>
                              <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                                product.isAvailable
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}>
                                {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>
                            <p className={`text-sm mt-2 line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                              {product.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2.5 text-xs">
                              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                                Min. Order: {product.minOrder} {product.unit}
                              </span>
                              <span className={`px-2 py-0.5 rounded ${
                                theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {product.sku}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="lg:hidden">
          <ProductSidebar
            categories={CATEGORIES}
            subHeadings={['All', ...subHeadings]}
            selectedCategory={selectedCategory}
            selectedSubHeading={filterSubHeading}
            onCategoryChange={(cat) => setSelectedCategory(cat)}
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