const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  // Contact form
  sendContact: async (data) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },
  
  // Services
  getServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services`);
    return response.json();
  },
  
  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  }
};