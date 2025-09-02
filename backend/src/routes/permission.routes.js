import express from "express";
import { createPermission, deletePermission, getAllPermissions, getPermissionById, updatePermission } from "../controllers/permission.controller.js";

const router = express.Router();

router.get("/", getAllPermissions);
router.get("/:id", getPermissionById);
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);

export default router;