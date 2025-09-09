import express from "express";
import protect from "../middleware/auth.middleware.js";
import { createIngredient, deleteIngredient, getAllIngredients, getIngredientById, updateIngredient } from "../controllers/ingredient.controller.js";

const router = express.Router();

router.get("/", protect, getAllIngredients);
router.get("/:id", protect, getIngredientById);
router.post("/", protect, createIngredient);
router.put("/:id", protect, updateIngredient);
router.delete("/:id", protect, deleteIngredient);

export default router;