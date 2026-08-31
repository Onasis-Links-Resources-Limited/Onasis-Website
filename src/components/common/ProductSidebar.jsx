import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Filter, X, Tag, Activity } from 'lucide-react';

const ProductSidebar = ({
  categories = [],
  subHeadings = [],
  selectedCategory,
  selectedSubHeading,
  onCategoryChange,
  onSubHeadingChange,
  onClearFilters,
  isMobile = false,
  onClose,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Sample activities and tags (matching Camp.it style)
  const activities = [
    "ROPE ACCESS",
    "TREE CLIMBING",
    "CONFINED SPACES",
    "TOWERS & INDUSTRIAL STRUCTURES",
    "ROOFS",
    "CONSTRUCTION",
    "ELEVATING PLATFORMS",
    "SELF RESCUE",
    "TEAM RESCUE",
    "TACTICAL",
    "GENERAL USE"
  ];

  const tags = [
    "BLACK LINE",
    "CE + ANSI",
    "FIREPROOF",
    "NFC + HF RFID"
  ];

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleActivity = (activity) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
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
        ${isDark ? 'bg-gray-900' : 'bg-white'}
        ${isMobile ? 'shadow-2xl' : 'shadow-sm rounded-xl border'}
        ${isDark ? 'border-gray-700' : 'border-gray-200'}
        ${isMobile ? 'h-full overflow-y-auto' : 'overflow-hidden'}  {/* ← No scroll */}
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
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content - No Scroll */}
        <div className="space-y-6">
          {/* Clear Filters */}
          {(selectedActivities.length > 0 || selectedTags.length > 0) && (
            <button
              onClick={() => {
                setSelectedActivities([]);
                setSelectedTags([]);
                onClearFilters();
              }}
              className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isDark
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Clear All Filters
            </button>
          )}

          {/* ============================================================ */}
          {/* ACTIVITIES SECTION */}
          {/* ============================================================ */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-[#C3110C]" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Activities
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activities.map((activity) => (
                <button
                  key={activity}
                  onClick={() => toggleActivity(activity)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    selectedActivities.includes(activity)
                      ? 'bg-[#C3110C] text-white shadow-md'
                      : isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* TAGS SECTION */}
          {/* ============================================================ */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-[#C3110C]" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Tags
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-[#C3110C] text-white shadow-md'
                      : isDark
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* ACTIVE FILTERS SUMMARY */}
          {/* ============================================================ */}
          {(selectedActivities.length > 0 || selectedTags.length > 0) && (
            <div className="pt-4 border-t dark:border-gray-700 border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Active Filters:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedActivities.map((activity) => (
                  <span key={activity} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-[#C3110C]/10 text-[#C3110C]">
                    {activity}
                    <button onClick={() => toggleActivity(activity)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedTags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {tag}
                    <button onClick={() => toggleTag(tag)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSidebar;