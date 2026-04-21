import { prisma } from "../config/prisma.js";
import { CompanyService } from "../services/company.service.js";
import { Request, Response, NextFunction }  from "express";


export class companyController {
 static async createController(req: Request, res: Response){
 const userId = (req as any).user.id
 const data =  req.body
 try{
    const company = await CompanyService.create(data, userId)
    res.status(201).json({
        status: "success",
        message: "company created successfully",
        data: company
    })
 }catch(error){
    res.status(400).json({
        status: "error",
        message: (error as any).message
    })
 }
}

static async getCompany(req: Request, res: Response){
    const userId = (req as any).user.id

    try{
        const company = await CompanyService.getCompany(userId)
        if(!company){
            return res.status(404).json({
                status: "error",
                message: "company not found for the user"
            })
        }
        res.status(200).json({
            status: "success",
            message: "company retrieved successfully",
            data: company
        })
    }catch(error){
        res.status(500).json({
            status: "error",
            message: (error as any).message
        })
    }
}


static async update(req: Request, res: Response){
    const userId = (req as any).user.id
    const data = req.body


try{
    const updatedCompany = await CompanyService.updateCompany(data, userId)
   res.status(200).json({
    status: "success",
    message: "Company updated successfully",
    data: updatedCompany
   })
}catch(error){
    res.status(400).json({
        status: "error",
        message: (error as any).message
    })
}
}

static async delete(req: Request, res: Response){
    const userId = (req as any).user.id

    try{
        await CompanyService.deleteCompany(userId)
        res.status(200).json({
            status: "success",
            message: "company deleted successfully"
        })
    }catch(error){
        res.status(400).json({
            status: "error",
            message: (error as any).message
        })
    }
}
}