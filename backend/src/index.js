import express from "express"
import authRoutes from '../src/routes/auth.routes.js'
import { connectDB } from "./lib/db.js"
import dotenv from 'dotenv';
import cookie_parser from 'cookie-parser'
import messageRoutes from '../src/routes/message.routes.js'
import cors from 'cors'
import {app,server} from '../src/lib/socket.js'


dotenv.config()
const PORT = process.env.PORT

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookie_parser())
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB()
})