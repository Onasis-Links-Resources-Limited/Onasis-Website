import { useState } from "react";
import { Link } from "react-router-dom";

// ✅ Category-specific fallback images
const CATEGORY_FALLBACKS = {
  "RF MATERIALS":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
  POWER:
    "https://images.unsplash.com/photo-1533664488202-6af66d26c44a?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "FIBER OPTIC MATERIALS": "/images/fiber-optic.png",
  MISCELLANEOUS:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
  "NETWORK MATERIALS": "/images/network-materials.png",
};

// ✅ Default fallback
const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80";

const CategoryCard = ({ category }) => {
  const [imgError, setImgError] = useState(false);

  // ✅ Use category-specific fallback or default
  const getFallbackImage = () => {
    return CATEGORY_FALLBACKS[category.name] || DEFAULT_FALLBACK;
  };

  const imageSrc =
    !category.image || imgError ? getFallbackImage() : category.image;

  return (
    <Link
      to={`/products/category/${category.slug || category.id}`}
      className="group flex h-full flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#E6501B] hover:shadow-lg dark:border-[#34404d] dark:bg-[#1a1a1a] dark:hover:border-[#6b7785] dark:hover:shadow-black/80"
      aria-label={`View ${category.name} products`}
    >
      {/* Centered Image with object-contain */}
      <div className="w-full h-40 mb-6 flex items-center justify-center overflow-hidden p-6 text-sm hover:-translate-y-1 hover:shadow-xl border-2 border-transparent">
        <img
          src={imageSrc}
          alt={category.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300 ease-out"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>

      {/* Category Name */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {category.name}
      </h3>

      {/* Short Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 grow leading-relaxed">
        {category.description || "Explore our products in this category"}
      </p>

      {/* View Products Cue */}
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
