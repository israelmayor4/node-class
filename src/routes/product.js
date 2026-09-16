import express from "express";
import { addProduct, getAllProduct, getSingleProduct, updateProduct } from "../controllers/product.js";

const route = express.Router();

route.post("/", addProduct);
route.get("/", getAllProduct);
route.get("/:id", getSingleProduct);
route.put("/:id", updateProduct)

export default route;