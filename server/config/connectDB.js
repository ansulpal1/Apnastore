import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
if(!process.env.MONGODB_URL){
    throw new Error("Please add your MongoDB URL to .env file");
}
async function connectDB() {
    try{
await mongoose.connect( process.env.MONGODB_URL)
console.log("Database connected successfuly")
    }
    catch(error){
        console.log("Error connecting to database",error)
        process.exit(1)
    }
}
export default connectDB;