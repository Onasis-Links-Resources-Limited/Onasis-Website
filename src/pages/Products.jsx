import ProductsHero from "../components/products/ProductsHero";
import CategoriesSection from "../components/products/CategoriesSection";
import { CATEGORIES } from "../data/productsData"; // ← Check this path

const Products = () => {
  // Debug: Log categories to console
  console.log("Categories:", CATEGORIES);

  return (
    <div className="min-h-screen bg-[#f7f7f5] dark:bg-[#090909]">
      {/* Video Hero Section*/}
      <ProductsHero />

      {/* Category Section gfgfgf*/}
      <CategoriesSection />
    </div>
  );
};

export default Products;
