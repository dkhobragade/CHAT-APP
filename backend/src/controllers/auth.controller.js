import { generateToken } from "../lib/utils.js"
import User from "../models/auth.models.js"
import bcrypt from 'bcryptjs'

export const signUp = async(req,res)=>{

    const {fullName,email,password}=req.body
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({
                message:'All field required'
            })
        }

        if (password.length < 6){
            return res.status(400).json({
                message:'Password Must be alteast 6 characters'
            })
        }

        const user = await User.findOne({email})

        if (user) return res.status(400).json({
            message:'Email already exists'
        })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password:hashedPassword
        })

        if (newUser){
            //generate the jwt token
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })

        }
        else{
            return res.status(400).json({
                message:'Invalid user data'
            })
        }

    }
    catch(error){
        console.log("Error in signUp",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }

}

export const login =(req,res)=>{
    res.send("login")
}

export const logout =(req,res)=>{
    res.send("logout")
}