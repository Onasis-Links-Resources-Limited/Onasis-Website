import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";
import { QuoteProvider } from "./context/QuoteContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail";
import QuoteList from "./pages/QuoteList";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import NewsletterUnsubscribe from "./pages/NewsletterUnsubscribe";

// Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Fonts
import "@fontsource/pacifico";
import "@fontsource/dancing-script";

const AppContent = () => {
  const { theme } = useTheme();
  const { loading, user } = useAuth();

  // ✅ Show loading spinner while auth is initializing
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="w-12 h-12 border-4 border-[#C3110C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
    }`}>
      <Navbar />
      <Routes>
        {/* Auth Routes - redirect if already logged in */}
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/category/:slug" element={<CategoryProducts />} />
        <Route path="/products/category/:slug/product/:id" element={<ProductDetail />} />
        <Route path="/quote-list" element={<QuoteList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/newsletter/unsubscribe/:id" element={<NewsletterUnsubscribe />} />

        {/* 404 Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CategoryProvider>
          <ProductProvider>
          <QuoteProvider>
            <Router>
              <AppContent />
            </Router>
          </QuoteProvider>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
