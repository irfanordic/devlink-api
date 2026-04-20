import { Request, Response, NextFunction }  from "express";
import { JobService } from "../services/job.service.js";

export class JobController{
    static async createJob(req: Request, res: Response, next: NextFunction){
        const userId = (req as any).user.id
        const data = req.body

        try{
            const create = await JobService.createJob(data, userId)
            res.status(201).json({
                status: "success",
                message: "job created successfully",
                data: create
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                message: (error as any).message
            })
        }
    }
}

