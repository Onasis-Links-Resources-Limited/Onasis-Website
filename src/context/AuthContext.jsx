import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../api/client';

// ✅ Export AuthContext as named export
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const hasFetched = useRef(false);

  const logout = useCallback(() => {
    localStorage.removeItem('onasis_token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);
  }, []);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('onasis_token');
    
    if (!token) {
      setLoading(false);
      setIsAuthenticated(false);
      return;
    }

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/auth/me');
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Only logout if it's an auth error (401)
      if (error.response?.status === 401) {
        logout();
      } else {
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // ✅ Only run once on mount
  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: authToken, user: userData } = response.data.data;

      localStorage.setItem('onasis_token', authToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      setUser(userData);
      setIsAuthenticated(true);
      setLoading(false);

      return { success: true, data: userData };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors || [],
      };
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token: authToken, user: newUser } = response.data.data;

      localStorage.setItem('onasis_token', authToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      setUser(newUser);
      setIsAuthenticated(true);
      setLoading(false);

      return { success: true, data: newUser };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || [],
      };
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    hasRole: (role) => user?.role === role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };