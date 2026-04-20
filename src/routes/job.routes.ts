import {Router } from "express";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { JobController } from "../controllers/job.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = Router()

router.post('/post', authMiddleware,  JobController.createJob)

export default router