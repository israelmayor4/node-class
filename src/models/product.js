import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    minlength: [3, "Title must be at least 3 character long"],
    maxLength: [30, "Title must not be much than 30 Character"],
  },
  description: {
    type: String,
    required: true,
    minlength: [10, "Title must be 6 character long"],
    maxlength: [300, "Title must not be much than 12 Character"],
  },
  price: {
    type: Number,
    min: [100, "The price must be grater than 100"],
    max: [1000000, "Price can not be greater than 1000000"],
    required: true,
  },
  category: {
    type: String,
    enum: ["phone", "laptops", "tab", "power bank"],
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  stock: {
    type: Number,
    required: [true, "Stock is required"],
    min: [1, "Stock can not be less than 1"],
    max: [1000, "Stock can not be greater than 1000"],
    default: 0,
  },
  
},
    {
    timestamps: true
     }
)

export default mongoose.model("product", productSchema);
