import mongoose, { Schema } from "mongoose";
import { EComUser } from "../model/EcomUser";
import CryptoJS from "crypto-js";

const UserSchems = new Schema<EComUser>({
    userName:{type:String , trim:true , required:true},
    email:{type:String  ,required:true ,trim:true },
    password: { type: String, required: true }, imgurl:{
        type:String
    }
},{timestamps:true})

export const User = mongoose.model<EComUser>("User" , UserSchems)

const reserPssword = (password:string)=>{
    
}