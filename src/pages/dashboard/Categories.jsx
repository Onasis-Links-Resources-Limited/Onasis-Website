import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { useTheme } from "../../context/ThemeContext";

const Categories = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // STATE
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // DEFAULT CATEGORIES
  const defaultCategories = [
    {
      id: "CAT-0001",
      name: "RF Materials",
      description: "Radio frequency materials and components",
      productCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: "CAT-0002",
      name: "Power",
      description: "Power supply units and distribution equipment",
      productCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: "CAT-0003",
      name: "Fiber Optical Materials",
      description: "Fiber optic cables, transceivers, and accessories",
      productCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: "CAT-0004",
      name: "Miscellaneous",
      description: "Various accessories and supplies",
      productCount: 0,
      createdAt: new Date().toISOString(),
    },
    {
      id: "CAT-0005",
      name: "Network Materials",
      description: "Network switches, routers, and infrastructure",
      productCount: 0,
      createdAt: new Date().toISOString(),
    },
  ];

  const [categories, setCategories] = useState(() => {
    try {
      const savedCategories = localStorage.getItem("categories");
      return savedCategories ? JSON.parse(savedCategories) : defaultCategories;
    } catch (error) {
      console.error("Error loading categories:", error);
      return defaultCategories;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("categories", JSON.stringify(categories));
    } catch (error) {
      console.error("Error saving categories:", error);
    }
  }, [categories]);

  useEffect(() => {
    try {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      const updatedCategories = categories.map(cat => {
        const count = products.filter(p => p.category === cat.name).length;
        return { ...cat, productCount: count };
      });
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error updating category counts:", error);
    }
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchText = search.toLowerCase();
      return (
        category.name.toLowerCase().includes(searchText) ||
        category.description.toLowerCase().includes(searchText) ||
        category.id.toLowerCase().includes(searchText)
      );
    });
  }, [search, categories]);

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    const category = categories.find((item) => item.id === id);
    
    if (category) {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      const hasProducts = products.some(p => p.category === category.name);
      
      if (hasProducts) {
        const confirmDelete = window.confirm(
          `Category "${category.name}" has ${category.productCount} product(s). Deleting it will not delete the products but they will lose their category. Continue?`
        );
        if (!confirmDelete) return;
      } else {
        const confirmDelete = window.confirm(`Delete category "${category.name}"?`);
        if (!confirmDelete) return;
      }
      
      const updatedCategories = categories.filter((c) => c.id !== id);
      setCategories(updatedCategories);
      alert("Category deleted successfully.");
    }
  };

  const getProductCount = () => {
    try {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      return products.length;
    } catch (error) {
      return 0;
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
      render: (row) => <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{row.id}</span>,
    },
    {
      key: "name",
      label: "Category Name",
      render: (row) => (
        <div>
          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{row.name}</span>
          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>{row.description}</div>
        </div>
      ),
    },
    {
      key: "productCount",
      label: "Products",
      render: (row) => (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
          isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
        }`}>
          {row.productCount} products
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (row) => (
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {new Date(row.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Edit category"
            onClick={() => navigate(`/dashboard/categories/edit/${row.id}`)}
            className={`cursor-pointer rounded-lg border p-2 transition ${
              isDark 
                ? 'border-gray-600 text-gray-300 hover:border-[#C3110C] hover:text-[#C3110C]' 
                : 'border-gray-200 text-gray-600 hover:border-[#C3110C] hover:text-[#C3110C]'
            }`}
          >
            ✏️
          </button>
          <button
            type="button"
            title="Delete category"
            onClick={() => handleDelete(row.id)}
            className={`cursor-pointer rounded-lg border p-2 transition ${
              isDark 
                ? 'border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400' 
                : 'border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500'
            }`}
          >
            🗑️
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={`relative z-10 min-h-screen p-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* PAGE HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Categories
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your product categories
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/categories/add")}
          className="relative z-[9999] cursor-pointer rounded-lg bg-[#C3110C] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#740A03]"
        >
          + Add Category
        </button>
      </div>

      {/* SEARCH */}
      <div className={`mb-6 rounded-xl border p-4 shadow-sm transition-colors duration-300 ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search categories..."
              className={`w-full rounded-lg border py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                isDark 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            />
          </div>

          <div className={`flex items-center gap-4 rounded-lg px-4 py-2 ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Categories</span>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{categories.length}</p>
            </div>
            <div className={`h-8 w-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <div>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Products</span>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{getProductCount()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES TABLE */}
      <DataTable
        columns={columns}
        data={paginatedCategories}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredCategories.length}
        startIndex={startIndex}
      />
    </div>
  );
};

export default Categories;