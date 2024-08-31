import { asyncHandler } from "../utils/asyncHandler.js";
import {apiErrorStructure} from "../utils/apiErrorStructure.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponseStructure } from "../utils/apiResponseStructure.js";




const registerUser = asyncHandler(async(req, res) =>{

    //get user details from frontend
    //validation - not empty
    //check if user already exists: username, email
    //check for image , check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response

    //get user details from frontend
    const{fullName, email, username, password}=req.body
    console.log("email: ", email);
    
      //validation - not empty
    if([fullName, email, username, password].some( (field) =>  field?.trim()==="" ) ){ 
       throw new apiErrorStructure(400, "All Feild are required")
         }

    //check if user already exists: username, email
    const existedUser = await User.findOne({
        $or:[{username},  {email}]
     })
     if(existedUser){
        throw new apiErrorStructure(409, "User with email or username already exists")
     }

       //check for image , check for avatar
     const avatarLocalPath =  req.files?.avatar[0].path;
     const coverImageLocalPath = req.files?.coverImage[0]?.path;
     if(!avatarLocalPath){
        throw new apiErrorStructure(400, "Avatar path file is required")
     }
    
    //upload them to cloudinary, avatar//
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new apiErrorStructure(400, "Avatar file is required")
    }

     //create user object - create entry in db
     const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage:coverImage?.url  || "",
        email,
        password,
        username:username.toLowerCase()
     })

      //check for user creation
     const createdUserr = await User.findById(user._id).select(
        "-password  -refreshToken"
     )

     if(!createdUserr){
        throw new apiErrorStructure(500, "something went wrong while regestering")
     }
  
         //return response
     return res.status(201).json(
        new apiResponseStructure(200, createdUserr, "user regesterd succesfully")
     )
})
export {registerUser};