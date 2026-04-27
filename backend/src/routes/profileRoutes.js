import express from "express";
import {
  getMyProfile,
  getPublicProfile,
  updateProfile,
  upsertProfile
} from "../controllers/profileController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", authenticate, getMyProfile);
router.post("/", authenticate, upsertProfile);
router.put("/", authenticate, updateProfile);
router.get("/:username", getPublicProfile);

export default router;
