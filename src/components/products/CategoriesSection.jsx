import React from 'react';
import CategoryCard from './CategoryCard';

const CATEGORIES = [
  {
    id: 1,
    slug: 'rf-materials',
    name: 'RF Materials',
    description: 'High-quality RF components and materials for reliable connectivity.',
    // Using object-contain, we use transparent or clean cutouts
    image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 2,
    slug: 'power',
    name: 'Power',
    description: 'Power solutions and components for efficient and stable systems.',
    image: 'https://images.pexels.com/photos/28912010/pexels-photo-28912010.jpeg?cs=srgb&dl=pexels-michael-pointner-134459625-28912010.jpg&fm=jpg&_gl=1*q5ur3z*_ga*MTA2MDEyMTIwNS4xNzg1ODQ3ODEw*_ga_8JE65Q40S6*czE3ODc5MDQxNTgkbzckZzEkdDE3ODc5MDU4ODQkajU5JGwwJGgw'
  },
  {
    id: 3,
    slug: 'fiber-optical-materials',
    name: 'Fiber Optical Materials',
    description: 'Advanced fiber optic products for high-speed data transmission.',
    image: 'https://images.pexels.com/photos/36397790/pexels-photo-36397790.jpeg?cs=srgb&dl=pexels-willians-huerta-2157111846-36397790.jpg&fm=jpg&_gl=1*q5ur3z*_ga*MTA2MDEyMTIwNS4xNzg1ODQ3ODEw*_ga_8JE65Q40S6*czE3ODc5MDQxNTgkbzckZzEkdDE3ODc5MDU4ODQkajU5JGwwJGgw'
  },
  {
    id: 4,
    slug: 'miscellaneous',
    name: 'Miscellaneous',
    description: 'A wide range of essential accessories and components.',
    image: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 5,
    slug: 'network-materials',
    name: 'Network Materials',
    description: 'Networking components for seamless connectivity.',
    image: 'https://images.pexels.com/photos/9039845/pexels-photo-9039845.jpeg?cs=srgb&dl=pexels-dylan-leagh-86004871-9039845.jpg&fm=jpg&_gl=1*1tpi4iy*_ga*MTA2MDEyMTIwNS4xNzg1ODQ3ODEw*_ga_8JE65Q40S6*czE3ODc5MDQxNTgkbzckZzEkdDE3ODc5MDU0NTEkajU1JGwwJGgw'
  }
];

const CategoriesSection = () => {
  return (
    <section id="product-categories" className="py-24 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="text-[#E6501B] text-sm font-bold uppercase tracking-widest  mb-4 block">
            Product Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white">
            Explore Our <span className=" text-[#C3110C] dark:text-[#E6501B]">Product Categories</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
    Every category is stocked, specified and supported by engineers who know telecom infrastructure inside out.
          </p>
        </div>

        {/* Change from 'grid' to 'flex' */}
        <div className="flex flex-wrap justify-center gap-6">
          {CATEGORIES.map((category) => (
            <div className="w-full md:w-[30%] lg:w-[30%]"> {/* 30% width allows 3 per row, then 2 centered below */}
              <CategoryCard key={category.id} category={category} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoriesSection;