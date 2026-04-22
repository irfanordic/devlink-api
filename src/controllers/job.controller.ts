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

    static async getJobById(req: Request, res: Response){
        const jobId = req.params.id as string
        try{
            const getJob = await JobService.getJobsById(jobId)
            if(!getJob){
                return res.status(404).json({
                    status: "error",
                    message: "job not found"
                })
            }
            res.status(200).json({
                status: "success",
                message: "job retrieved successfully",
                data: getJob
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                message: (error as any).message
            })

        }
    }

    static async getJobs(req: Request, res: Response){

        const query = req.query

        try{
            const jobs = await JobService.getJobs(query )
            res.status(200).json({
                status: "success",
                message: "jobs retreived succesfully",
                data: jobs
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                message: (error as any).message
            })
        }
    }

    static async updateJob(req: Request, res: Response){
        const userId = (req as any).user.id
        const jobId = req.params.id as string
        const data = req.body

        try{
            const update = await JobService.updateJobs(data, jobId, userId)
            res.status(200).json({
                status: "success",
                message: "job updated successfully",
                data: update
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                message: (error as any).message
            })
        }
    }

 static async delete(req: Request, res: Response){

    const userId = (req as any).user.id
    const jobId  = req.params.id as string
    
    try{
        await JobService.deleteJob(jobId, userId)
        res.status(200).json({
            status: "success",
            message: "job deleted successfully"
        })
    } catch(error){
        res.status(400).json({
            status: "error",
            message: (error as any).message
        })
    }

 }
}

