import express from "express";
import { createProduct, deleteMultipleProducts, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllProducts);
router.get("/:id", protect, getProductById);
router.post("/", protect, upload.single("product_image"), createProduct);
router.put("/:productId", protect, upload.single("product_image"), updateProduct);
router.delete("/:id", protect, deleteProduct);
router.post("/bulk-delete", protect, deleteMultipleProducts);

export default router;