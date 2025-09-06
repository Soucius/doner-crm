import express from "express";
import { createBranch, deleteBranch, getAllBranches, getBranchById, updateBranch } from "../controllers/branch.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllBranches);
router.get("/:id", protect, getBranchById);
router.post("/", protect, createBranch);
router.put("/:id", protect, updateBranch);
router.delete("/:id", protect, deleteBranch);

export default router;