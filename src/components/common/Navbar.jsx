import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import {
  LogOut,
  FileText,
  ChevronDown,
  ShoppingCartIcon,
} from "lucide-react";
import { useQuote } from "../../context/QuoteContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { theme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const { itemCount } = useQuote();
  // Check if current route is an auth page
  const isAuthPage = [
    "/login",
    "/signup",
    "/verify-email",
    "/forgot-password",
  ].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isProfileDropdownOpen && !e.target.closest(".profile-dropdown")) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isProfileDropdownOpen]);

  // Don't render navbar on auth pages
  if (isAuthPage) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Handle Logout
  const handleLogout = async () => {
    await logout();
    setIsProfileDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === "dark"
            ? "bg-[#0a0a0a]/90 backdrop-blur-md shadow-lg border-b border-gray-800"
            : "bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            {theme === "dark" ? (
              <img
                src="/images/logo-dark.png"
                alt="Onasis Links Resources Limited"
                className="h-12 w-auto"
              />
            ) : (
              <img
                src="/images/logo-light.png"
                alt="Onasis Links Resources Limited"
                className="h-12 w-auto"
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 relative group ${
                  theme === "dark"
                    ? `${
                        isActive(link.href)
                          ? "text-[#E6501B]"
                          : "text-gray-200 hover:text-[#E6501B]"
                      }`
                    : `${
                        isActive(link.href)
                          ? "text-[#C3110C]"
                          : "text-gray-950 hover:text-[#C3110C]"
                      }`
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                    isActive(link.href)
                      ? `w-full ${theme === "dark" ? "bg-[#E6501B]" : "bg-[#C3110C]"}`
                      : "w-0 group-hover:w-full bg-[#E6501B]"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Get Started / Profile */}
            {isAuthenticated ? (
              // Authenticated - Show Profile Dropdown
              <div className="relative profile-dropdown">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#1A1A1A] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E6501B]"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#C3110C] to-[#E6501B] flex items-center justify-center text-white font-semibold text-sm">
                    {user?.first_name?.charAt(0) ||
                      user?.email?.charAt(0) ||
                      "U"}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1A1A1A] rounded-lg shadow-xl border border-gray-200 dark:border-[#2A2A2A] overflow-hidden z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-[#2A2A2A]">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-[#C3110C]/10 text-[#C3110C] dark:bg-[#E6501B]/10 dark:text-[#E6501B] text-xs font-medium rounded-full capitalize">
                        {user?.role || "customer"}
                      </span>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        to="/quote-list"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#212121] transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        My Quotes
                      </Link>
                      {/* <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link> */}
                      <hr className="my-1 border-gray-200 dark:border-[#2A2A2A]" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not Authenticated - Show Get Started (links to signup)
              <Link
                to="/signup"
                className="hidden md:inline-block px-6 py-2.5 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
              >
                Get Started
              </Link>
            )}

            <ThemeToggle />

            <Link
              to="/quote-list"
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#212121] transition-colors"
              aria-label="Quote List"
            >
              <ShoppingCartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C3110C] text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors md:hidden flex cursor-pointer ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    theme === "dark" ? "bg-white" : "bg-[#280905]"
                  } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    theme === "dark" ? "bg-white" : "bg-[#280905]"
                  } ${isMobileMenuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    theme === "dark" ? "bg-white" : "bg-[#280905]"
                  } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden backdrop-blur-md ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`py-4 space-y-2 border-t px-5 ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  theme === "dark"
                    ? `${
                        isActive(link.href)
                          ? "text-[#E6501B] bg-gray-800"
                          : "text-gray-200 hover:text-[#E6501B] hover:bg-gray-800"
                      }`
                    : `${
                        isActive(link.href)
                          ? "text-[#C3110C] bg-gray-100"
                          : "text-gray-700 hover:text-[#C3110C] hover:bg-gray-50"
                      }`
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Actions */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/quote-list"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#C3110C] dark:hover:text-[#E6501B] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  My Quotes
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm font-medium cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#C3110C] dark:hover:text-[#E6501B] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-[#C3110C] dark:text-[#E6501B] hover:bg-[#C3110C]/10 dark:hover:bg-[#E6501B]/10 rounded-lg transition-colors"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
