import express from "express";
import { login, logout, me, register } from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authenticate, me);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
