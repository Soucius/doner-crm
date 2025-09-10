import express from "express";
import { createSale } from "../controllers/sale.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createSale);

export default router;