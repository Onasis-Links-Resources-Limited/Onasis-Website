import { useTheme } from '../context/ThemeContext';

const Products = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`pt-20 min-h-screen ${
      theme === 'dark' ? 'text-white' : 'text-[#280905]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        <p className="text-lg">This is the Products page. Under construction.</p>
        {/* Products components will go here */}
      </div>
    </div>
  );
};

export default Products;