import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useQuote } from '../context/QuoteContext';
import { useAuth } from '../hooks/useAuth';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag,
  ArrowRight,
  FileText,
  AlertCircle
} from 'lucide-react';

const QuoteList = () => {
  const { theme } = useTheme();
  const { quoteItems, removeFromQuote, updateQuantity, clearQuote, totalItems } = useQuote();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleRequestQuote = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/quote-list' } });
      return;
    }
    // Navigate to quote request form
    navigate('/request-quote');
  };

  if (quoteItems.length === 0) {
    return (
      <div className={`pt-20 min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'text-white' : 'text-[#280905]'
      }`}>
        <div className="text-center max-w-md">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Quote List is Empty</h2>
          <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Browse our products and add items to get a quote.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-lg transition-all duration-300"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-20 min-h-screen ${
      theme === 'dark' ? 'text-white' : 'text-[#280905]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Quote List</h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {totalItems} items in your quote list
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={clearQuote}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-red-400 hover:bg-red-900/20'
                  : 'text-red-500 hover:bg-red-50'
              }`}
            >
              Clear All
            </button>
            <button
              onClick={handleRequestQuote}
              className="px-6 py-2 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Request Quote
            </button>
          </div>
        </div>

        {/* Quote Items */}
        <div className={`rounded-xl border ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        } overflow-hidden`}>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {quoteItems.map((item) => (
              <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.brand} • {item.sku}
                      </p>
                      <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        Min. Order: {item.minOrder} {item.unit}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center rounded-lg border ${
                        theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
                      }`}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={`p-1.5 rounded-l-lg transition-colors ${
                            theme === 'dark'
                              ? 'hover:bg-gray-700 text-gray-300'
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={`p-1.5 rounded-r-lg transition-colors ${
                            theme === 'dark'
                              ? 'hover:bg-gray-700 text-gray-300'
                              : 'hover:bg-gray-100 text-gray-600'
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromQuote(item.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          theme === 'dark'
                            ? 'hover:bg-red-900/20 text-red-400'
                            : 'hover:bg-red-50 text-red-500'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className={`mt-6 p-4 rounded-xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm font-medium">
                Total Items: <span className="font-bold">{totalItems}</span>
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {quoteItems.length} unique products
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigate('/products')}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'border-gray-700 hover:bg-gray-700'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                Continue Browsing
              </button>
              <button
                onClick={handleRequestQuote}
                className="flex-1 sm:flex-none px-6 py-2 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                Request Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className={`mt-6 p-4 rounded-xl border ${
          theme === 'dark' ? 'border-blue-900/30 bg-blue-900/10' : 'border-blue-200 bg-blue-50'
        }`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`} />
            <div>
              <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                <strong>Need a custom quote?</strong> Our team will review your request and provide a formal quotation within 24 hours.
                Bulk orders and long-term partnerships are eligible for special discounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteList;