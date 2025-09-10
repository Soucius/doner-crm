import express from "express";
import { createSale, getAllSales, getSaleById } from "../controllers/sale.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createSale);
router.get("/", protect, getAllSales);
router.get("/:id", protect, getSaleById);

export default router;