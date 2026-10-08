import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const ProductsHero = () => {
  const { theme } = useTheme();

  return (
    <section className="relative h-100 overflow-hidden">
      {/* Background Image (REPLACED VIDEO WITH IMAGE) */}
      <img
        src="/images/products-hero.jpg"
        alt="Technology and infrastructure background"
        className={`absolute inset-0 h-full w-full object-cover object-middle ${theme === "dark" ? "brightness-30" : "brightness-70"}`}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-5xl pb-8 items-end px-4">
        <div className="">
          <h1 className="text-4xl sm:text-5xl leading-tight md:text-7xl font-bold dark:text-white">
            Our Products
          </h1>
          <div className="mt-2 h-1 w-24 rounded-full bg-[#E6501B] mb-2"></div>

          {/* SHORT DESCRIPTION */}
          <p className="mt-4 max-w-xl text-base text-gray-200  mb-6">
            High-performance RF, Power, Fiber Optical, and Network materials
            designed to power the infrastructure of today and tomorrow.
          </p>

          {/* HERO BUTTONS */}
          <div className="lg:flex hidden flex-wrap gap-4">
            <a
              href="#product-categories"
              className="flex items-center gap-2 rounded-full bg-[#E6501B] px-4 py-4 text-sm font-bold tracking-widest text-white transition-all duration-500 hover:bg-[#C2410C]"
            >
              Explore Products <span aria-hidden="true">→</span>
            </a>

            <Link
              to="/contact"
              className="border border-gray-400 hover:bg-white/10 text-white px-4 py-4 font-medium  flex items-center gap-2 text-sm tracking-widest rounded-full transition-all duration-500"
            >
              Contact Us <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;
