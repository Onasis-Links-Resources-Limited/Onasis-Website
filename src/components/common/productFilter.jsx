import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const ProductFilter = ({
  activities,
  attributes,
  selectedActivity,
  selectedAttribute,
  onActivityChange,
  onAttributeChange,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAllAttributes, setShowAllAttributes] = useState(false);

  const displayedActivities = showAllActivities ? activities : activities.slice(0, 6);
  const displayedAttributes = showAllAttributes ? attributes : attributes.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* ACTIVITIES FILTER */}
      <div>
        <h3 className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Activities
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onActivityChange(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              selectedActivity === null
                ? isDark
                  ? 'bg-[#E6501B] text-white'
                  : 'bg-[#C3110C] text-white'
                : isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Activities
          </button>
          {displayedActivities.map((activity) => (
            <button
              key={activity}
              onClick={() => onActivityChange(activity)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                selectedActivity === activity
                  ? isDark
                    ? 'bg-[#E6501B] text-white'
                    : 'bg-[#C3110C] text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {activity}
            </button>
          ))}
          {activities.length > 6 && (
            <button
              onClick={() => setShowAllActivities(!showAllActivities)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {showAllActivities ? 'Show Less' : `+${activities.length - 6} more`}
            </button>
          )}
        </div>
      </div>

      {/* PRODUCT ATTRIBUTES FILTER */}
      <div>
        <h3 className={`mb-3 text-sm font-semibold uppercase tracking-wider ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Product Attributes
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onAttributeChange(null)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              selectedAttribute === null
                ? isDark
                  ? 'bg-[#E6501B] text-white'
                  : 'bg-[#C3110C] text-white'
                : isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Attributes
          </button>
          {displayedAttributes.map((attribute) => (
            <button
              key={attribute}
              onClick={() => onAttributeChange(attribute)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                selectedAttribute === attribute
                  ? isDark
                    ? 'bg-[#E6501B] text-white'
                    : 'bg-[#C3110C] text-white'
                  : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {attribute}
            </button>
          ))}
          {attributes.length > 6 && (
            <button
              onClick={() => setShowAllAttributes(!showAllAttributes)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                isDark
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {showAllAttributes ? 'Show Less' : `+${attributes.length - 6} more`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;