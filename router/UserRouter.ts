import { Router,Request , Response } from "express";
import * as UserController from '../controllers/UserController'
import { body } from "express-validator";
const UserRouter:Router = Router();

UserRouter.post('/register' ,[
    body('userName').notEmpty().withMessage("Username is required"),
    body("password").isStrongPassword().withMessage("Strong Password"),
    body("email").isEmail().withMessage("email is required")
], async(request:Request , response:Response)=>
{
    await UserController.UserRegister(request , response)
})

UserRouter.post("/login" ,[
    body("password").isStrongPassword().withMessage("Strong Password"),
    body("email").isEmail().withMessage("email is required")
], async(request:Request , response:Response)=>
{
await UserController.UserLogin(request , response)
})

export default UserRouter