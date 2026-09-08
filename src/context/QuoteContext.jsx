import { createContext, useContext, useState, useEffect, useMemo } from "react";

const QuoteContext = createContext();

export const QuoteProvider = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState(() => {
    const saved = localStorage.getItem("quote_items");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
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
    });
  };

  const removeFromQuote = (productId) => {
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
    );
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const itemCount = useMemo(() => quoteItems.length, [quoteItems]);
  const totalItems = useMemo(
    () =>
      quoteItems.reduce((total, item) => total + Number(item.quantity || 0), 0),
    [quoteItems],
  );

  const getTotalItems = () => totalItems;

  const value = {
    quoteItems,
    addToQuote,
    removeFromQuote,
    updateQuantity,
    clearQuote,
    getTotalItems,
    itemCount,
    totalItems,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error("useQuote must be used within QuoteProvider");
  }
  return context;
};
