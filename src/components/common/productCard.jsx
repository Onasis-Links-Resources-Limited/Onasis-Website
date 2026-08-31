import { useTheme } from "../../context/ThemeContext";

const ProductCard = ({ product, onClick }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      onClick={() => onClick && onClick(product)}
      className={`group rounded-xl border p-4 transition-all duration-300 cursor-pointer hover:shadow-xl ${
        isDark
          ? 'border-gray-700 bg-gray-800 hover:border-[#E6501B] hover:bg-gray-700'
          : 'border-gray-200 bg-white hover:border-[#C3110C] hover:bg-gray-50'
      }`}
    >
      {/* Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 aspect-square">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">
            🧗
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
              NEW
            </span>
          )}
          {!product.inStock && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
              OUT OF STOCK
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div>
        {/* Category */}
        <p className={`text-xs font-medium ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {product.category}
        </p>

        {/* Name */}
        <h3 className={`mt-1 text-sm font-semibold transition-colors ${
          isDark ? 'text-white group-hover:text-[#E6501B]' : 'text-gray-900 group-hover:text-[#C3110C]'
        }`}>
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="mt-1 flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {product.rating}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {product.price}
          </span>
          
          {/* Activity Tags - Show first 2 */}
          <div className="flex gap-1 flex-wrap">
            {product.activities.slice(0, 2).map((activity) => (
              <span
                key={activity}
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  isDark
                    ? 'bg-gray-700 text-gray-300'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {activity}
              </span>
            ))}
            {product.activities.length > 2 && (
              <span className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                +{product.activities.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* View Details Button - Shows on hover */}
        <button
          className={`mt-3 w-full rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
            isDark
              ? 'bg-[#E6501B] text-white hover:bg-[#C3110C]'
              : 'bg-[#C3110C] text-white hover:bg-[#740A03]'
          } opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;