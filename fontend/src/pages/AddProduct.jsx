import { useState } from "react";
import { addProduct } from "../api/api";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert price to a number and validate
    const productData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
    };

    if (!productData.name || !productData.description || isNaN(productData.price) || productData.price <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    try {
      await addProduct(productData);
      alert("Product added successfully!");
      setFormData({ name: "", description: "", price: "" }); // Clear form after submission
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition duration-300"
          >
            ✅ Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
