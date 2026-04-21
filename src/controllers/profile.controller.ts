import { Request, Response } from "express";
import { ProfileService } from "../services/profile.service.js";

export class ProfileController{
    static async upsert(req: Request , res: Response){
        const data = req.body
        const userId = (req as any).user.id

        try{
            const profile = await ProfileService.upsertProfile(data, userId)
            res.status(201).json({
                status: "success",
                message: "profile created successfully",
                data: profile
            })
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Failed to create profile"
            })

        }
    }
}