import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { api } from '../api/client';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && products.length > 0) {
      return products;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/products');
      const data = response.data?.data || response.data || [];
      setProducts(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      return [];
    } finally {
      setLoading(false);
    }
  }, [products]);

  // Auto-fetch on mount
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 0);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshProducts = useCallback(() => {
    return fetchProducts(true);
  }, [fetchProducts]);

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    refreshProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// This hook intentionally shares the context module with the provider.
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};