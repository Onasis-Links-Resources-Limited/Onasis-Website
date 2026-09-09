import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const FloatingThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: "90px", // Below navbar (adjust if needed)
        right: "24px",
        zIndex: 9999,
      }}
    >
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
          isHovered ? "scale-110" : "scale-100"
        } ${
          isDark
            ? "bg-gray-800 text-[#F59E0B] hover:bg-gray-700"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Toggle theme"
        style={{
          boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
        }}
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "6px 12px",
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            color: isDark ? "#e5e7eb" : "#374151",
            fontSize: "12px",
            borderRadius: "6px",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
            pointerEvents: "none",
          }}
        >
          {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </div>
      )}
    </div>
  );
};

export default FloatingThemeToggle;
