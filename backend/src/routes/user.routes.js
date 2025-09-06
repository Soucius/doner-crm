import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser, updateUserBranch } from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUserById);
router.post("/", createUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.post("/signin", loginUser);
router.put("/:userId/branch", protect, updateUserBranch);

export default router;