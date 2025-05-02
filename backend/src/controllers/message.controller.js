import cloudinary from "../lib/cloudinary.js"
import { getReciverSocketId,io } from "../lib/socket.js"
import User from "../models/auth.models.js"
import Message from "../models/message.models.js"

export const getUserForSideBar = async(req,res)=>{
    try{
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    }
    catch(error){
        console.log("Error in getUserForSideBar",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })

    }
}

export const getMessage = async(req,res)=>{
    try{

        const {id:userToChatId}= req.params
        const myId = req.user._id

        const message = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })

        res.status(200).json(message)

    }
    catch(error){
        console.log("Error in getMessage",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }
}

export const sendMessage = async (req,res) => {

    try{
        const {text,image}=req.body
        const {id:receiverId}=req.params
        const senderId = req.user._id

        let imageURL
        if(image){
            const uploadeImage = await cloudinary.uploader.upload(image)
            imageURL = uploadeImage.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageURL
        })

        await newMessage.save()

        const receiverSocketId = getReciverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.status(201).json(newMessage)
    }
    catch(error){
        console.log("Error in sendMessage",error.message)
        res.status(500).json({
            message:'Internal Server Error'
        })
    }

}


export const clearMessages =async (req,res) => {

    try{
        const {id:userToChatId}= req.params
        const myId = req.user._id

        await Message.deleteMany({
            $or: [
              { senderId: myId, receiverId: userToChatId },
              { senderId: userToChatId, receiverId: myId }
            ]
          });

          res.status(200).json({ message: 'Messages cleared successfully.' });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Failed to clear messages.' });
    }

}