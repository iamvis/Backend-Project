import exprees from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = exprees();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential:true

}))

app.use(exprees.json({limit:"16kb"})) /// to acept the limited data in json
app.use(exprees.urlencoded({extended:true, limit:"17kb"}))  //extended use for to use things
app.use(exprees.static("public")) //in  public we save static imag and things
app.use(cookieParser());

//rotes 
import userRouter from "./routes/user.routes.js"

//routes Declaration 
app.use("/api/v1/users", userRouter)
 //http://localhost:800/api/v1/users/register
export {app};     