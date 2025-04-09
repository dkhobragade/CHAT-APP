import express from "express"
import authRoutes from '../src/routes/auth.routes.js'
import { connectDB } from "./lib/db.js"
import dotenv from 'dotenv';
import cookie_parser from 'cookie-parser'
import messageRoutes from '../src/routes/message.routes.js'


dotenv.config()
const app = express()
const PORT = process.env.PORT


app.use(express.json())
app.use(cookie_parser())
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
    connectDB()
})