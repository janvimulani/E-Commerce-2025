import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

export const uploadOnCloudinary = async (localFilePath:any)=>
{
    try {
     
        console.log(localFilePath);
  
        if (!localFilePath) {
            return null
        }

        const reponse = await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto",
        })
        console.log(reponse.secure_url);
        
        fs.unlinkSync(localFilePath)

        return reponse
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log(error);
        return null
    }
}

