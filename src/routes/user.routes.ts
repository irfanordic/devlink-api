import Router from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { LinkController } from "../controllers/link.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { partialSchema } from "../validators/auth.validator.js";

const router = Router()

router.get('/profile', authMiddleware, (req, res)=>{
    console.log((req as any).user)
  res.json({message: "This is a protected route",  userId: (req as any).user.id, role: (req as any).user.role})
})

router.post('/links', authMiddleware, LinkController.createLink)
router.get("/links", authMiddleware, LinkController.getLink)
router.delete("/links/:id", authMiddleware, LinkController.deleteLink)
router.patch("/links/:id", authMiddleware, validate(partialSchema), LinkController.updateLink)
router.get("/links/:id",  LinkController.getLinkById)
export default router