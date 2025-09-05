import express from "express";
import { createProduct, deleteMultipleProducts, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("product_image"), createProduct);
router.put("/:productId", upload.single("product_image"), updateProduct);
router.delete("/:id", deleteProduct);
router.post("/bulk-delete", deleteMultipleProducts);

export default router;