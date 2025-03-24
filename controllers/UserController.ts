import { NextFunction, Request , Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../DataBase/UserSchema";
import bcryptjs from "bcryptjs"
import gravatar from "gravatar"
import jwt from "jsonwebtoken"

export const UserRegister = async(request:Request , response:Response)=>
{

    const errors = validationResult(request)

    if (!errors.isEmpty) {
        return response.status(400).json({errors:errors.array()})
    }

    try {
        
        let {userName , password , email , isAdmin} = request.body;

        // Check if the user already exists
        const userObj = await User.findOne({email})

        if (userObj) {
            return response.status(400).json({
                data:null,
                msg:'User is Already exists '
            })

        }


        // password encrypiton

        const salt = await bcryptjs.genSalt(10)
        const hashPassword  = await bcryptjs.hash(password , salt)

        const imageUrl =gravatar.url( email , {
            size:"200",
            rating:"pg",
            default:"mm"
         })

        //  new user add
         const newUser = new User({
            userName,
            email,
            password:hashPassword,
            imageUrl,
            isAdmin
         })

         const theUserSave = await newUser.save()

         return response.status(201).json({
            data:theUserSave,
             msg:"Registration is successfull"
         })


        }
        
     catch (error:any) {
        return response.status(500).json({
            data:null,
            error: error.message || "Internal Server Error"
        })
    }
}



export const  UserLogin = async(request:Request , response:Response)=>
{
    let errors = validationResult(request)


    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() })
    }

    try {

        let {email , password} = request.body;

        const ObjUser = await User.findOne({email})

        if (!ObjUser) {
            return response.status(409).json({
                data:null,
                msg:"The USer Is already exists"
            })
        }

        // password compare 

        let isMatch =await bcryptjs.compare(password , ObjUser.password)

        if (!isMatch) {
            return response.status(400).json({
                data:null,
                msg:"password  invalide"
            })
        }

        let secretKey: string | undefined = process.env.JWT_SECRET_KEY

        if (!secretKey) {
            return response.status(500).json({
                data:null,
                msg:"JWT Secret Key is missing"
            })
        }
        const payload:any ={
            user:{
                id:ObjUser._id,
                email:ObjUser.email
            }
        } 

        if (secretKey && payload) {

            jwt.sign(payload , secretKey , {
                expiresIn:"1d"
            },(error , encoded)=>
            {
                if (error) throw error

                if(encoded){
                    return response.status(200).json({
                        data:ObjUser,
                        token:encoded,
                        msg:'Login is Success!'
                    })
                }
            })
        }

        
    } catch (error:any) {
        return response.status(500).json({
            data:null,
            error: error.message || "Internal Server Error"
        })
    }


}



export const UserLogout = async(request:Request , response:Response)=>
{

}


export const forgetPassword = async(request:Request , response:Response , next:NextFunction)=>{
    const user = await User.findOne({email:request.body.email})

    if (!user) {
        return response.status(404).json({
            data:null,
            msg:"User not found"
        })
    }

}
