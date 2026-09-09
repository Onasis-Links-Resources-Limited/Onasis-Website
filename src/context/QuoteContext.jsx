import { createContext, useContext, useState, useEffect } from 'react';

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState(() => {
    const saved = localStorage.getItem('quote_items');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('quote_items', JSON.stringify(quoteItems));
  }, [quoteItems]);

  const addToQuote = (product, quantity = 1) => {
    setQuoteItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromQuote = (productId) => {
    setQuoteItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromQuote(productId);
      return;
    }
    setQuoteItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const getTotalItems = () => {
    return quoteItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    quoteItems,
    addToQuote,
    removeFromQuote,
    updateQuantity,
    clearQuote,
    getTotalItems,
    itemCount: quoteItems.length,
    totalItems: getTotalItems(),
  };

  return (
    <QuoteContext.Provider value={value}>
      {children}
    </QuoteContext.Provider>
  );
};

// The hook must remain exported from this module for the existing context API.
// eslint-disable-next-line react-refresh/only-export-components
export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within QuoteProvider');
  }
  return context;
};