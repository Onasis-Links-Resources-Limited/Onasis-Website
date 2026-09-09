import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { api } from "../../api/client";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80";

const SimilarProducts = ({ currentProduct, isDark }) => {
  const navigate = useNavigate();
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSimilar = async () => {
      if (!currentProduct?.category_id) return;
      setLoading(true);
      try {
        const response = await api.get(`/products?category_id=${currentProduct.category_id}&limit=8`);
        const data = response.data?.data || response.data || [];
        const filtered = data.filter(p => p.id !== currentProduct.id);
        setSimilar(filtered.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch similar:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSimilar();
  }, [currentProduct]);

  if (loading) {
    return (
      <section className="mt-16">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-64 rounded-2xl animate-pulse ${isDark ? "bg-[#1A1A1A]" : "bg-gray-200"}`} />
          ))}
        </div>
      </section>
    );
  }

  if (similar.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className={`mb-5 text-2xl font-bold ${isDark ? "text-white" : "text-[#280905]"}`}>
        Similar Products
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {similar.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(`/products/product/${item.id}`)}
            className={`overflow-hidden rounded-2xl border text-left transition hover:-translate-y-0.5 ${
              isDark 
                ? "border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#E6501B]/30" 
                : "border-gray-200 bg-white shadow-sm hover:border-gray-300"
            }`}
          >
            <div className={isDark ? "bg-[#0a0a0a]" : "bg-gray-100"}>
              <img
                src={item.image_url || FALLBACK_IMAGE}
                alt={item.name}
                loading="lazy"
                className="aspect-square w-full object-cover"
                onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
              />
            </div>
            <div className="space-y-2 p-4">
              <p className={`text-[10px] font-medium uppercase tracking-[0.14em] ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                {item.brand || item.category?.name || "Product"}
              </p>
              <h3 className={`text-sm font-semibold truncate ${isDark ? "text-white" : "text-[#280905]"}`}>
                {item.name}
              </h3>
              <p className={`text-xs font-medium ${item.stock_quantity > 0 ? (isDark ? "text-green-400" : "text-green-600") : (isDark ? "text-red-400" : "text-red-600")}`}>
                {item.stock_quantity > 0 ? "In stock" : "Out of stock"}
              </p>
              <span className={`inline-flex items-center gap-1 text-sm font-bold text-[#E6501B]`}>
                View details <ChevronRight className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;