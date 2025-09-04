import express from "express";
import { createContactMessage, getAllContactMessages } from "../controllers/contact.controller.js";

const router = express.Router();

router.get("/", getAllContactMessages);
router.post("/", createContactMessage);

export default router;