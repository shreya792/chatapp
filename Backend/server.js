
import express from 'express';
import path from 'path'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connecttodb from '../db/connecttodb.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.routes.js'
import userRoute from './routes/users.routes.js'
import { app, server } from './socket/socket.js';

const PORT = process.env.PORT || 5000
const __dirname=path.resolve();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)
app.use("/api/users",userRoute)
app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})




server.listen(PORT,()=>{
    connecttodb();
    console.log(`server is running on  ${PORT}`);
})