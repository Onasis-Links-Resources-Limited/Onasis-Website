import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { useQuote } from '../context/QuoteContext';
import { PRODUCTS } from '../data/productsData';
import { 
  ArrowLeft, 
  Download, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CheckCircle,
  Truck,
  Shield,
  Clock,
  AlertCircle,
  Users,
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const { addToQuote } = useQuote();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showBulkForm, setShowBulkForm] = useState(false);

  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className={`pt-20 min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'text-white' : 'text-[#280905]'
      }`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/products" className="text-[#C3110C] hover:text-[#E6501B]">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToQuote = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/products/product/${product.id}` } });
      return;
    }
    addToQuote(product, quantity);
  };

  const handleBulkQuote = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/products/product/${product.id}` } });
      return;
    }
    setShowBulkForm(true);
  };

  return (
    <div className={`pt-20 min-h-screen ${
      theme === 'dark' ? 'text-white' : 'text-[#280905]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          to={`/products/category/${product.category.toLowerCase().replace(/ /g, '-')}`}
          className={`inline-flex items-center gap-2 mb-6 transition-colors ${
            theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-[#280905]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {product.category}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Image */}
          <div className="space-y-4">
            <div className={`rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Thumbnails placeholder */}
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-20 h-20 rounded-lg overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <img
                    src={product.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-sm px-3 py-1 rounded-full ${
                  product.isAvailable
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {product.isAvailable ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  SKU: {product.sku}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">{product.name}</h1>
              <p className={`text-lg mt-1 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {product.brand} • {product.category}
              </p>
            </div>

            {/* Description */}
            <p className={`text-base leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {product.description}
            </p>

            {/* Specifications */}
            <div className={`rounded-xl p-4 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <h3 className="font-semibold mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-gray-700/20">
                    <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Downloads */}
            {product.downloads && product.downloads.length > 0 && (
              <div className={`rounded-xl p-4 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <h3 className="font-semibold mb-3">Downloads</h3>
                <div className="space-y-2">
                  {product.downloads.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'hover:bg-gray-700 text-gray-300'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      <span className="text-sm">{file.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing & Order Info */}
            <div className={`rounded-xl p-4 border ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-2 text-[#E6501B] font-medium">
                <AlertCircle className="w-4 h-4" />
                <span>Price: Available on Request</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Min. Order: {product.minOrder} {product.unit}
                </span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Bulk discounts available
                </span>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`flex items-center rounded-lg border ${
                  theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
                }`}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`p-2.5 rounded-l-lg transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`p-2.5 rounded-r-lg transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {product.unit}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToQuote}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Quote
                </button>
                <button
                  onClick={handleBulkQuote}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#C3110C] text-[#C3110C] hover:bg-[#C3110C] hover:text-white font-semibold rounded-lg transition-all duration-300"
                >
                  <Users className="w-4 h-4" />
                  Request Bulk Quote
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-[#E6501B]" />
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Genuine Products
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="w-4 h-4 text-[#E6501B]" />
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Fast Delivery
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#E6501B]" />
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  Warranty
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-[#E6501B]" />
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                  24/7 Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Quote Modal */}
      {showBulkForm && (
        <BulkQuoteForm
          product={product}
          onClose={() => setShowBulkForm(false)}
        />
      )}
    </div>
  );
};

// Bulk Quote Form Component
const BulkQuoteForm = ({ product, onClose }) => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company_name || '',
    quantity: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Submit logic here
    setTimeout(() => {
      setSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-md mx-4 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Bulk Quote Request</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Request a bulk quote for <strong>{product.name}</strong>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border transition ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border transition ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border transition ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border transition ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estimated Quantity *</label>
              <input
                type="number"
                required
                min={product.minOrder}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border transition ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
                placeholder={`Min. ${product.minOrder} ${product.unit}`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Additional Notes</label>
              <textarea
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border transition ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-gray-300'
                }`}
                placeholder="Any special requirements or delivery details..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 px-4 py-2.5 rounded-lg border transition ${
                  theme === 'dark'
                    ? 'border-gray-700 hover:bg-gray-800'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-2.5 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;