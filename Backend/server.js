
import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connecttodb from '../db/connecttodb.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.routes.js'
import userRoute from './routes/users.routes.js'
const app=express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoute)
app.use("/api/users",userRoute)
const PORT = process.env.PORT || 5000
// app.get("/" ,(req,res)=>{
//     // root route
//     res.send("hello world 111")
// })

// if we do like this then it becomes so messy so here middleware is used 
// app.get("/api/auth/signup" ,(req,res)=>{
//     console.log("signup route");
// })
// app.get("/api/auth/login" ,(req,res)=>{
//     console.log("login route");
// })
// app.get("/api/auth/logout" ,(req,res)=>{
//     console.log("logout route");
// })



app.listen(PORT,()=>{
    connecttodb();
    console.log(`server is running on  ${PORT}`);
})