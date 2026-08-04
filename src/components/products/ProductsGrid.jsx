import { useState } from 'react';
import { useProductsData } from '../../hooks/useProductsData';
import { ProductCard } from './ProductCard';
import { ProductFilter } from './ProductFilter';

export const ProductsGrid = () => {
  const [filter, setFilter] = useState('all');
  const { products } = useProductsData();
  
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">Our Products</h2>
        
        {/* Filter Bar */}
        <ProductFilter 
          categories={['all', 'hardware', 'software', 'solutions']}
          activeFilter={filter}
          onFilterChange={setFilter}
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};