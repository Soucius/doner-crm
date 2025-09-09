import express from "express";
import { getAllUnits, createUnit, updateUnit, deleteUnit, getUnitById } from "../controllers/unit.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllUnits);
router.get("/:id", protect, getUnitById);
router.post("/", protect, createUnit);
router.put("/:id", protect, updateUnit);
router.delete("/:id", protect, deleteUnit);

export default router;