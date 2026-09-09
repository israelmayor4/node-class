import express from "express";
import { addProduct } from "../controllers/product.js";

const route = express.Router();

route.post("/", addProduct);

export default route;