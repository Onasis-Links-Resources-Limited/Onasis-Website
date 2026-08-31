import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      try {
        const savedCategories = JSON.parse(
          localStorage.getItem("categories") || "[]"
        );
        const category = savedCategories.find(
          (c) => c.id === id
        );
        
        if (category) {
          setFormData({
            name: category.name || "",
            description: category.description || "",
          });
        } else {
          alert("Category not found");
          navigate("/dashboard/categories");
        }
      } catch (error) {
        console.error("Error loading category:", error);
        navigate("/dashboard/categories");
      }
    }
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }
    
    if (formData.name.trim().length < 2) {
      newErrors.name = "Category name must be at least 2 characters";
    }
    
    try {
      const savedCategories = JSON.parse(
        localStorage.getItem("categories") || "[]"
      );
      
      const duplicate = savedCategories.some(
        (cat) => 
          cat.name.toLowerCase() === formData.name.trim().toLowerCase() &&
          cat.id !== id
      );
      
      if (duplicate) {
        newErrors.name = "A category with this name already exists";
      }
    } catch (error) {
      console.error("Error checking duplicates:", error);
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateCategoryId = (savedCategories) => {
    const existingIds = savedCategories.map(c => c.id);
    
    if (existingIds.length === 0) {
      return "CAT-0001";
    }

    const numbers = existingIds
      .map(id => {
        const match = id.match(/CAT-(\d+)/);
        return match ? parseInt(match[1]) : 0;
      })
      .filter(num => num > 0);

    if (numbers.length === 0) {
      return "CAT-0001";
    }

    const maxNumber = Math.max(...numbers);
    const nextNumber = maxNumber + 1;
    
    return `CAT-${String(nextNumber).padStart(4, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const savedCategories = JSON.parse(
        localStorage.getItem("categories") || "[]"
      );

      const categoryData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
      };

      let updatedCategories;

      if (isEditing) {
        updatedCategories = savedCategories.map((category) =>
          category.id === id
            ? { ...category, ...categoryData }
            : category
        );
        
        const products = JSON.parse(localStorage.getItem("products") || "[]");
        const oldCategory = savedCategories.find(c => c.id === id);
        
        if (oldCategory && oldCategory.name !== categoryData.name) {
          const updatedProducts = products.map(p => 
            p.category === oldCategory.name 
              ? { ...p, category: categoryData.name } 
              : p
          );
          localStorage.setItem("products", JSON.stringify(updatedProducts));
        }
        
        alert("Category updated successfully.");
      } else {
        const newId = generateCategoryId(savedCategories);
        
        const newCategory = {
          id: newId,
          ...categoryData,
          productCount: 0,
          createdAt: new Date().toISOString(),
        };
        
        updatedCategories = [newCategory, ...savedCategories];
        alert("Category added successfully.");
      }

      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      navigate("/dashboard/categories");
    } catch (error) {
      console.error("Error saving category:", error);
      alert("An error occurred while saving the category.");
    }
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isEditing ? "Edit Category" : "Add Category"}
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {isEditing
              ? "Update category information"
              : "Create a new product category"}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`rounded-xl border p-6 shadow-sm transition-colors duration-300 ${
            isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}
        >
          <div className="space-y-6">
            {/* Category Name */}
            <div>
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Category Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter category name"
                className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                  errors.name 
                    ? "border-red-500" 
                    : isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
              <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Category names should be unique and descriptive
              </p>
            </div>

            {/* Description */}
            <div>
              <label className={`mb-2 block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe what this category includes"
                className={`w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                  errors.description 
                    ? "border-red-500" 
                    : isDark ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
              <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Provide a clear description of what products belong in this category
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className={`mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              type="button"
              onClick={() => navigate("/dashboard/categories")}
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
              {isEditing ? "Update Category" : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;