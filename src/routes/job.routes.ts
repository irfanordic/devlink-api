import {Router } from "express";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { JobController } from "../controllers/job.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createJobSchema, updateJobSchema, jobQuerySchema } from "../validators/job.validator.js";
const router = Router()

router.post('/post', authMiddleware,authorizeRoles(['ADMIN']),validate(createJobSchema), JobController.createJob)
router.get('/all', validate(jobQuerySchema), JobController.getJobs)
router.patch('/update/:id', authMiddleware, authorizeRoles(['ADMIN']), validate(updateJobSchema), JobController.updateJob)
router.delete('/delete/:id', authMiddleware, authorizeRoles(['ADMIN']), JobController.delete)
router.get('/:id', authMiddleware, JobController.getJobById)
export default router