import ProductsHero from "../components/products/ProductsHero";
import CategoriesSection from "../components/products/CategoriesSection";
import { Helmet } from "react-helmet-async";

const Products = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f5] dark:bg-[#090909]">
      <Helmet>
        <title>Product Catalog | Onasis Links Resources Limited</title>
        <meta
          name="description"
          content="Browse our catalog of ICT equipment, engineering supplies, and procurement products. Request a quote in minutes."
        />
        <link rel="canonical" href="https://onasisltd.com/products" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Product Catalog | Onasis Links Resources Limited"
        />
        <meta
          property="og:description"
          content="Browse ICT, engineering, and procurement products."
        />
        <meta property="og:url" content="https://onasisltd.com/products" />
        <meta
          property="og:image"
          content="https://onasisltd.com/images/og/products.jpg"
        />
      </Helmet>
      {/* Video Hero Section*/}
      <ProductsHero />

      {/* Category Section*/}
      <CategoriesSection />
    </div>
  );
};

export default Products;
