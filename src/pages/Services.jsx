import { useTheme } from '../context/ThemeContext';
import ServiceCard from '../components/services/ServiceCard';
import ServiceGrid from '../components/services/ServiceGrid';

const Services = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'text-white' : 'text-[#280905]'}`}>
      <ServiceCard />
      <ServiceGrid />
    </div>
  );
};

export default Services;