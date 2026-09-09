import { api } from './client';

export const categoryApi = {
  getAll: () => api.get('/categories'),
  getOne: (id) => api.get(`/categories/${id}`),
  getProducts: (categoryId) => api.get(`/categories/${categoryId}/products`),
};