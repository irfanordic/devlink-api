import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { companyController } from "../controllers/company.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import  {companyCreateSchema, companyUpdateSchema}  from "../validators/company.validator.js";
const router = Router()

router.post('/create', authMiddleware, authorizeRoles(["COMPANY"]), validate(companyCreateSchema), companyController.createController)
router.get('/me', authMiddleware, authorizeRoles(['COMPANY']), companyController.getCompany)
router.patch('/me', authMiddleware, authorizeRoles(['COMPANY']), validate(companyUpdateSchema), companyController.update)
router.delete('/me', authMiddleware, authorizeRoles(['COMPANY']), companyController.delete)

export default router