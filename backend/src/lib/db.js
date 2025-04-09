import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`connection Established:${conn.connection.host}`)
    }
    catch(err){
        console.log("Error while connecting with database")
    }
}