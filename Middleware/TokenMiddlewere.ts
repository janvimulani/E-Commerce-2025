import { Request,Response , NextFunction } from "express";
import jwt from 'jsonwebtoken'

export const  tokenMiddlewere = async(request:Request , response:Response , next:NextFunction)=>
    {
        try {
            
            const secretKey: string | undefined = process.env.JWT_EXPIREDIN_KEY
            const token: string | string[] | undefined = request.headers['x-auth-token']
            if (secretKey && token) {

                const decode : any= await jwt.verify(token.toString() , secretKey) 
                // token decode
                if (decode) {
                    request.headers['user-data'] = decode.user;
                    next()
                } else {
                    return response.status(401).json({
                        data: null,
                        msg: "Unauthorized, Invalid token!"
                    })
                }
               
            } else {
                return response.status(400).json({
                    data:null,
                    msg:"Unauthorized, No Token Provided!"
                })
            }

        } catch (error:any) {
            return response.status(500).json({
                data: null,
                error: error.message
            });   
        }
    } 