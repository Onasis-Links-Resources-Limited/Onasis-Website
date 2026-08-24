import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

// ✅ Export AuthContext as named export
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('onasis_token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set up axios interceptor for auth token
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token: authToken, user: userData } = response.data.data;

      localStorage.setItem('onasis_token', authToken);
      setToken(authToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, data: userData };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors || [],
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token: authToken, user: newUser } = response.data.data;

      localStorage.setItem('onasis_token', authToken);
      setToken(authToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, data: newUser };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || [],
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('onasis_token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete api.defaults.headers.common['Authorization'];
  };

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