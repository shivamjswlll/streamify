import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch{
        console.log("Error in connection in MONGODB",error);
        process.exit(1);
    }
};