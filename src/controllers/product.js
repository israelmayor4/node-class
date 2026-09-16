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

export const getAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).json({
      status: true,
      message: "Get product Successfully",
      productLength: product.length,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "error.message" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {

    console.log("req.params", req.params);
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ status: false, message: "Product not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Get product Successfully",
      product,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not Found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "product updated Successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};


// export default {
//   addProduct,
//   getProduct,
//   getSingleProduct
// };