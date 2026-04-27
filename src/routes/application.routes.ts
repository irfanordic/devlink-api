import {Router} from 'express'
import { ApplicationController } from '../controllers/application.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { applicationSchema , updateApplicationStatusSchema} from '../validators/application.validator.js';

const router = Router()


router.post('/:id/apply', 
  authMiddleware, 
  authorizeRoles(['DEVELOPER']), 
  validate(applicationSchema),
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
router.patch('/:id/status', 
    authMiddleware, 
    authorizeRoles(['COMPANY']), 
    validate(updateApplicationStatusSchema),
    ApplicationController.updateStatus
);

export default router