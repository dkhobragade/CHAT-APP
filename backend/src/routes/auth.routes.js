import express from "express"
import { signUp,login,logout,updateProfile,checkAuth, updateFullName,aboutInfo ,deleteAccount} from '../controllers/auth.controller.js'
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup",signUp)

router.post("/login",login)

router.post("/logout",logout)

router.put("/update-profile", protectRoute, updateProfile)

router.put("/update-fullName", protectRoute, updateFullName)

router.put("/about",protectRoute,aboutInfo)

router.get('/check',protectRoute,checkAuth)

router.put("/delete",protectRoute,deleteAccount)

export default router