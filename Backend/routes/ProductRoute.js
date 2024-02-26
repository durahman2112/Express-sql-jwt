import express from "express";

import {
  getProduct,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Product.js";

const router = express.Router();

router.get("/product", getProduct);
router.get("/product/:id", getProductId);
router.post("/create-product", createProduct);
router.patch("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
