import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


   // Configuration
   cloudinary.config({ 
    cloud_name: process.env.ClOUDINARY_CLOUD_NAME, 
    api_key: process.env.ClOUDINARY_API_KEY, 
    api_secret: process.env.ClOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null;
        //upload the file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        //file has been uplaod successfully
        console.log("file is successfully uploaad",
            response.url)
            return response;
    } catch (error) {
        fs.unliinkSync(localFilePath) // remove the locally saved temporary file as
        //the upload operation got faild
       return null;
    }
}
export {uploadOnCloudinary};