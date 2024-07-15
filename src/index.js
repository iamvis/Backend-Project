import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
 

dotenv.config({
    path:'./env'
})

// import express from "express";
// const app = express();

// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error", (error)=>{
//         console.log("Error", error);
//         throw error
//        })

//        app.listen(process.env.PORT , ()=>{
//         console.log(`APP IS LISTING ON PORT ${process.env.PORt}`)
//        })
    
//     } catch (error) {
//         console.error("Error: ",error);
//         throw error;
//     }
// })()

//good prectice


connectDB()
.then(()=>{
    app.on("error", (error)=>{
        console.log(`APP ERROR`, error);
        throw error
    })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    })
})
.catch((error)=>{console.log("connection faileed with mongoDB ::", error)})