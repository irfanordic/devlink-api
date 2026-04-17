import { AuthController } from "../controllers/auth.controller.js";
import { Router} from "express";
import { validate } from "../middleware/validate.middleware.js";
import  { signupSchema, loginSchema } from "../validators/auth.validator.js";

const router = Router()

router.post("/signup", validate(signupSchema), AuthController.signup)
router.post("/login", validate(loginSchema), AuthController.login)

export default router
