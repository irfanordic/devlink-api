import {Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { ProfileController } from "../controllers/profile.controller.js";
const router = Router()


router.post('/', authMiddleware, ProfileController.upsert)
router.patch('/', authMiddleware,  ProfileController.upsert)

export default router