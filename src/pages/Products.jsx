import ProductsHero from '../components/products/ProductsHero';
import CategoriesSection from '../components/products/CategoriesSection';
import { CATEGORIES } from '../data/productsData';  // ← Check this path

const Products = () => {

  // Debug: Log categories to console
  console.log('Categories:', CATEGORIES);

  return (
    <div className="bg-white dark:bg-black min-h-screen">

      {/* Video Hero Section - type shiii*/}
      <ProductsHero />

      {/* Category Section gfgfgf*/}
      <CategoriesSection />

      </div>
  );
};

export default Products;