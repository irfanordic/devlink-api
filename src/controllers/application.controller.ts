import { Request, Response} from 'express'
import { ApplicationService } from '../services/application.service.js'

export class ApplicationController{
    static async apply(req: Request, res: Response){
        const jobId = req.params.id as string
        const userId = (req as any).user.id
        const data = req.body

        try{
            const apply = await ApplicationService.apply(data, userId, jobId)
            res.status(200).json({
                status: "success",
                message: "user have applied to the job successfully",
                data: apply
            })
        } catch(error){
            res.status(400).json({
                message : (error as any).message
            })
        }
    }

static async getApplicants(req: Request, res: Response){
    const jobId = req.params.id as string
    const userId = (req as any).user.id
     
             try{
                 const applications = await ApplicationService.getApplications(userId, jobId)
                 res.status(200).json({
                     status: "success",
                     message: "applications retrieved  successfully",
                     data: applications
                 })
             } catch(error){
                 res.status(400).json({
                     message : (error as any).message
                 })
             }

}


static async myApplications(req: Request, res: Response){
    const userId = (req as any).user.id

            try{
                const myApplies = await ApplicationService.myApplications(userId)
                res.status(200).json({
                    status: "success",
                    message: "user have applied to the job successfully",
                    data: myApplies
                })
            } catch(error){
                res.status(400).json({
                    message : (error as any).message
                })
            }
}


}