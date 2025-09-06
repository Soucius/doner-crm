import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/category.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllCategories);
router.get("/:id", protect, getCategoryById);
router.post("/", protect, createCategory);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;