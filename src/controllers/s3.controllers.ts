import { Request, Response } from 'express';
import { S3Service } from '../services/S3.service.js';

export class S3controller{
    static async generatePreSignedUrl(req: Request, res: Response){
        try{
            const fileType = req.query.fileType as string
            if(!fileType){
                return res.status(400).json({ 
                                    status: "error", 
                                    message: "fileType query parameter is required (e.g., application/pdf)" 
                                });

            }
            const presignedData = await S3Service.generatePresignedUrl(fileType)
            res.status(200).json({
                status: "success",
                data: presignedData
            })
        }catch (error) {
            console.log("Error generating presigned URL:", error);
            res.status(500).json({
                status: "error",
                message: "Failed to generate presigned URL"
            })
        }
    } 
}