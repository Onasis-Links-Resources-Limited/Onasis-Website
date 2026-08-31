import ProductsHero from '../components/products/ProductsHero';
import CategoriesSection from '../components/products/CategoriesSection';

const Products = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen">

      {/* Video Hero Section */}
      <ProductsHero />

      {/* Category Section */}
      <CategoriesSection />

    </div>
  );
};

export default Products;