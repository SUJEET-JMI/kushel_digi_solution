import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct } from "../api/api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", description: "", price: "" });
  const navigate = useNavigate();
  
  const userRole = localStorage.getItem("role"); // Get user role from localStorage

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setUpdatedData({ name: product.name, description: product.description, price: product.price });
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(editingProduct, updatedData);
      alert("Product updated successfully");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Available Products</h1>
          {/* Hide "Add Product" button if user is a buyer */}
          {userRole !== "buyer" && (
            <button
              onClick={() => navigate("/add-product")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition duration-300"
            >
              + Add Product
            </button>
          )}
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-95 hover:scale-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={updatedData.name}
              onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
              className="w-full border border-gray-200 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={updatedData.description}
              onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
              className="w-full border border-gray-200 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="4"
            />
            <input
              type="number"
              placeholder="Price"
              value={updatedData.price}
              onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
              className="w-full border border-gray-200 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
