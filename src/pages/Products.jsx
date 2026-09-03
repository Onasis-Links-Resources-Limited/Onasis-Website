<<<<<<< HEAD
import ProductsHero from '../components/products/ProductsHero';
import CategoriesSection from '../components/products/CategoriesSection';

const Products = () => {
=======
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../data/productsData';  // ← Check this path
import { ArrowRight } from 'lucide-react';

const Products = () => {
  const { theme } = useTheme();

  // Debug: Log categories to console
  console.log('Categories:', CATEGORIES);

>>>>>>> d6a3120faace4b999bef1e50c140cccceb41c266
  return (
    <div className="bg-white dark:bg-black min-h-screen">

      {/* Video Hero Section */}
      <ProductsHero />

      {/* Category Section */}
      <CategoriesSection />

<<<<<<< HEAD
=======
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES && CATEGORIES.length > 0 ? (
            CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/products/category/${category.slug}`}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-gray-50 hover:bg-white'
                }`}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x225?text=' + category.name;
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    theme === 'dark'
                      ? 'from-[#0a0a0a]/90 to-transparent'
                      : 'from-black/70 to-transparent'
                  }`} />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-white text-sm bg-black/40 px-2 py-0.5 rounded-full">
                      {category.productCount} products
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/70 mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center text-white text-sm font-medium group-hover:text-[#E6501B] transition-colors">
                    Browse Category
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg">No categories found. Please check your data.</p>
            </div>
          )}
        </div>
      </div>
>>>>>>> d6a3120faace4b999bef1e50c140cccceb41c266
    </div>
  );
};

export default Products;