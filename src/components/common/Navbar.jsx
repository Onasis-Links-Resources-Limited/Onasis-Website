import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  // Check if link is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
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
          {/* Logo Section - Links to Home */}
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

          {/* Desktop Navigation Links */}
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

          {/* Right Section - CTA & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              to="/contact"
              className="hidden md:inline-block px-6 py-2.5 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
            >
              Get Started
            </Link>

            <ThemeToggle />

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
                    theme === "dark" ? "bg-white" : "bg-white"
                  } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                ></span>
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    theme === "dark" ? "bg-white" : "bg-white"
                  } ${isMobileMenuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    theme === "dark" ? "bg-white" : "bg-white"
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
                          ? "text-[#C3110C] bg-gray-300"
                          : "text-gray-700 hover:text-[#C3110C] hover:bg-gray-50"
                      }`
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 mt-4 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-lg transition-colors text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;