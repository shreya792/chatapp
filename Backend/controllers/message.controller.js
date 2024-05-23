import Conversation from "../models/converstaion.model.js";
import Message from "../models/message.model.js";

export const sendMessage =async (req,res)=>{
    console.log("message sent" , req.params.id);

    try {
        const {message}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        let converstaion=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        })
        if(!converstaion){
          
        converstaion = new Conversation({
                participants: [senderId, receiverId],
                messages: [], // Initialize messages array
    
            })
    }
        // Create a new message
        const newMessage= new Message({
            senderId,
            receiverId,
            message,
        })
       
      
        await newMessage.save();

        // Add the message to the conversation
        converstaion.messages.push(newMessage._id);
        await converstaion.save();

        
        res.status(201).json(newMessage)
        
    } catch (error) {
        console.log("error in sendmessage controller ",error.message);
        res.status(500).json({error:"Internal server error"});

        
    }
}
export const getMessage = async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages")
        // populate returns actual messages instead of returning message id

if(!conversation){

    return res.status(200).json([]);

}
const messages=conversation.messages

        res.status(200).json(messages);
    } catch (error) {
        console.log("error in sendmessage controller ",error.message);
        res.status(500).json({error:"Internal server error"});
    }

}