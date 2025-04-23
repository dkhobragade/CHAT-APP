import express from "express"
import authRoutes from '../src/routes/auth.routes.js'
import { connectDB } from "./lib/db.js"
import dotenv from 'dotenv';
import cookie_parser from 'cookie-parser'
import messageRoutes from '../src/routes/message.routes.js'
import cors from 'cors'
import {app,server} from '../src/lib/socket.js'
import path from 'path'

dotenv.config()
const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookie_parser())

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB()
})