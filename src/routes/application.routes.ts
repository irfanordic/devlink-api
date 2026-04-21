import {Router} from 'express'
import { ApplicationController } from '../controllers/application.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';


const router = Router()


router.post('/:id/apply', 
  authMiddleware, 
  authorizeRoles(['DEVELOPER']), 
  ApplicationController.apply
);

router.get('/my-applications', 
  authMiddleware, 
  authorizeRoles(['DEVELOPER']), 
  ApplicationController.myApplications
);

router.get('/job/:id', 
  authMiddleware, 
  authorizeRoles(['COMPANY']), 
  ApplicationController.getApplicants
);

export default router