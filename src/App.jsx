import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
// import { AuthProvider } from "./context/AuthContext";
import { QuoteProvider } from "./context/QuoteContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import CategoryProducts from "./pages/CategoryProducts";
import ProductDetail from "./pages/ProductDetail";
import QuoteList from "./pages/QuoteList";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Fonts
import "@fontsource/pacifico";
import "@fontsource/dancing-script";

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <Navbar />
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/category/:slug" element={<CategoryProducts />} />
        <Route path="/products/product/:id" element={<ProductDetail />} />
        <Route path="/quote-list" element={<QuoteList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      {/* <AuthProvider> */}
        <QuoteProvider>
          <Router>
            <AppContent />
          </Router>
        </QuoteProvider>
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
}

export default App;