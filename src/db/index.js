import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB= async ()=>{
    try {
       const atconnection= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n mongo db is connected !! host:   ${atconnection.connection.host}`);
    } catch (error) {
        console.log("connection faild to mongoDB", error);
        process.exit(1);
    }
}
 
export default connectDB