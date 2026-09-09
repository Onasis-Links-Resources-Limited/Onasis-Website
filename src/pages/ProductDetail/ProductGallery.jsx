import { useState, useMemo } from "react";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80";

const ProductGallery = ({ product, isDark }) => {
  const images = useMemo(() => {
    if (product?.image_url) return [product.image_url];
    if (Array.isArray(product?.images) && product.images.length > 0) return product.images;
    return [FALLBACK_IMAGE];
  }, [product]);

  const [activeImage, setActiveImage] = useState(null);
  const displayedImage = images.includes(activeImage) ? activeImage : images[0];

  const darkClasses = isDark ? "border-[#2A2A2A] bg-[#1A1A1A]" : "border-gray-200 bg-gray-100";

  return (
    <div className="space-y-4">
      <div className={`mx-auto max-w-[520px] overflow-hidden rounded-2xl border transition-all duration-300 ${darkClasses}`}>
        <img
          src={displayedImage}
          alt={product?.name || "Product"}
          className="h-[380px] w-full object-cover transition duration-300 ease-out hover:scale-[1.03] hover:shadow-xl sm:h-[440px] lg:h-[480px]"
          onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-3">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveImage(src)}
              className={
                displayedImage === src
                  ? isDark
                    ? "h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 ring-[#E6501B] ring-offset-2 ring-offset-[#090909]"
                    : "h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 ring-[#C3110C] ring-offset-2 ring-offset-[#f7f7f5]"
                  : isDark
                    ? "h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#2A2A2A] opacity-80 hover:opacity-100"
                    : "h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 opacity-80 hover:opacity-100"
              }
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;