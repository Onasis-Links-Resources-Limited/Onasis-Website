import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sku: "",
    stock: "",
    price: "",
    description: "",
    supplier: "",
    location: "",
    weight: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "RF Materials",
    "Power",
    "Fiber Optical Materials",
    "Miscellaneous",
    "Network Materials",
  ];

  const generateProductId = (savedProducts) => {
    const existingIds = savedProducts.map(p => p.id);
    
    if (existingIds.length === 0) {
      return "PRD-0001";
    }

    const numbers = existingIds
      .map(id => {
        if (typeof id === 'string' && id.includes('PRD-')) {
          const match = id.match(/PRD-(\d+)/);
          return match ? parseInt(match[1]) : 0;
        }
        return 0;
      })
      .filter(num => num > 0);

    if (numbers.length === 0) {
      return "PRD-0001";
    }

    const maxNumber = Math.max(...numbers);
    const nextNumber = maxNumber + 1;
    
    return `PRD-${String(nextNumber).padStart(4, '0')}`;
  };

  useEffect(() => {
    if (isEditing) {
      try {
        const savedProducts = JSON.parse(
          localStorage.getItem("products") || "[]"
        );
        const product = savedProducts.find(
          (p) => String(p.id) === String(id)
        );
        
        if (product) {
          setFormData({
            name: product.name || "",
            category: product.category || "",
            sku: product.sku || "",
            stock: product.stock || "",
            price: product.price || "",
            description: product.description || "",
            supplier: product.supplier || "",
            location: product.location || "",
            weight: product.weight || "",
            isActive: product.isActive !== undefined ? product.isActive : true,
          });
        } else {
          alert("Product not found");
          navigate("/dashboard/products");
        }
      } catch (error) {
        console.error("Error loading product:", error);
        navigate("/dashboard/products");
      }
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    }
    
    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }
    
    if (formData.price && formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }
    
    if (formData.weight && formData.weight < 0) {
      newErrors.weight = "Weight cannot be negative";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const savedProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );

      const productData = {
        name: formData.name.trim(),
        category: formData.category,
        sku: formData.sku.trim(),
        stock: Number(formData.stock),
        price: formData.price ? Number(formData.price) : 0,
        description: formData.description.trim(),
        supplier: formData.supplier?.trim() || "",
        location: formData.location?.trim() || "",
        weight: formData.weight ? Number(formData.weight) : 0,
        isActive: formData.isActive,
        createdAt: isEditing ? undefined : new Date().toISOString(),
      };

      let updatedProducts;

      if (isEditing) {
        updatedProducts = savedProducts.map((product) =>
          String(product.id) === String(id)
            ? { ...product, ...productData }
            : product
        );
        alert("Product updated successfully.");
      } else {
        const newId = generateProductId(savedProducts);
        const newProduct = {
          id: newId,
          ...productData,
        };
        updatedProducts = [newProduct, ...savedProducts];
        alert("Product added successfully.");
      }

      localStorage.setItem("products", JSON.stringify(updatedProducts));
      navigate("/dashboard/products");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred while saving the product.");
    }
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? "Edit Product" : "Add Product"}
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {isEditing
              ? "Update product information"
              : "Add a new product to your catalog"}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`rounded-xl border p-6 shadow-sm transition-colors duration-300 ${
            isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                  errors.name 
                    ? "border-red-500" 
                    : isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] ${
                  errors.category 
                    ? "border-red-500" 
                    : isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            {/* SKU */}
            <div>
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                SKU *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. RF-001"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                  errors.sku 
                    ? "border-red-500" 
                    : isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              {errors.sku && (
                <p className="mt-1 text-sm text-red-500">{errors.sku}</p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="Enter stock quantity"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                  errors.stock 
                    ? "border-red-500" 
                    : isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              {errors.stock && (
                <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="Enter price"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                  errors.price 
                    ? "border-red-500" 
                    : isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            {/* Supplier */}
            <div>
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Supplier
              </label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="Enter supplier name"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                  isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>

            {/* Location */}
            <div>
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Warehouse Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Aisle 3, Shelf B"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                  isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>

            {/* Weight */}
            <div>
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0"
                step="0.1"
                placeholder="Enter weight"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                  errors.weight 
                    ? "border-red-500" 
                    : isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              {errors.weight && (
                <p className="mt-1 text-sm text-red-500">{errors.weight}</p>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-end">
              <label className={`flex items-center gap-3 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-[#C3110C] focus:ring-[#C3110C]"
                />
                Product is Active
              </label>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Enter product description"
                className={`w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                  isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                className={`w-full rounded-lg border px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[#C3110C] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#740A03] ${
                  isDark ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Upload a product image (optional)
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className={`mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              type="button"
              onClick={() => navigate("/dashboard/products")}
              className={`rounded-lg border px-5 py-3 text-sm font-semibold transition ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#C3110C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#740A03]"
            >
              {isEditing ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;