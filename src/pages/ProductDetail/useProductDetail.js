import { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { api } from "../../api/client";

export const useProductDetail = (id) => {
  const { products, refreshProducts } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findProduct = async () => {
      if (!id) {
        setError("Product ID not found");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // First, try to find product in context
        let foundProduct = products.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setLoading(false);
          return;
        }

        // If not found in context, fetch from API and refresh context
        const response = await api.get(`/products/${id}`);
        const data = response.data?.data || response.data;
        setProduct(data);
        // ✅ Refresh context so other pages get the data
        await refreshProducts();
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError(err.response?.data?.message || "Product not found");
      } finally {
        setLoading(false);
      }
    };

    findProduct();
  }, [id, products, refreshProducts]); // ✅ Includes products from context

  return { product, loading, error };
};