import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS, CATEGORIES } from '../data/productsData';
import { ArrowLeft, Search, Grid, List } from 'lucide-react';

const CategoryProducts = () => {
  const { slug } = useParams();
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const category = CATEGORIES.find(c => c.slug === slug);
  const categoryProducts = PRODUCTS.filter(p => p.category === category?.name);

  const filteredProducts = categoryProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!category) {
    return (
      <div className={`pt-20 min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'text-white' : 'text-[#280905]'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Category Not Found</h2>
          <Link to="/products" className="text-[#C3110C] hover:text-[#E6501B]">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-20 min-h-screen ${
      theme === 'dark' ? 'text-white' : 'text-[#280905]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          to="/products"
          className={`inline-flex items-center gap-2 mb-6 transition-colors ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#280905]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>

        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{category.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-bold">{category.name}</h1>
          </div>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {category.description}
          </p>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {categoryProducts.length} products available
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C3110C] ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#C3110C] text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-400 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:text-[#280905]'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#C3110C] text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-400 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:text-[#280905]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className={`text-center py-12 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <p className="text-lg">No products found matching your search.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/product/${product.id}`}
                className={`block transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === 'grid'
                    ? `rounded-xl overflow-hidden ${
                        theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200'
                      }`
                    : `flex gap-4 p-4 rounded-xl ${
                        theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200'
                      }`
                }`}
              >
                <div className={viewMode === 'grid' ? 'aspect-[4/3] overflow-hidden' : 'w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg'}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className={viewMode === 'grid' ? 'p-4' : 'flex-1 p-2'}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {product.brand} • {product.sku}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
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
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                      Min. Order: {product.minOrder} {product.unit}
                    </span>
                    <span className="text-[#E6501B] font-medium">
                      Price: Available on Request
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;