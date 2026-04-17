import { Request, Response, NextFunction } from "express"; 
import { AuthService } from "../services/auth.service.js";

export class AuthController{
    static async signup(req: Request, res: Response, next: NextFunction){
        const { name, email, password, role} = req.body
   
        try{
          const user =   await AuthService.createUser({name, email, password, role})
            res.status(201).json({
                status: "success",
                message: "user created succesfully",
                data:{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token: user.token
            })
        }catch(error: any){
            res.status(400).json({
                status: "error",
                message: error.message
            })
        }
    }
    static async login(req: Request, res: Response, next: NextFunction){
        const {email, password} = req.body

        try{
            const user = await AuthService.loginUser({email, password})
            res.status(200).json({
                status: "success",
                message: "user logged in successfully",
                data:{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token: user.token
            })
        }catch(error: any){
            res.status(400).json({
                status: "error",
                message: error.message
            })
        }
    }
}