import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { getMessage, getUserForSideBar, sendMessage, clearMessages } from '../controllers/message.controller.js'

const router = express.Router()

router.get('/users',protectRoute,getUserForSideBar)

router.get('/:id',protectRoute,getMessage)

router.post("/send/:id",protectRoute,sendMessage)

router.post('/clear-Messages/:id',protectRoute,clearMessages)

export default router

