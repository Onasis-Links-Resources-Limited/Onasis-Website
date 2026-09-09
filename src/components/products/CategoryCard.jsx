import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/products/category/${category.slug}`}
      className="group flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#E6501B] hover:shadow-lg dark:border-[#34404d] dark:bg-[#1a1a1a] dark:hover:border-[#6b7785] dark:hover:shadow-black/80"
      aria-label={`View ${category.name} products`}
    >
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
      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#E6501B] transition-colors group-hover:text-orange-700 dark:group-hover:text-orange-400">
        VIEW PRODUCTS
        <span
          className="group-hover:translate-x-1 transition-transform duration-300"
          aria-hidden="true"
        >
          →
        </span>
      </span>
    </Link>
  );
};

export default CategoryCard;
