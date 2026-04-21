import {Router } from "express";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { JobController } from "../controllers/job.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = Router()

router.post('/post', authMiddleware,authorizeRoles(['ADMIN']),  JobController.createJob)
router.get('/all', JobController.getJobs)
router.patch('/update/:id', authMiddleware, authorizeRoles(['ADMIN']), JobController.updateJob)
router.delete('/delete/:id', authMiddleware, authorizeRoles(['ADMIN']), JobController.delete)
router.get('/:id', authMiddleware, JobController.getJobById)
export default router