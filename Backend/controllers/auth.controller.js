import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generatetoken.js";






export const signupUser=async (req,res)=>{
    try{
        const {fullName,username,password,confirmpassword,gender} = req.body;
        if(password!==confirmpassword){
            return res.status(400).json({error:"passwords do not match"})

        }
        const user=await User.findOne({username})
        if(user){
            return res.status(400).json({error:"username already exists"})
        }
        // hash password here 
        const salt=await bcrypt.genSalt(5)
        const hashpassword=await bcrypt.hash(password,salt);




        // https://avatar-placeholder.iran.liara.run/
        const boyprofilepic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlprofilepic=`https://avatar.iran.liara.run/public/girl?username=${username}`
       
        const newUser=new User({
            fullName,
            username,
            password:hashpassword,
            gender,
            profilepic:gender==="male"?boyprofilepic:girlprofilepic
        })
       if(newUser){
        // generate JWT token
     generateTokenAndSetCookie(newUser._id,res)
        await newUser.save();

        res.status(200).json({
            _id:newUser._id,
            fullName: newUser.fullName,
            username:newUser.username,
            profilepic:newUser.profilepic
        });
       }
       else{
            console.log("error in signup controller",error.message);
            res.status(500).json({error:"Internal server Error"})
       }
    }
    catch(error){
        console.log("error in signup controller", error.message);
        res.status(500).json({error:"Internal server error"})
        

    }
}

export const loginUser=async(req,res)=>{
   
    try {
        const {username,password}=req.body;
         // Check if the user exists
        const user=await User.findOne({username});
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
         // Check if the password is correct
        const ispasswordcorrect=await bcrypt.compare(password,user.password );
        if(!ispasswordcorrect){
            return res.status(400).json({error:"invalid username  or password"});
            
        }
         // Generate JWT token and set cookie
        generateTokenAndSetCookie(user._id,res);
         // Send user info in the response
        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            username:user.username,
            profilepic:user.profilepic
        });
       

        
    } catch (error) {
        console.log("error in signup controller", error.message);
        res.status(500).json({error:"Internal server error"})
        
        
    }
}    
export const logoutUser=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"logged out successfully "});
        
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({error:"Internal server error"})
        

        
    }
}    
