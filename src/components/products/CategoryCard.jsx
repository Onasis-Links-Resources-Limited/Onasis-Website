import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-600 hover:border-white hover:shadow-lg dark:hover:shadow-black -900/80 hover-opacity transition-all duration-300 hover:-translate-y-1 hover:border-orange ">
       
                
      {/* Centered Image with object-contain */}
      <div className="w-full h-40 mb-6 flex items-center justify-center overflow-hidden p-6 text-sm hover:-translate-y-1 hover:shadow-xl border-2 border-transparent">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-out"
        />
      </div>

      {/* Category Name */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {category.name}
      </h3>

      {/* Short Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 grow leading-relaxed">
        {category.description}
      </p>

      {/* View Products Link */}
      <Link 
        to={`/products/category/${category.slug}`}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#E6501B] hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
      >
        VIEW PRODUCTS 
        <span className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">→</span>
      </Link>
    </div>
  );
};

export default CategoryCard;