import mongoose from "mongoose";
const messageSchema =new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,

        ref:"User",
        require:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,

        ref:"User",
        require:true
    },
    message:{
    
type:"string",
    
        require:true,
    },//created,updatat=>message.createdAt :8.19 that is time of mesaage sent
},{timestamps:true})
const Message=mongoose.model("Message",messageSchema)
export default Message; 