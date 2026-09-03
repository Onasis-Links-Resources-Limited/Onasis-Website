import { Link } from 'react-router-dom';

const ProductsHero = () => {
  return (
    <section className="relative w-full h-100 flex items-center overflow-hidden  dark:bg-black">
     
      {/* Background Image (REPLACED VIDEO WITH IMAGE) */}
      <img 
        src="/images/products-hero.jpg" 
        alt="Technology and infrastructure background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40"
      />

      {/* Dark Overlay for Readability */}
     

             

    {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-5xl mb-8 items-end pr-130">
        <div className="">
          <h1 className="text-5xl leading-tight md:text-7xl font-bold dark:text-white">
            Our Products 
          </h1>
          <div className="mt-4 h-1 w-24 rounded-full bg-[#E6501B] mb-2"></div>
       

          {/* SHORT DESCRIPTION */}
          <p className="mt-4 max-w-xl text-base text-gray-200  mb-6"> 
            High-performance RF, Power, Fiber Optical, and Network materials designed to
             power the infrastructure of today and tomorrow.
          </p>

          {/* HERO BUTTONS */}
          <div className="flex flex-wrap gap-4">
            <a 
              href="#product-categories" 
              className="bg-[#C3110C] hover:bg-gradient-to-r from-[#E6501B] via-[#C3110C] to-transparent text-white px-4 py-4  font-bold  flex items-center gap-2 text-sm tracking-widest rounded-full transition-all duration-500"
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