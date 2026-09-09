import { useEffect } from 'react';
import { useCategories } from '../../context/CategoryContext';
import CategoryCard from './CategoryCard';

const CategoriesSection = () => {
  const { categories, loading, error, fetchCategories } = useCategories();

  useEffect(() => {
    if (categories.length === 0 && !loading) {
      fetchCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loading state
  if (loading && categories.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#C3110C] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-4">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500">Failed to load categories: {error}</p>
          <button 
            onClick={() => fetchCategories(true)}
            className="mt-4 px-4 py-2 bg-[#C3110C] text-white rounded-lg hover:bg-[#E6501B] transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  // Empty state
  if (categories.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">No categories available.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="product-categories"
      className="bg-[#f7f7f5] py-16 dark:bg-[#090909]"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#E6501B] text-sm font-bold uppercase tracking-widest mb-4 block">
            Product Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white">
            Explore Our <span className="text-[#C3110C] dark:text-[#E6501B]">Product Categories</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Every category is stocked, specified and supported by engineers who know telecom infrastructure inside out.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category) => (
            <div key={category.id} className="w-full md:w-[30%] lg:w-[30%]">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
