import jwt  from "jsonwebtoken";
import User from "../models/auth.models.js";


export const protectRoute= async(req,res,next)=>{

    try{

        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({
                message:'Unauthorized - No token Provided'
            })
        }

        const decodeToken = jwt.verify(token,process.env.JWT_SCRET)

        if(!decodeToken){
            return res.status(404).json({
                message:'Invalid Token'
            })
        }

        const user = await User.findById(decodeToken.userID).select('-password')

        if(!user){
            return res.status(404).json({
                message:'User Not Found'
            })
        }

        req.user = user
        next()

    }
    catch(error){
        console.log("Error in middleware",error.message)
        return res.status(500).json({
            message:'Internal Error'
        })
    }

}