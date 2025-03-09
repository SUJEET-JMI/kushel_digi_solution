const express = require("express");
const { authMiddleware, checkRole } = require("../middleware/auth");
const Product = require("../models/Product");

const router = express.Router();

// Create Product (Only Seller)
router.post("/", authMiddleware, checkRole(["seller"]), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    // Validate input
    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new product
    const product = new Product({
      name,
      description,
      price,
      userId: req.user.id, // Ensure this is coming from authMiddleware
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error Creating Product:", error.message); // Log error
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get All Products (Both Seller & Buyer)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find().populate("userId", "name email");
    res.json(products);
  } catch (error) {
    console.error("Error Fetching Products:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Product (Only Owner)
router.put("/:id", authMiddleware, checkRole(["seller"]), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    if (product.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized - Not Owner" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error Updating Product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Product (Only Owner)
router.delete("/:id", authMiddleware, checkRole(["seller"]), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product Not Found" });

    if (product.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized - Not Owner" });
    }

    await product.deleteOne();
    res.json({ message: "Product Deleted Successfully" });
  } catch (error) {
    console.error("Error Deleting Product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
