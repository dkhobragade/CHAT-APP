import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { sendEmail } from '../controllers/email.controller.js'

const router = express.Router()

router.post("/send-email",protectRoute,sendEmail)

export default router