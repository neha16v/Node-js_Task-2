import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB=async()=>{
    try {
        const mongoURL=process.env.MONGODBCONNECTIONSTRING
        const connection=await mongoose.connect(mongoURL)
        console.log("Connection to mongoDB");
        return connection
        
    } catch (error) {
        console.log("error",error);
        
    }
}

export default connectDB