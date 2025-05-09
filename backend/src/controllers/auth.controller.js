import cloudinary from "../lib/cloudinary.js"
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

export const login = async(req,res)=>{
    const {email,password}= req.body
    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                message:'Invalid Credentials'
            })
        }

        const isValidPassword = await bcrypt.compare(password,user.password)

        if(!isValidPassword){
            return res.status(400).json({
                message:'Invalid Credentials'
            })
        }

        generateToken(user._id,res)
                res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
            createdAt:user.createdAt
        })

    }
    catch(error){
        console.log("Error in login",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })

    }
}

export const logout =(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})
        return res.status(200).json({
            message:'logout Successfully'
        })

    }
    catch{
        console.log("Error in logout",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

export const updateProfile= async(req,res)=>{
    try{
        const {profilePic}=req.body
        const userId = req.user._id

        if(!profilePic) res.status(400).json({
            message:'Profile Pic Required'
        })

        const uplodeResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId,
            {profilePic:uplodeResponse.secure_url},
            {new:true}
        )

        res.status(200).json(updatedUser)
    }
    catch(error){
        console.log("Error while updating Profile Pic",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })

    }
}


export const updateFullName = async(req,res)=>{

    try{
        const {fullName}=req.body
        const userId = req.user._id

        const updateFullName = await User.findByIdAndUpdate(userId,{fullName:fullName},
            {new:true}
        )
        res.status(200).json(updateFullName)

    }
    catch(err){
        console.log("Error while updating FullName",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}


export const aboutInfo= async(req,res)=>{
    try{
        const {about}=req.body
        const userId = req.user._id

        const  aboutInfo = await User.findByIdAndUpdate(userId,{about:about},{new:true})
        res.status(200).json(aboutInfo)
    }
    catch(err){
        console.log("Error while adding about",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

export const checkAuth = (req,res) => {
    try{
        res.status(200).json(req.user)
    }
    catch(error){
        console.log("Error in CheckAuth",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }

}

export const deleteAccount=async(req,res)=>{
   try{
    const userId = req.user._id

    const deleteInfo = await User.findByIdAndDelete(userId)
    res.status(200).json(deleteInfo)

   }
   catch(err){
        console.log("Error while deleting the account",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })
   }
}