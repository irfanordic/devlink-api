import { Router } from 'express'
import { S3controller } from '../controllers/s3.controllers.js'
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = Router()

router.get('/upload-url', authMiddleware, S3controller.generatePreSignedUrl)