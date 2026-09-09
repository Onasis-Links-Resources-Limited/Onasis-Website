import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { api } from '../api/client';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async (forceRefresh = false) => {
    // Only fetch if no data or force refresh
    if (!forceRefresh && categories.length > 0) {
      return categories;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/categories');
      const data = response.data?.data || response.data || [];
      setCategories(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
      return [];
    } finally {
      setLoading(false);
    }
  }, [categories]);

  // Auto-fetch on mount
  useEffect(() => {
    let cancelled = false;
    const task = setTimeout(() => {
      if (!cancelled) {
        fetchCategories();
      }
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(task);
    };
  }, [fetchCategories]);

  const refreshCategories = useCallback(() => {
    return fetchCategories(true);
  }, [fetchCategories]);

  const value = {
    categories,
    loading,
    error,
    fetchCategories,
    refreshCategories,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

// This hook intentionally shares the provider's context API from this module.
// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};