import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req : Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).json({message: "unauthorized"})
        const token  = authHeader.split(" ")[1]

    try{
        const decoded = jwt.verify(token as string,
             process.env.JWT_SECRET as string);
    (req as any).user = decoded
    next()
    }catch {
        return res.status(401).json({message: "invalid token"})
    }
}