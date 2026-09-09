import Product from "../models/product.js";

export const addProduct = async (req, res) => {
  try {
    const { title, price, description, category, image, stock } = req.body;
    if (!title || !price || !description || !category || !image || !stock) {
      return res
        .status(400)
        .json({ status: false, message: "All Field Are required" });
    }

    const product = await Product.create(req.body);
    res.status(201).json({ status: true, message: "Product added successfully", product });
  } catch (error) {
    console.log("Error in addProduct controller", error.message);
    res.status(400).json({ status: false, message: error.message });
  }
}