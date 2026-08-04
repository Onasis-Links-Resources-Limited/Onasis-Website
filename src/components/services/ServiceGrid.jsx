import { useServicesData } from '../../hooks/useServicesData';
import { ServiceCard } from './ServiceCard';

export const ServicesGrid = () => {
  const { services } = useServicesData();
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">Our Services</h2>
        <p className="text-gray-600 text-center mt-2">
          Cutting-edge telecommunication solutions
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map(service => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};