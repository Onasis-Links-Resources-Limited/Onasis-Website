import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NotFound = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`pt-20 min-h-screen flex items-center justify-center ${
      theme === 'dark' ? 'text-white' : 'text-[#280905]'
    }`}>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#C3110C]">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-500">The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-block mt-6 px-6 py-3 bg-[#C3110C] hover:bg-[#E6501B] text-white rounded-lg transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;