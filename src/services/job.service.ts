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

  static async getJobsById(jobId: string){
    const job = await prisma.job.findUnique({
        where:{
            id: jobId
            
        }
    })
    return job 
  }




    static async getJobs(){
        const jobs  = await prisma.job.findMany({
            where:{
                jobStatus: "PUBLISHED"
            },
            include:{
                company:{
                    select:{
                        name: true,
                        description: true,
                        website: true
                    }
                }
            }
        })
        return jobs
    }

  static async updateJobs(data: any, jobId: string, userId: string){

   const company = await prisma.company.findUnique({
    where:{ userId}
   })

   if(!company){
     throw new Error("company not found for the user")
   }

    const updatedJob = await prisma.job.updateMany({
        where:{
            id: jobId,
            companyId: company.id
        },
        data:{
            description: data.description,
            location: data.location,
            salary: data.salary,
            title: data.title


        }
    })
    return updatedJob
  }

 static async deleteJob(jobId: string, userId: string){
    
    const company = await prisma.company.findUnique({
        where:{
            userId
        }
    })

    if(!company){
        throw new Error("company not found for the user")
    }
    
    return await prisma.job.deleteMany({
        where:{
            jobId: jobId,
            companyId: company.id
        }
    })
 }

}