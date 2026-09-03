import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddDownload, setShowAddDownload] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [newDownload, setNewDownload] = useState({
    name: "",
    description: "",
    fileUrl: "",
    fileSize: "",
    type: "datasheet",
  });

  const downloadsRef = useRef(null);

  const defaultDownloads = [
    {
      id: "DL-0001",
      name: "Product Datasheet",
      description: "Complete technical specifications and features",
      fileUrl: "/downloads/datasheet.pdf",
      fileSize: "2.4 MB",
      type: "datasheet",
      uploadDate: new Date().toISOString(),
    },
    {
      id: "DL-0002",
      name: "User Manual",
      description: "Installation and user guide",
      fileUrl: "/downloads/manual.pdf",
      fileSize: "4.1 MB",
      type: "manual",
      uploadDate: new Date().toISOString(),
    },
    {
      id: "DL-0003",
      name: "Firmware Update v2.1",
      description: "Latest firmware with performance improvements",
      fileUrl: "/downloads/firmware.bin",
      fileSize: "8.3 MB",
      type: "firmware",
      uploadDate: new Date().toISOString(),
    },
  ];

  const [downloads, setDownloads] = useState(() => {
    try {
      const savedDownloads = localStorage.getItem(`downloads_${id}`);
      return savedDownloads ? JSON.parse(savedDownloads) : defaultDownloads;
    } catch (error) {
      return defaultDownloads;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`downloads_${id}`, JSON.stringify(downloads));
    } catch (error) {
      console.error("Error saving downloads:", error);
    }
  }, [downloads, id]);

  useEffect(() => {
    try {
      const savedProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      const foundProduct = savedProducts.find(
        (p) => String(p.id) === String(id)
      );
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        alert("Product not found");
        navigate("/dashboard/products");
      }
    } catch (error) {
      console.error("Error loading product:", error);
      navigate("/dashboard/products");
    }
    setLoading(false);
  }, [id, navigate]);

  const scrollToDownloads = () => {
    setActiveTab("downloads");
    setTimeout(() => {
      if (downloadsRef.current) {
        downloadsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleDelete = () => {
    if (!product) return;
    
    const confirmed = window.confirm(`Delete "${product.name}"?`);
    if (confirmed) {
      try {
        const savedProducts = JSON.parse(
          localStorage.getItem("products") || "[]"
        );
        const updatedProducts = savedProducts.filter(
          (p) => String(p.id) !== String(id)
        );
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        localStorage.removeItem(`downloads_${id}`);
        alert("Product deleted successfully.");
        navigate("/dashboard/products");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product.");
      }
    }
  };

  const handleAddDownload = (e) => {
    e.preventDefault();
    
    if (!newDownload.name.trim() || !newDownload.fileUrl.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const download = {
      id: `DL-${String(downloads.length + 1).padStart(4, '0')}`,
      ...newDownload,
      uploadDate: new Date().toISOString(),
    };

    setDownloads([download, ...downloads]);
    setNewDownload({
      name: "",
      description: "",
      fileUrl: "",
      fileSize: "",
      type: "datasheet",
    });
    setShowAddDownload(false);
    alert("Download added successfully!");
  };

  const handleDeleteDownload = (downloadId) => {
    const confirmed = window.confirm("Delete this download?");
    if (confirmed) {
      const updatedDownloads = downloads.filter((d) => d.id !== downloadId);
      setDownloads(updatedDownloads);
      alert("Download deleted successfully.");
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      datasheet: isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-700",
      manual: isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-700",
      firmware: isDark ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-700",
      software: isDark ? "bg-orange-900 text-orange-300" : "bg-orange-100 text-orange-700",
      other: isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700",
    };
    return colors[type] || colors.other;
  };

  const getTypeIcon = (type) => {
    const icons = {
      datasheet: "📄",
      manual: "📖",
      firmware: "⚙️",
      software: "💻",
      other: "📎",
    };
    return icons[type] || icons.other;
  };

  if (loading) {
    return (
      <div className={`min-h-screen p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center">
          <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center">
          <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>Product not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/dashboard/products")}
              className={`mb-2 flex items-center gap-2 text-sm transition ${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ← Back to Products
            </button>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{product.name}</h1>
            <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Product ID: {product.id}</p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate(`/dashboard/products/edit/${product.id}`)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ✏️ Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                isDark 
                  ? 'border-red-700 text-red-400 hover:bg-red-900' 
                  : 'border-red-300 text-red-600 hover:bg-red-50'
              }`}
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`mb-6 flex gap-2 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === "info"
                ? "border-b-2 border-[#C3110C] text-[#C3110C]"
                : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📋 Product Info
          </button>
          <button
            type="button"
            onClick={scrollToDownloads}
            className={`px-4 py-2 text-sm font-medium transition ${
              activeTab === "downloads"
                ? "border-b-2 border-[#C3110C] text-[#C3110C]"
                : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            📥 Downloads ({downloads.length})
          </button>
        </div>

        {/* Product Details */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Info */}
          <div className="md:col-span-2">
            <div className={`rounded-xl border p-6 shadow-sm transition-colors duration-300 ${
              isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <h2 className={`mb-4 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Product Information
              </h2>
              
              <div className="space-y-4">
                <div className={`grid grid-cols-3 gap-4 border-b pb-3 ${
                  isDark ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Name</span>
                  <span className={`col-span-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{product.name}</span>
                </div>
                
                <div className={`grid grid-cols-3 gap-4 border-b pb-3 ${
                  isDark ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Category</span>
                  <span className="col-span-2 text-sm text-gray-900">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {product.category}
                    </span>
                  </span>
                </div>
                
                <div className={`grid grid-cols-3 gap-4 border-b pb-3 ${
                  isDark ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>SKU</span>
                  <span className={`col-span-2 text-sm font-mono ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {product.sku}
                  </span>
                </div>
                
                <div className={`grid grid-cols-3 gap-4 border-b pb-3 ${
                  isDark ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Stock</span>
                  <span className="col-span-2">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                        product.stock > 0
                          ? isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                          : isDark ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.stock > 0 ? "✓ In Stock" : "✕ Out of Stock"}
                      <span className="font-normal">({product.stock} units)</span>
                    </span>
                  </span>
                </div>
                
                <div className={`grid grid-cols-3 gap-4 border-b pb-3 ${
                  isDark ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Price</span>
                  <span className={`col-span-2 text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ${product.price?.toFixed(2) || "0.00"}
                  </span>
                </div>
                
                <div className={`grid grid-cols-3 gap-4 border-b pb-3 ${
                  isDark ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Supplier</span>
                  <span className={`col-span-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {product.supplier || "—"}
                  </span>
                </div>
                
                <div className={`grid grid-cols-3 gap-4 border-b pb-3 ${
                  isDark ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Location</span>
                  <span className={`col-span-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {product.location || "—"}
                  </span>
                </div>
                
                <div className={`grid grid-cols-3 gap-4 border-b pb-3 ${
                  isDark ? 'border-gray-700' : 'border-gray-100'
                }`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Weight</span>
                  <span className={`col-span-2 text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {product.weight ? `${product.weight} kg` : "—"}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</span>
                  <span className="col-span-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        product.isActive !== false
                          ? isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
                          : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          product.isActive !== false 
                            ? isDark ? 'bg-blue-400' : 'bg-blue-500' 
                            : isDark ? 'bg-gray-500' : 'bg-gray-400'
                        }`}
                      />
                      {product.isActive !== false ? "Active" : "Inactive"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Description */}
            <div className={`rounded-xl border p-6 shadow-sm transition-colors duration-300 ${
              isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <h2 className={`mb-3 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </h2>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.description || "No description provided."}
              </p>
            </div>

            {/* Timestamps */}
            <div className={`rounded-xl border p-6 shadow-sm transition-colors duration-300 ${
              isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <h2 className={`mb-3 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Additional Info
              </h2>
              <div className={`space-y-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleString()
                    : "—"}
                </div>
                <div>
                  <span className="font-medium">Last Modified:</span>{" "}
                  {product.updatedAt
                    ? new Date(product.updatedAt).toLocaleString()
                    : "—"}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`rounded-xl border p-6 shadow-sm transition-colors duration-300 ${
              isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <h2 className={`mb-3 text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Quick Actions
              </h2>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => navigate(`/dashboard/products/edit/${product.id}`)}
                  className={`w-full rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    isDark 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  ✏️ Edit Product
                </button>
                <button
                  type="button"
                  onClick={scrollToDownloads}
                  className="w-full rounded-lg border border-[#C3110C] px-4 py-2 text-sm font-medium text-[#C3110C] transition hover:bg-[#C3110C] hover:text-white"
                >
                  📥 View Downloads ({downloads.length})
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className={`w-full rounded-lg border px-4 py-2 text-sm font-medium transition ${
                    isDark 
                      ? 'border-red-700 text-red-400 hover:bg-red-900' 
                      : 'border-red-300 text-red-600 hover:bg-red-50'
                  }`}
                >
                  🗑️ Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DOWNLOADS SECTION */}
        <div ref={downloadsRef} className="mt-8">
          <div className={`rounded-xl border shadow-sm transition-colors duration-300 ${
            isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
          }`}>
            {/* Downloads Header */}
            <div className={`flex items-center justify-between border-b px-6 py-4 ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  📥 Downloads & Resources
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Downloadable files for this product
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddDownload(!showAddDownload)}
                className="rounded-lg bg-[#C3110C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#740A03]"
              >
                {showAddDownload ? "Cancel" : "+ Add Download"}
              </button>
            </div>

            {/* Add Download Form */}
            {showAddDownload && (
              <div className={`border-b p-6 ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                <form onSubmit={handleAddDownload} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        File Name *
                      </label>
                      <input
                        type="text"
                        value={newDownload.name}
                        onChange={(e) =>
                          setNewDownload({ ...newDownload, name: e.target.value })
                        }
                        placeholder="e.g., Product Datasheet"
                        className={`w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                          isDark 
                            ? 'border-gray-600 bg-gray-600 text-white placeholder-gray-400' 
                            : 'border-gray-300 bg-white text-gray-900'
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        File Type
                      </label>
                      <select
                        value={newDownload.type}
                        onChange={(e) =>
                          setNewDownload({ ...newDownload, type: e.target.value })
                        }
                        className={`w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-[#C3110C] ${
                          isDark 
                            ? 'border-gray-600 bg-gray-600 text-white' 
                            : 'border-gray-300 bg-white text-gray-900'
                        }`}
                      >
                        <option value="datasheet">📄 Datasheet</option>
                        <option value="manual">📖 Manual</option>
                        <option value="firmware">⚙️ Firmware</option>
                        <option value="software">💻 Software</option>
                        <option value="other">📎 Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        File URL *
                      </label>
                      <input
                        type="text"
                        value={newDownload.fileUrl}
                        onChange={(e) =>
                          setNewDownload({ ...newDownload, fileUrl: e.target.value })
                        }
                        placeholder="/downloads/file.pdf"
                        className={`w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                          isDark 
                            ? 'border-gray-600 bg-gray-600 text-white placeholder-gray-400' 
                            : 'border-gray-300 bg-white text-gray-900'
                        }`}
                        required
                      />
                    </div>
                    <div>
                      <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        File Size
                      </label>
                      <input
                        type="text"
                        value={newDownload.fileSize}
                        onChange={(e) =>
                          setNewDownload({ ...newDownload, fileSize: e.target.value })
                        }
                        placeholder="e.g., 2.4 MB"
                        className={`w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                          isDark 
                            ? 'border-gray-600 bg-gray-600 text-white placeholder-gray-400' 
                            : 'border-gray-300 bg-white text-gray-900'
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`mb-1 block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Description
                    </label>
                    <input
                      type="text"
                      value={newDownload.description}
                      onChange={(e) =>
                        setNewDownload({ ...newDownload, description: e.target.value })
                      }
                      placeholder="Brief description of this file"
                      className={`w-full rounded-lg border px-4 py-2 text-sm outline-none focus:border-[#C3110C] focus:ring-2 focus:ring-[#C3110C]/20 ${
                        isDark 
                          ? 'border-gray-600 bg-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300 bg-white text-gray-900'
                      }`}
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-lg bg-[#C3110C] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#740A03]"
                    >
                      Upload Download
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Downloads List */}
            <div className="p-6">
              {downloads.length > 0 ? (
                <div className="space-y-3">
                  {downloads.map((download) => (
                    <div
                      key={download.id}
                      className={`flex items-center justify-between rounded-lg border p-4 transition hover:shadow-md ${
                        isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${
                          isDark ? 'bg-gray-600' : 'bg-gray-100'
                        }`}>
                          {getTypeIcon(download.type)}
                        </div>
                        <div>
                          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {download.name}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span
                              className={`rounded-full px-2 py-0.5 font-medium ${getTypeColor(
                                download.type
                              )}`}
                            >
                              {download.type}
                            </span>
                            {download.fileSize && (
                              <span>📦 {download.fileSize}</span>
                            )}
                            <span>
                              📅 {new Date(download.uploadDate).toLocaleDateString()}
                            </span>
                          </div>
                          {download.description && (
                            <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              {download.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={download.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-[#C3110C] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#740A03]"
                        >
                          ⬇️ Download
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteDownload(download.id)}
                          className={`rounded-lg border px-3 py-2 text-sm transition ${
                            isDark 
                              ? 'border-red-700 text-red-400 hover:bg-red-900' 
                              : 'border-red-300 text-red-600 hover:bg-red-50'
                          }`}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">📂</div>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    No downloads available for this product
                  </p>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Click "Add Download" to upload files
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;