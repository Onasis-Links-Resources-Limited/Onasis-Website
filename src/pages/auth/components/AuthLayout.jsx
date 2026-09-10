import { Link } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';

const AuthLayout = ({ children, title, subtitle }) => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img
              src={theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png'}
              alt="Onasis Links"
              className="h-12 w-auto mx-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-[#2A2A2A]">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-6">
          © {new Date().getFullYear()} Onasis Links Resources Limited
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;