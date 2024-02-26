import express from "express";

import {
  getProduct,
  getProductId,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Product.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/product", verifyUser, getProduct);
router.get("/product/:id", verifyUser, getProductId);
router.post("/create-product", verifyUser, createProduct);
router.patch("/update-product/:id", verifyUser, updateProduct);
router.delete("/delete-product/:id", verifyUser, deleteProduct);

export default router;
