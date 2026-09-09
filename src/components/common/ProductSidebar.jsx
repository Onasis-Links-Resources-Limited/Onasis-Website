import { useTheme } from '../../context/ThemeContext';
import { Filter, X, Tag } from 'lucide-react';

const ProductSidebar = ({
  subHeadings = [],
  selectedSubHeading,
  onSubHeadingChange,
  onClearFilters,
  isMobile = false,
  onClose,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      {isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        ${isMobile 
          ? 'fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out'
          : 'sticky top-24'
        }
        ${isMobile ? 'translate-x-0' : ''}
        p-6
        ${isDark ? 'bg-[#1A1A1A]' : 'bg-white'}
        ${isMobile ? 'shadow-2xl' : 'shadow-sm rounded-xl border'}
        ${isDark ? 'border-gray-700' : 'border-gray-200'}
        ${isMobile ? 'h-full overflow-y-auto' : ''}
      `}>
        {/* Mobile Header */}
        {isMobile && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b dark:border-gray-700 border-gray-200">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#C3110C]" />
              <h2 className="text-lg font-bold">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-[#212121]' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="space-y-6">
          {/* Sub-Heading Filter */}
          {subHeadings.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-[#C3110C]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Sub-Categories
                </h3>
              </div>
              <div className="space-y-1.5">
                {subHeadings.map((heading) => (
                  <button
                    key={heading}
                    onClick={() => onSubHeadingChange(heading)}
                    className={`w-full px-3 py-2 text-xs text-left rounded-lg transition-all duration-200 cursor-pointer ${
                      selectedSubHeading === heading
                        ? 'bg-[#C3110C] text-white shadow-md'
                        : isDark
                          ? 'text-gray-300 hover:bg-[#212121]'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {heading}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {(selectedSubHeading && selectedSubHeading !== 'All') && (
            <button
              onClick={onClearFilters}
              className={`w-full px-2 py-2.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                isDark
                  ? 'bg-[#1A1A1A] text-gray-300 hover:bg-[#212121]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Product categories
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSidebar;
