import {prisma } from "../config/prisma.js";
import { Job } from "../generated/prisma/index.js";
export class JobService{
    static async createJob(data: any, userId: string){
      
      const company = await prisma.company.findUnique({
        where:{
           userId: userId
        }
      }) 

      if(!company){
        throw new Error("Company not found for the user")
      }
      
        const job = await prisma.job.create({
            data:{
                title: data.title,
                description: data.description,
                companyId: company?.id as string,
                location: data.location,
                salary: data.salary,
                jobStatus: "DRAFT",

            }
        })
        return job
    }
}