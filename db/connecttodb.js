import mongoose from "mongoose";
const connecttodb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("connected to db");
        
    } catch (error) {
        
        console.log("error connecting to db", error.message);
    }

}
export default connecttodb;