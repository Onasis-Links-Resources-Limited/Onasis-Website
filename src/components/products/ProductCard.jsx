export const ProductCard = ({ image, name, category, description, price, badge }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {badge && (
          <span className="absolute top-4 right-4 bg-[#E6501B] text-white px-3 py-1 rounded-full text-xs font-semibold">
            {badge}
          </span>
        )}
      </div>
      <div className="p-6">
        <span className="text-sm text-[#E6501B] font-medium">{category}</span>
        <h3 className="text-xl font-bold mt-1">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
        <p className="text-lg font-semibold mt-4">${price}</p>
        <button className="mt-4 w-full bg-[#C3110C] hover:bg-[#E6501B] text-white py-2 rounded-lg transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};