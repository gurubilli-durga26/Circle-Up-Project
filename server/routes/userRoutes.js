import { Router } from "express";
import {
  profile,
  updateProfile,
  notifications,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", protect, profile);
router.put("/profile", protect, updateProfile);
router.get("/notifications", protect, notifications);

export default router;
