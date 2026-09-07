<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from 'react';
=======
import { createContext, useContext, useState, useEffect, useMemo } from "react";
>>>>>>> origin/main

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState(() => {
<<<<<<< HEAD
    const saved = localStorage.getItem('quote_items');
=======
    const saved = localStorage.getItem("quote_items");
>>>>>>> origin/main
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
<<<<<<< HEAD
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
=======
    localStorage.setItem("quote_items", JSON.stringify(quoteItems));
  }, [quoteItems]);

  const addToQuote = (product, quantity = 1) => {
    setQuoteItems((prev) => {
      const normalizedQuantity = Math.max(1, Number(quantity) || 1);
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + normalizedQuantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity: normalizedQuantity }];
>>>>>>> origin/main
    });
  };

  const removeFromQuote = (productId) => {
<<<<<<< HEAD
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
=======
    setQuoteItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const normalizedQuantity = Math.max(1, Number(quantity) || 1);
    if (normalizedQuantity <= 0) {
      removeFromQuote(productId);
      return;
    }
    setQuoteItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: normalizedQuantity }
          : item,
      ),
>>>>>>> origin/main
    );
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

<<<<<<< HEAD
  const getTotalItems = () => {
    return quoteItems.reduce((total, item) => total + item.quantity, 0);
  };
=======
  const itemCount = useMemo(() => quoteItems.length, [quoteItems]);
  const totalItems = useMemo(
    () =>
      quoteItems.reduce((total, item) => total + Number(item.quantity || 0), 0),
    [quoteItems],
  );

  const getTotalItems = () => totalItems;
>>>>>>> origin/main

  const value = {
    quoteItems,
    addToQuote,
    removeFromQuote,
    updateQuantity,
    clearQuote,
    getTotalItems,
<<<<<<< HEAD
    itemCount: quoteItems.length,
    totalItems: getTotalItems(),
  };

  return (
    <QuoteContext.Provider value={value}>
      {children}
    </QuoteContext.Provider>
=======
    itemCount,
    totalItems,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
>>>>>>> origin/main
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
<<<<<<< HEAD
    throw new Error('useQuote must be used within QuoteProvider');
  }
  return context;
};
=======
    throw new Error("useQuote must be used within QuoteProvider");
  }
  return context;
};
>>>>>>> origin/main
