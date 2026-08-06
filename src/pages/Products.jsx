import { useTheme } from '../context/ThemeContext';
import { PRODUCTS } from '../data/productsData';

const Products = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`pt-20 min-h-screen ${
      theme === 'dark' ? 'text-white' : 'text-[#280905]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        {/* Products components will go here */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className={`border rounded-lg p-6 transition-colors duration-300 ${
              theme === 'dark' ? 'border-gray-700 bg-[#141414] hover:bg-[#1a1a1a]' : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />  
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-sm mb-2">{product.description}</p>
              <p className="text-lg font-bold mb-2">{product.currency} {product.price.toFixed(2)}</p>
              <p className={`text-sm ${product.isAvailable ? 'text-green-500' : 'text-red-500'}`}>  
                {product.isAvailable ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;