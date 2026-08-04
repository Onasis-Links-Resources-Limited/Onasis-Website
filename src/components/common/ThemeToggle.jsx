import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none shrink-0 cursor-pointer ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-[#280905]'
      }`}
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-transform duration-300 flex items-center justify-center shadow-md ${
          theme === 'dark' 
            ? 'translate-x-5 bg-[#E6501B]' 
            : 'translate-x-0 bg-white'
        }`}
      >
        {theme === 'light' ? (
          <svg className="w-3 h-3 text-[#E6501B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;