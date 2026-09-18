import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import { LogOut, FileText, ChevronDown, ShoppingCartIcon } from "lucide-react";
import { useQuote } from "../../context/QuoteContext";
import { CATEGORIES, getProductSubHeadings } from "../../data/productsData";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const productsMenuCloseTimer = useRef(null);
  const { theme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const { itemCount } = useQuote();

  const isAuthPage = [
    "/login",
    "/signup",
    "/verify-email",
    "/forgot-password",
  ].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

  // Close menus on route change
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsProfileDropdownOpen(false);
      setIsProductsMenuOpen(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname]);

  // Close mobile menu + products dropdown on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
        setIsProductsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  if (isAuthPage) return null;

  const navLinks = [
    {
      name: "Home",
      href: "/",
      title: "Go to homepage",
      ariaLabel: "Home",
    },
    {
      name: "About",
      href: "/about",
      title: "Learn about Onasis Links",
      ariaLabel: "About Us",
    },
    {
      name: "Services",
      href: "/services",
      title: "Our services",
      ariaLabel: "Services",
    },
    {
      name: "Products",
      href: "/products",
      title: "Browse our products",
      ariaLabel: "Products",
    },
    {
      name: "Contact",
      href: "/contact",
      title: "Contact us",
      ariaLabel: "Contact",
    },
  ];

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const handleLogout = async () => {
    await logout();
    setIsProfileDropdownOpen(false);
    window.location.href = "/";
  };

  const cancelProductsMenuClose = () => {
    if (productsMenuCloseTimer.current) {
      window.clearTimeout(productsMenuCloseTimer.current);
      productsMenuCloseTimer.current = null;
    }
  };

  const scheduleProductsMenuClose = () => {
    cancelProductsMenuClose();
    productsMenuCloseTimer.current = window.setTimeout(() => {
      setIsProductsMenuOpen(false);
      productsMenuCloseTimer.current = null;
    }, 180);
  };

  const closeProductsMenu = () => {
    cancelProductsMenuClose();
    setIsProductsMenuOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
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
          <Link to="/" title="Onasis Links Resources Limited — Home" aria-label="Onasis Links Resources Limited — Home" className="shrink-0">
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
            {navLinks.map((link) => {
              const isProductsLink = link.name === "Products";

              if (!isProductsLink) {
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    title={link.title}
                    aria-label={link.ariaLabel}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 group ${
                      theme === "dark"
                        ? isActive(link.href)
                          ? "text-[#E6501B]"
                          : "text-gray-200 hover:text-[#E6501B]"
                        : isActive(link.href)
                          ? "text-[#C3110C]"
                          : "text-gray-950 hover:text-[#C3110C]"
                    }`}
                  >
                    {link.name}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                        isActive(link.href)
                          ? `w-full ${theme === "dark" ? "bg-[#E6501B]" : "bg-[#C3110C]"}`
                          : "w-0 bg-[#E6501B] group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              }

              return (
                <div
                  key={link.name}
                  className="relative"
                  onFocus={() => {
                    cancelProductsMenuClose();
                    setIsProductsMenuOpen(true);
                  }}
                  onMouseEnter={() => setIsProductsMenuOpen(true)}
                  onMouseLeave={scheduleProductsMenuClose}
                >
                  <Link
                    to={link.href}
                    onFocus={() => setIsProductsMenuOpen(true)}
                    title={link.title}
                    aria-label={link.ariaLabel}
                    aria-haspopup="true"
                    aria-expanded={isProductsMenuOpen}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`relative block px-4 py-2 text-sm font-semibold transition-colors duration-200 group ${
                      theme === "dark"
                        ? isActive(link.href)
                          ? "text-[#E6501B]"
                          : "text-gray-200 hover:text-[#E6501B]"
                        : isActive(link.href)
                          ? "text-[#C3110C]"
                          : "text-gray-950 hover:text-[#C3110C]"
                    }`}
                  >
                    {link.name}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                        isProductsMenuOpen || isActive(link.href)
                          ? `w-full ${theme === "dark" ? "bg-[#E6501B]" : "bg-[#C3110C]"}`
                          : "w-0 bg-[#E6501B] group-hover:w-full"
                      }`}
                    />
                  </Link>

                  {isProductsMenuOpen && (
                    <div
                      className={`fixed left-0 right-0 top-20 z-50 border-y shadow-2xl ${
                        theme === "dark"
                          ? "border-[#34404d] bg-[#1a1a1a]"
                          : "border-gray-200 bg-white"
                      }`}
                      onMouseEnter={cancelProductsMenuClose}
                      onMouseLeave={scheduleProductsMenuClose}
                      onFocus={cancelProductsMenuClose}
                    >
                      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-7 lg:grid-cols-3">
                        {CATEGORIES.map((category) => {
                          const subcategories = getProductSubHeadings(category.slug);
                          return (
                            <div key={category.slug} className="min-w-0">
                              <Link
                                to={`/products/category/${category.slug}`}
                                onClick={closeProductsMenu}
                                title={`Browse all ${category.name}`}
                                aria-label={`Browse all ${category.name}`}
                                className={`mb-3 block text-sm font-bold transition-colors ${
                                  theme === "dark"
                                    ? "text-white hover:text-[#E6501B]"
                                    : "text-[#280905] hover:text-[#C3110C]"
                                }`}
                              >
                                {category.name}
                              </Link>
                              <div className="space-y-1.5">
                                {subcategories.map((subcategory) => (
                                  <div
                                    key={`${category.slug}-${subcategory}`}
                                    // to={`/products/category/${category.slug}?subCategory=${encodeURIComponent(subcategory)}`}
                                    // onClick={closeProductsMenu}
                                    // title={`View ${subcategory}`}
                                    // aria-label={`View ${subcategory} in ${category.name}`}
                                    className={`block text-xs transition-colors ${
                                      theme === "dark"
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {subcategory}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  title="Account menu"
                  aria-label="Account menu"
                  aria-haspopup="menu"
                  aria-expanded={isProfileDropdownOpen}
                  className="flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-[#1A1A1A] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E6501B]"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-r from-[#C3110C] to-[#E6501B] flex items-center justify-center text-white font-semibold text-sm">
                    {user?.first_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </div>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1A1A1A] rounded-lg shadow-xl border border-gray-200 dark:border-[#2A2A2A] overflow-hidden z-50"
                  >
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

                    <div className="py-1">
                      <Link
                        to="/quote-list"
                        role="menuitem"
                        title="View your quotes"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#212121] transition-colors"
                      >
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        My Quotes
                      </Link>
                      <hr className="my-1 border-gray-200 dark:border-[#2A2A2A]" />
                      <button
                        onClick={handleLogout}
                        role="menuitem"
                        title="Log out of your account"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" aria-hidden="true" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signup"
                title="Create your Onasis Links account"
                aria-label="Create your Onasis Links account"
                className="hidden md:inline-block px-6 py-2.5 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
              >
                Get Started
              </Link>
            )}

            <ThemeToggle />

            <Link
              to="/quote-list"
              title="View your quote cart"
              aria-label={`Quote cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#212121] transition-colors"
            >
              <ShoppingCartIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true" />
              {itemCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#C3110C] text-white text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors md:hidden flex cursor-pointer ${
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between" aria-hidden="true">
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    theme === "dark" ? "bg-white" : "bg-[#280905]"
                  } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    theme === "dark" ? "bg-white" : "bg-[#280905]"
                  } ${isMobileMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 transition-all duration-300 ${
                    theme === "dark" ? "bg-white" : "bg-[#280905]"
                  } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
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
                title={link.title}
                aria-label={link.ariaLabel}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  theme === "dark"
                    ? isActive(link.href)
                      ? "text-[#E6501B] bg-gray-800"
                      : "text-gray-200 hover:text-[#E6501B] hover:bg-gray-800"
                    : isActive(link.href)
                      ? "text-[#C3110C] bg-gray-100"
                      : "text-gray-700 hover:text-[#C3110C] hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/quote-list"
                  title="View your quotes"
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
                  title="Log out of your account"
                  className="block w-full text-left px-4 py-2 text-sm font-medium cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  title="Sign in to your account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-[#C3110C] dark:hover:text-[#E6501B] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  title="Create your Onasis Links account"
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