import express from "express"
import { signUp,login,logout,updateProfile,checkAuth, updateFullName } from '../controllers/auth.controller.js'
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup",signUp)

router.post("/login",login)

router.post("/logout",logout)

router.put("/update-profile", protectRoute, updateProfile)

router.put("/update-fullName", protectRoute, updateFullName)

router.get('/check',protectRoute,checkAuth)

export default router