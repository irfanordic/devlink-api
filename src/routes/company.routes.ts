import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { companyController } from "../controllers/company.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
const router = Router()

router.post('/create', authMiddleware, authorizeRoles(["COMPANY"]), companyController.createController)
router.get('/me', authMiddleware, authorizeRoles(['COMPANY']), companyController.getCompany)
router.patch('/me', authMiddleware, authorizeRoles(['COMPANY']), companyController.update)
router.delete('/me', authMiddleware, authorizeRoles(['COMPANY']), companyController.delete)

export default router