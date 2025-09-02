import express from "express";
import { createBranch, deleteBranch, getAllBranches, getBranchById, updateBranch } from "../controllers/branch.controller.js";

const router = express.Router();

router.get("/", getAllBranches);
router.get("/:id", getBranchById);
router.post("/", createBranch);
router.put("/:id", updateBranch);
router.delete("/:id", deleteBranch);

export default router;