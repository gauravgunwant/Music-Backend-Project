import mongoose, { mongo } from "mongoose";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected!");
    } catch (error) {
        console.error("DB Connection Failed!");
        process.exit(1);
    }  
}
