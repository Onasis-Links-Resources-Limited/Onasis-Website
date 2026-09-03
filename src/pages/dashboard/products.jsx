import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/common/DataTable";
import { useTheme } from "../../context/ThemeContext";

const Products = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // STATE
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  // CATEGORIES LIST
  const categoriesList = [
    "RF Materials",
    "Power",
    "Fiber Optical Materials",
    "Miscellaneous",
    "Network Materials",
  ];

  // DEFAULT PRODUCTS
  const defaultProducts = [
    {
      id: "PRD-0001",
      name: "RF Amplifier",
      category: "RF Materials",
      sku: "RF-001",
      stock: 45,
      price: 299.99,
      description: "High-performance RF amplifier for telecommunications",
      supplier: "RF Tech Solutions",
      location: "Warehouse A, Shelf 1",
      weight: 2.5,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "PRD-0002",
      name: "Power Supply Unit",
      category: "Power",
      sku: "PW-001",
      stock: 12,
      price: 1599.99,
      description: "Industrial power supply unit with surge protection",
      supplier: "Power Systems Inc.",
      location: "Warehouse B, Section 4",
      weight: 3.8,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "PRD-0003",
      name: "Fiber Optic Cable",
      category: "Fiber Optical Materials",
      sku: "FO-001",
      stock: 0,
      price: 2999.99,
      description: "High-speed fiber optic cable for data centers",
      supplier: "FiberTech Inc.",
      location: "Data Center A, Rack 3",
      weight: 15.5,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "PRD-0004",
      name: "Network Switch",
      category: "Network Materials",
      sku: "NW-001",
      stock: 8,
      price: 899.99,
      description: "Enterprise network switch with 48 ports",
      supplier: "Network Solutions",
      location: "Warehouse C, Shelf 2",
      weight: 4.2,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "PRD-0005",
      name: "RF Connector Kit",
      category: "RF Materials",
      sku: "RF-002",
      stock: 67,
      price: 49.99,
      description: "Complete RF connector kit for various applications",
      supplier: "RF Tech Solutions",
      location: "Warehouse A, Shelf 3",
      weight: 0.3,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "PRD-0006",
      name: "Power Distribution Panel",
      category: "Power",
      sku: "PW-002",
      stock: 21,
      price: 399.99,
      description: "Power distribution panel with 12 outlets",
      supplier: "Power Systems Inc.",
      location: "Warehouse B, Shelf 2",
      weight: 1.2,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "PRD-0007",
      name: "Fiber Optic Transceiver",
      category: "Fiber Optical Materials",
      sku: "FO-002",
      stock: 14,
      price: 499.99,
      description: "High-speed fiber optic transceiver module",
      supplier: "FiberTech Inc.",
      location: "Data Center A, Rack 1",
      weight: 8.7,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "PRD-0008",
      name: "Miscellaneous Cable Ties",
      category: "Miscellaneous",
      sku: "MC-001",
      stock: 5,
      price: 12.99,
      description: "Assorted cable ties and management accessories",
      supplier: "Misc Supply Co.",
      location: "Warehouse D, Shelf 1",
      weight: 0.5,
      isActive: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: "PRD-0009",
      name: "Network Router",
      category: "Network Materials",
      sku: "NW-002",
      stock: 32,
      price: 79.99,
      description: "High-performance network router for enterprises",
      supplier: "Network Solutions",
      location: "Warehouse C, Shelf 3",
      weight: 0.8,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "PRD-0010",
      name: "RF Signal Generator",
      category: "RF Materials",
      sku: "RF-003",
      stock: 18,
      price: 249.99,
      description: "Precision RF signal generator for testing",
      supplier: "RF Tech Solutions",
      location: "Warehouse A, Shelf 2",
      weight: 0.9,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : defaultProducts;
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.sku.toLowerCase().includes(searchText) ||
        product.supplier?.toLowerCase().includes(searchText) ||
        product.location?.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All Categories" || product.category === category;

      const productStatus = product.stock === 0 ? "Out of Stock" : "In Stock";
      const matchesStatus = status === "All Status" || productStatus === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status, products]);

  // PAGINATION
  const productsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // HANDLERS
  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleStatus = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    const product = products.find((item) => String(item.id) === String(id));

    if (product) {
      const confirmed = window.confirm(`Delete "${product.name}"?`);
      if (confirmed) {
        const updatedProducts = products.filter((p) => String(p.id) !== String(id));
        setProducts(updatedProducts);
        localStorage.removeItem(`downloads_${id}`);
        alert("Product deleted successfully.");
      }
    }
  };

  const hasDownloads = (productId) => {
    try {
      const downloads = localStorage.getItem(`downloads_${productId}`);
      if (downloads) {
        const parsed = JSON.parse(downloads);
        return parsed.length > 0;
      }
      return false;
    } catch {
      return false;
    }
  };

  const getDownloadCount = (productId) => {
    try {
      const downloads = localStorage.getItem(`downloads_${productId}`);
      if (downloads) {
        const parsed = JSON.parse(downloads);
        return parsed.length;
      }
      return 0;
    } catch {
      return 0;
    }
  };

  // CATEGORY COUNTS
  const categories = useMemo(() => {
    const counts = {};
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [products]);

  // COLUMNS
  const columns = [
    {
      key: "id",
      label: "ID",
      render: (row) => <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{row.id}</span>,
    },
    {
      key: "name",
      label: "Product",
      render: (row) => (
        <div>
          <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{row.name}</span>
          {row.supplier && (
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>Supplier: {row.supplier}</div>
          )}
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (row) => (
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{row.category}</span>
      ),
    },
    {
      key: "sku",
      label: "SKU",
      render: (row) => (
        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{row.sku}</span>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (row) => (
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{row.location || "—"}</span>
      ),
    },
    {
      key: "stock",
      label: "Stock",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
            row.stock > 0 
              ? isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
              : isDark ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700'
          }`}
        >
          {row.stock > 0 ? "✓" : "✕"} {row.stock}
        </span>
      ),
    },
    {
      key: "downloads",
      label: "Downloads",
      render: (row) => {
        const count = getDownloadCount(row.id);
        return (
          <button
            type="button"
            onClick={() => navigate(`/dashboard/products/${row.id}`)}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
              count > 0
                ? isDark ? 'bg-purple-900 text-purple-300 hover:bg-purple-800' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                : isDark ? 'bg-gray-700 text-gray-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            📥 {count > 0 ? count : "0"}
          </button>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            row.isActive !== false
              ? isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
              : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${
            row.isActive !== false ? isDark ? 'bg-blue-400' : 'bg-blue-500' : isDark ? 'bg-gray-500' : 'bg-gray-400'
          }`} />
          {row.isActive !== false ? "Active" : "Inactive"}
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
            title="View Details"
            onClick={() => navigate(`/dashboard/products/${row.id}`)}
            className={`cursor-pointer rounded-lg border p-2 transition ${
              isDark 
                ? 'border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400' 
                : 'border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-500'
            }`}
          >
            👁️
          </button>
          <button
            type="button"
            title="Edit product"
            onClick={() => navigate(`/dashboard/products/edit/${row.id}`)}
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
            title="Delete product"
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
            Products
          </h1>
          <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your product catalog
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard/products/add")}
          className="relative z-[9999] cursor-pointer rounded-lg bg-[#C3110C] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#740A03]"
        >
          + Add Product
        </button>
      </div>

      {/* SEARCH & FILTERS */}
      <div className={`mb-6 rounded-xl border p-4 shadow-sm transition-colors duration-300 ${
        isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search products, suppliers, location..."
              className={`w-full rounded-lg border py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                isDark 
                  ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400' 
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            />
          </div>

          <select
            value={category}
            onChange={(e) => handleCategory(e.target.value)}
            className={`rounded-lg border px-4 py-3 text-sm outline-none focus:border-[#C3110C] ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white text-gray-600'
            }`}
          >
            <option>All Categories</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => handleStatus(e.target.value)}
            className={`rounded-lg border px-4 py-3 text-sm outline-none focus:border-[#C3110C] ${
              isDark 
                ? 'border-gray-600 bg-gray-700 text-white' 
                : 'border-gray-300 bg-white text-gray-600'
            }`}
          >
            <option>All Status</option>
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>

          <button
            type="button"
            onClick={() => {
              const data = JSON.stringify(products, null, 2);
              const blob = new Blob([data], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `products-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              URL.revokeObjectURL(url);
              alert("Products exported successfully!");
            }}
            className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
              isDark 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Export ↓
          </button>
        </div>
      </div>

      {/* CATEGORY SUMMARY */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <button
          type="button"
          onClick={() => handleCategory("All Categories")}
          className={`rounded-xl border p-4 text-left shadow-sm transition hover:border-[#C3110C] ${
            category === "All Categories"
              ? "border-[#C3110C] ring-1 ring-[#C3110C]"
              : isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}
        >
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>All Products</p>
          <p className={`mt-1 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {products.length}
          </p>
        </button>

        {categories.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => handleCategory(item.name)}
            className={`rounded-xl border p-4 text-left shadow-sm transition hover:border-[#C3110C] ${
              category === item.name
                ? "border-[#C3110C] ring-1 ring-[#C3110C]"
                : isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}
          >
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.name}</p>
            <p className={`mt-1 text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.count}</p>
          </button>
        ))}
      </div>

      {/* PRODUCT TABLE */}
      <DataTable
        columns={columns}
        data={paginatedProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={productsPerPage}
        totalItems={filteredProducts.length}
        startIndex={startIndex}
      />
    </div>
  );
};

export default Products;